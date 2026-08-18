# Hướng dẫn Tùy chỉnh Nội dung

## 1. Thay đổi Thông tin Liên hệ

### Số điện thoại và Zalo

**File: `src/components/ContactButtons.jsx`**
```javascript
const zaloLink = 'https://zalo.me/0123456789'; // Thay số điện thoại
const phoneNumber = '0123456789'; // Thay số điện thoại
```

**File: `src/pages/ContactPage.jsx`**
Tìm và thay đổi:
- Số hotline
- Email
- Địa chỉ (nếu cần)

**File: `src/pages/ProductDetailPage.jsx`**
Tìm và thay đổi link Zalo và số điện thoại trong phần contact buttons.

### Logo và Tên thương hiệu

**File: `src/components/Header.jsx`**
```jsx
<h1 className="text-2xl sm:text-3xl font-serif font-bold text-rustic-brown">
  Bya Hoa
</h1>
```

**File: `index.html`**
Thay đổi `<title>` và các meta tags.

## 2. Thay đổi Màu sắc

**File: `tailwind.config.js`**
```javascript
colors: {
  'rustic-dark': '#2B1810',     // Màu nâu đậm
  'rustic-brown': '#4A3728',    // Màu nâu chính
  'rustic-wood': '#8B6F47',     // Màu gỗ
  'rustic-cream': '#E8DCC4',    // Màu kem
  'rustic-beige': '#D4C5A9',    // Màu be
  'indigo-deep': '#1A1A2E',     // Màu chàm đậm
  'earth-red': '#A0522D',       // Màu đất đỏ
}
```

Sau khi thay đổi, chạy lại:
```bash
npm run build
```

## 3. Thay đổi Font chữ

**File: `src/styles/index.css`**
```css
@import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap');
```

Thay thế font chữ từ Google Fonts:
1. Vào https://fonts.google.com
2. Chọn font phù hợp
3. Copy link import
4. Cập nhật trong CSS

**File: `tailwind.config.js`**
```javascript
fontFamily: {
  'serif': ['Crimson Text', 'Georgia', 'serif'],      // Font tiêu đề
  'sans': ['Inter', 'system-ui', 'sans-serif'],       // Font chữ thường
}
```

## 4. Thêm/Sửa Sản phẩm qua Admin Panel

### Đăng nhập Admin
1. Truy cập: `https://thocambyahoa.com/admin`
2. Đăng nhập với username/password đã cấu hình

### Thêm sản phẩm mới
1. Tab "Quản lý sản phẩm"
2. Điền form:
   - **Tên sản phẩm**: Tự động tạo slug
   - **Danh mục**: Chọn từ dropdown
   - **Mô tả**: Mô tả chi tiết, mỗi đoạn cách nhau bằng Enter
   - **Hình ảnh**: Upload ảnh (tối đa 5MB, JPEG/PNG/WebP)
3. Click "Thêm mới"

### Sửa sản phẩm
1. Click "Sửa" ở sản phẩm cần chỉnh sửa
2. Form sẽ được điền sẵn
3. Chỉnh sửa nội dung
4. Click "Cập nhật"

### Xóa sản phẩm
1. Click "Xóa" ở sản phẩm cần xóa
2. Xác nhận xóa

## 5. Thêm/Sửa Bài viết Blog

### Thêm bài viết mới
1. Tab "Quản lý bài viết"
2. Điền form:
   - **Tiêu đề**: Tự động tạo slug
   - **Tóm tắt**: Tóm tắt ngắn gọn (1-2 câu)
   - **Nội dung**: Sử dụng Rich Text Editor
   - **Ảnh bìa**: Upload ảnh cover
3. Click "Thêm mới"

### Sử dụng Rich Text Editor
- **Bold**: Chọn text > Click nút B
- **Italic**: Chọn text > Click nút I
- **Heading**: Chọn H2 hoặc H3 từ dropdown
- **List**: Click nút bullet list hoặc numbered list
- **Link**: Chọn text > Click nút link > Nhập URL

### Format bài viết đẹp
```html
<h2>Tiêu đề chính</h2>
<p>Đoạn văn giới thiệu...</p>

<h3>Tiêu đề phụ</h3>
<p>Nội dung chi tiết...</p>

<ul>
<li>Điểm nổi bật 1</li>
<li>Điểm nổi bật 2</li>
</ul>
```

## 6. Thay đổi Nội dung Trang chủ

**File: `src/pages/HomePage.jsx`**

### Hero Section
Tìm dòng:
```jsx
<h1 className="...">
  Hồi Sinh Hoa Văn Cổ<br />
  Dệt Từ Lụa Tơ Tằm và Sợi Tự Nhiên Tây Nguyên
</h1>
<p className="...">
  Nghệ nhân H'Kim Hoa Byă dân tộc M'nông...
</p>
```

### Phần "Nét Đẹp Khác Biệt"
Tìm section "Uniqueness Section" và thay đổi nội dung.

## 7. Thay đổi Thông tin Footer

**File: `src/components/Footer.jsx`**

Cập nhật:
- Địa chỉ
- Hotline
- Email
- Mã số thuế
- Tên công ty
- Đại diện pháp luật

## 8. Thêm/Bớt Menu

**File: `src/components/Header.jsx`**
```javascript
const navLinks = [
  { path: '/', label: 'Trang chủ' },
  { path: '/san-pham', label: 'Sản phẩm' },
  { path: '/cau-chuyen', label: 'Câu chuyện' },
  { path: '/lien-he', label: 'Liên hệ' },
  // Thêm menu mới ở đây
];
```

## 9. Thay đổi Hình ảnh

### Hình ảnh mặc định
Đặt hình ảnh vào thư mục `public/images/`:
- `og-default.jpg`: Ảnh OpenGraph mặc định (1200x630px)
- `placeholder-product.jpg`: Ảnh placeholder cho sản phẩm
- `placeholder-blog.jpg`: Ảnh placeholder cho blog

### Hình ảnh sản phẩm/blog
Upload qua Admin Panel hoặc đặt trực tiếp trong R2 bucket.

## 10. SEO - Thay đổi Meta Tags mặc định

**File: `src/utils/seo.js`**
```javascript
export const defaultSEO = {
  siteName: 'Thổ cẩm Bya Hoa',
  defaultTitle: 'Thổ cẩm Bya Hoa - Nghệ thuật dệt thổ cẩm Tây Nguyên',
  defaultDescription: 'Mô tả mặc định...',
  siteUrl: 'https://thocambyahoa.com',
  defaultImage: '/images/og-default.jpg'
};
```

## 11. Thay đổi Giờ làm việc

**File: `src/pages/ContactPage.jsx`**
Tìm section "Working Hours" và cập nhật.

## 12. Thêm Social Media Links

**File: `src/components/Footer.jsx`**
Thêm section mới:
```jsx
<div>
  <h4 className="text-lg font-semibold mb-4">Theo dõi chúng tôi</h4>
  <div className="flex gap-3">
    <a href="https://facebook.com/byahoa">Facebook</a>
    <a href="https://instagram.com/byahoa">Instagram</a>
  </div>
</div>
```

## 13. Backup và Restore

### Backup Database
```bash
wrangler d1 export byahoa_db --output=backup-$(date +%Y%m%d).sql
```

### Restore Database
```bash
wrangler d1 execute byahoa_db --file=backup-20240818.sql
```

### Backup Images từ R2
```bash
wrangler r2 object list byahoa-media > r2-files.txt
# Download từng file hoặc sử dụng S3-compatible tools
```

## 14. Testing sau khi thay đổi

Sau mỗi thay đổi:
1. Build local: `npm run build`
2. Test local: `npm run preview`
3. Kiểm tra responsive trên mobile
4. Deploy: `npm run deploy`
5. Test production
6. Clear cache trình duyệt (Ctrl+Shift+R)

## 15. Liên hệ hỗ trợ

Nếu cần hỗ trợ kỹ thuật, tham khảo:
- Cloudflare Docs: https://developers.cloudflare.com
- React Docs: https://react.dev
- Tailwind CSS Docs: https://tailwindcss.com
