#!/bin/bash

# Script tạo SHA-256 hash cho mật khẩu admin
# Sử dụng: ./create-password-hash.sh

echo "==================================="
echo "Tạo Password Hash cho Admin"
echo "==================================="
echo ""

read -sp "Nhập mật khẩu admin: " password
echo ""

if [ -z "$password" ]; then
    echo "Lỗi: Mật khẩu không được để trống!"
    exit 1
fi

# Tạo SHA-256 hash
hash=$(echo -n "$password" | openssl dgst -sha256 | sed 's/^.* //')

echo ""
echo "==================================="
echo "Password Hash đã được tạo:"
echo ""
echo "$hash"
echo ""
echo "==================================="
echo ""
echo "Cập nhật hash này vào wrangler.toml:"
echo "ADMIN_PASSWORD_HASH = \"$hash\""
echo ""
echo "Hoặc cập nhật trong Cloudflare Dashboard:"
echo "Pages > Settings > Environment Variables"
echo "==================================="
