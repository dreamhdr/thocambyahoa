import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogsAPI } from '../utils/api';
import { updateMetaTags, defaultSEO } from '../utils/seo';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await blogsAPI.getBySlug(slug);
        setBlog(data);

        // Update SEO
        updateMetaTags({
          title: `${data.title} | ${defaultSEO.siteName}`,
          description: data.summary || defaultSEO.defaultDescription,
          image: data.cover_image || defaultSEO.defaultImage,
          url: `${defaultSEO.siteUrl}/cau-chuyen/${data.slug}`
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Không tìm thấy bài viết</h2>
          <Link to="/cau-chuyen" className="text-rustic-brown hover:underline">
            Quay lại danh sách bài viết
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Cover Image */}
      {blog.cover_image && (
        <div className="w-full h-64 sm:h-96 lg:h-[500px] overflow-hidden bg-rustic-cream">
          <img
            src={blog.cover_image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <article className="py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm">
            <ol className="flex items-center space-x-2 text-gray-600">
              <li>
                <Link to="/" className="hover:text-rustic-brown">Trang chủ</Link>
              </li>
              <li>/</li>
              <li>
                <Link to="/cau-chuyen" className="hover:text-rustic-brown">Câu chuyện</Link>
              </li>
              <li>/</li>
              <li className="text-rustic-brown font-medium truncate">{blog.title}</li>
            </ol>
          </nav>

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-rustic-dark mb-4 leading-tight">
              {blog.title}
            </h1>

            {blog.summary && (
              <p className="text-lg sm:text-xl text-gray-600 mb-4 italic leading-relaxed">
                {blog.summary}
              </p>
            )}

            <div className="flex items-center text-sm text-gray-500 pt-4 border-t border-gray-200">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <time dateTime={blog.created_at}>
                {formatDate(blog.created_at)}
              </time>
              {blog.updated_at !== blog.created_at && (
                <span className="ml-4 text-xs">
                  (Cập nhật: {formatDate(blog.updated_at)})
                </span>
              )}
            </div>
          </header>

          {/* Article Content */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Share & Back to List */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                to="/cau-chuyen"
                className="inline-flex items-center text-rustic-brown hover:text-rustic-wood transition-colors font-medium"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Quay lại danh sách bài viết
              </Link>

              {/* Social Share Buttons */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Chia sẻ:</span>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                  aria-label="Chia sẻ lên Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors"
                  aria-label="Chia sẻ lên Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-12 bg-rustic-cream rounded-lg p-6 sm:p-8 text-center">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-rustic-dark mb-3">
              Quan Tâm Đến Sản Phẩm Thổ Cẩm?
            </h3>
            <p className="text-gray-700 mb-5">
              Liên hệ với chúng tôi để được tư vấn và khám phá bộ sưu tập đầy đủ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/san-pham"
                className="bg-rustic-brown text-white px-8 py-3 rounded-lg font-semibold hover:bg-rustic-wood transition-colors"
              >
                Xem sản phẩm
              </Link>
              <a
                href="https://zalo.me/0123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Tư vấn qua Zalo
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
