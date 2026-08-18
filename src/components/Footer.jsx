import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-rustic-dark text-rustic-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">Bya Hoa</h3>
            <p className="text-sm text-rustic-beige mb-4">
              Thổ cẩm tơ tằm tự nhiên dệt thủ công - Nghệ thuật truyền thống Tây Nguyên
            </p>
            <p className="text-sm text-rustic-beige">
              Nghệ nhân: H'Kim Hoa Byă<br />
              Dân tộc M'nông
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liên hệ</h4>
            <div className="space-y-2 text-sm text-rustic-beige">
              <p>
                <span className="font-medium">Địa chỉ:</span><br />
                2A/10 Bùi Thị Xuân, Phường Buôn Ma Thuột,<br />
                Tỉnh Đắk Lắk, Việt Nam
              </p>
              <p>
                <span className="font-medium">Hotline:</span>{' '}
                <a href="tel:+84123456789" className="hover:text-white transition-colors">
                  0123 456 789
                </a>
              </p>
              <p>
                <span className="font-medium">Email:</span>{' '}
                <a href="mailto:contact@thocambyahoa.com" className="hover:text-white transition-colors">
                  contact@thocambyahoa.com
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liên kết</h4>
            <ul className="space-y-2 text-sm text-rustic-beige">
              <li>
                <a href="/san-pham" className="hover:text-white transition-colors">
                  Sản phẩm
                </a>
              </li>
              <li>
                <a href="/cau-chuyen" className="hover:text-white transition-colors">
                  Câu chuyện thổ cẩm
                </a>
              </li>
              <li>
                <a href="/lien-he" className="hover:text-white transition-colors">
                  Liên hệ tư vấn
                </a>
              </li>
              <li>
                <a href="/admin" className="hover:text-white transition-colors">
                  Quản trị
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Info */}
        <div className="border-t border-rustic-brown pt-8">
          <div className="text-xs text-rustic-beige space-y-1">
            <p className="font-medium">CÔNG TY TNHH BYA HOA</p>
            <p>Mã số thuế: 6001816916</p>
            <p>Đại diện pháp luật: H'Kim Hoa Byă</p>
            <p>Giấy chứng nhận đăng ký kinh doanh do Sở Kế hoạch và Đầu tư tỉnh Đắk Lắk cấp</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-rustic-brown mt-8 pt-8 text-center text-sm text-rustic-beige">
          <p>© {currentYear} Bya Hoa. Bảo lưu mọi quyền.</p>
          <p className="mt-2 text-xs">
            Sản phẩm thổ cẩm thủ công - Mỗi sản phẩm là duy nhất
          </p>
        </div>
      </div>
    </footer>
  );
}
