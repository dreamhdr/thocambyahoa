# Checklist trước khi Deploy Production

## 1. Cấu hình Cơ bản
- [ ] Đã cài đặt Node.js (v18+)
- [ ] Đã cài đặt Wrangler CLI (`npm install -g wrangler`)
- [ ] Đã đăng nhập Cloudflare (`wrangler login`)
- [ ] Đã có tài khoản Cloudflare

## 2. Database (D1)
- [ ] Đã tạo D1 database (`wrangler d1 create byahoa-db`)
- [ ] Đã cập nhật `database_id` trong `wrangler.toml`
- [ ] Đã chạy migration (`wrangler d1 execute byahoa-db --file=./schema.sql`)
- [ ] Đã kiểm tra data seed (`wrangler d1 execute byahoa-db --command="SELECT * FROM products"`)

## 3. Storage (R2)
- [ ] Đã tạo R2 bucket (`wrangler r2 bucket create byahoa-media`)
- [ ] Đã cấu hình CORS (`wrangler r2 bucket cors put byahoa-media --cors-config cors.json`)
- [ ] Đã enable public access hoặc custom domain cho R2
- [ ] Đã cập nhật `R2_PUBLIC_URL` trong `wrangler.toml`

## 4. Authentication
- [ ] Đã tạo password hash (`./create-password-hash.sh` hoặc `openssl dgst -sha256`)
- [ ] Đã cập nhật `ADMIN_PASSWORD_HASH` trong `wrangler.toml`
- [ ] Đã tạo `JWT_SECRET` ngẫu nhiên (`openssl rand -base64 32`)
- [ ] Đã cập nhật `ADMIN_USERNAME` (email admin)

## 5. Nội dung
- [ ] Đã cập nhật số điện thoại thật trong `ContactButtons.jsx`
- [ ] Đã cập nhật link Zalo thật trong `ContactButtons.jsx`
- [ ] Đã cập nhật thông tin liên hệ trong `ContactPage.jsx`
- [ ] Đã cập nhật thông tin pháp lý trong `Footer.jsx`
- [ ] Đã kiểm tra tất cả link social media

## 6. SEO & Meta
- [ ] Đã cập nhật domain trong `seo.js` (siteUrl)
- [ ] Đã cập nhật meta tags trong `index.html`
- [ ] Đã tạo favicon (`public/favicon.svg`)
- [ ] Đã chuẩn bị ảnh OpenGraph mặc định (1200x630px)
- [ ] Đã kiểm tra `robots.txt`

## 7. Build & Test Local
- [ ] Đã chạy `npm install`
- [ ] Build thành công (`npm run build`)
- [ ] Test local (`npm run dev`)
- [ ] Kiểm tra responsive trên mobile
- [ ] Test tất cả trang: Home, Products, Blogs, Contact
- [ ] Test admin login và CRUD operations

## 8. Deploy lần đầu
- [ ] Build production (`npm run build`)
- [ ] Deploy (`wrangler pages deploy dist --project-name=thocambyahoa`)
- [ ] Ghi nhận deployment URL (*.pages.dev)

## 9. Cấu hình Cloudflare Dashboard

### Bindings
- [ ] D1 Database: `DB` → `byahoa-db`
- [ ] R2 Bucket: `MEDIA_BUCKET` → `byahoa-media`

### Environment Variables (Production)
- [ ] `JWT_SECRET`
- [ ] `ADMIN_USERNAME`
- [ ] `ADMIN_PASSWORD_HASH`
- [ ] `R2_PUBLIC_URL`

## 10. Custom Domain (Optional)
- [ ] Thêm custom domain trong Pages settings
- [ ] Kiểm tra DNS records đã được tạo
- [ ] Kiểm tra SSL certificate đã active
- [ ] Test website qua custom domain

## 11. Testing Production
- [ ] Truy cập website thành công
- [ ] Test trang chủ
- [ ] Test danh sách sản phẩm
- [ ] Test chi tiết sản phẩm
- [ ] Test danh sách blog
- [ ] Test chi tiết blog
- [ ] Test trang liên hệ
- [ ] Test nút Zalo/Hotline trên mobile
- [ ] Test responsive trên nhiều thiết bị

## 12. Admin Panel Testing
- [ ] Login thành công với username/password
- [ ] Test thêm sản phẩm mới
- [ ] Test upload ảnh sản phẩm
- [ ] Test sửa sản phẩm
- [ ] Test xóa sản phẩm
- [ ] Test thêm bài viết mới
- [ ] Test upload ảnh bài viết
- [ ] Test Rich Text Editor
- [ ] Test sửa bài viết
- [ ] Test xóa bài viết
- [ ] Test logout

## 13. Performance & SEO
- [ ] Test tốc độ load trang (PageSpeed Insights)
- [ ] Kiểm tra meta tags (View Source)
- [ ] Test OpenGraph (Facebook Debugger)
- [ ] Kiểm tra mobile-friendliness (Google Mobile-Friendly Test)
- [ ] Test trên nhiều trình duyệt (Chrome, Safari, Firefox)

## 14. Security
- [ ] Đã thay đổi mật khẩu mặc định
- [ ] JWT_SECRET là chuỗi ngẫu nhiên mạnh
- [ ] Admin panel chỉ truy cập được sau khi login
- [ ] Upload chỉ chấp nhận file ảnh
- [ ] File size limit đã được set (5MB)

## 15. Backup & Monitoring
- [ ] Backup database ban đầu (`wrangler d1 export byahoa-db --output=backup.sql`)
- [ ] Enable Cloudflare Analytics
- [ ] Setup monitoring alerts (optional)
- [ ] Ghi chép thông tin quan trọng (database_id, bucket_name, v.v.)

## 16. Documentation
- [ ] README.md đã được cập nhật
- [ ] DEPLOYMENT.md có hướng dẫn đầy đủ
- [ ] CUSTOMIZATION.md cho khách hàng
- [ ] Checklist này đã hoàn thành

## 17. Final Checks
- [ ] Không có console errors trong browser
- [ ] Không có 404 errors
- [ ] Tất cả images load đúng
- [ ] Fonts load đúng
- [ ] CSS/JS load đúng
- [ ] API responses đúng format

## 18. Go Live
- [ ] Thông báo cho team
- [ ] Cập nhật DNS (nếu cần)
- [ ] Monitor traffic trong 24h đầu
- [ ] Sẵn sàng rollback nếu có vấn đề

---

## Troubleshooting Common Issues

### Database không connect
```bash
wrangler d1 info byahoa-db
# Kiểm tra binding trong Dashboard
```

### Upload ảnh không work
```bash
wrangler r2 bucket cors get byahoa-media
# Kiểm tra CORS config
```

### Admin không login được
```bash
# Test password hash
echo -n "YOUR_PASSWORD" | openssl dgst -sha256
# So sánh với ADMIN_PASSWORD_HASH
```

### Build fails
```bash
rm -rf node_modules
npm install
npm run build
```

---

**Lưu ý**: Đánh dấu ✓ vào mỗi item khi hoàn thành. Không bỏ qua bất kỳ bước nào!
