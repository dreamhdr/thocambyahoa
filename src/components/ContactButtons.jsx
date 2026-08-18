import React from 'react';

export default function ContactButtons() {
  const zaloLink = 'https://zalo.me/0123456789'; // Replace with actual Zalo number
  const phoneNumber = '0123456789'; // Replace with actual phone number

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg md:hidden">
      <div className="grid grid-cols-2 gap-0">
        {/* Zalo Button */}
        <a
          href={zaloLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center py-4 px-6 bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors active:bg-blue-700"
        >
          <svg
            className="w-6 h-6 mr-2"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.477 2 2 6.477 2 12c0 2.237.738 4.304 1.986 5.972L2.05 21.95l4.014-1.95A9.954 9.954 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.838 0-3.535-.622-4.89-1.667l-.35-.269-3.634 1.764.935-3.467-.298-.378A7.952 7.952 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
          </svg>
          <span>Tư vấn Zalo</span>
        </a>

        {/* Call Button */}
        <a
          href={`tel:+84${phoneNumber.substring(1)}`}
          className="flex items-center justify-center py-4 px-6 bg-earth-red text-white font-medium hover:bg-opacity-90 transition-colors active:bg-opacity-80"
        >
          <svg
            className="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <span>Gọi Hotline</span>
        </a>
      </div>
    </div>
  );
}
