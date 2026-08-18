#!/bin/bash

# Script kiểm tra dự án đã sẵn sàng chưa

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  KIỂM TRA DỰ ÁN THỔ CẨM BYA HOA"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Kiểm tra Node.js
echo "✓ Kiểm tra Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "  Node.js: $NODE_VERSION"
else
    echo "  ✗ Node.js chưa được cài đặt!"
    echo "    Cài đặt: https://nodejs.org"
fi
echo ""

# Kiểm tra npm
echo "✓ Kiểm tra npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "  npm: v$NPM_VERSION"
else
    echo "  ✗ npm chưa được cài đặt!"
fi
echo ""

# Kiểm tra Wrangler
echo "✓ Kiểm tra Wrangler CLI..."
if command -v wrangler &> /dev/null; then
    WRANGLER_VERSION=$(wrangler --version)
    echo "  Wrangler: $WRANGLER_VERSION"
else
    echo "  ✗ Wrangler chưa được cài đặt!"
    echo "    Cài đặt: npm install -g wrangler"
fi
echo ""

# Kiểm tra files quan trọng
echo "✓ Kiểm tra files quan trọng..."
FILES=(
    "package.json"
    "schema.sql"
    "wrangler.toml"
    "index.html"
    "src/App.jsx"
    "src/main.jsx"
    "functions/api/auth.js"
    "functions/api/products.js"
    "functions/api/blogs.js"
)

ALL_EXIST=true
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✓ $file"
    else
        echo "  ✗ $file (KHÔNG TÌM THẤY)"
        ALL_EXIST=false
    fi
done
echo ""

# Kiểm tra node_modules
echo "✓ Kiểm tra dependencies..."
if [ -d "node_modules" ]; then
    echo "  ✓ node_modules đã được cài đặt"
else
    echo "  ✗ node_modules chưa được cài đặt"
    echo "    Chạy: npm install"
fi
echo ""

# Kiểm tra .env.example
echo "✓ Kiểm tra cấu hình..."
if [ -f ".env.example" ]; then
    echo "  ✓ .env.example tồn tại"
else
    echo "  ✗ .env.example không tồn tại"
fi
echo ""

# Tổng kết
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  TỔNG KẾT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ "$ALL_EXIST" = true ]; then
    echo ""
    echo "✅ Dự án đã sẵn sàng!"
    echo ""
    echo "CÁC BƯỚC TIẾP THEO:"
    echo "1. Cài đặt dependencies: npm install"
    echo "2. Tạo password hash: ./create-password-hash.sh"
    echo "3. Setup Cloudflare D1 & R2"
    echo "4. Build: npm run build"
    echo "5. Deploy: npm run deploy"
    echo ""
    echo "Chi tiết xem: DEPLOYMENT.md"
else
    echo ""
    echo "⚠️  Có một số files quan trọng bị thiếu!"
    echo "    Kiểm tra lại dự án."
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
