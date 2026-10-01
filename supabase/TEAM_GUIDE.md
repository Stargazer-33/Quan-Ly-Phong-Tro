# Hướng dẫn làm phần Quản lý và Khách thuê

Tài liệu này dành cho thành viên làm trên máy riêng. Làm lần lượt từng bước và kiểm tra kết quả ở mỗi bước. Backend Supabase đã được tạo; hai file migration bên dưới dùng để đọc cấu trúc, không chạy lại.

## A. Bắt đầu trên máy của bạn

1. Cài Git, Node.js và VS Code; cài extension **Live Server** trong VS Code.
2. Mở Terminal trong VS Code, vào thư mục dự án đã clone từ GitHub. Lấy code mới nhất:

   ```bash
   git pull
   ```

3. Trong VS Code, mở lần lượt hai file để biết những bảng và quyền đã có:
   - `supabase/migrations/202610010001_initial_rental_backend.sql`
   - `supabase/migrations/202610010002_normalized_roles.sql`

   Đây là file SQL để đọc làm tài liệu. **Không dán chạy lại** trong Supabase SQL Editor, vì cơ sở dữ liệu dùng chung đã chạy chúng.

4. Mỗi thành viên chỉ sửa ba file của chức năng mình:

   | Phần | HTML | JavaScript | CSS |
   |---|---|---|---|
   | Quản lý | `frontend/QuanLi.html` | `frontend/js/QuanLi.js` | `frontend/css/QuanLi.css` |
   | Khách thuê | `frontend/KhachThue.html` | `frontend/js/KhachThue.js` | `frontend/css/KhachThue.css` |

   Đừng sửa trang Admin, file cấu hình Supabase, hoặc file của thành viên khác nếu chưa trao đổi với nhóm.

5. Mở `frontend/index.html` bằng Live Server. Đăng nhập bằng tài khoản thử đúng vai trò. Để mở thẳng trang đang làm, mở `QuanLi.html` hoặc `KhachThue.html` bằng Live Server.

**Kết quả cần thấy:** trang hiện tại chạy được trước khi sửa. Nếu chưa chạy, chụp/ghi lỗi và báo nhóm; đừng bắt đầu bằng cách tạo lại bảng.

## B. Quy tắc chung để không lệch khỏi code Admin

- Giữ phong cách giao diện và cách đặt nút/form giống trang Admin hiện tại.
- Dùng các file dùng chung đã có: `js/supabaseClient.js`, `js/auth.js`, `js/rentalData.js`. Không tạo Supabase client thứ hai.
- Cuối mỗi HTML, nạp script theo đúng thứ tự. Ví dụ trang Quản lý:

  ```html
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <script src="js/supabaseClient.js"></script>
  <script src="js/rentalData.js"></script>
  <script src="js/auth.js"></script>
  <script src="js/QuanLi.js"></script>
  ```

  Trang Khách thuê dùng cùng bốn script đầu, script cuối là `js/KhachThue.js`.
- Dùng `window.requireCurrentProfile(["manager"])` cho Quản lý và `window.requireCurrentProfile(["tenant"])` cho Khách thuê. Không tự kiểm tra role bằng `localStorage`.
- Không đặt Supabase `service_role` key, secret key, mật khẩu email hay mật khẩu người dùng trong HTML/JavaScript.
- Khi dữ liệu không tải/lưu, hiện thông báo lỗi và ghi lỗi vào Console. Không giấu lỗi bằng dữ liệu giả.

## C. Làm trang Quản lý

### Bước 1 — Chặn tài khoản sai quyền và lấy dữ liệu

Trong `frontend/js/QuanLi.js`, lúc trang mở:

1. Gọi `await window.requireCurrentProfile(["manager"])`. Nếu trả về `null`, dừng trang.
2. Lấy cơ sở được chủ trọ giao bằng `window.rentalRepository.propertyForUser(auth.user, "manager")`.
3. Tải dữ liệu bằng `window.rentalRepository.load(property.id)`.
4. Đưa dữ liệu vừa tải vào các hàm render giao diện.

Dữ liệu đã có gồm phòng, khách thuê, nhân viên, hợp đồng, giá dịch vụ, chỉ số điện nước, hóa đơn, thanh toán, chi phí và sự cố. Xem tên trường chuyển đổi trong `frontend/js/rentalData.js` trước khi dùng.

**Kiểm tra:** đăng nhập tài khoản Manager được mời, vào được trang và thấy dữ liệu thuộc cơ sở được giao. Đăng xuất rồi thử tài khoản Khách thuê: trang Quản lý phải từ chối truy cập.

### Bước 2 — Hoàn thành từng chức năng một

Làm theo thứ tự dưới đây. Mỗi chức năng cần có: xem danh sách, form thêm/sửa, nút lưu, thông báo thành công/lỗi và tải lại vẫn còn dữ liệu.

1. Phòng: thêm/sửa phòng và tình trạng phòng.
2. Khách thuê và hợp đồng: gán khách vào phòng, lưu thông tin hợp đồng.
3. Chỉ số điện nước và hóa đơn: lưu kỳ, phòng, chỉ số/chi phí.
4. Thanh toán: thêm khoản thu qua `window.rentalRepository.addPayment(property.id, payment)`. Không tự sửa số `paid` trên hóa đơn; khoản đã thu được tính từ các giao dịch thanh toán.
5. Sự cố: xem sự cố khách gửi, cập nhật trạng thái.

Đọc cách Admin lưu dữ liệu và dùng repository hiện có. Với dữ liệu thêm/sửa, cập nhật đối tượng `data` rồi gọi:

```js
await window.rentalRepository.save(property.id, auth.user.id, data);
```

Khi xóa, dùng `window.rentalRepository.remove(property.id, "rooms", id)` và thay `rooms` bằng đúng loại dữ liệu. Trước khi xóa phòng/khách, kiểm tra có hợp đồng hoặc hóa đơn liên quan.

**Kiểm tra sau mỗi chức năng:** thêm một dòng thử, thấy báo lưu thành công, tải lại trang và xác nhận dòng đó vẫn còn. Nếu gặp lỗi Supabase, ghi nguyên văn lỗi.

## D. Làm trang Khách thuê

Khách chỉ xem dữ liệu của tài khoản mình và gửi báo sự cố. Không cho khách sửa tiền, hóa đơn, hợp đồng, phòng hoặc trạng thái xử lý sự cố.

### Bước 1 — Chặn tài khoản sai quyền

Trong `frontend/js/KhachThue.js`, gọi `await window.requireCurrentProfile(["tenant"])` khi trang mở. Nếu trả `null`, dừng trang.

### Bước 2 — Tìm đúng hồ sơ đang đăng nhập

Trong bảng `tenants`, tìm hồ sơ có `auth_user_id` bằng `auth.user.id`. Các chính sách RLS trong migration 002 giới hạn hồ sơ khách theo tài khoản đăng nhập. Từ hồ sơ đó lấy `property_id`, `id` và `room_id`; dùng các mã này để tải:

- Hợp đồng của khách (`rental_contracts`, lọc đúng `tenant_id`).
- Hóa đơn của khách (`invoices`, lọc đúng `tenant_id`).
- Lịch sử thanh toán các hóa đơn của khách (`payments`).
- Chỉ số điện nước phòng khách (`utility_readings`, lọc đúng `room_id`).
- Sự cố khách đã gửi (`incidents`, lọc đúng `tenant_id`).

Trường trong database dùng dạng `snake_case`, ví dụ `auth_user_id`, `room_id`, `tenant_id`. Không lấy ID khách/phòng từ ô nhập hay URL. Xem chính sách tương ứng trong file migration 002 nếu cần biết quyền đọc.

**Kiểm tra:** tài khoản khách đã được liên kết với hồ sơ thuê mới xem được dữ liệu của mình. Nếu không tìm thấy hồ sơ, báo Admin kiểm tra đã mời/liên kết đúng email và hồ sơ chưa; không tự tạo hồ sơ giả.

### Bước 3 — Gửi báo sự cố

Tạo form gồm tiêu đề, loại sự cố, mức độ và mô tả. Khi lưu, lấy `property_id`, `tenant_id`, `room_id` từ hồ sơ đã xác thực ở bước 2; lấy `reported_by` từ `auth.user.id`; trạng thái ban đầu phải là `new`. Sau khi gửi thành công, tải lại danh sách sự cố và hiện thông báo.

**Kiểm tra:** gửi một sự cố thử, thấy nó xuất hiện sau khi tải lại. Đăng nhập tài khoản khách khác và xác nhận không thấy sự cố/hóa đơn của tài khoản đầu tiên.

## E. Nếu nghĩ rằng cần thêm SQL/bảng

Phần lớn giao diện dùng được các bảng đã có trong migration 002. Trước tiên tìm tên bảng/cột trong hai file migration và hỏi nhóm xem có ai đang thay đổi database không.

Chỉ khi thật sự thiếu cấu trúc mới làm như sau:

1. Trao đổi trong nhóm, ghi rõ cần thêm bảng/cột nào và vì sao.
2. Tạo **migration mới** trong `supabase/migrations/` với số tiếp theo, ví dụ `202610010003_ten_thay_doi.sql`. Không sửa hai migration cũ đã chạy.
3. Một người trong nhóm xem lại SQL; chỉ một người chạy migration mới **một lần** trên đúng Supabase project chung.
4. Thành viên khác lấy file migration mới từ GitHub và chỉ cập nhật code giao diện; không chạy SQL đó lần nữa.

Nếu chưa biết viết SQL an toàn, gửi yêu cầu và nội dung migration 002 cho ChatGPT để được hướng dẫn, rồi nhờ một thành viên xem lại trước khi chạy. Không tắt RLS để chữa lỗi quyền.

## F. Chạy và bàn giao

1. Chạy trang bằng Live Server, đăng nhập đúng vai trò.
2. Mở DevTools bằng `F12` → **Console**. Sửa lỗi JavaScript màu đỏ; nếu có lỗi Supabase thì lưu nguyên văn.
3. Thử các thao tác thêm, sửa, xem lại sau khi tải lại. Kiểm tra tài khoản sai role bị chặn và tài khoản khách không xem được dữ liệu người khác.
4. Chỉ commit ba file của chức năng mình. Ví dụ:

   ```bash
   git add frontend/QuanLi.html frontend/js/QuanLi.js frontend/css/QuanLi.css
   git commit -m "Hoàn thiện trang quản lý"
   git push
   ```

   Thành viên Khách thuê thay ba đường dẫn bằng các file `KhachThue`.
5. Gửi nhóm: chức năng nào đã xong, cách mở trang, ảnh kết quả và lỗi còn lại (nếu có).

## Prompt để nhờ ChatGPT hướng dẫn

Sao chép prompt này, thay phần trong ngoặc vuông, rồi gửi kèm ảnh/chữ lỗi nếu có:

> Mình đang làm phần [Quản lý/Khách thuê] của dự án trong VS Code. Hãy đọc `supabase/TEAM_GUIDE.md`, hai file SQL `202610010001_initial_rental_backend.sql` và `202610010002_normalized_roles.sql`, cùng ba file giao diện của phần mình. Hướng dẫn mình từng bước nhỏ, nói rõ cần mở/sửa file nào và dán code ở đâu. Giữ nguyên cách làm của trang Admin và dùng backend/bảng đã có. Không bảo mình chạy lại hai migration cũ, không tắt RLS, không đưa secret vào frontend. Sau mỗi bước, nói rõ mình phải thấy kết quả gì để kiểm tra rồi mới sang bước tiếp theo. Nếu thiếu thông tin, hãy hỏi mình xin đúng ảnh hoặc lỗi cần thiết.
