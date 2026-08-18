# Thổ cẩm Bya Hoa - Website giới thiệu sản phẩm

Website giới thiệu thương hiệu Thổ cẩm Bya Hoa - sản phẩm thổ cẩm tơ tằm cao cấp dệt thủ công bởi nghệ nhân H'Kim Hoa Byă.

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Cloudflare Pages Functions
- **Database**: Cloudflare D1 (SQLite)
- **Storage**: Cloudflare R2
- **Authentication**: JWT với HTTP-only Cookie

## Cài đặt Local

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Tạo D1 Database

```bash
# Tạo database mới
npx wrangler d1 create byahoa_db

# Lấy database_id và cập nhật vào wrangler.toml
# Chạy migration
npx wrangler d1 execute byahoa_db --file=./schema.sql
```

### 3. Tạo R2 Bucket

```bash
# Tạo R2 bucket cho media
npx wrangler r2 bucket create byahoa-media
```

### 4. Cấu hình Environment Variables

Cập nhật file `wrangler.toml` với thông tin database và bucket:

```toml
[[env.production.d1_databases]]
binding = "DB"
database_name = "byahoa_db"
database_id = "YOUR_DATABASE_ID_HERE"

[[env.production.r2_buckets]]
binding = "MEDIA_BUCKET"
bucket_name = "byahoa-media"
```

### 5. Tạo mật khẩu Admin

```bash
# Tạo hash SHA-256 cho mật khẩu (ví dụ: "admin123")
echo -n "admin123" | openssl dgst -sha256
```

Cập nhật `ADMIN_PASSWORD_HASH` trong `wrangler.toml` với hash vừa tạo.

### 6. Chạy Development Server

```bash
# Terminal 1: Frontend dev server
npm run dev

# Terminal 2: Cloudflare Pages Functions (nếu cần test API local)
npx wrangler pages dev dist --d1=DB=byahoa_db --r2=MEDIA_BUCKET=byahoa-media
```

## Deploy lên Cloudflare Pages

### 1. Build project

```bash
npm run build
```

### 2. Deploy lên Cloudflare Pages

```bash
# Lần đầu tiên
npx wrangler pages deploy dist --project-name=thocambyahoa

# Các lần sau
npm run deploy
```

### 3. Cấu hình Domain và Environment Variables

1. Vào Cloudflare Dashboard > Pages > thocambyahoa
2. Settings > Environment Variables > Production
3. Thêm các biến môi trường:
   - `JWT_SECRET`: secret key cho JWT
   - `ADMIN_USERNAME`: email admin
   - `ADMIN_PASSWORD_HASH`: hash SHA-256 của mật khẩu
   - `R2_PUBLIC_URL`: URL công khai của R2 bucket

4. Bindings:
   - D1 Database: `DB` → `byahoa_db`
   - R2 Bucket: `MEDIA_BUCKET` → `byahoa-media`

### 4. Cấu hình R2 Public Access

```bash
# Cấu hình CORS cho R2 bucket
npx wrangler r2 bucket cors put byahoa-media --cors-config cors.json
```

File `cors.json`:
```json
[
  {
    "AllowedOrigins": ["https://thocambyahoa.com"],
    "AllowedMethods": ["GET", "PUT", "POST"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3600
  }
]
```

## Cấu trúc Dự án

```
thocambyahoa/
├── functions/
│   └── api/
│       ├── auth.js          # API đăng nhập/logout
│       ├── products.js      # API sản phẩm
│       ├── blogs.js         # API bài viết
│       ├── categories.js    # API danh mục
│       ├── upload.js        # API upload ảnh
│       └── jwt-helper.js    # JWT utilities
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ContactButtons.jsx
│   │   ├── ProductCard.jsx
│   │   └── BlogCard.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── ProductsPage.jsx
│   │   ├── ProductDetailPage.jsx
│   │   ├── BlogsPage.jsx
│   │   ├── BlogDetailPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── AdminLoginPage.jsx
│   │   └── AdminDashboardPage.jsx
│   ├── utils/
│   │   ├── api.js           # API client
│   │   └── seo.js           # SEO helpers
│   ├── styles/
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── public/
│   └── images/
├── schema.sql               # Database schema & seed data
├── wrangler.toml           # Cloudflare config
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Tính năng

### Frontend (Public)
- ✅ Trang chủ với Hero banner và giới thiệu
- ✅ Danh sách sản phẩm với filter theo danh mục
- ✅ Chi tiết sản phẩm (KHÔNG hiển thị giá)
- ✅ Danh sách bài viết blog
- ✅ Chi tiết bài viết với rich content
- ✅ Trang liên hệ
- ✅ Nút liên hệ Zalo/Hotline cố định (Mobile)
- ✅ Responsive Mobile-First design
- ✅ SEO tối ưu (meta tags, og:image, friendly URLs)

### Backend (Admin)
- ✅ Đăng nhập admin với JWT
- ✅ Quản lý sản phẩm (CRUD)
- ✅ Quản lý bài viết với Rich Text Editor
- ✅ Upload ảnh lên R2
- ✅ Auto-generate slug từ tiêu đề

## Thông tin liên hệ

- **Địa chỉ**: 2A/10 Bùi Thị Xuân, Phường Buôn Ma Thuột, Tỉnh Đắk Lắk
- **Hotline**: 0123 456 789 (cập nhật số thật)
- **Email**: contact@thocambyahoa.com
- **Zalo**: https://zalo.me/0123456789 (cập nhật số thật)

## License

© 2024 Công ty TNHH Bya Hoa. Bảo lưu mọi quyền.
