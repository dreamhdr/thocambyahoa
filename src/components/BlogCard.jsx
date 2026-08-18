import React from 'react';
import { Link } from 'react-router-dom';

export default function BlogCard({ blog }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Link
      to={`/cau-chuyen/${blog.slug}`}
      className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 fade-in"
    >
      {/* Blog Cover Image */}
      <div className="relative aspect-video overflow-hidden bg-rustic-cream">
        <img
          src={blog.cover_image || '/images/placeholder-blog.jpg'}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Blog Info */}
      <div className="p-5 sm:p-6">
        {/* Date */}
        <p className="text-xs sm:text-sm text-gray-500 mb-2">
          {formatDate(blog.created_at)}
        </p>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-serif font-semibold text-rustic-dark mb-3 line-clamp-2 group-hover:text-rustic-brown transition-colors">
          {blog.title}
        </h3>

        {/* Summary */}
        {blog.summary && (
          <p className="text-sm sm:text-base text-gray-600 line-clamp-3 mb-4">
            {blog.summary}
          </p>
        )}

        {/* Read More Link */}
        <div className="flex items-center text-rustic-brown font-medium text-sm group-hover:underline">
          Đọc tiếp
          <svg
            className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
