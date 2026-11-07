// Trang Khách thuê: chỉ đọc dữ liệu của chính mình và gửi báo cáo sự cố.
// Mọi dữ liệu hiển thị đều được escape trước khi đưa vào innerHTML.

// Thông tin nhận tiền dự phòng khi hợp đồng chưa có "Thông tin tài khoản nhận tiền".
const FALLBACK_PAYMENT_INFO = {
  bank: "Đang cập nhật",
  account: "Đang cập nhật",
  holder: "Đang cập nhật",
};

const INCIDENT_STATUS = {
  new: { label: "Mới", cls: "badge-new" },
  processing: { label: "Đang xử lý", cls: "badge-processing" },
  resolved: { label: "Đã xử lý", cls: "badge-done" },
};

const INCIDENT_SEVERITY = {
  low: "Thấp",
  medium: "Trung bình",
  high: "Cao",
};

const CONTRACT_TERM_LABELS = [
  ["propertyAddress", "Địa chỉ nhà trọ", "text"],
  ["purpose", "Mục đích thuê", "text"],
  ["landlordName", "Chủ nhà", "text"],
  ["landlordIdentity", "CCCD/CMND chủ nhà", "text"],
  ["landlordPhone", "Số điện thoại chủ nhà", "text"],
  ["landlordAddress", "Địa chỉ chủ nhà", "text"],
  ["tenantIdentity", "CCCD/CMND người thuê", "text"],
  ["tenantPhone", "Số điện thoại người thuê", "text"],
  ["tenantAddress", "Địa chỉ thường trú", "text"],
  ["occupants", "Người ở cùng", "text"],
  ["maxOccupants", "Số người ở tối đa", "text"],
  ["paymentDueDay", "Hạn trả tiền hằng tháng (ngày)", "text"],
  ["paymentMethod", "Phương thức thanh toán", "method"],
  ["bankDetails", "Thông tin tài khoản nhận tiền", "text"],
  ["electricityRate", "Giá điện", "rate-kwh"],
  ["waterRate", "Giá nước", "rate-m3"],
  ["serviceFee", "Phí dịch vụ hằng tháng", "money"],
  ["handoverDate", "Ngày bàn giao phòng", "date"],
  ["handoverInventory", "Hiện trạng phòng và thiết bị", "text"],
  ["noticePeriodDays", "Số ngày báo trước khi chấm dứt", "day"],
  ["depositReturnDays", "Số ngày hoàn trả tiền cọc", "day"],
  ["signedOn", "Ngày ký hợp đồng", "date"],
];

const CONTRACT_TERM_TEXT = [
  ["landlordObligations", "Quyền và nghĩa vụ bên cho thuê"],
  ["tenantObligations", "Quyền và nghĩa vụ bên thuê / nội quy"],
  ["terminationTerms", "Điều kiện chấm dứt và xử lý cọc"],
  ["latePaymentTerms", "Thỏa thuận khi thanh toán trễ hạn"],
  ["disputeTerms", "Giải quyết tranh chấp"],
  ["additionalTerms", "Thỏa thuận bổ sung"],
];

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[ch]));
}

function money(value) {
  return `${(Number(value) || 0).toLocaleString("vi-VN")} đ`;
}

function quantity(value, digits = 2) {
  return (Number(value) || 0).toLocaleString("vi-VN", { maximumFractionDigits: digits });
}

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("vi-VN");
}

function formatDateTime(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" });
}

function periodLabel(period) {
  if (!period || !period.includes("-")) return period || "—";
  const [year, month] = period.split("-");
  return `${month}/${year}`;
}

function daysLeft(endDate) {
  if (!endDate) return null;
  const end = new Date(`${endDate}T23:59:59`);
  if (Number.isNaN(end.getTime())) return null;
  return Math.ceil((end.getTime() - Date.now()) / 86400000);
}

function invoiceStatus(invoice) {
  const due = invoice.total - invoice.paid;
  if (due <= 0) return { label: "Đã thanh toán", cls: "badge-done" };
  const overdue = invoice.dueDate && new Date(`${invoice.dueDate}T23:59:59`).getTime() < Date.now();
  if (invoice.paid > 0) {
    return { label: overdue ? "Trả một phần · quá hạn" : "Trả một phần", cls: overdue ? "badge-overdue" : "badge-partial" };
  }
  return { label: overdue ? "Quá hạn" : "Chưa thanh toán", cls: overdue ? "badge-overdue" : "badge-unpaid" };
}

function emptyState(title, hint = "") {
  return `
    <div class="empty-state">
      <strong>${esc(title)}</strong>
      ${hint ? `<p>${esc(hint)}</p>` : ""}
    </div>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const state = { auth: null, tenant: null, data: null };

  const el = {
    avatarBtn: document.getElementById("avatarBtn"),
    profileMenu: document.getElementById("profileMenu"),
    profileAvatar: document.getElementById("profileAvatar"),
    profileName: document.getElementById("profileName"),
    profileEmail: document.getElementById("profileEmail"),
    profileBtn: document.getElementById("profileBtn"),
    changePasswordBtn: document.getElementById("changePasswordBtn"),
    logoutProfileBtn: document.getElementById("logoutProfileBtn"),
    mainContent: document.getElementById("mainContent"),
    pageTitle: document.getElementById("pageTitle"),
    brandName: document.getElementById("brandName"),
    sidebarFooter: document.getElementById("sidebarFooter"),
  };

  const navItems = [...document.querySelectorAll(".nav-item")];

  const modalRoot = document.createElement("div");
  modalRoot.className = "modal-root";
  document.body.appendChild(modalRoot);

  /* ------------------------------ KHUNG TRANG ------------------------------ */

  const screens = {
    "Tổng quan": renderOverview,
    "Báo cáo sự cố": renderIncidents,
    "Xem hóa đơn": renderInvoices,
    "Hợp đồng thuê": renderContract,
    "Chỉ số điện nước": renderReadings,
    "Thông báo": renderNotices,
    "Thành viên ở cùng": renderMembers,
    "Đổi mật khẩu": renderChangePassword,
  };

  function render(functionName) {
    const screen = screens[functionName];
    if (!screen) return;
    // Các màn hình dữ liệu chỉ mở được sau khi hồ sơ khách thuê tải xong.
    if (!state.data && functionName !== "Đổi mật khẩu") return;
    el.pageTitle.textContent = functionName;
    navItems.forEach((item) => {
      item.classList.toggle("active", item.dataset.function === functionName);
    });
    screen();
  }

  function renderStandalone(title, html) {
    el.pageTitle.textContent = title;
    navItems.forEach((item) => item.classList.remove("active"));
    el.mainContent.innerHTML = html;
  }

  function flash(message, type = "success") {
    const box = document.createElement("div");
    box.className = `flash flash-${type}`;
    box.textContent = message;
    el.mainContent.prepend(box);
    setTimeout(() => box.remove(), 4000);
  }

  function statCard(label, value, hint, icon) {
    return `
      <div class="stat-card">
        <span class="stat-icon">${icon}</span>
        <p class="stat-label">${esc(label)}</p>
        <strong class="stat-value">${value}</strong>
        <p class="stat-hint">${hint}</p>
      </div>`;
  }

  function badge(text, cls) {
    return `<span class="badge ${cls}">${esc(text)}</span>`;
  }

  /* ------------------------------ KHỞI TẠO ------------------------------ */

  async function bootstrap() {
    try {
      const auth = await window.requireCurrentProfile(["tenant"]);
      if (!auth) return;
      state.auth = auth;

      const tenant = await window.tenantRepository.context(auth.user.id);
      if (!tenant) {
        renderStandalone("Chưa liên kết tài khoản", `
          <div class="card">
            <div class="empty-state empty-state-error">
              <strong>Tài khoản chưa được liên kết với hồ sơ khách thuê</strong>
              <p>Vui lòng liên hệ chủ trọ để cập nhật email và gửi lại lời mời. Trang sẽ không hiển thị dữ liệu khi chưa có hồ sơ.</p>
            </div>
          </div>`);
        return;
      }

      if (!tenant.room_id) {
        renderStandalone("Chưa xếp phòng", `
          <div class="card">
            <div class="empty-state">
              <strong>Hồ sơ của bạn chưa được gán phòng</strong>
              <p>Vui lòng liên hệ chủ trọ để được xếp phòng và lập hợp đồng thuê.</p>
            </div>
          </div>`);
        el.profileName.textContent = tenant.full_name || "Khách thuê";
        el.profileEmail.textContent = tenant.email || auth.user.email || "";
        return;
      }

      state.tenant = tenant;
      state.data = await window.tenantRepository.load({
        propertyId: tenant.property_id,
        tenantId: tenant.id,
        roomId: tenant.room_id,
      });

      hydrateShell();
      render("Tổng quan");
    } catch (error) {
      console.error(error);
      renderStandalone("Không tải được dữ liệu", `
        <div class="card">
          <div class="empty-state empty-state-error">
            <strong>Không tải được dữ liệu</strong>
            <p>${esc(error.message || "Vui lòng thử lại sau.")}</p>
            <button class="btn-submit" data-retry>Tải lại trang</button>
          </div>
        </div>`);
      el.mainContent.querySelector("[data-retry]")?.addEventListener("click", () => window.location.reload());
    }
  }

  function hydrateShell() {
    const { tenant, data, auth } = state;
    const letter = (tenant.full_name || "K").trim().charAt(0).toUpperCase();
    const room = data.room;

    el.avatarBtn.textContent = letter;
    el.profileAvatar.textContent = letter;
    el.profileName.textContent = tenant.full_name || "Khách thuê";
    el.profileEmail.textContent = tenant.email || auth.user.email || "";
    el.brandName.textContent = room ? `Phòng ${room.code}` : "Nhà trọ";
    el.sidebarFooter.textContent = room
      ? `${room.name || room.code}${room.floor ? ` · Tầng ${room.floor}` : ""}`
      : "Chưa xếp phòng";
  }

  /* ------------------------------ TỔNG QUAN ------------------------------ */

  function renderOverview() {
    const { data, tenant } = state;
    const room = data.room;
    const contract = data.contract;
    const latestInvoice = data.invoices[0];
    const outstanding = data.invoices.reduce((sum, invoice) => sum + Math.max(0, invoice.total - invoice.paid), 0);
    const openIncidents = data.incidents.filter((incident) => incident.status !== "resolved").length;
    const remaining = daysLeft(contract?.end);

    const contractHint = contract
      ? remaining === null
        ? `Hết hạn ${formatDate(contract.end)}`
        : remaining >= 0
          ? `Còn ${remaining} ngày (đến ${formatDate(contract.end)})`
          : `Đã hết hạn ${Math.abs(remaining)} ngày`
      : "Chưa có hợp đồng";

    el.mainContent.innerHTML = `
      <div class="stat-grid">
        ${statCard("Phòng đang ở", room ? esc(room.code) : "—", room ? `${room.floor ? `Tầng ${esc(room.floor)} · ` : ""}${money(room.price)}/tháng` : "Chưa xếp phòng", "🏠")}
        ${statCard("Công nợ hiện tại", money(outstanding), outstanding > 0 ? "Cần thanh toán" : "Đã thanh toán đủ", "💰")}
        ${statCard("Hợp đồng", contract ? esc(contract.status === "active" ? "Đang hiệu lực" : "Đã kết thúc") : "—", contractHint, "📄")}
        ${statCard("Sự cố chưa xong", String(openIncidents), openIncidents > 0 ? "Đang chờ xử lý" : "Không có sự cố", "🛠️")}
      </div>

      <div class="card">
        <div class="card-head">
          <h2>Hóa đơn gần nhất</h2>
          <button class="btn-link" data-goto="Xem hóa đơn">Xem tất cả</button>
        </div>
        ${latestInvoice ? invoiceSummary(latestInvoice) : emptyState("Chưa có hóa đơn nào", "Hóa đơn sẽ xuất hiện khi chủ trọ lập kỳ thu tiền.")}
      </div>

      <div class="two-col">
        <div class="card">
          <div class="card-head">
            <h2>Thông báo mới</h2>
            <button class="btn-link" data-goto="Thông báo">Xem tất cả</button>
          </div>
          ${data.notices.length
            ? data.notices.slice(0, 2).map(noticeItem).join("")
            : emptyState("Chưa có thông báo", "Thông báo từ chủ trọ sẽ hiển thị tại đây.")}
        </div>
        <div class="card">
          <div class="card-head">
            <h2>Sự cố gần đây</h2>
            <button class="btn-link" data-goto="Báo cáo sự cố">Gửi báo cáo</button>
          </div>
          ${data.incidents.length
            ? data.incidents.slice(0, 3).map((incident) => {
                const status = INCIDENT_STATUS[incident.status] || { label: incident.status, cls: "badge-pending" };
                return `
                  <div class="list-row">
                    <div>
                      <strong>${esc(incident.title)}</strong>
                      <p class="muted">${formatDateTime(incident.created_at)}</p>
                    </div>
                    ${badge(status.label, status.cls)}
                  </div>`;
              }).join("")
            : emptyState("Chưa gửi sự cố nào", "Bấm “Gửi báo cáo” khi phòng có vấn đề cần sửa.")}
        </div>
      </div>

      <div class="card">
        <h2>Thông tin khách thuê</h2>
        <div class="info-grid">
          ${infoField("Họ và tên", tenant.full_name)}
          ${infoField("Số điện thoại", tenant.phone)}
          ${infoField("CCCD/CMND", tenant.identity_no)}
          ${infoField("Email", tenant.email || state.auth.user.email)}
        </div>
      </div>`;

    el.mainContent.querySelectorAll("[data-goto]").forEach((button) => {
      button.addEventListener("click", () => render(button.dataset.goto));
    });
  }

  function invoiceSummary(invoice) {
    const status = invoiceStatus(invoice);
    const due = Math.max(0, invoice.total - invoice.paid);
    return `
      <div class="invoice-summary">
        <div>
          <p class="muted">Kỳ ${esc(periodLabel(invoice.period))} · Mã ${esc(invoice.code)}</p>
          <strong class="big-number">${money(invoice.total)}</strong>
          <p class="muted">Hạn thanh toán: ${formatDate(invoice.dueDate)}</p>
        </div>
        <div class="invoice-summary-right">
          ${badge(status.label, status.cls)}
          <p class="muted">Đã trả ${money(invoice.paid)}</p>
          <strong>Còn lại ${money(due)}</strong>
        </div>
      </div>`;
  }

  function infoField(label, value) {
    return `<div class="info-field"><span>${esc(label)}</span><strong>${esc(value || "—")}</strong></div>`;
  }

  function noticeItem(notice) {
    return `
      <div class="notice-item">
        <h3>${esc(notice.title)}</h3>
        <span>Ngày đăng: ${formatDateTime(notice.published_at)}</span>
        <p>${esc(notice.content)}</p>
      </div>`;
  }

  /* ------------------------------ SỰ CỐ ------------------------------ */

  function renderIncidents() {
    const incidents = state.data.incidents;

    el.mainContent.innerHTML = `
      <div class="card">
        <h2>Gửi báo cáo sự cố mới</h2>
        <form id="reportForm">
          <div class="form-row">
            <div class="form-group">
              <label for="reportTitle">Tiêu đề sự cố</label>
              <input type="text" id="reportTitle" maxlength="120" placeholder="Ví dụ: Hỏng vòi nước, Cúp điện..." required>
            </div>
            <div class="form-group">
              <label for="reportCategory">Phân loại</label>
              <select id="reportCategory">
                <option value="Điện">Điện</option>
                <option value="Nước">Nước</option>
                <option value="Cơ sở vật chất">Cơ sở vật chất</option>
                <option value="Vệ sinh">Vệ sinh</option>
                <option value="An ninh">An ninh</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
            <div class="form-group">
              <label for="reportSeverity">Mức độ</label>
              <select id="reportSeverity">
                <option value="low">Thấp</option>
                <option value="medium" selected>Trung bình</option>
                <option value="high">Cao</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label for="reportContent">Mô tả chi tiết</label>
            <textarea id="reportContent" rows="3" maxlength="1000" placeholder="Mô tả cụ thể vị trí và tình trạng..." required></textarea>
          </div>
          <p class="error-text" id="reportError" hidden></p>
          <button type="submit" class="btn-submit" id="reportSubmit">Gửi báo cáo</button>
        </form>
      </div>

      <div class="card">
        <h2>Lịch sử sự cố đã gửi</h2>
        ${incidents.length ? `
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Mã</th>
                  <th>Tiêu đề</th>
                  <th>Phân loại</th>
                  <th>Mức độ</th>
                  <th>Ngày gửi</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                ${incidents.map((incident) => {
                  const status = INCIDENT_STATUS[incident.status] || { label: incident.status, cls: "badge-pending" };
                  return `
                    <tr>
                      <td>${esc(incident.code)}</td>
                      <td>
                        <strong>${esc(incident.title)}</strong>
                        ${incident.description ? `<p class="muted cell-note">${esc(incident.description)}</p>` : ""}
                      </td>
                      <td>${esc(incident.category || "Khác")}</td>
                      <td>${esc(INCIDENT_SEVERITY[incident.severity] || incident.severity || "—")}</td>
                      <td>${formatDateTime(incident.created_at)}</td>
                      <td>${badge(status.label, status.cls)}</td>
                    </tr>`;
                }).join("")}
              </tbody>
            </table>
          </div>` : emptyState("Chưa gửi sự cố nào", "Báo cáo đầu tiên của bạn sẽ hiển thị tại đây.")}
      </div>`;

    const form = document.getElementById("reportForm");
    const errorBox = document.getElementById("reportError");
    const submitBtn = document.getElementById("reportSubmit");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      errorBox.hidden = true;
      submitBtn.disabled = true;
      submitBtn.textContent = "Đang gửi...";

      try {
        const created = await window.tenantRepository.submitIncident({
          propertyId: state.tenant.property_id,
          roomId: state.tenant.room_id,
          tenantId: state.tenant.id,
          userId: state.auth.user.id,
          title: document.getElementById("reportTitle").value,
          description: document.getElementById("reportContent").value,
          category: document.getElementById("reportCategory").value,
          severity: document.getElementById("reportSeverity").value,
        });
        state.data.incidents.unshift(created);
        renderIncidents();
        flash("Đã gửi báo cáo sự cố. Chủ trọ sẽ xem và xử lý.");
      } catch (error) {
        console.error(error);
        errorBox.textContent = error.message || "Không gửi được báo cáo. Vui lòng thử lại.";
        errorBox.hidden = false;
        submitBtn.disabled = false;
        submitBtn.textContent = "Gửi báo cáo";
      }
    });
  }

  /* ------------------------------ HÓA ĐƠN ------------------------------ */

  function renderInvoices() {
    const invoices = state.data.invoices;

    el.mainContent.innerHTML = `
      <div class="card">
        <h2>Danh sách hóa đơn hằng tháng</h2>
        ${invoices.length ? `
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Mã HĐ</th>
                  <th>Kỳ</th>
                  <th>Tổng tiền</th>
                  <th>Đã trả</th>
                  <th>Còn lại</th>
                  <th>Hạn</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                ${invoices.map((invoice) => {
                  const status = invoiceStatus(invoice);
                  const due = Math.max(0, invoice.total - invoice.paid);
                  return `
                    <tr>
                      <td><strong>${esc(invoice.code)}</strong></td>
                      <td>${esc(periodLabel(invoice.period))}</td>
                      <td><strong>${money(invoice.total)}</strong></td>
                      <td>${money(invoice.paid)}</td>
                      <td>${due > 0 ? `<strong class="text-danger">${money(due)}</strong>` : money(0)}</td>
                      <td>${formatDate(invoice.dueDate)}</td>
                      <td>${badge(status.label, status.cls)}</td>
                      <td class="cell-actions">
                        <button class="btn-small" data-detail="${esc(invoice.id)}">Chi tiết</button>
                        ${due > 0 ? `<button class="btn-small btn-ghost" data-transfer="${esc(invoice.id)}">Chuyển khoản</button>` : ""}
                      </td>
                    </tr>`;
                }).join("")}
              </tbody>
            </table>
          </div>` : emptyState("Chưa có hóa đơn nào", "Hóa đơn của bạn sẽ hiển thị tại đây sau khi chủ trọ lập kỳ thu tiền.")}
      </div>`;

    el.mainContent.querySelectorAll("[data-detail]").forEach((button) => {
      button.addEventListener("click", () => {
        const invoice = invoices.find((item) => item.id === button.dataset.detail);
        if (invoice) openInvoiceModal(invoice);
      });
    });

    el.mainContent.querySelectorAll("[data-transfer]").forEach((button) => {
      button.addEventListener("click", () => {
        const invoice = invoices.find((item) => item.id === button.dataset.transfer);
        if (invoice) openTransferModal(invoice);
      });
    });
  }

  function invoiceBreakdown(invoice) {
    return `
      <div class="breakdown">
        <div class="breakdown-row"><span>Tiền phòng</span><strong>${money(invoice.rent)}</strong></div>
        <div class="breakdown-row"><span>Điện (${quantity(invoice.electricUsage)} kWh)</span><strong>${money(invoice.electricCost)}</strong></div>
        <div class="breakdown-row"><span>Nước (${quantity(invoice.waterUsage)} m³)</span><strong>${money(invoice.waterCost)}</strong></div>
        <div class="breakdown-row"><span>Phí dịch vụ</span><strong>${money(invoice.serviceCost)}</strong></div>
        <div class="breakdown-row breakdown-total"><span>Tổng cộng</span><strong>${money(invoice.total)}</strong></div>
        <div class="breakdown-row"><span>Đã thanh toán</span><strong>${money(invoice.paid)}</strong></div>
        <div class="breakdown-row"><span>Còn lại</span><strong>${money(Math.max(0, invoice.total - invoice.paid))}</strong></div>
      </div>`;
  }

  function openInvoiceModal(invoice) {
    const status = invoiceStatus(invoice);
    openModal(`
      <h3>Hóa đơn ${esc(invoice.code)}</h3>
      <p class="muted">Kỳ ${esc(periodLabel(invoice.period))} · Hạn ${formatDate(invoice.dueDate)}</p>
      ${invoiceBreakdown(invoice)}
      <div class="modal-footer">
        <span>${badge(status.label, status.cls)}</span>
        <button class="btn-submit" data-close-modal>Đóng</button>
      </div>`);
  }

  function paymentInfo() {
    const terms = state.data.contract?.terms || {};
    const details = (terms.bankDetails || "").trim();
    return details ? { text: details } : FALLBACK_PAYMENT_INFO;
  }

  function openTransferModal(invoice) {
    const info = paymentInfo();
    const content = `${invoice.code} ${state.data.room?.code || ""}`.trim();
    const due = money(Math.max(0, invoice.total - invoice.paid));

    openModal(`
      <h3>Thông tin chuyển khoản</h3>
      <p class="muted">Hóa đơn ${esc(invoice.code)} · Kỳ ${esc(periodLabel(invoice.period))}</p>
      <div class="breakdown">
        <div class="breakdown-row"><span>Số tiền cần chuyển</span><strong class="text-danger">${due}</strong></div>
        ${info.text
          ? `<div class="breakdown-row"><span>Thông tin nhận tiền</span><strong class="align-right">${esc(info.text)}</strong></div>`
          : `
            <div class="breakdown-row"><span>Ngân hàng</span><strong>${esc(info.bank)}</strong></div>
            <div class="breakdown-row"><span>Số tài khoản</span><strong>${esc(info.account)}</strong></div>
            <div class="breakdown-row"><span>Chủ tài khoản</span><strong>${esc(info.holder)}</strong></div>`}
        <div class="breakdown-row"><span>Nội dung chuyển khoản</span><strong>${esc(content)}</strong></div>
      </div>
      <p class="muted">Sau khi chuyển khoản, vui lòng báo chủ trọ để được ghi nhận thanh toán. Trang này không tự tạo giao dịch.</p>
      <div class="modal-footer">
        <button class="btn-small" data-copy="${esc(content)}">Sao chép nội dung</button>
        <button class="btn-submit" data-close-modal>Đóng</button>
      </div>`);

    modalRoot.querySelector("[data-copy]")?.addEventListener("click", async (event) => {
      try {
        await navigator.clipboard.writeText(event.currentTarget.dataset.copy);
        flash("Đã sao chép nội dung chuyển khoản.");
      } catch {
        flash("Trình duyệt không cho phép sao chép tự động.", "error");
      }
    });
  }

  /* ------------------------------ HỢP ĐỒNG ------------------------------ */

  function contractValue(type, value) {
    if (value === null || value === undefined || value === "") return "—";
    switch (type) {
      case "money": return money(value);
      case "date": return formatDate(value);
      case "day": return `${value} ngày`;
      case "rate-kwh": return `${money(value)}/kWh`;
      case "rate-m3": return `${money(value)}/m³`;
      case "method": return { cash: "Tiền mặt", bank_transfer: "Chuyển khoản", other: "Khác" }[value] || value;
      default: return String(value);
    }
  }

  function renderContract() {
    const contract = state.data.contract;
    if (!contract) {
      el.mainContent.innerHTML = `<div class="card">${emptyState("Chưa có hợp đồng thuê", "Chủ trọ sẽ lập hợp đồng và thông tin sẽ hiển thị tại đây.")}</div>`;
      return;
    }

    const terms = contract.terms || {};
    const remaining = daysLeft(contract.end);
    const statusText = contract.status === "active" ? "Đang hiệu lực" : "Đã kết thúc";
    const termRows = CONTRACT_TERM_LABELS
      .filter(([key]) => terms[key] !== undefined && terms[key] !== null && terms[key] !== "")
      .map(([key, label, type]) => infoField(label, contractValue(type, terms[key])))
      .join("");
    const termTexts = CONTRACT_TERM_TEXT
      .filter(([key]) => String(terms[key] || "").trim())
      .map(([key, label]) => `<div class="term-block"><h3>${esc(label)}</h3><p>${esc(terms[key])}</p></div>`)
      .join("");

    el.mainContent.innerHTML = `
      <div class="card">
        <div class="card-head">
          <h2>Thông tin hợp đồng hiện tại</h2>
          <button class="btn-small" id="printContract">In hợp đồng</button>
        </div>
        <div class="info-grid">
          ${infoField("Mã hợp đồng", contract.code)}
          ${infoField("Phòng", state.data.room?.code)}
          ${infoField("Ngày bắt đầu", formatDate(contract.start))}
          ${infoField("Ngày hết hạn", formatDate(contract.end))}
          ${infoField("Tiền thuê hằng tháng", money(terms.rent ?? state.data.room?.price))}
          ${infoField("Tiền cọc", money(contract.deposit))}
          ${infoField("Trạng thái", statusText)}
          ${infoField("Thời gian còn lại", remaining === null ? "—" : remaining >= 0 ? `${remaining} ngày` : `Đã hết hạn ${Math.abs(remaining)} ngày`)}
        </div>
      </div>

      ${termRows ? `<div class="card"><h2>Điều khoản thuê</h2><div class="info-grid">${termRows}</div></div>` : ""}
      ${termTexts ? `<div class="card"><h2>Quyền, nghĩa vụ và thỏa thuận khác</h2>${termTexts}</div>` : ""}
      ${!termRows && !termTexts ? `<div class="card">${emptyState("Hợp đồng chưa có điều khoản chi tiết", "Chủ trọ chưa nhập nội dung điều khoản cho hợp đồng này.")}</div>` : ""}`;

    document.getElementById("printContract")?.addEventListener("click", () => printContract(contract, terms));
  }

  function printContract(contract, terms) {
    const tenant = state.tenant;
    const room = state.data.room;
    // Hợp đồng cũ có thể chưa lưu tiền thuê trong terms, lấy theo giá phòng.
    const printTerms = { ...terms, rent: terms.rent ?? room?.price };
    const row = ([key, label, type]) => printTerms[key] === undefined || printTerms[key] === null || printTerms[key] === ""
      ? ""
      : `<tr><th>${esc(label)}</th><td>${esc(contractValue(type, printTerms[key]))}</td></tr>`;
    const section = (title, body) => body ? `<h2>${esc(title)}</h2><table>${body}</table>` : "";
    const paragraphs = CONTRACT_TERM_TEXT
      .filter(([key]) => String(printTerms[key] || "").trim())
      .map(([key, label]) => `<h2>${esc(label)}</h2><p>${esc(printTerms[key])}</p>`)
      .join("");

    const html = `<!DOCTYPE html>
      <html lang="vi"><head><meta charset="UTF-8"><title>Hợp đồng ${esc(contract.code)}</title>
      <style>
        body{font-family:"Times New Roman",serif;max-width:800px;margin:32px auto;color:#111;line-height:1.6;padding:0 24px}
        h1{text-align:center;text-transform:uppercase;font-size:20px}
        h2{font-size:15px;margin:20px 0 8px}
        table{width:100%;border-collapse:collapse;margin-bottom:8px}
        th,td{border:1px solid #999;padding:6px 10px;text-align:left;font-size:14px;vertical-align:top}
        th{width:38%;background:#f3f4f6;font-weight:600}
        .sign{display:flex;justify-content:space-between;margin-top:48px;text-align:center}
        .sign div{width:45%}
        @media print{body{margin:0}}
      </style></head><body>
      <h1>Hợp đồng thuê phòng trọ</h1>
      <p style="text-align:center">Mã hợp đồng: <b>${esc(contract.code)}</b> · Phòng <b>${esc(room?.code || "")}</b></p>
      ${section("Thông tin chung", row(["start", "Ngày bắt đầu", "date"]) + row(["end", "Ngày hết hạn", "date"]) + row(["deposit", "Tiền đặt cọc", "money"]))}
      ${section("Các bên", row(["landlordName", "Bên cho thuê", "text"]) + row(["landlordIdentity", "CCCD/CMND bên A", "text"]) + row(["landlordPhone", "Điện thoại bên A", "text"]) + `<tr><th>Bên thuê</th><td>${esc(tenant.full_name || contract.tenantName)}</td></tr>` + row(["tenantIdentity", "CCCD/CMND bên B", "text"]) + row(["tenantPhone", "Điện thoại bên B", "text"]) + row(["tenantAddress", "Địa chỉ bên B", "text"]))}
      ${section("Giá thuê và thanh toán", row(["rent", "Tiền thuê mỗi tháng", "money"]) + row(["paymentDueDay", "Hạn thanh toán (ngày)", "text"]) + row(["paymentMethod", "Phương thức", "method"]) + row(["bankDetails", "Tài khoản nhận tiền", "text"]) + row(["electricityRate", "Giá điện", "rate-kwh"]) + row(["waterRate", "Giá nước", "rate-m3"]) + row(["serviceFee", "Phí dịch vụ", "money"]))}
      ${section("Bàn giao và chấm dứt", row(["handoverDate", "Ngày bàn giao", "date"]) + row(["noticePeriodDays", "Báo trước", "day"]) + row(["depositReturnDays", "Hoàn cọc sau", "day"]) + row(["signedOn", "Ngày ký", "date"]))}
      ${paragraphs}
      <div class="sign"><div><b>BÊN CHO THUÊ (BÊN A)</b><br><i>Ký, ghi rõ họ tên</i><br><br><br><br>${esc(terms.landlordName || "")}</div>
      <div><b>BÊN THUÊ (BÊN B)</b><br><i>Ký, ghi rõ họ tên</i><br><br><br><br>${esc(tenant.full_name || contract.tenantName)}</div></div>
      </body></html>`;

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      flash("Trình duyệt đã chặn cửa sổ in. Vui lòng cho phép popup rồi thử lại.", "error");
      return;
    }
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }

  /* ------------------------------ ĐIỆN NƯỚC ------------------------------ */

  function renderReadings() {
    const contractPeriod = state.data.contract?.start?.slice(0, 7) || "";
    const readings = state.data.readings
      .filter((reading) => !contractPeriod || reading.period >= contractPeriod)
      .sort((a, b) => b.period.localeCompare(a.period));

    el.mainContent.innerHTML = `
      <div class="card">
        <h2>Chỉ số điện nước của phòng ${esc(state.data.room?.code || "")}</h2>
        ${readings.length ? `
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Kỳ</th>
                  <th>Điện đầu kỳ</th>
                  <th>Điện cuối kỳ</th>
                  <th>Tiêu thụ (kWh)</th>
                  <th>Nước đầu kỳ</th>
                  <th>Nước cuối kỳ</th>
                  <th>Tiêu thụ (m³)</th>
                </tr>
              </thead>
              <tbody>
                ${readings.map((reading) => `
                  <tr>
                    <td><strong>${esc(periodLabel(reading.period))}</strong></td>
                    <td>${quantity(reading.electricityPrevious)}</td>
                    <td>${quantity(reading.electricityCurrent)}</td>
                    <td><strong>${quantity(reading.electricityCurrent - reading.electricityPrevious)}</strong></td>
                    <td>${quantity(reading.waterPrevious)}</td>
                    <td>${quantity(reading.waterCurrent)}</td>
                    <td><strong>${quantity(reading.waterCurrent - reading.waterPrevious)}</strong></td>
                  </tr>`).join("")}
              </tbody>
            </table>
          </div>` : emptyState("Chưa có chỉ số điện nước", "Chỉ số sẽ hiển thị sau khi chủ trọ ghi nhận trong kỳ.")}
      </div>`;
  }

  /* ------------------------------ THÔNG BÁO ------------------------------ */

  function renderNotices() {
    const notices = state.data.notices;
    el.mainContent.innerHTML = `
      <div class="card">
        <h2>Thông báo từ chủ nhà / Ban quản lý</h2>
        ${notices.length
          ? notices.map(noticeItem).join("")
          : emptyState("Chưa có thông báo nào", "Thông báo từ chủ trọ sẽ hiển thị tại đây.")}
      </div>`;
  }

  /* ------------------------------ THÀNH VIÊN ------------------------------ */

  function renderMembers() {
    let members = state.data.members || [];
    const occupantsText = (state.data.contract?.terms?.occupants || "").trim();

    // Nếu bảng room_members chưa có dòng nào, lấy từ điều khoản occupants trong hợp đồng
    if (!members.length && occupantsText) {
      const lines = occupantsText.split(/[\n;]+/).map((s) => s.trim()).filter(Boolean);
      members = lines.map((line) => {
        // Hỗ trợ định dạng "Họ tên - CCCD" hoặc "Họ tên"
        const parts = line.split(/[-–—]/).map((p) => p.trim());
        return {
          full_name: parts[0] || line,
          phone: "—",
          identity_no: parts[1] || "Theo hợp đồng",
          relation: "Người ở cùng",
          status: "active",
        };
      });
    }

    el.mainContent.innerHTML = `
      <div class="card">
        <h2>Danh sách người đang ở trong phòng</h2>
        ${members.length ? `
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Họ tên</th>
                  <th>SĐT</th>
                  <th>CCCD / Ghi chú</th>
                  <th>Vai trò</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                ${members.map((member, index) => `
                  <tr>
                    <td>${index + 1}</td>
                    <td><strong>${esc(member.full_name)}</strong></td>
                    <td>${esc(member.phone || "—")}</td>
                    <td>${esc(member.identity_no || "—")}</td>
                    <td>${esc(member.relation || "Thành viên")}</td>
                    <td>${badge(member.status === "inactive" ? "Đã rời đi" : "Đang ở", member.status === "inactive" ? "badge-pending" : "badge-done")}</td>
                  </tr>`).join("")}
              </tbody>
            </table>
          </div>` : emptyState("Chưa có thông tin thành viên", "Chủ trọ là người nhập và cập nhật danh sách thành viên ở cùng.")}
        <p class="muted form-note">Danh sách do chủ trọ quản lý theo hợp đồng. Nếu có thay đổi, vui lòng liên hệ chủ trọ để cập nhật.</p>
      </div>`;
  }

  /* ------------------------------ TÀI KHOẢN ------------------------------ */

  function renderProfile() {
    const tenant = state.tenant;
    renderStandalone("Thông tin cá nhân", `
      <div class="card">
        <h2>Thông tin cá nhân</h2>
        <div class="info-grid">
          ${infoField("Họ và tên", tenant.full_name)}
          ${infoField("Số điện thoại", tenant.phone)}
          ${infoField("CCCD/CMND", tenant.identity_no)}
          ${infoField("Email đăng nhập", tenant.email || state.auth.user.email)}
          ${infoField("Phòng", state.data.room?.code)}
          ${infoField("Trạng thái hồ sơ", tenant.status === "inactive" ? "Đã rời đi" : "Đang thuê")}
        </div>
        <p class="muted form-note">Thông tin do chủ trọ quản lý. Nếu cần thay đổi số điện thoại hoặc email, vui lòng liên hệ chủ trọ.</p>
      </div>`);
  }

  function renderChangePassword() {
    el.mainContent.innerHTML = `
      <div class="card card-narrow">
        <h2>Đổi mật khẩu</h2>
        <form id="changePassForm">
          <div class="form-group">
            <label for="newPassword">Mật khẩu mới</label>
            <input type="password" id="newPassword" autocomplete="new-password" minlength="8" placeholder="Ít nhất 8 ký tự" required>
          </div>
          <div class="form-group">
            <label for="confirmPassword">Xác nhận mật khẩu mới</label>
            <input type="password" id="confirmPassword" autocomplete="new-password" minlength="8" required>
          </div>
          <p class="error-text" id="passwordError" hidden></p>
          <button type="submit" class="btn-submit" id="passwordSubmit">Cập nhật mật khẩu</button>
        </form>
      </div>`;

    const form = document.getElementById("changePassForm");
    const errorBox = document.getElementById("passwordError");
    const submitBtn = document.getElementById("passwordSubmit");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      errorBox.hidden = true;

      const password = document.getElementById("newPassword").value;
      const confirm = document.getElementById("confirmPassword").value;

      if (password.length < 8) {
        errorBox.textContent = "Mật khẩu cần ít nhất 8 ký tự.";
        errorBox.hidden = false;
        return;
      }
      if (password !== confirm) {
        errorBox.textContent = "Mật khẩu xác nhận không khớp.";
        errorBox.hidden = false;
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "Đang cập nhật...";
      try {
        const { error } = await window.supabaseClient.auth.updateUser({ password });
        if (error) throw error;
        form.reset();
        flash("Đã cập nhật mật khẩu.");
      } catch (error) {
        console.error(error);
        errorBox.textContent = error.message || "Không cập nhật được mật khẩu.";
        errorBox.hidden = false;
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Cập nhật mật khẩu";
      }
    });
  }

  /* ------------------------------ MODAL ------------------------------ */

  function openModal(content) {
    modalRoot.innerHTML = `<div class="modal"><div class="modal-content">${content}</div></div>`;
    const backdrop = modalRoot.querySelector(".modal");
    backdrop.addEventListener("click", (event) => {
      if (event.target === backdrop) closeModal();
    });
    modalRoot.querySelectorAll("[data-close-modal]").forEach((button) => {
      button.addEventListener("click", closeModal);
    });
    document.addEventListener("keydown", handleEscape);
  }

  function closeModal() {
    modalRoot.innerHTML = "";
    document.removeEventListener("keydown", handleEscape);
  }

  function handleEscape(event) {
    if (event.key === "Escape") closeModal();
  }

  /* ------------------------------ MENU & SỰ KIỆN ------------------------------ */

  el.avatarBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    el.profileMenu.hidden = !el.profileMenu.hidden;
  });

  document.addEventListener("click", (event) => {
    if (!el.profileMenu.hidden && !el.profileMenu.contains(event.target) && event.target !== el.avatarBtn) {
      el.profileMenu.hidden = true;
    }
  });

  el.profileBtn.addEventListener("click", () => {
    el.profileMenu.hidden = true;
    if (state.tenant && state.data) renderProfile();
  });

  el.changePasswordBtn.addEventListener("click", () => {
    el.profileMenu.hidden = true;
    render("Đổi mật khẩu");
  });

  el.logoutProfileBtn.addEventListener("click", async () => {
    el.logoutProfileBtn.disabled = true;
    await window.signOutAndReturnHome();
  });

  navItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      render(item.dataset.function);
    });
  });

  bootstrap();
});
