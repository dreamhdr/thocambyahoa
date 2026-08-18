# Hướng dẫn Deploy lên Cloudflare Pages

## Bước 1: Chuẩn bị tài khoản Cloudflare

1. Đăng ký/Đăng nhập tài khoản Cloudflare: https://dash.cloudflare.com
2. Cài đặt Wrangler CLI:
```bash
npm install -g wrangler
wrangler login
```

## Bước 2: Tạo D1 Database

```bash
# Tạo production database
wrangler d1 create byahoa_db

# Output sẽ hiển thị database_id, copy và lưu lại
# Ví dụ: database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"

# Cập nhật database_id vào wrangler.toml tại dòng:
# database_id = "YOUR_DATABASE_ID_HERE"

# Chạy migration để tạo bảng và seed data
wrangler d1 execute byahoa_db --file=./schema.sql
```

Kiểm tra database đã được tạo:
```bash
wrangler d1 execute byahoa_db --command="SELECT * FROM products"
```

## Bước 3: Tạo R2 Bucket

```bash
# Tạo R2 bucket
wrangler r2 bucket create byahoa-media

# Cấu hình CORS
wrangler r2 bucket cors put byahoa-media --cors-config cors.json

# Kiểm tra CORS
wrangler r2 bucket cors get byahoa-media
```

## Bước 4: Tạo mật khẩu Admin

```bash
# Tạo SHA-256 hash cho mật khẩu
# Ví dụ với mật khẩu "MatKhauManhCuaBan123"
echo -n "MatKhauManhCuaBan123" | openssl dgst -sha256

# Output sẽ là: (stdin)= abc123def456...
# Copy hash này (phần sau dấu =)
```

Cập nhật hash vào `wrangler.toml`:
```toml
[env.production.vars]
ADMIN_PASSWORD_HASH = "abc123def456..."
```

## Bước 5: Cấu hình Domain cho R2

### Option 1: Sử dụng R2.dev subdomain (Miễn phí, public)
```bash
# Enable public access
wrangler r2 bucket domain add byahoa-media --domain auto
# Output: https://pub-xxxxx.r2.dev
```

### Option 2: Sử dụng Custom Domain (Khuyến nghị)
1. Vào Cloudflare Dashboard > R2 > byahoa-media
2. Settings > Public Access > Custom Domains
3. Add domain: `media.thocambyahoa.com`
4. Cloudflare sẽ tự động tạo DNS record

Cập nhật `R2_PUBLIC_URL` trong `wrangler.toml`:
```toml
R2_PUBLIC_URL = "https://media.thocambyahoa.com"
```

## Bước 6: Build và Deploy

```bash
# Build frontend
npm run build

# Deploy lên Cloudflare Pages
wrangler pages deploy dist --project-name=thocambyahoa

# Lần đầu tiên sẽ hỏi:
# - Project name: thocambyahoa
# - Production branch: main
```

## Bước 7: Cấu hình Bindings trên Dashboard

1. Vào Cloudflare Dashboard
2. Pages > thocambyahoa > Settings > Functions

### D1 Database Binding:
- Variable name: `DB`
- D1 database: `byahoa_db`

### R2 Bucket Binding:
- Variable name: `MEDIA_BUCKET`
- R2 bucket: `byahoa-media`

### Environment Variables:
- `JWT_SECRET`: random string dài (ví dụ: `openssl rand -base64 32`)
- `ADMIN_USERNAME`: `admin@byahoa.com`
- `ADMIN_PASSWORD_HASH`: hash đã tạo ở bước 4
- `R2_PUBLIC_URL`: URL R2 đã cấu hình ở bước 5

## Bước 8: Cấu hình Custom Domain (Optional)

1. Pages > thocambyahoa > Custom domains
2. Add domain: `thocambyahoa.com`
3. Cloudflare sẽ tự động:
   - Tạo DNS records
   - Cấp SSL certificate
   - Enable CDN

## Bước 9: Test Website

1. Truy cập domain của bạn: `https://thocambyahoa.pages.dev` hoặc `https://thocambyahoa.com`
2. Test các trang:
   - Trang chủ: `/`
   - Sản phẩm: `/san-pham`
   - Blog: `/cau-chuyen`
   - Admin login: `/admin`

3. Test Admin Panel:
   - Login với username/password đã cấu hình
   - Thử thêm/sửa/xóa sản phẩm
   - Thử upload ảnh
   - Thử thêm/sửa bài viết

## Bước 10: Cập nhật thông tin liên hệ

Cập nhật các file sau với thông tin thật:

### 1. ContactButtons.jsx
```javascript
const zaloLink = 'https://zalo.me/YOUR_PHONE_NUMBER';
const phoneNumber = 'YOUR_PHONE_NUMBER';
```

### 2. ContactPage.jsx
Cập nhật số điện thoại và email thật

### 3. Footer.jsx
Kiểm tra lại thông tin pháp lý

## Troubleshooting

### Lỗi "Database not found"
```bash
# Kiểm tra binding
wrangler pages deployment tail

# Kiểm tra database
wrangler d1 info byahoa_db
```

### Lỗi "R2 bucket not found"
```bash
# List tất cả buckets
wrangler r2 bucket list

# Kiểm tra bucket
wrangler r2 bucket info byahoa-media
```

### Lỗi upload ảnh
- Kiểm tra CORS config
- Kiểm tra R2 binding trong Dashboard
- Kiểm tra R2_PUBLIC_URL đã đúng chưa

### Lỗi "Unauthorized" khi login admin
- Kiểm tra ADMIN_PASSWORD_HASH đúng chưa
- Test hash:
```bash
echo -n "YOUR_PASSWORD" | openssl dgst -sha256
```

## Update Code sau này

```bash
# Pull code mới
git pull

# Build
npm run build

# Deploy
wrangler pages deploy dist --project-name=thocambyahoa
```

## Monitoring & Analytics

1. Cloudflare Dashboard > Analytics > Web Analytics
2. Pages > thocambyahoa > Analytics
3. D1 > byahoa_db > Metrics
4. R2 > byahoa-media > Metrics

## Backup Database

```bash
# Export data
wrangler d1 export byahoa_db --output=backup.sql

# Import data (nếu cần restore)
wrangler d1 execute byahoa_db --file=backup.sql
```

## Chi phí dự kiến (Cloudflare Free Tier)

- **Pages**: 500 builds/month, unlimited requests - **FREE**
- **D1**: 5GB storage, 5M rows read/day - **FREE**
- **R2**: 10GB storage, 10M Class A operations - **FREE**
- **Bandwidth**: Unlimited - **FREE**

Với traffic vừa phải, website sẽ hoàn toàn miễn phí!
