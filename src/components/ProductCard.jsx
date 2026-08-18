import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/san-pham/${product.slug}`}
      className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 fade-in"
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-rustic-cream">
        <img
          src={product.image_url || '/images/placeholder-product.jpg'}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-rustic-brown text-white text-xs px-3 py-1 rounded-full">
          {product.category_name}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5">
        <h3 className="text-lg sm:text-xl font-serif font-semibold text-rustic-dark mb-2 line-clamp-2 group-hover:text-rustic-brown transition-colors">
          {product.title}
        </h3>

        {product.description && (
          <p className="text-sm text-gray-600 line-clamp-3 mb-3">
            {product.description.split('\n')[0]}
          </p>
        )}

        {/* View Details Link */}
        <div className="flex items-center text-rustic-brown font-medium text-sm group-hover:underline">
          Xem chi tiết
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
