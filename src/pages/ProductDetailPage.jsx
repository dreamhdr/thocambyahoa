import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productsAPI } from '../utils/api';
import { updateMetaTags, defaultSEO } from '../utils/seo';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productsAPI.getBySlug(slug);
        setProduct(data);

        // Update SEO
        updateMetaTags({
          title: `${data.title} | ${defaultSEO.siteName}`,
          description: data.description?.substring(0, 160) || defaultSEO.defaultDescription,
          image: data.image_url || defaultSEO.defaultImage,
          url: `${defaultSEO.siteUrl}/san-pham/${data.slug}`
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Không tìm thấy sản phẩm</h2>
          <Link to="/san-pham" className="text-rustic-brown hover:underline">
            Quay lại danh sách sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 sm:py-12 pb-24 md:pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 sm:mb-8 text-sm">
          <ol className="flex items-center space-x-2 text-gray-600">
            <li>
              <Link to="/" className="hover:text-rustic-brown">Trang chủ</Link>
            </li>
            <li>/</li>
            <li>
              <Link to="/san-pham" className="hover:text-rustic-brown">Sản phẩm</Link>
            </li>
            <li>/</li>
            <li className="text-rustic-brown font-medium truncate">{product.title}</li>
          </ol>
        </nav>

        {/* Product Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="order-1">
            <div className="sticky top-24">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-rustic-cream shadow-lg">
                <img
                  src={product.image_url || '/images/placeholder-product.jpg'}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="order-2">
            {/* Category Badge */}
            <div className="inline-block bg-rustic-cream text-rustic-brown text-sm px-4 py-2 rounded-full mb-4">
              {product.category_name}
            </div>

            {/* Product Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-rustic-dark mb-6 leading-tight">
              {product.title}
            </h1>

            {/* Product Description */}
            <div className="prose prose-lg max-w-none mb-8">
              {product.description?.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Features/Highlights */}
            <div className="bg-rustic-cream rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-rustic-dark mb-4">
                Đặc điểm nổi bật
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-rustic-brown mr-2">✦</span>
                  Dệt thủ công 100% từ sợi tự nhiên
                </li>
                <li className="flex items-start">
                  <span className="text-rustic-brown mr-2">✦</span>
                  Chất liệu tơ tằm cao cấp, mềm mại
                </li>
                <li className="flex items-start">
                  <span className="text-rustic-brown mr-2">✦</span>
                  Họa tiết truyền thống Tây Nguyên
                </li>
                <li className="flex items-start">
                  <span className="text-rustic-brown mr-2">✦</span>
                  Mỗi sản phẩm là duy nhất
                </li>
              </ul>
            </div>

            {/* Desktop Contact Buttons */}
            <div className="hidden md:block">
              <h3 className="text-lg font-semibold text-rustic-dark mb-4">
                Liên hệ để được tư vấn và đặt hàng
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://zalo.me/0123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors text-center shadow-lg"
                >
                  <svg className="w-6 h-6 inline-block mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 2.237.738 4.304 1.986 5.972L2.05 21.95l4.014-1.95A9.954 9.954 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.838 0-3.535-.622-4.89-1.667l-.35-.269-3.634 1.764.935-3.467-.298-.378A7.952 7.952 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
                  </svg>
                  Tư vấn qua Zalo
                </a>
                <a
                  href="tel:+840123456789"
                  className="flex-1 bg-earth-red text-white px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-colors text-center shadow-lg"
                >
                  <svg className="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Gọi Hotline
                </a>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                <strong>Lưu ý:</strong> Sản phẩm dệt thủ công nên có thể có chênh lệch nhỏ về kích thước và màu sắc so với hình ảnh.
                Điều này làm nên sự độc đáo của mỗi sản phẩm.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
