# Deploy trên Cloudflare Pages

## Cách 1: Deploy qua Dashboard (Khuyến nghị)

### Bước 1: Connect GitHub Repository
1. Vào https://dash.cloudflare.com
2. Workers & Pages > Create > Pages > Connect to Git
3. Chọn repository: `dreamhdr/thocambyahoa`
4. Configure build settings:
   - **Framework preset**: None
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (để trống)
5. Click "Save and Deploy"

### Bước 2: Configure Bindings (sau khi deploy lần đầu)
1. Project Settings > Functions
2. Add D1 Database binding:
   - Variable name: `DB`
   - D1 database: Chọn database đã tạo
3. Add R2 Bucket binding:
   - Variable name: `MEDIA_BUCKET`
   - R2 bucket: Chọn bucket đã tạo

### Bước 3: Configure Environment Variables
1. Project Settings > Environment variables
2. Add các biến:
   - `JWT_SECRET`
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD_HASH`
   - `R2_PUBLIC_URL`

## Cách 2: Deploy qua Wrangler CLI

```bash
# Build project
npm run build

# Deploy (lần đầu tiên)
npx wrangler pages deploy dist --project-name=thocambyahoa

# Deploy (các lần sau)
npx wrangler pages deploy dist
```

Sau đó cấu hình bindings và environment variables như cách 1.

## Lưu ý

- Cloudflare Pages tự động detect là Pages project, không cần wrangler.toml phức tạp
- Mỗi lần push code lên GitHub, Cloudflare tự động build và deploy
- Functions (API) trong thư mục `/functions` được tự động deploy

## Troubleshooting

### Lỗi "Missing entry-point"
- Đảm bảo build command là `npm run build`
- Đảm bảo output directory là `dist`

### Functions không hoạt động
- Kiểm tra bindings (DB và R2) đã được cấu hình
- Kiểm tra environment variables
