-- Cloudflare D1 Database Schema for Thổ cẩm Bya Hoa
-- Created: 2026-08-18

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category_id INTEGER NOT NULL,
    description TEXT,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Blogs table
CREATE TABLE IF NOT EXISTS blogs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    summary TEXT,
    content TEXT,
    cover_image TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert seed data for categories
INSERT INTO categories (name, slug) VALUES
    ('Khăn choàng Thổ cẩm dệt từ sợi tự nhiên', 'khan-choang-tho-cam'),
    ('Túi xách Thổ cẩm thời trang cao cấp', 'tui-xach-tho-cam');

-- Insert seed data for products
INSERT INTO products (title, slug, category_id, description, image_url) VALUES
(
    'Túi xách thổ cẩm BYA HOA màu xanh phối hồng',
    'tui-xach-tho-cam-mau-xanh-phoi-hong',
    2,
    'Mã sản phẩm: BYAHOA-TC-CHUNG-TUI-XANH-HONG-M01

Chất liệu: Kết hợp tơ tằm mềm mại và sợi tơ cây gai bền chắc dệt tay thủ công bởi nghệ nhân H''Kim Hoa Byă.

Mô tả: Túi thời trang phom đứng thanh lịch với mảng họa tiết dệt thổ cẩm hồng - xanh nổi bật ở mặt trước. Thiết kế hiện đại kết hợp tinh hoa văn hóa Tây Nguyên, phù hợp đi làm, đi chơi hay làm quà tặng đầy ý nghĩa.

Đặc điểm:
• Dệt thủ công 100% từ sợi tự nhiên
• Họa tiết truyền thống M''nông được cách điệu tinh tế
• Bền đẹp theo thời gian
• Mỗi sản phẩm là duy nhất, mang dấu ấn riêng của nghệ nhân',
    '/images/products/tui-xach-xanh-hong.jpg'
),
(
    'Khăn choàng thổ cẩm tơ tằm hoa văn M''nông',
    'khan-choang-tho-cam-to-tam-hoa-van-mnong',
    1,
    'Chất liệu: Tơ tằm tự nhiên Bảo Lộc 100%, mềm mại, mát mùa hè, ấm mùa đông.

Màu sắc: Tone xám tím phối trắng kem nền nã, thanh lịch.

Họa tiết: Hoa văn cách điệu từ sinh hoạt đại ngàn của người M''nông - những hình khối mềm mại, đa sắc độ, thể hiện sự hòa quyện với thiên nhiên.

Đặc điểm:
• Tơ tằm tự nhiên cao cấp, mềm mịn như lụa
• Màu sắc nhẹ nhàng, dễ phối đồ
• Họa tiết tinh tế, không quá rối mắt
• Phù hợp cho mọi lứa tuổi, mọi dịp
• Giữ ấm tốt nhưng vẫn thoáng mát

Kích thước: 180cm x 65cm (± 2cm)',
    '/images/products/khan-choang-mnong.jpg'
),
(
    'Khăn choàng thổ cẩm tơ tằm hoa văn Ê-đê',
    'khan-choang-tho-cam-to-tam-hoa-van-ede',
    1,
    'Chất liệu: Tơ tằm tự nhiên Bảo Lộc kết hợp sợi tơ gai truyền thống.

Màu sắc: Tương phản sắc nét - Xanh viền vàng/trắng hoặc Vàng viền hồng - thể hiện khí chất mạnh mẽ, quyết đoán của người Ê-đê.

Họa tiết: Hình học chạy dọc biên khăn với đường nét sắc sảo, rõ ràng, mang đậm dấu ấn văn hóa Tây Nguyên cổ xưa.

Đặc điểm:
• Màu sắc tương phản nổi bật, sang trọng
• Họa tiết hình học đặc trưng văn hóa Ê-đê
• Phù hợp với phong cách mạnh mẽ, cá tính
• Chất liệu cao cấp, bền màu theo thời gian
• Tạo điểm nhấn ấn tượng cho trang phục

Kích thước: 180cm x 65cm (± 2cm)',
    '/images/products/khan-choang-ede.jpg'
);

-- Insert seed data for blogs
INSERT INTO blogs (title, slug, summary, content, cover_image) VALUES
(
    'Hồi sinh hoa văn cổ - Hành trình của nghệ nhân H''Kim Hoa Byă',
    'hoi-sinh-hoa-van-co-hanh-trinh-cua-nghe-nhan',
    'Câu chuyện về người phụ nữ M''nông dành cả thanh xuân để gìn giữ và phát triển nghệ thuật dệt thổ cẩm truyền thống từ lụa tơ tằm và sợi tự nhiên Tây Nguyên.',
    '<h2>Từ Đại Ngàn đến Thế Giới</h2>
<p>H''Kim Hoa Byă, sinh năm 1975 tại làng Buôn Tua, huyện Krông Năng, tỉnh Đắk Lắk, lớn lên trong tiếng khung cửi đều đặn của mẹ và bà. Từ nhỏ, cô đã say mê theo dõi những ngón tay khéo léo của các bà các mẹ biến những sợi tơ thô thành những tấm vải thổ cẩm rực rỡ sắc màu.</p>

<h2>Tơ Tằm - Hơi Thở Mới cho Thổ Cẩm Truyền Thống</h2>
<p>Khác với thổ cẩm truyền thống thường dệt từ bông, cô Hoa đã mạnh dạn đổi mới bằng việc sử dụng tơ tằm tự nhiên Bảo Lộc - loại tơ mềm mại, bóng mượt nhưng vẫn giữ được độ bền cao. Sự kết hợp giữa tơ tằm với sợi gai, sợi tre, sợi cà phê tạo nên những sản phẩm vừa truyền thống vừa hiện đại.</p>

<h2>Bya Hoa - Tên Gọi Mang Ý Nghĩa</h2>
<p>"Bya" trong tiếng M''nông có nghĩa là "dệt", còn "Hoa" là tên của cô. Thổ cẩm Bya Hoa không chỉ là sản phẩm thủ công, mà là câu chuyện văn hóa, là tâm huyết của một người phụ nữ Tây Nguyên muốn giữ gìn và phát triển di sản tổ tiên.</p>

<h2>Triết Lý Sản Xuất</h2>
<p>Mỗi sản phẩm của Bya Hoa đều được dệt thủ công 100%, không qua máy móc. Điều này đảm bảo mỗi sản phẩm đều mang một dấu ấn riêng, một câu chuyện riêng. Cô Hoa không sản xuất hàng loạt, mà chỉ tạo ra những sản phẩm giới hạn, được chăm chút tỉ mỉ từng chi tiết.</p>',
    '/images/blogs/nghe-nhan-hoa.jpg'
),
(
    'Sự khác biệt giữa thổ cẩm M''nông và Ê-đê',
    'su-khac-biet-giua-tho-cam-mnong-va-ede',
    'Tìm hiểu về hai phong cách thổ cẩm đặc trưng của Tây Nguyên - sự mềm mại đa sắc của M''nông và sự mạnh mẽ tương phản của Ê-đê.',
    '<h2>Thổ Cẩm M''nông - Hơi Thở Của Rừng Xanh</h2>
<p>Thổ cẩm M''nông mang đậm hơi thở của thiên nhiên Tây Nguyên với những họa tiết cách điệu từ cây cỏ, con vật, sinh hoạt đại ngàn. Màu sắc của thổ cẩm M''nông thường là những tone màu đất, màu lá, màu gỗ - nhẹ nhàng, hài hòa, không quá rối mắt.</p>

<h3>Đặc điểm nhận biết:</h3>
<ul>
<li>Họa tiết mềm mại, cong mượt, ít góc cạnh</li>
<li>Màu sắc phối hợp hài hòa, chuyển sắc nhẹ nhàng</li>
<li>Biểu tượng thiên nhiên: lá cây, hoa văn, động vật rừng núi</li>
<li>Phong cách: Dịu dàng, gần gũi, gắn liền với cuộc sống nông nghiệp và rừng núi</li>
</ul>

<h2>Thổ Cẩm Ê-đê - Khí Phách Cao Nguyên</h2>
<p>Ngược lại, thổ cẩm Ê-đê mang phong cách mạnh mẽ, quyết đoán hơn. Họa tiết hình học sắc sảo, màu sắc tương phản rõ rệt (đỏ-đen, vàng-xanh, trắng-đen) thể hiện tính cách cương trực, gan dạ của người Ê-đê.</p>

<h3>Đặc điểm nhận biết:</h3>
<ul>
<li>Họa tiết hình học: chữ nhật, tam giác, đường thẳng, zigzag</li>
<li>Màu sắc tương phản mạnh mẽ, ranh giới rõ ràng</li>
<li>Biểu tượng quyền lực: trống đồng, voi, khí giới</li>
<li>Phong cách: Mạnh mẽ, sang trọng, thể hiện đẳng cấp xã hội</li>
</ul>

<h2>Bya Hoa - Kết Hợp Tinh Hoa Hai Nền Văn Hóa</h2>
<p>Tại Bya Hoa, chúng tôi tôn vinh cả hai phong cách. Khách hàng có thể chọn sản phẩm mang phong cách M''nông nhẹ nhàng cho cuộc sống hàng ngày, hoặc phong cách Ê-đê mạnh mẽ cho những dịp quan trọng, trang trọng hơn.</p>',
    '/images/blogs/su-khac-biet.jpg'
),
(
    'Quy trình dệt thổ cẩm tơ tằm thủ công',
    'quy-trinh-det-tho-cam-to-tam-thu-cong',
    'Khám phá quy trình tỉ mỉ và công phu để tạo ra một sản phẩm thổ cẩm Bya Hoa chất lượng cao.',
    '<h2>Bước 1: Chọn Tơ Tằm Tự Nhiên</h2>
<p>Tơ tằm được chọn lọc kỹ càng từ các làng nghề truyền thống Bảo Lộc. Chỉ chọn tơ tằm có độ mịn, độ bóng và độ bền cao nhất. Tơ phải đồng đều, không đứt gãy, không bị pha tạp chất.</p>

<h2>Bước 2: Nhuộm Màu Tự Nhiên</h2>
<p>Màu sắc thổ cẩm Bya Hoa được nhuộm từ thực vật và khoáng chất tự nhiên:</p>
<ul>
<li>Màu xanh chàm: từ cây chàm rừng</li>
<li>Màu vàng: từ củ nghệ, cây hoè</li>
<li>Màu nâu đỏ: từ vỏ cây dầu, thân cây sù</li>
<li>Màu đen: từ quả dầu, lá gỗ lim</li>
</ul>

<h2>Bước 3: Chuẩn Bị Khung Cửi</h2>
<p>Khung cửi truyền thống được dựng và căng sợi dọc (sợi khổ) cẩn thận. Bước này đòi hỏi sự chính xác cao vì nó quyết định độ đều và độ căng của sản phẩm cuối cùng.</p>

<h2>Bước 4: Dệt Thủ Công</h2>
<p>Đây là bước quan trọng và mất nhiều thời gian nhất. Nghệ nhân ngồi bên khung cửi, từng tay luồn sợi ngang (sợi đưa), đưa thoi qua lại. Họa tiết được tạo ra bằng cách chọn lọc sợi, nâng hạ sợi dọc theo mẫu thiết kế sẵn.</p>

<p>Một tấm khăn choàng thổ cẩm trung bình mất từ 7-10 ngày làm việc. Một chiếc túi xách phức tạp có thể mất đến 2-3 tuần.</p>

<h2>Bước 5: Hoàn Thiện</h2>
<p>Sau khi dệt xong, sản phẩm được cắt khỏi khung cửi, may viền, gấp nếp, và kiểm tra chất lượng tỉ mỉ. Mỗi sợi chỉ thừa đều được cắt tỉa cẩn thận. Sản phẩm sau đó được đóng gói trong túi vải lanh kèm thẻ thông tin nghệ nhân.</p>

<h2>Giá Trị Đích Thực</h2>
<p>Chính vì quy trình thủ công tỉ mỉ như vậy mà mỗi sản phẩm Bya Hoa đều mang giá trị nghệ thuật cao, không thể sản xuất hàng loạt. Đây không chỉ là món đồ thời trang, mà là tác phẩm nghệ thuật đích thực.</p>',
    '/images/blogs/quy-trinh-det.jpg'
);
