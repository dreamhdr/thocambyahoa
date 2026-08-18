import React, { useEffect } from 'react';
import { updateMetaTags, defaultSEO } from '../utils/seo';

export default function ContactPage() {
  useEffect(() => {
    updateMetaTags({
      title: `Liên hệ | ${defaultSEO.siteName}`,
      description: 'Liên hệ với Bya Hoa để được tư vấn về sản phẩm thổ cẩm tơ tằm cao cấp dệt thủ công.',
      url: `${defaultSEO.siteUrl}/lien-he`
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-rustic-dark mb-4">
            Liên Hệ
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Chúng tôi luôn sẵn sàng tư vấn và hỗ trợ bạn
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 sm:p-8 shadow-md">
              <h2 className="text-2xl font-serif font-bold text-rustic-dark mb-6">
                Thông Tin Liên Hệ
              </h2>

              {/* Address */}
              <div className="mb-6">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-rustic-brown mr-4 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-rustic-dark mb-1">Địa chỉ</h3>
                    <p className="text-gray-600">
                      2A/10 Bùi Thị Xuân<br />
                      Phường Buôn Ma Thuột<br />
                      Tỉnh Đắk Lắk, Việt Nam
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="mb-6">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-rustic-brown mr-4 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-rustic-dark mb-1">Hotline</h3>
                    <a href="tel:+840123456789" className="text-rustic-brown hover:underline text-lg">
                      0123 456 789
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="mb-6">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-rustic-brown mr-4 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-rustic-dark mb-1">Email</h3>
                    <a href="mailto:contact@thocambyahoa.com" className="text-rustic-brown hover:underline">
                      contact@thocambyahoa.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-rustic-brown mr-4 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-rustic-dark mb-1">Giờ làm việc</h3>
                    <p className="text-gray-600">
                      Thứ 2 - Thứ 7: 8:00 - 18:00<br />
                      Chủ nhật: 8:00 - 12:00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="bg-rustic-brown text-white rounded-lg p-6 sm:p-8 shadow-md">
              <h3 className="text-xl font-semibold mb-4">Liên hệ nhanh</h3>
              <div className="space-y-3">
                <a
                  href="https://zalo.me/0123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                >
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 2.237.738 4.304 1.986 5.972L2.05 21.95l4.014-1.95A9.954 9.954 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.838 0-3.535-.622-4.89-1.667l-.35-.269-3.634 1.764.935-3.467-.298-.378A7.952 7.952 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
                  </svg>
                  Nhắn tin qua Zalo
                </a>
                <a
                  href="https://www.facebook.com/byahoa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook Fanpage
                </a>
                <a
                  href="tel:+840123456789"
                  className="flex items-center justify-center bg-earth-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                >
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Gọi điện thoại
                </a>
              </div>
            </div>
          </div>

          {/* Map or Image */}
          <div>
            <div className="bg-white rounded-lg p-6 sm:p-8 shadow-md h-full">
              <h2 className="text-2xl font-serif font-bold text-rustic-dark mb-6">
                Về Bya Hoa
              </h2>

              <div className="prose prose-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Bya Hoa</strong> là thương hiệu thổ cẩm tơ tằm cao cấp được thành lập
                  bởi nghệ nhân H'Kim Hoa Byă - người phụ nữ M'nông tâm huyết với nghệ thuật
                  dệt thổ cẩm truyền thống.
                </p>

                <p className="text-gray-700 leading-relaxed mb-4">
                  Chúng tôi chuyên sản xuất các sản phẩm thổ cẩm dệt thủ công từ tơ tằm
                  tự nhiên Bảo Lộc, kết hợp với các sợi tự nhiên như sợi gai, sợi tre,
                  sợi cà phê để tạo nên những sản phẩm độc đáo, bền đẹp.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Mỗi sản phẩm của Bya Hoa đều mang trong mình câu chuyện văn hóa Tây Nguyên
                  và tâm hồn của người thợ dệt, là sự kết hợp hoàn hảo giữa truyền thống
                  và hiện đại.
                </p>

                <div className="bg-rustic-cream rounded-lg p-4 mb-4">
                  <h3 className="font-semibold text-rustic-dark mb-2">Thông tin doanh nghiệp</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>Công ty TNHH Bya Hoa</li>
                    <li>Mã số thuế: 6001816916</li>
                    <li>Đại diện: H'Kim Hoa Byă</li>
                  </ul>
                </div>

                <p className="text-sm text-gray-600">
                  Chúng tôi luôn sẵn sàng tư vấn và hỗ trợ quý khách. Đừng ngại liên hệ
                  với chúng tôi qua các kênh trên để được tư vấn chi tiết nhất.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
