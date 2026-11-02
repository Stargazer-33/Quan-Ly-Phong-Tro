// Truy vấn dữ liệu riêng cho trang Khách thuê.
// Tách khỏi rentalData.js (file dùng chung với Admin) để tránh xung đột khi nhóm sửa song song.
(() => {
  const client = () => window.supabaseClient;

  function unwrap(result) {
    if (result.error) throw result.error;
    return result.data;
  }

  function newId() {
    if (window.crypto?.randomUUID) return window.crypto.randomUUID();
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  // Bảng mới (notices, room_members) có thể chưa được chạy migration.
  // Khi đó trang vẫn phải tải được các phần còn lại thay vì trắng trang.
  async function optional(builder, fallback = []) {
    try {
      const { data, error } = await builder;
      if (error) throw error;
      return data ?? fallback;
    } catch (error) {
      console.warn("[tenantData] bỏ qua bảng chưa sẵn sàng:", error.message);
      return fallback;
    }
  }

  function number(value) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  async function context(userId) {
    return window.getTenantProfile(userId);
  }

  async function load({ propertyId, tenantId, roomId }) {
    const [room, contracts, invoices, payments, readings, incidents] = await Promise.all([
      client().from("rooms")
        .select("id,code,name,floor,monthly_rent,area,status")
        .eq("property_id", propertyId).eq("id", roomId).maybeSingle(),
      client().from("rental_contracts")
        .select("*")
        .eq("property_id", propertyId).eq("tenant_id", tenantId)
        .order("start_date", { ascending: false }),
      client().from("invoices")
        .select("*")
        .eq("property_id", propertyId).eq("tenant_id", tenantId)
        .order("period", { ascending: false }),
      client().from("payments")
        .select("id,invoice_id,amount,paid_at,method,note")
        .eq("property_id", propertyId),
      client().from("utility_readings")
        .select("*")
        .eq("property_id", propertyId).eq("room_id", roomId)
        .order("period", { ascending: false }),
      client().from("incidents")
        .select("id,code,title,category,severity,status,description,created_at")
        .eq("property_id", propertyId).eq("tenant_id", tenantId)
        .order("created_at", { ascending: false }),
    ]);

    const roomRow = unwrap(room);
    const contractRows = unwrap(contracts) || [];
    const contractRow = contractRows.find((row) => row.status === "active") || contractRows[0] || null;
    const invoiceRows = unwrap(invoices) || [];
    const paymentRows = unwrap(payments) || [];
    const readingRows = unwrap(readings) || [];
    const incidentRows = unwrap(incidents) || [];

    const [notices, members] = await Promise.all([
      optional(client().from("notices")
        .select("id,title,content,published_at")
        .eq("property_id", propertyId)
        .order("published_at", { ascending: false })),
      optional(client().from("room_members")
        .select("id,full_name,phone,identity_no,relation,status,created_at")
        .eq("property_id", propertyId).eq("tenant_id", tenantId)
        .order("created_at", { ascending: true })),
    ]);

    const paidByInvoice = new Map();
    paymentRows.forEach((payment) => {
      paidByInvoice.set(
        payment.invoice_id,
        (paidByInvoice.get(payment.invoice_id) || 0) + number(payment.amount)
      );
    });

    return {
      room: roomRow
        ? {
            id: roomRow.id,
            code: roomRow.code,
            name: roomRow.name,
            floor: roomRow.floor || "",
            price: number(roomRow.monthly_rent),
            area: number(roomRow.area),
            status: roomRow.status,
          }
        : null,
      contract: contractRow
        ? {
            id: contractRow.id,
            code: contractRow.code,
            roomId: contractRow.room_id,
            tenantName: contractRow.tenant_name || "",
            deposit: number(contractRow.deposit),
            start: contractRow.start_date,
            end: contractRow.end_date,
            status: contractRow.status,
            terms: contractRow.terms || {},
          }
        : null,
      invoices: invoiceRows.map((invoice) => ({
        id: invoice.id,
        code: invoice.code,
        period: invoice.period,
        rent: number(invoice.rent_amount),
        electricUsage: number(invoice.electricity_usage),
        electricCost: number(invoice.electricity_amount),
        waterUsage: number(invoice.water_usage),
        waterCost: number(invoice.water_amount),
        serviceCost: number(invoice.service_amount),
        total: number(invoice.total_amount),
        paid: paidByInvoice.get(invoice.id) || 0,
        dueDate: invoice.due_date || "",
      })),
      payments: paymentRows.map((payment) => ({
        id: payment.id,
        invoiceId: payment.invoice_id,
        amount: number(payment.amount),
        paidAt: payment.paid_at,
        method: payment.method,
        note: payment.note || "",
      })),
      readings: readingRows.map((reading) => ({
        id: reading.id,
        period: reading.period,
        electricityPrevious: number(reading.electricity_previous),
        electricityCurrent: number(reading.electricity_current),
        waterPrevious: number(reading.water_previous),
        waterCurrent: number(reading.water_current),
      })),
      incidents: incidentRows,
      notices,
      members,
    };
  }

  // Khách chỉ được phép gửi sự cố mới; trạng thái luôn là "new" và người gửi là chính tài khoản đang đăng nhập.
  async function submitIncident({ propertyId, roomId, tenantId, userId, title, description, category, severity }) {
    const payload = {
      property_id: propertyId,
      id: newId(),
      code: `SC-${Date.now().toString(36).toUpperCase()}`,
      room_id: roomId,
      tenant_id: tenantId,
      title: title.trim(),
      category: category || "Khác",
      severity: severity || "medium",
      status: "new",
      description: description.trim(),
      reported_by: userId,
    };
    const { data, error } = await client()
      .from("incidents")
      .insert(payload)
      .select("id,code,title,category,severity,status,description,created_at")
      .single();
    if (error) throw error;
    return data;
  }

  window.tenantRepository = { context, load, submitIncident };
})();
