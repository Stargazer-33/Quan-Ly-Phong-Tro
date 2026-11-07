# Supabase: triển khai phần Chủ trọ/Admin

Project đã chạy migration đầu tiên và đang có bảng `rental_data`. Migration thứ hai tạo các bảng nghiệp vụ riêng và chuyển dữ liệu JSON cũ sang đó; nó giữ lại `rental_data` làm bản lưu cũ.

## 1. Chạy migration dữ liệu chuẩn hóa

Mở Supabase Dashboard → **SQL Editor**. Dán và chạy file:
`supabase/migrations/202610010002_normalized_roles.sql`.

Migration tạo các bảng phòng, khách thuê, nhân viên, hợp đồng, bảng giá, chỉ số điện nước, hóa đơn, thanh toán, chi phí và sự cố. Nó cũng cấu hình RLS: owner/manager theo thành viên cơ sở, tenant chỉ đọc hồ sơ/hóa đơn/thanh toán của chính họ và có thể gửi sự cố.

Sau đó đăng nhập lại trang Admin và kiểm tra **Quản lý phòng**, **Khách thuê**, **Hóa đơn**. Admin đọc/ghi các bảng nghiệp vụ; dữ liệu cũ được lấy từ `rental_data` trong lúc chạy migration.

## 1.1. Bổ sung điều khoản chi tiết cho hợp đồng

Trang Admin lưu thông tin hai bên và các điều khoản thuê mở rộng trong cột JSONB `terms`. Nếu migration 002 đã chạy trên project chung, chạy **một lần** migration mới `supabase/migrations/202610010003_contract_terms.sql` trong SQL Editor. Không chạy lại migration 002. Thành viên khác chỉ cần pull code mới; không chạy migration 003 lần nữa.

## 2. Bật chức năng mời tài khoản từ Admin

Tạo cấu hình CLI (nếu thư mục `supabase/config.toml` chưa có), rồi liên kết project và deploy Edge Function:

```powershell
npx supabase init
npx supabase login
npx supabase link --project-ref snemelhgumvblexkzgrw
npx supabase functions deploy provision-member
```

Khi thay đổi file Edge Function, chạy lại `npx supabase functions deploy provision-member` để cập nhật bản trên Supabase. Bản hiện tại sẽ xử lý email đã tồn tại bằng cách liên kết hồ sơ và gửi email thiết lập mật khẩu, bao gồm cả trường hợp user được tạo đồng thời với lời mời. Người nhận mở link trong email rồi tự tạo mật khẩu ở trang đăng nhập để kích hoạt tài khoản. Trong Admin, các hồ sơ đã có tài khoản sẽ có nút **Gửi lại email**.

> **Quan trọng — email thật cần Custom SMTP.** Supabase chỉ dùng dịch vụ email mặc định để test: chỉ gửi được tới email thuộc team của project, giới hạn khoảng 2 email/giờ và không có cam kết gửi tới. Vì vậy hồ sơ vẫn lưu được nhưng khách thuê/quản lý sẽ không nhận được thư. Vào **Authentication → Emails/SMTP Settings**, bật **Custom SMTP** (Gmail App Password, Resend, SendGrid, Brevo…) rồi gửi thử lại. Nếu chưa cấu hình SMTP, lỗi thường nằm ở bước `inviteUserByEmail`/`resetPasswordForEmail` trong Edge Function.
>
> Edge Function hiện xử lý được cả trường hợp hồ sơ đã lưu nhưng lần mời trước bị lỗi giữa chừng: nếu email đã có tài khoản Auth, hàm sẽ liên kết lại hồ sơ và gửi email thiết lập mật khẩu thay vì báo "email đã được đăng ký". Người nhận luôn tự đặt mật khẩu qua link trong email; chủ trọ không tạo hoặc gửi mật khẩu thay họ. Nếu vẫn thấy lỗi `A user with this email address has already been registered`, hãy deploy lại function theo lệnh trên rồi bấm **Gửi email mời** hoặc **Gửi lại email**. Khi lỗi SMTP, Admin tải lại trạng thái hồ sơ để có thể thử gửi lại sau khi sửa cấu hình.

Supabase Edge Function cần biến môi trường server-side `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`. Runtime của Supabase thường cung cấp các biến project này sẵn. Nếu dashboard báo thiếu biến, cấu hình trong **Edge Functions → Secrets**; không đưa service-role key vào frontend/Git và không gửi key đó trong chat.

Mở **Authentication → URL Configuration** trong Supabase Dashboard và thêm hai Redirect URLs sau (Live Server mặc định dùng cổng 5500):

```text
http://127.0.0.1:5500/frontend/index.html?account_setup=1
http://localhost:5500/frontend/index.html?account_setup=1
```

Máy gửi lời mời và máy nhận cần mở trang qua Live Server với cùng cổng 5500, dùng `localhost` hoặc `127.0.0.1` (không mở bằng địa chỉ IP LAN). Link email sẽ quay về `index.html` trên máy của người bấm; địa chỉ loopback trong trình duyệt của họ trỏ về chính máy họ. Người nhận bấm **Accept invitation**, đặt mật khẩu ở trang mở ra, rồi được chuyển tự động tới trang quản lý theo vai trò. Nếu cổng 5500 đang bận, đóng server khác hoặc đổi cổng ở Live Server trên cả hai máy cho giống nhau và thêm URL tương ứng vào Redirect URLs.

Trong **Authentication → Email Templates**, giữ link xác nhận dùng `{{ .ConfirmationURL }}` cho cả **Invite user** và **Reset password**; tránh thay bằng một URL `localhost` cố định hoặc chỉ dùng `{{ .SiteURL }}`. Bật **Custom SMTP** nếu cần gửi thư tới email ngoài team Supabase. Các máy khác chỉ cần pull cùng code, mở `frontend/index.html` bằng Live Server và dùng chung project Supabase.

Trong Admin:
- Thêm nhân viên và nhập email để gửi lời mời role `manager`, gán vào cơ sở của chủ trọ.
- Thêm khách thuê và nhập email để mời role `tenant`; tài khoản được nối với hồ sơ khách thuê.
- Khóa nhân viên sẽ gỡ membership cơ sở để RLS chặn truy cập; mở lại sẽ khôi phục membership.

## 3. Tài khoản chủ trọ đầu tiên

Tài khoản hiện tại vẫn là owner. Nếu tạo owner khác, tạo user tại **Authentication → Users**, rồi chạy câu SQL dùng UID của tài khoản:

```sql
update public.profiles set role = 'owner' where id = 'USER-UUID';
```

Không cho form đăng ký công khai tự chọn role.

## Các file chính

- `frontend/js/rentalData.js`: truy vấn, map và ghi các bảng nghiệp vụ.
- `frontend/js/Admin.js`: dashboard, CRUD, mời/quản lý tài khoản.
- `supabase/functions/provision-member/index.ts`: lời mời Auth và gán role bằng service-role key phía server.
- `supabase/migrations/202610010002_normalized_roles.sql`: bảng, RLS và chuyển dữ liệu JSON cũ.

Trang hiện mở bằng VS Code Live Server. Sau khi thay đổi RLS hoặc cấu trúc, thử bằng một tài khoản owner, manager, tenant riêng và xác nhận dữ liệu tenant khác không bị trả về.
