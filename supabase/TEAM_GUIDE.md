# Tài liệu giao cho ChatGPT hướng dẫn làm trang Quản lý và Khách thuê

## Đọc phần này trước

Bạn là ChatGPT hỗ trợ một thành viên trong nhóm làm bài quản lý phòng trọ. Thành viên đó **không dùng Codex** và cần được chỉ dẫn bằng VS Code, trình duyệt và Supabase Dashboard.

Hãy hướng dẫn bằng tiếng Việt, câu ngắn, từng bước rõ ràng. Nếu thành viên chưa biết thao tác ở đâu, chỉ đúng nút/menu trong VS Code hoặc Supabase. Khi có lỗi, xin nguyên văn thông báo hoặc ảnh đã che thông tin riêng tư rồi xử lý lỗi đó trước khi giao bước tiếp.

## 1. Bối cảnh dự án

- Thư mục dự án: `D:\QLPT\Quan-Ly-Phong-Tro`.
- Frontend là các file HTML, CSS và JavaScript thuần trong `frontend/`.
- Dự án đã nối với Supabase. Cấu hình client nằm trong `frontend/js/supabaseClient.js`.
- Migration tạo bảng và RLS đã chạy thành công trên Supabase. **Không hướng dẫn chạy lại migration.**
- Chủ trọ/Admin là phần của thành viên khác; phần này đã có trang và chức năng riêng.
- Tài khoản Quản lý và Khách thuê được Chủ trọ tạo/mời từ Admin. Thành viên không tự đăng ký role và không cần tạo bảng mới.
- Khi đăng nhập, `frontend/js/login.js` chuyển role `manager` sang `QuanLi.html`, role `tenant` sang `KhachThue.html`.

## 2. Phạm vi thành viên cần làm

Chia việc vào các file sẵn có:

| Phần | HTML | JavaScript | CSS |
|---|---|---|---|
| Quản lý | `frontend/QuanLi.html` | `frontend/js/QuanLi.js` | `frontend/css/QuanLi.css` |
| Khách thuê | `frontend/KhachThue.html` | `frontend/js/KhachThue.js` | `frontend/css/KhachThue.css` |

Giữ lại bố cục/sườn hiện có trong các file. Hãy bổ sung chức năng vào đúng trang, không tạo thêm dashboard thay thế và không sửa `Admin.html`, `Admin.js`, `supabaseClient.js`, migration hoặc Edge Function nếu không có yêu cầu cụ thể.

## 3. Cách chạy và đăng nhập

1. Trong VS Code, mở thư mục dự án.
2. Cài extension **Live Server** nếu máy chưa có.
3. Nhấp phải `frontend/index.html` → **Open with Live Server**.
4. Đăng nhập bằng email/mật khẩu mà Chủ trọ đã mời.
5. Tài khoản Manager sẽ vào `QuanLi.html`; tài khoản Tenant sẽ vào `KhachThue.html`.

Không cần cài Codex, chạy SQL migration hay cài npm package chỉ để làm hai trang frontend. Nếu trang không tải được dữ liệu, mở DevTools bằng `F12` → **Console**, sao chép lỗi để ChatGPT hướng dẫn xử lý.

## 4. Quy tắc chung cho cả hai trang

Mở HTML và kiểm tra phần cuối trước. Nếu đã có các script này thì sửa đúng thứ tự, đừng thêm bản trùng. Trang Quản lý dùng file JS của Quản lý; trang Khách thuê đổi dòng cuối thành `js/KhachThue.js`.

```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="js/supabaseClient.js"></script>
<script src="js/rentalData.js"></script>
<script src="js/auth.js"></script>
<script src="js/QuanLi.js"></script>
```

Mỗi trang phải kiểm tra quyền ngay khi khởi động:

```js
const auth = await window.requireCurrentProfile(["manager"]);
if (!auth) return;
```

Trang Khách thuê dùng `requireCurrentProfile(["tenant"])`. Đăng xuất bằng:

```js
window.signOutAndReturnHome();
```

Không dùng `localStorage` để lưu role hoặc quyết định ai được đọc dữ liệu. Không đưa service-role/secret key, mật khẩu email hoặc SMTP vào frontend. Publishable key đã được cấu hình sẵn ở `supabaseClient.js`.

## 5. Yêu cầu chức năng: Quản lý

Đây là nhân viên được Chủ trọ phân công vào một cơ sở. Các chức năng nên làm:

1. **Tổng quan:** số phòng, phòng đang thuê/còn trống, hóa đơn chưa thu đủ, sự cố mới.
2. **Phòng:** xem danh sách, tìm kiếm/lọc; thêm, sửa trạng thái hoặc thông tin phòng nếu sườn trang có chức năng này.
3. **Khách thuê và hợp đồng:** xem hồ sơ, phòng đang ở, thời hạn hợp đồng; thêm/sửa hồ sơ nghiệp vụ theo sườn trang.
4. **Điện nước và hóa đơn:** nhập chỉ số theo kỳ, xem hóa đơn và số còn phải thu.
5. **Thanh toán:** ghi nhận từng khoản khách đã trả; không tự sửa trường `paid` của hóa đơn.
6. **Sự cố:** xem sự cố khách gửi và cập nhật trạng thái `new`, `processing`, `resolved`.

Khi vào trang, lấy đúng cơ sở được phân công và tải dữ liệu bằng repository:

```js
const property = await window.rentalRepository.propertyForUser(auth.user, "manager");
const data = await window.rentalRepository.load(property.id);
```

`data` có các danh sách `rooms`, `tenants`, `staff`, `contracts`, `services`, `readings`, `invoices`, `payments`, `expenses`, `incidents`. Dữ liệu này đã được chuyển thành tên thuộc tính giao diện dễ dùng, ví dụ `room.price`, `tenant.name`, `invoice.total`.

Để lưu thêm/sửa các danh sách hỗ trợ, cập nhật `data` rồi gọi:

```js
await window.rentalRepository.save(property.id, auth.user.id, data);
```

`save` không ghi mảng `payments`. Ghi từng khoản thu riêng bằng:

```js
await window.rentalRepository.addPayment(property.id, {
  id: `PAY${Date.now()}`,
  invoiceId: invoice.id,
  amount: 1000000,
  method: "cash",
  note: "Thu tại quầy"
});
```

Khi xóa, gọi `window.rentalRepository.remove(property.id, entity, id)`. Không xóa phòng/khách nếu đã có hợp đồng, hóa đơn hoặc lịch sử liên quan.

## 6. Yêu cầu chức năng: Khách thuê

Khách chỉ xem dữ liệu của chính mình. Tối thiểu cần có:

1. **Thông tin thuê:** tên, phòng, trạng thái thuê, hợp đồng và ngày hết hạn.
2. **Hóa đơn:** kỳ hóa đơn, tổng tiền, đã trả/còn nợ, hạn thanh toán.
3. **Lịch sử:** các khoản thanh toán và chỉ số điện nước của phòng mình.
4. **Báo sự cố:** gửi tiêu đề, loại và mô tả; xem các sự cố do chính mình gửi.
5. **Đăng xuất.**

Lấy hồ sơ khách đang đăng nhập bằng Auth user ID, không hỏi khách nhập ID/email để chọn hồ sơ:

```js
const { data: tenant, error } = await window.supabaseClient
  .from("tenants")
  .select("id, property_id, full_name, room_id, status")
  .eq("auth_user_id", auth.user.id)
  .single();
if (error) throw error;
```

Sau khi có `tenant`, tải hóa đơn/hợp đồng theo `tenant.property_id` và `tenant.id`. Tải chỉ số theo `tenant.property_id` và `tenant.room_id`. Supabase RLS cũng chặn dữ liệu người khác; bộ lọc phía trình duyệt không thay thế RLS.

Khi gửi sự cố, lấy `property_id`, `room_id`, `tenant_id` từ hồ sơ vừa tìm được và dùng trạng thái mới `new`:

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

Không để khách tự gửi báo cáo cho phòng/người khác hoặc tự đổi sự cố sang `processing`/`resolved`.

## 7. Các bảng Supabase

| Bảng | Ý nghĩa |
|---|---|
| `profiles` | Role của tài khoản đăng nhập |
| `property_members` | Cơ sở được giao cho Manager; Admin quản lý bảng này |
| `rooms` | Phòng |
| `tenants` | Hồ sơ khách thuê, có `auth_user_id` nối với tài khoản Auth |
| `staff_members` | Hồ sơ nhân viên, có `auth_user_id` nối với tài khoản Auth |
| `rental_contracts` | Hợp đồng |
| `utility_readings` | Chỉ số điện nước |
| `invoices` | Hóa đơn |
| `payments` | Từng giao dịch thu tiền |
| `incidents` | Sự cố khách báo, quản lý tiếp nhận |
| `service_prices`, `expenses` | Giá dịch vụ và chi phí |

## 8. Cách ChatGPT nên hướng dẫn thành viên

1. Hỏi họ đang làm trang nào và mở file nào; đừng bắt đầu bằng thay đổi backend.
2. Chỉ từng thao tác VS Code rõ ràng: file cần mở, đoạn cần tìm, mã cần dán, cách lưu.
3. Làm từng phần nhỏ: nạp script và chặn role trước, sau đó tải dữ liệu, rồi mới làm từng chức năng/giao diện.
4. Nếu có lỗi, yêu cầu họ gửi nguyên văn lỗi từ trang hoặc Console. Không đoán lỗi và không yêu cầu họ chia sẻ mật khẩu/key.
5. Chỉ hướng dẫn Supabase Dashboard nếu thật sự cần; bảng/RLS hiện đã tạo nên không bảo họ chạy SQL lại.
6. Nhắc họ chỉ sửa các file thuộc trang được giao, rồi commit/push branch của mình để nhóm dễ ghép code.

## 9. Kiểm tra hoàn thành

- Đăng nhập Manager vào đúng trang Quản lý; đăng nhập Tenant vào đúng trang Khách thuê.
- Tài khoản sai role bị chuyển khỏi trang.
- Manager chỉ thao tác được cơ sở mình được giao.
- Tenant chỉ xem dữ liệu của mình; thử sửa filter/API không xem được dữ liệu khách khác.
- Khách gửi được sự cố; Manager nhìn thấy và cập nhật được trạng thái.
- Đăng xuất đưa người dùng về trang chủ.
- Mở `F12` → **Console**, không còn lỗi JavaScript.
