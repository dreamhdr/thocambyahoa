# 🚀 Quick Start Guide

## Bắt đầu nhanh trong 10 phút

### Bước 1: Cài đặt Dependencies (2 phút)
```bash
npm install
```

### Bước 2: Tạo Password cho Admin (1 phút)
```bash
# Cấp quyền thực thi cho script
chmod +x create-password-hash.sh

# Chạy script
./create-password-hash.sh

# Nhập mật khẩu và copy hash vào wrangler.toml
```

### Bước 3: Setup Cloudflare D1 Database (3 phút)
```bash
# Login Cloudflare
wrangler login

# Tạo database
wrangler d1 create byahoa_db

# Copy database_id vào wrangler.toml (dòng database_id)

# Chạy migration
wrangler d1 execute byahoa_db --file=./schema.sql

# Kiểm tra
wrangler d1 execute byahoa_db --command="SELECT * FROM products"
```

### Bước 4: Setup Cloudflare R2 Storage (2 phút)
```bash
# Tạo bucket
wrangler r2 bucket create byahoa-media

# Cấu hình CORS
wrangler r2 bucket cors put byahoa-media --cors-config cors.json

# Enable public access
wrangler r2 bucket domain add byahoa-media --domain auto

# Copy URL và cập nhật R2_PUBLIC_URL trong wrangler.toml
```

### Bước 5: Build & Deploy (2 phút)
```bash
# Build
npm run build

# Deploy
wrangler pages deploy dist --project-name=thocambyahoa

# Lưu deployment URL
```

### Bước 6: Cấu hình Cloudflare Dashboard
1. Vào https://dash.cloudflare.com
2. Pages > thocambyahoa > Settings > Functions
3. Thêm Bindings:
   - D1: `DB` → `byahoa_db`
   - R2: `MEDIA_BUCKET` → `byahoa-media`
4. Thêm Environment Variables:
   - `JWT_SECRET`: (tạo bằng `openssl rand -base64 32`)
   - `ADMIN_USERNAME`: `admin@byahoa.com`
   - `ADMIN_PASSWORD_HASH`: (hash từ bước 2)
   - `R2_PUBLIC_URL`: (URL từ bước 4)

### Bước 7: Test Website
```bash
# Mở deployment URL
# Test các trang:
# - /
# - /san-pham
# - /cau-chuyen
# - /admin (login với username/password)
```

---

## ⚠️ Trước khi Deploy Production

### Cập nhật thông tin thật:

**File: `src/components/ContactButtons.jsx`**
- Dòng 4: `const zaloLink = 'https://zalo.me/0123456789'` → Số thật
- Dòng 5: `const phoneNumber = '0123456789'` → Số thật

**File: `src/pages/ContactPage.jsx`**
- Dòng 48: Số hotline
- Dòng 59: Email

**File: `src/pages/ProductDetailPage.jsx`**
- Dòng 111: Link Zalo
- Dòng 122: Link tel

**File: `src/utils/seo.js`**
- Dòng 61: `siteUrl: 'https://thocambyahoa.com'` → Domain thật

---

## 🆘 Troubleshooting

### Lỗi: Database not found
```bash
# Kiểm tra database_id trong wrangler.toml
wrangler d1 info byahoa_db
```

### Lỗi: Upload ảnh không work
```bash
# Kiểm tra R2 CORS
wrangler r2 bucket cors get byahoa-media
```

### Lỗi: Không login được admin
```bash
# Test password hash
echo -n "YOUR_PASSWORD" | openssl dgst -sha256
# So sánh với ADMIN_PASSWORD_HASH
```

---

## 📚 Tài liệu Chi tiết

- **DEPLOYMENT.md**: Hướng dẫn deploy chi tiết từng bước
- **CUSTOMIZATION.md**: Tùy chỉnh nội dung
- **MAINTENANCE.md**: Bảo trì & vận hành
- **CHECKLIST.md**: Checklist đầy đủ
- **PROJECT_SUMMARY.md**: Tổng quan dự án

---

## ✅ Checklist Nhanh

- [ ] `npm install`
- [ ] Tạo password hash
- [ ] Tạo D1 database
- [ ] Chạy migration
- [ ] Tạo R2 bucket
- [ ] Cấu hình CORS
- [ ] Cập nhật wrangler.toml
- [ ] Cập nhật số điện thoại/Zalo trong code
- [ ] Build project
- [ ] Deploy
- [ ] Cấu hình bindings trên Dashboard
- [ ] Test website

---

## 💡 Tips

1. **Development Local**: 
   ```bash
   npm run dev
   # Website chạy ở http://localhost:3000
   ```

2. **Test API Local**:
   ```bash
   chmod +x test-api.sh
   ./test-api.sh http://localhost:3000
   ```

3. **Update Code**:
   ```bash
   npm run build
   npm run deploy
   ```

4. **Backup Database**:
   ```bash
   wrangler d1 export byahoa_db --output=backup.sql
   ```

---

**Chi phí**: $0/tháng với Cloudflare Free Tier! 🎉

**Support**: Đọc DEPLOYMENT.md để biết chi tiết
