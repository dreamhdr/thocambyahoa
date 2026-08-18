import React, { useEffect, useState } from 'react';
import { blogsAPI } from '../utils/api';
import { updateMetaTags, defaultSEO } from '../utils/seo';
import BlogCard from '../components/BlogCard';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Update SEO
    updateMetaTags({
      title: `Câu chuyện thổ cẩm | ${defaultSEO.siteName}`,
      description: 'Khám phá câu chuyện văn hóa, nghệ thuật và tâm huyết đằng sau mỗi sản phẩm thổ cẩm Bya Hoa.',
      url: `${defaultSEO.siteUrl}/cau-chuyen`
    });

    // Fetch blogs
    const fetchBlogs = async () => {
      try {
        const data = await blogsAPI.getAll();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
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
        <div className="text-center mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-rustic-dark mb-4">
            Câu Chuyện Thổ Cẩm
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Khám phá câu chuyện văn hóa, nghệ thuật dệt thổ cẩm và hành trình gìn giữ di sản Tây Nguyên
          </p>
        </div>

        {/* Blogs Grid */}
        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Chưa có bài viết nào</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
