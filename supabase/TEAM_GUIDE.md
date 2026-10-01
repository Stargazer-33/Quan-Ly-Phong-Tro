# Hướng dẫn làm hai trang Quản lý và Khách thuê

> Dành cho thành viên làm giao diện trong VS Code. Không cần dùng Codex và không cần chạy lại SQL migration.

## 0. Chuẩn bị chung

1. Pull code mới nhất từ GitHub.
2. Mở thư mục dự án trong VS Code.
3. Mở `frontend/index.html` bằng **Live Server** để chạy website. Đăng nhập bằng tài khoản được chủ trọ mời.
4. Đọc các file giao diện đang có trước khi sửa để giữ lại bố cục chung:
   - Quản lý: `frontend/QuanLi.html`, `frontend/js/QuanLi.js`, `frontend/css/QuanLi.css`
   - Khách thuê: `frontend/KhachThue.html`, `frontend/js/KhachThue.js`, `frontend/css/KhachThue.css`
5. Backend dùng chung đã có. Không tạo lại bảng, không chạy migration lần nữa, không đổi `supabaseClient.js`.

Cả hai trang cần nạp các script sau ở cuối HTML, theo đúng thứ tự. Trang Quản lý dùng `js/QuanLi.js`; trang Khách thuê đổi script cuối thành `js/KhachThue.js`.

```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="js/supabaseClient.js"></script>
<script src="js/rentalData.js"></script>
<script src="js/auth.js"></script>
<script src="js/QuanLi.js"></script>
```

Các hàm dùng chung:

- `window.requireCurrentProfile(["manager"])` hoặc `window.requireCurrentProfile(["tenant"])`: chặn người dùng sai quyền.
- `window.rentalRepository`: đọc, lưu và xóa dữ liệu nghiệp vụ.
- `window.signOutAndReturnHome()`: đăng xuất.

Không lấy role từ `localStorage`. Không đưa service-role key, secret key hoặc mật khẩu SMTP vào HTML/JS.

---

## 1. Trang Quản lý

### Mục tiêu

Làm trang cho nhân viên quản lý đã được chủ trọ mời. Trang này tập trung vào phòng, khách thuê, hợp đồng, chỉ số điện nước, hóa đơn, thanh toán và sự cố. Quản lý không mời tài khoản khác.

### Bước 1: Kiểm tra quyền và lấy cơ sở

Trong `frontend/js/QuanLi.js`, khi trang khởi động:

```js
(async function startManagerPage() {
  const auth = await window.requireCurrentProfile(["manager"]);
  if (!auth) return;

  try {
    const property = await window.rentalRepository.propertyForUser(auth.user, "manager");
    const data = await window.rentalRepository.load(property.id);
    renderManagerPage(data);
  } catch (error) {
    console.error(error);
    alert(`Không tải được dữ liệu: ${error.message}`);
  }
})();
```

`propertyForUser` trả về cơ sở đã được chủ trọ phân công. Không tự lấy một `property_id` từ ô nhập, URL hoặc `localStorage`.

### Bước 2: Dùng dữ liệu đã tải

`rentalRepository.load(property.id)` trả dữ liệu theo dạng JavaScript:

- `rooms`: phòng (`code`, `name`, `floor`, `price`, `area`, `status`)
- `tenants`: khách (`name`, `phone`, `email`, `roomCode`, `status`)
- `contracts`: hợp đồng (`code`, `roomCode`, `tenantName`, `start`, `end`, `deposit`, `status`)
- `services`: giá dịch vụ
- `readings`: chỉ số điện nước (`roomCode`, `period`, chỉ số trước/sau)
- `invoices`: hóa đơn, có `total`, `paid`, `dueDate`
- `payments`: các lần thanh toán
- `incidents`: báo sự cố

Dùng các mảng này để render bảng và biểu mẫu trong trang hiện có.

### Bước 3: Lưu và xóa

Sau khi thêm hoặc sửa một hồ sơ trong `data`, lưu bằng:

```js
await window.rentalRepository.save(property.id, auth.user.id, data);
```

Xóa một hồ sơ bằng:

```js
await window.rentalRepository.remove(property.id, "rooms", room.id);
```

Thay `"rooms"` bằng loại cần xóa, ví dụ `"tenants"`, `"contracts"`, `"readings"` hoặc `"incidents"`. Trước khi xóa, kiểm tra hồ sơ có hợp đồng/hóa đơn liên quan không.

Thanh toán phải lưu thành một giao dịch riêng, không sửa trực tiếp `invoice.paid`:

```js
await window.rentalRepository.addPayment(property.id, {
  id: `PAY${Date.now()}`,
  invoiceId: invoice.id,
  amount: 1000000,
  method: "cash",
  note: "Thu tại quầy"
});
```

Hóa đơn sẽ cộng tổng từ bảng `payments` khi tải lại.

### Bước 4: Đăng xuất

Gắn nút đăng xuất hiện có vào:

```js
window.signOutAndReturnHome();
```

---

## 2. Trang Khách thuê

### Mục tiêu

Khách chỉ xem thông tin của chính mình: phòng, hợp đồng, chỉ số, hóa đơn và thanh toán. Khách có thể gửi báo sự cố cho phòng mình.

### Bước 1: Kiểm tra quyền

Trong `frontend/js/KhachThue.js`:

```js
(async function startTenantPage() {
  const auth = await window.requireCurrentProfile(["tenant"]);
  if (!auth) return;

  try {
    await loadTenantPage(auth);
  } catch (error) {
    console.error(error);
    alert(`Không tải được dữ liệu: ${error.message}`);
  }
})();
```

### Bước 2: Lấy hồ sơ của khách đang đăng nhập

Không cho khách chọn hồ sơ bằng tên/email/ID nhập trên trang. Tìm hồ sơ theo `auth.user.id`:

```js
async function loadTenantPage(auth) {
  const { data: tenant, error } = await window.supabaseClient
    .from("tenants")
    .select("id, property_id, full_name, room_id, status")
    .eq("auth_user_id", auth.user.id)
    .single();
  if (error) throw error;

  const propertyId = tenant.property_id;
  const [contractsResult, invoicesResult, paymentsResult, readingsResult, incidentsResult] = await Promise.all([
    window.supabaseClient.from("rental_contracts").select("*")
      .eq("property_id", propertyId).eq("tenant_id", tenant.id),
    window.supabaseClient.from("invoices").select("*")
      .eq("property_id", propertyId).eq("tenant_id", tenant.id),
    window.supabaseClient.from("payments").select("*")
      .eq("property_id", propertyId),
    window.supabaseClient.from("utility_readings").select("*")
      .eq("property_id", propertyId).eq("room_id", tenant.room_id),
    window.supabaseClient.from("incidents").select("*")
      .eq("property_id", propertyId).eq("tenant_id", tenant.id)
  ]);

  for (const result of [contractsResult, invoicesResult, paymentsResult, readingsResult, incidentsResult]) {
    if (result.error) throw result.error;
  }

  renderTenantPage({
    tenant,
    contracts: contractsResult.data,
    invoices: invoicesResult.data,
    payments: paymentsResult.data,
    readings: readingsResult.data,
    incidents: incidentsResult.data
  });
}
```

RLS của Supabase cũng giới hạn dữ liệu theo người dùng. Vẫn lọc bằng `property_id` và `tenant_id` trong truy vấn để code dễ hiểu; không dựa vào filter phía trình duyệt làm lớp bảo mật duy nhất.

### Bước 3: Gửi báo sự cố

Lấy tiêu đề/mô tả từ form, nhưng lấy `tenant`, `property_id`, `room_id` từ hồ sơ đã xác thực ở bước 2:

```js
const { error } = await window.supabaseClient.from("incidents").insert({
  property_id: tenant.property_id,
  id: `INC${Date.now()}`,
  code: `SC${Date.now()}`,
  room_id: tenant.room_id,
  tenant_id: tenant.id,
  title: formValues.title,
  category: formValues.category,
  severity: formValues.severity || "medium",
  status: "new",
  description: formValues.description,
  reported_by: auth.user.id
});
if (error) throw error;
```

Không cho khách đặt `status` thành `processing`/`resolved`, hoặc gửi sự cố cho phòng/khách khác. RLS chỉ cho phép gửi sự cố mới gắn với hồ sơ của chính họ.

### Bước 4: Đăng xuất

Gắn nút đăng xuất hiện có vào:

```js
window.signOutAndReturnHome();
```

---

## 3. Bảng Supabase thường dùng

| Bảng | Dùng ở trang nào |
|---|---|
| `profiles` | Vai trò tài khoản; thường đọc qua `requireCurrentProfile` |
| `property_members` | Phân công quản lý vào cơ sở; Admin quản lý bảng này |
| `rooms`, `tenants`, `staff_members` | Phòng và hồ sơ người dùng |
| `rental_contracts` | Hợp đồng thuê |
| `utility_readings` | Chỉ số điện nước |
| `invoices`, `payments` | Hóa đơn và các lần thu tiền |
| `incidents` | Khách gửi sự cố, quản lý theo dõi/cập nhật |
| `service_prices`, `expenses` | Giá dịch vụ và chi phí; chủ yếu dành cho quản lý/chủ trọ |

## 4. Kiểm tra trước khi báo hoàn thành

- Tài khoản Manager vào được trang Quản lý; tài khoản Tenant vào được trang Khách thuê.
- Đăng nhập sai role thì không vào được trang tương ứng.
- Manager thao tác được các dữ liệu trong cơ sở được giao.
- Tenant chỉ thấy dữ liệu của mình và gửi được sự cố cho phòng của mình.
- Đăng xuất xong quay về trang chủ.
- Mở DevTools Console kiểm tra không còn lỗi JavaScript.

Nếu Supabase trả lỗi, ghi lại nguyên văn lỗi. Không khắc phục bằng cách tắt RLS hoặc đưa service-role key vào trình duyệt.
