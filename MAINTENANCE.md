# Hướng dẫn Bảo trì & Vận hành

## Thao tác Hàng ngày

### Đăng nhập Admin
1. Truy cập: `https://thocambyahoa.com/admin`
2. Nhập username và password
3. Chọn tab "Quản lý sản phẩm" hoặc "Quản lý bài viết"

### Thêm Sản phẩm Mới (5 phút)
1. Đăng nhập admin
2. Tab "Quản lý sản phẩm"
3. Điền form:
   - Tên sản phẩm (slug tự động)
   - Chọn danh mục
   - Mô tả chi tiết
   - Upload ảnh
4. Click "Thêm mới"

### Viết Bài Blog Mới (10-15 phút)
1. Đăng nhập admin
2. Tab "Quản lý bài viết"
3. Điền form:
   - Tiêu đề (slug tự động)
   - Tóm tắt ngắn gọn
   - Nội dung (dùng editor)
   - Upload ảnh bìa
4. Click "Thêm mới"

### Sửa Nội dung
1. Tìm item cần sửa trong danh sách
2. Click "Sửa"
3. Chỉnh sửa trong form
4. Click "Cập nhật"

### Xóa Nội dung
1. Click "Xóa" ở item cần xóa
2. Xác nhận

## Thao tác Hàng tuần

### Kiểm tra Tình trạng Website
```bash
# Test API
curl https://thocambyahoa.com/api/products
curl https://thocambyahoa.com/api/blogs

# Hoặc dùng script
./test-api.sh https://thocambyahoa.com
```

### Backup Database
```bash
# Tạo backup
wrangler d1 export byahoa_db --output=backup-$(date +%Y%m%d).sql

# Lưu file backup vào nơi an toàn
```

### Kiểm tra Analytics
1. Vào Cloudflare Dashboard
2. Pages > thocambyahoa > Analytics
3. Xem:
   - Số lượt truy cập
   - Trang được xem nhiều nhất
   - Nguồn traffic

## Thao tác Hàng tháng

### Review Performance
1. Chạy PageSpeed Insights: https://pagespeed.web.dev
2. Kiểm tra Core Web Vitals
3. Tối ưu nếu cần:
   - Nén ảnh trước khi upload
   - Xóa sản phẩm/bài viết không dùng

### Clean up R2 Storage
```bash
# Xem dung lượng đã dùng
wrangler r2 bucket info byahoa-media

# List files
wrangler r2 object list byahoa-media
```

### Update Dependencies (nếu cần)
```bash
npm update
npm run build
# Test local
npm run preview
# Deploy
npm run deploy
```

## Xử lý Sự cố Thường gặp

### Lỗi: Không thêm được sản phẩm/bài viết
**Nguyên nhân**: Session hết hạn
**Giải pháp**:
1. Đăng xuất
2. Đăng nhập lại
3. Thử lại

### Lỗi: Upload ảnh thất bại
**Nguyên nhân**: File quá lớn hoặc sai định dạng
**Giải pháp**:
1. Kiểm tra file < 5MB
2. Chỉ dùng JPEG, PNG, WebP
3. Nén ảnh nếu cần: https://tinypng.com

### Lỗi: Website chậm
**Giải pháp**:
1. Clear cache browser (Ctrl+Shift+R)
2. Kiểm tra kích thước ảnh
3. Nén ảnh lớn hơn 500KB

### Lỗi: Không đăng nhập được admin
**Giải pháp**:
1. Kiểm tra username/password
2. Clear cookies browser
3. Thử trình duyệt khác
4. Contact kỹ thuật nếu vẫn lỗi

## Deploy Code Mới

### Khi Developer gửi code mới
```bash
# 1. Pull code mới
git pull origin main

# 2. Install dependencies mới (nếu có)
npm install

# 3. Build
npm run build

# 4. Deploy
npm run deploy

# 5. Test production
# Mở website và test các tính năng
```

### Rollback nếu có lỗi
```bash
# Vào Cloudflare Dashboard
# Pages > thocambyahoa > Deployments
# Click "..." ở deployment trước đó
# Chọn "Rollback to this deployment"
```

## Quản lý Domain & SSL

### Kiểm tra SSL Certificate
1. Vào: https://www.ssllabs.com/ssltest/
2. Nhập domain: thocambyahoa.com
3. Đợi kết quả
4. Grade A là OK

### Gia hạn Domain
- Domain `.com` gia hạn hàng năm
- Cloudflare sẽ gửi email nhắc nhở
- Gia hạn trước 30 ngày

## Monitoring & Alerts

### Setup Email Alerts (Recommended)
1. Cloudflare Dashboard
2. Notifications
3. Tạo alert cho:
   - Site down
   - High error rate
   - SSL expiring

### Check Site Status
```bash
# Ping website
curl -I https://thocambyahoa.com

# Expected: HTTP/2 200
```

## Bảo mật

### Thay đổi Password Admin (mỗi 3 tháng)
```bash
# 1. Tạo password mới
./create-password-hash.sh

# 2. Cập nhật trong Cloudflare Dashboard
# Pages > Settings > Environment Variables
# Edit ADMIN_PASSWORD_HASH

# 3. Redeploy
```

### Review Access Logs
1. Cloudflare Dashboard
2. Analytics > Security
3. Xem các truy cập đáng ngờ

## Contact Hỗ trợ

### Khi cần hỗ trợ kỹ thuật
1. Mô tả vấn đề chi tiết
2. Screenshot lỗi (nếu có)
3. Cho biết:
   - Browser đang dùng
   - Thời gian xảy ra lỗi
   - Các bước đã thử

### Resources
- Cloudflare Support: https://dash.cloudflare.com/?to=/:account/support
- Cloudflare Community: https://community.cloudflare.com
- Documentation: README.md, DEPLOYMENT.md, CUSTOMIZATION.md

## Lưu ý Quan trọng

### ⚠️ KHÔNG BAO GIỜ:
- Xóa toàn bộ database
- Xóa R2 bucket
- Chia sẻ password admin
- Push code trực tiếp production (luôn test trước)
- Sửa code nếu không hiểu

### ✅ LUÔN LUÔN:
- Backup trước khi thay đổi lớn
- Test trên local trước khi deploy
- Giữ password an toàn
- Monitor analytics thường xuyên
- Clear cache sau khi deploy

## Checklist Bảo trì Định kỳ

### Hàng ngày:
- [ ] Kiểm tra website hoạt động
- [ ] Trả lời liên hệ từ khách hàng (nếu có)

### Hàng tuần:
- [ ] Backup database
- [ ] Xem analytics
- [ ] Kiểm tra page speed

### Hàng tháng:
- [ ] Review toàn bộ nội dung
- [ ] Clean up storage
- [ ] Check SSL status
- [ ] Update dependencies (nếu cần)

### Hàng quý:
- [ ] Thay đổi password admin
- [ ] Full backup (DB + R2)
- [ ] Performance audit
- [ ] Security review
