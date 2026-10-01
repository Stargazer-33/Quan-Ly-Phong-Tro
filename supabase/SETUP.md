# Supabase: triển khai phần Chủ trọ/Admin

Project đã chạy migration đầu tiên và đang có bảng `rental_data`. Migration thứ hai tạo các bảng nghiệp vụ riêng và chuyển dữ liệu JSON cũ sang đó; nó giữ lại `rental_data` làm bản lưu cũ.

## 1. Chạy migration dữ liệu chuẩn hóa

Mở Supabase Dashboard → **SQL Editor**. Dán và chạy file:
`supabase/migrations/202610010002_normalized_roles.sql`.

Migration tạo các bảng phòng, khách thuê, nhân viên, hợp đồng, bảng giá, chỉ số điện nước, hóa đơn, thanh toán, chi phí và sự cố. Nó cũng cấu hình RLS: owner/manager theo thành viên cơ sở, tenant chỉ đọc hồ sơ/hóa đơn/thanh toán của chính họ và có thể gửi sự cố.

Sau đó đăng nhập lại trang Admin và kiểm tra **Quản lý phòng**, **Khách thuê**, **Hóa đơn**. Admin đọc/ghi các bảng nghiệp vụ; dữ liệu cũ được lấy từ `rental_data` trong lúc chạy migration.

## 2. Bật chức năng mời tài khoản từ Admin

Tạo cấu hình CLI (nếu thư mục `supabase/config.toml` chưa có), rồi liên kết project và deploy Edge Function:

```powershell
npx supabase init
npx supabase login
npx supabase link --project-ref snemelhgumvblexkzgrw
npx supabase functions deploy provision-member
```

Khi thay đổi file Edge Function, chạy lại lệnh deploy này để cập nhật bản trên Supabase. Trong Admin, các hồ sơ đã có tài khoản sẽ có nút **Gửi lại email**. Người nhận mở link mời ở trang đăng nhập và đặt mật khẩu để kích hoạt tài khoản.

Supabase Edge Function cần biến môi trường server-side `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`. Runtime của Supabase thường cung cấp các biến project này sẵn. Nếu dashboard báo thiếu biến, cấu hình trong **Edge Functions → Secrets**; không đưa service-role key vào frontend/Git và không gửi key đó trong chat.

Trong **Authentication → URL Configuration**, thêm địa chỉ Live Server đang mở vào **Redirect URLs**. Ví dụ nếu trang Admin chạy ở `http://127.0.0.1:5500/frontend/Admin.html`, thêm `http://127.0.0.1:5500/**`; thay cổng và host theo đúng địa chỉ trên trình duyệt. Mã mời sẽ chuyển người nhận về `index.html` cùng host/cổng của trang Admin. Trên điện thoại cùng Wi-Fi, dùng IP máy tính thay cho `localhost` và thêm IP đó vào Redirect URLs. Địa chỉ localhost/IP nội bộ chỉ dùng được trên máy tính hoặc mạng nội bộ; người nhận ở ngoài mạng cần một website đã deploy công khai. Email nhân viên/khách thuê cần là email họ có thể mở để nhận lời mời và đặt mật khẩu.

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
