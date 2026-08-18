#!/bin/bash

# Script test API endpoints
# Sử dụng: ./test-api.sh https://thocambyahoa.com

BASE_URL="${1:-http://localhost:8788}"

echo "==================================="
echo "Testing API Endpoints"
echo "Base URL: $BASE_URL"
echo "==================================="
echo ""

# Test Categories
echo "1. Testing GET /api/categories..."
curl -s "$BASE_URL/api/categories" | jq '.' || echo "Failed"
echo ""
echo ""

# Test Products
echo "2. Testing GET /api/products..."
curl -s "$BASE_URL/api/products" | jq '.[:2]' || echo "Failed"
echo ""
echo ""

# Test Blogs
echo "3. Testing GET /api/blogs..."
curl -s "$BASE_URL/api/blogs?limit=2" | jq '.' || echo "Failed"
echo ""
echo ""

# Test Product by slug
echo "4. Testing GET /api/products/:slug..."
curl -s "$BASE_URL/api/products/tui-xach-tho-cam-mau-xanh-phoi-hong" | jq '.' || echo "Failed"
echo ""
echo ""

# Test Blog by slug
echo "5. Testing GET /api/blogs/:slug..."
curl -s "$BASE_URL/api/blogs/hoi-sinh-hoa-van-co-hanh-trinh-cua-nghe-nhan" | jq '.' || echo "Failed"
echo ""
echo ""

echo "==================================="
echo "API Testing Complete"
echo "==================================="
