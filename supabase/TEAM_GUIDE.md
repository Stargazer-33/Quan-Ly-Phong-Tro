# Hướng dẫn làm việc với Supabase cho nhóm

## Nói ngắn gọn

- Supabase là nơi cả nhóm lưu dữ liệu dùng chung.
- Các bảng dữ liệu đã được tạo. Thành viên làm giao diện Quản lý hoặc Khách thuê không cần vào SQL Editor và không cần chạy SQL.
- Thành viên vẫn cần sửa JavaScript để trang lấy dữ liệu thật từ Supabase thay vì dùng dữ liệu mẫu.
- Chỉ tạo migration SQL mới nếu cả nhóm xác nhận đang thiếu bảng hoặc cột. Một người được nhóm phân công sẽ kiểm tra và chạy migration đó.

## 1. Chuẩn bị trên máy

1. Mở thư mục dự án trong VS Code và lấy code mới nhất bằng Git Pull.
2. Mở trang đăng nhập bằng Live Server: frontend/index.html.
3. Đăng nhập bằng tài khoản đúng vai trò. Tài khoản được chủ trọ mời qua email; mở email, bấm link và tự đặt mật khẩu. Không có mật khẩu mặc định.
4. Trước khi sửa, mở thử trang của phần mình để xem giao diện hiện tại.

Nếu đăng nhập báo sai thông tin, kiểm tra email được mời và mật khẩu đã đặt. Chủ trọ có thể gửi lại email mời/đặt lại mật khẩu từ trang Admin.

## 2. Những file của mỗi phần

| Phần | Trang HTML | JavaScript | CSS |
|---|---|---|---|
| Quản lý | frontend/QuanLi.html | frontend/js/QuanLi.js | frontend/css/QuanLi.css |
| Khách thuê | frontend/KhachThue.html | frontend/js/KhachThue.js | frontend/css/KhachThue.css |

Giao diện đã có sẵn. Không cần làm lại từ đầu. Mục tiêu là nối các trang và nút hiện có với dữ liệu Supabase.

Đừng sửa trang Admin, file cấu hình Supabase hoặc file dùng chung nếu chưa trao đổi với nhóm. Không đưa mật khẩu, service_role key hay secret vào code.

## 3. Nối trang với Supabase

Trong cả QuanLi.html và KhachThue.html, ở cuối trang, các script phải được nạp theo thứ tự này. Thay script cuối bằng file JavaScript của trang tương ứng:

    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script src="js/supabaseClient.js"></script>
    <script src="js/rentalData.js"></script>
    <script src="js/auth.js"></script>
    <script src="js/QuanLi.js"></script>

Ở trang Khách thuê, dòng cuối dùng js/KhachThue.js thay cho js/QuanLi.js.

Nếu thiếu các script kết nối, trang không gọi được Supabase. Không tạo thêm Supabase client mới.

## 4. Phần Quản lý cần làm gì?

Trong frontend/js/QuanLi.js:

1. Khi trang mở, kiểm tra tài khoản có đúng vai trò Quản lý không:

       const auth = await window.requireCurrentProfile(["manager"]);
       if (!auth) return;

2. Lấy cơ sở mà chủ trọ đã giao cho tài khoản đó, rồi tải dữ liệu:

       const property = await window.rentalRepository.propertyForUser(auth.user, "manager");
       const data = await window.rentalRepository.load(property.id);

3. Dùng dữ liệu vừa tải để hiện danh sách phòng, khách thuê, hợp đồng, hóa đơn và các mục khác. Trong file hiện có một số mảng dữ liệu mẫu và nút chỉ hiện thông báo; cần thay chúng bằng dữ liệu thật.

4. Khi lưu thay đổi, cập nhật data rồi gọi:

       await window.rentalRepository.save(property.id, auth.user.id, data);

5. Với thao tác xóa, dùng hàm remove của rentalRepository. Với khoản thu, dùng addPayment; không tự sửa số tiền đã thanh toán trên hóa đơn.

Làm từng chức năng một: phòng; khách thuê và hợp đồng; điện nước và hóa đơn; thanh toán; sự cố. Mỗi nút cần thực hiện việc thật, báo lỗi nếu lưu thất bại và hiện lại dữ liệu sau khi tải trang.

## 5. Phần Khách thuê cần làm gì?

Khách thuê chỉ được xem dữ liệu của mình và gửi báo sự cố. Không cho khách sửa phòng, hợp đồng, hóa đơn, tiền hoặc trạng thái xử lý sự cố.

Trong frontend/js/KhachThue.js:

1. Kiểm tra đúng vai trò:

       const auth = await window.requireCurrentProfile(["tenant"]);
       if (!auth) return;

2. Tìm hồ sơ khách đã được Admin liên kết với tài khoản đăng nhập:

       const { data: tenant, error } = await window.supabaseClient
         .from("tenants")
         .select("id, property_id, room_id")
         .eq("auth_user_id", auth.user.id)
         .single();

3. Nếu có lỗi hoặc không tìm thấy hồ sơ, dừng tải trang và báo chủ trọ kiểm tra việc liên kết tài khoản. Không tự tạo hồ sơ giả và không lấy ID từ ô nhập hay URL.

4. Dùng property_id của hồ sơ để tải dữ liệu. Quyền RLS của Supabase giới hạn dữ liệu khách được xem. Trang cần hiện hợp đồng, hóa đơn, thanh toán, chỉ số điện nước và sự cố của khách đó.

5. Khi khách gửi sự cố, lấy property_id, id khách và room_id từ hồ sơ tenant đã tìm ở trên. Lấy reported_by từ auth.user.id và đặt trạng thái ban đầu là new.

Tên các cột trong database thường dùng dấu gạch dưới, ví dụ auth_user_id, property_id, room_id. Khi gọi Supabase trực tiếp, viết đúng tên cột như vậy.

## 6. Cách biết chức năng đã xong

Với mỗi chức năng:

1. Đăng nhập đúng tài khoản và mở đúng trang.
2. Thử thêm hoặc cập nhật một dữ liệu phù hợp.
3. Tải lại trang. Dữ liệu vẫn còn thì thao tác đã được lưu.
4. Kiểm tra khách thuê không thấy dữ liệu của khách khác.
5. Nếu có lỗi, mở DevTools bằng F12, vào Console và gửi nguyên văn lỗi cho nhóm.

Đăng nhập thành công chỉ có nghĩa là tài khoản vào được trang; chưa có nghĩa là các nút đã lưu dữ liệu Supabase.

## 7. SQL và migration

Migration là file SQL dùng để tạo hoặc thay đổi cấu trúc bảng. Các migration cũ trong supabase/migrations chỉ để tham khảo; không chạy lại chúng.

Migration 003 bổ sung chỗ lưu điều khoản hợp đồng chi tiết và đã được chạy trên Supabase chung. Thành viên khác không chạy lại.

Nếu nghĩ đang thiếu bảng hoặc cột:

1. Báo nhóm và nói rõ chức năng cần lưu thêm thông tin gì.
2. Chờ nhóm thống nhất rồi mới tạo migration mới.
3. Chỉ người được phân công chạy migration đó một lần trên đúng project Supabase chung.

Không tắt RLS để chữa lỗi quyền.

## 8. Bàn giao code

Mỗi người báo nhóm chức năng nào đã làm, cách thử và lỗi còn gặp. Chỉ commit file thuộc phần mình; trước khi push, kiểm tra danh sách file đã chọn để tránh đưa nhầm thay đổi của người khác.
