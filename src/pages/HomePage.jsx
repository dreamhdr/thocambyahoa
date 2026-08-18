import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productsAPI, blogsAPI } from '../utils/api';
import { updateMetaTags, defaultSEO } from '../utils/seo';
import ProductCard from '../components/ProductCard';
import BlogCard from '../components/BlogCard';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Update SEO
    updateMetaTags({
      title: defaultSEO.defaultTitle,
      description: defaultSEO.defaultDescription,
      image: defaultSEO.defaultImage,
      url: defaultSEO.siteUrl
    });

    // Fetch data
    const fetchData = async () => {
      try {
        const [productsData, blogsData] = await Promise.all([
          productsAPI.getAll(),
          blogsAPI.getAll(3)
        ]);
        setProducts(productsData.slice(0, 6));
        setBlogs(blogsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rustic-brown via-rustic-wood to-rustic-beige text-white py-16 sm:py-24 lg:py-32">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-6 leading-tight">
              Hồi Sinh Hoa Văn Cổ<br />
              Dệt Từ Lụa Tơ Tằm và Sợi Tự Nhiên Tây Nguyên
            </h1>
            <p className="text-base sm:text-lg lg:text-xl mb-8 text-rustic-cream leading-relaxed">
              Nghệ nhân H'Kim Hoa Byă dân tộc M'nông tái hiện nghệ thuật dệt thổ cẩm truyền thống
              với chất liệu tơ tằm cao cấp, mang đến sản phẩm độc đáo và tinh tế.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/san-pham"
                className="bg-white text-rustic-brown px-8 py-3 rounded-lg font-semibold hover:bg-rustic-cream transition-colors shadow-lg"
              >
                Khám phá sản phẩm
              </Link>
              <Link
                to="/cau-chuyen"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-rustic-brown transition-colors"
              >
                Đọc câu chuyện
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Uniqueness Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-center text-rustic-dark mb-8 sm:mb-12">
              Nét Đẹp Khác Biệt
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* M'nông Style */}
              <div className="bg-rustic-cream p-6 sm:p-8 rounded-lg">
                <h3 className="text-xl sm:text-2xl font-serif font-semibold text-rustic-brown mb-4">
                  Thổ Cẩm M'nông
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Hơi thở của rừng xanh với họa tiết mềm mại, đa sắc độ. Màu sắc hài hòa như đất,
                  lá, gỗ - thể hiện sự gần gũi với thiên nhiên Tây Nguyên.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>✦ Họa tiết cong mượt, dịu dàng</li>
                  <li>✦ Màu sắc chuyển sắc nhẹ nhàng</li>
                  <li>✦ Gần gũi, phù hợp hàng ngày</li>
                </ul>
              </div>

              {/* Ê-đê Style */}
              <div className="bg-indigo-deep text-white p-6 sm:p-8 rounded-lg">
                <h3 className="text-xl sm:text-2xl font-serif font-semibold mb-4">
                  Thổ Cẩm Ê-đê
                </h3>
                <p className="text-rustic-cream leading-relaxed mb-4">
                  Khí phách cao nguyên với họa tiết hình học sắc sảo, màu sắc tương phản mạnh mẽ.
                  Thể hiện tính cách cương trực và gan dạ.
                </p>
                <ul className="space-y-2 text-sm text-rustic-beige">
                  <li>✦ Hình học: tam giác, zigzag</li>
                  <li>✦ Tương phản rõ rệt</li>
                  <li>✦ Mạnh mẽ, sang trọng</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-rustic-dark mb-4">
              Sản Phẩm Nổi Bật
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Mỗi sản phẩm là duy nhất, được dệt thủ công với tâm huyết và kỹ thuật truyền thống
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/san-pham"
              className="inline-block bg-rustic-brown text-white px-8 py-3 rounded-lg font-semibold hover:bg-rustic-wood transition-colors"
            >
              Xem tất cả sản phẩm
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Blogs */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-rustic-dark mb-4">
              Câu Chuyện Thổ Cẩm
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Khám phá câu chuyện văn hóa, nghệ thuật và tâm huyết đằng sau mỗi sản phẩm
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/cau-chuyen"
              className="inline-block bg-rustic-brown text-white px-8 py-3 rounded-lg font-semibold hover:bg-rustic-wood transition-colors"
            >
              Đọc thêm câu chuyện
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
