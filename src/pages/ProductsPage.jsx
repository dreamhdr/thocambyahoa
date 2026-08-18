import React, { useEffect, useState } from 'react';
import { productsAPI, categoriesAPI } from '../utils/api';
import { updateMetaTags, defaultSEO } from '../utils/seo';
import ProductCard from '../components/ProductCard';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Update SEO
    updateMetaTags({
      title: `Sản phẩm thổ cẩm | ${defaultSEO.siteName}`,
      description: 'Khám phá bộ sưu tập túi xách và khăn choàng thổ cẩm tơ tằm cao cấp, dệt thủ công bởi nghệ nhân H\'Kim Hoa Byă.',
      url: `${defaultSEO.siteUrl}/san-pham`
    });

    // Fetch data
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          productsAPI.getAll(),
          categoriesAPI.getAll()
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = async (categoryId) => {
    setSelectedCategory(categoryId);
    setLoading(true);
    try {
      const data = categoryId ? await productsAPI.getAll(categoryId) : await productsAPI.getAll();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-rustic-dark mb-4">
            Sản Phẩm Thổ Cẩm
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Mỗi sản phẩm là một tác phẩm nghệ thuật độc đáo, dệt thủ công từ tơ tằm tự nhiên
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 sm:mb-10">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <button
              onClick={() => handleCategoryChange(null)}
              className={`px-5 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-colors ${
                selectedCategory === null
                  ? 'bg-rustic-brown text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-rustic-cream border border-gray-300'
              }`}
            >
              Tất cả
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-5 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-rustic-brown text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-rustic-cream border border-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="spinner"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Chưa có sản phẩm nào trong danh mục này</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-12 sm:mt-16 bg-rustic-cream rounded-lg p-8 sm:p-10 text-center">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-rustic-dark mb-4">
            Không Tìm Thấy Sản Phẩm Phù Hợp?
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Chúng tôi có thể tạo sản phẩm đặc biệt theo yêu cầu của bạn. Liên hệ để được tư vấn chi tiết.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://zalo.me/0123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Tư vấn qua Zalo
            </a>
            <a
              href="tel:+840123456789"
              className="bg-rustic-brown text-white px-8 py-3 rounded-lg font-semibold hover:bg-rustic-wood transition-colors"
            >
              Gọi Hotline
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
