# Bàn giao phân hệ Quản lý và Khách thuê

## Phạm vi

Phần Chủ trọ/Admin dùng các bảng Supabase chuẩn hóa. Các file giao diện của thành viên vẫn thuộc phạm vi riêng:
- Quản lý: `frontend/QuanLi.html`, `frontend/js/QuanLi.js`, `frontend/css/QuanLi.css`
- Khách thuê: `frontend/KhachThue.html`, `frontend/js/KhachThue.js`, `frontend/css/KhachThue.css`

Migration `202610010002_normalized_roles.sql` đã tạo schema và RLS cho cả ba role. Trước khi viết UI, owner cần chạy migration này trong Supabase SQL Editor.

## Khởi tạo trang

Ở cuối HTML, nạp script theo đúng thứ tự trước file JS giao diện:

```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="js/supabaseClient.js"></script>
<script src="js/rentalData.js"></script>
<script src="js/auth.js"></script>
<script src="js/QuanLi.js"></script>
```

Trang khách thay file cuối thành `js/KhachThue.js`.

Không kiểm tra role bằng localStorage. Dùng Auth và profile từ Supabase:

```js
const auth = await window.requireCurrentProfile(["manager"]); // trang quản lý
// hoặc:
const auth = await window.requireCurrentProfile(["tenant"]);  // trang khách thuê
if (!auth) return;
```

Khi bấm đăng xuất, gọi `window.signOutAndReturnHome()`.

## Trang Quản lý

Tài khoản quản lý được chủ trọ mời từ trang Admin. Edge Function gán role `manager` và thêm dòng trong `property_members`; khi khóa nhân viên, membership cơ sở bị gỡ. Dùng:

```js
const property = await window.rentalRepository.propertyForUser(auth.user, "manager");
const data = await window.rentalRepository.load(property.id);
```

Repository cung cấp dữ liệu dạng UI hiện dùng: `rooms`, `tenants`, `contracts`, `readings`, `invoices`, `payments`, `expenses`, `incidents`. Khi lưu các danh sách quản lý, dùng `window.rentalRepository.save(property.id, auth.user.id, data)`; khi xóa dùng `remove(property.id, entity, id)`. Thanh toán là từng giao dịch riêng, ghi bằng `window.rentalRepository.addPayment(property.id, { id, invoiceId, amount, method, note })`. Mọi truy vấn vẫn phải lọc `property_id`; RLS là lớp bảo vệ cuối cùng.

Các luồng quản lý thường dùng:
- Phòng, khách thuê, hợp đồng: `rooms`, `tenants`, `rental_contracts`
- Chỉ số: `utility_readings`
- Hóa đơn và thu tiền: `invoices`, `payments`
- Sự cố: đọc/cập nhật `incidents`

Quản lý không được mời tài khoản khác; chức năng này dành cho chủ trọ ở Admin.

## Trang Khách thuê

Mỗi tài khoản khách được mời từ Admin và liên kết với một dòng `tenants.auth_user_id`. Lấy hồ sơ của chính khách:

```js
const { data: tenant, error } = await window.supabaseClient
  .from("tenants")
  .select("id, property_id, full_name, room_id, status")
  .eq("auth_user_id", auth.user.id)
  .single();
if (error) throw error;
```

Sau đó có thể đọc hợp đồng/hóa đơn/thanh toán theo `property_id` và `tenant_id`. Policy RLS vẫn tự giới hạn vào đúng khách; không dùng email, id truyền từ query string hoặc localStorage làm căn cứ phân quyền.

Để gửi báo sự cố, insert vào `incidents` với `property_id`, `room_id`, `tenant_id`, `reported_by: auth.user.id`, tiêu đề, loại và mô tả. RLS chỉ cho phép gửi sự cố gắn với hồ sơ/phòng của người đang đăng nhập.

## Schema chính

| Bảng | Dùng cho |
|---|---|
| `profiles` | Vai trò Auth: owner, manager, tenant |
| `property_members` | Quản lý được phân công vào cơ sở |
| `rooms`, `tenants`, `staff_members` | Hồ sơ nghiệp vụ và liên kết tài khoản |
| `rental_contracts`, `service_prices` | Hợp đồng và bảng giá |
| `utility_readings`, `invoices`, `payments` | Chỉ số, hóa đơn, lịch sử thu tiền |
| `expenses`, `incidents` | Chi phí và báo sự cố |

Không đưa publishable key ra khỏi client config và tuyệt đối không đưa service-role/secret key vào bất kỳ trang HTML/JS nào.

## Kiểm tra phân quyền

Dùng ba tài khoản riêng:
1. Manager chỉ thấy dữ liệu cơ sở được gán.
2. Tenant A chỉ đọc hồ sơ/hợp đồng/hóa đơn/thanh toán của Tenant A.
3. Tenant A không đọc được dữ liệu Tenant B khi sửa filter hoặc gọi API trực tiếp.
4. Khi owner khóa manager, manager không còn đọc bảng của cơ sở đó.
