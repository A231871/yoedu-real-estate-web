import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant">
      <div className="max-w-[1280px] mx-auto px-5 md:px-16 py-20 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Brand Column */}
        <div className="md:col-span-1 flex flex-col gap-2">
          <Link to="/" className="h-24 flex items-center">
            <img
              src="/logo.webp"
              alt="YOEDU Logo"
              className="max-h-full w-auto object-contain"
            />
          </Link>

          <p className="text-[16px] leading-[1.6] text-secondary max-w-xs">
            Nền tảng bất động sản cao cấp hàng đầu Việt Nam, mang đến giải pháp
            tìm kiếm và đầu tư nhà đất chuyên nghiệp.
          </p>
        </div>

        {/* Products */}
        <div>
          <h5 className="text-[12px] leading-[1] font-semibold tracking-[0.05em] uppercase text-primary mb-8">
            Sản phẩm
          </h5>
          <ul className="space-y-4">
            <li>
              <Link
                to="/ban"
                className="text-[16px] leading-[1.6] text-secondary hover:text-primary transition-all"
              >
                Nhà đất bán
              </Link>
            </li>
            <li>
              <Link
                to="/cho-thue"
                className="text-[16px] leading-[1.6] text-secondary hover:text-primary transition-all"
              >
                Nhà đất cho thuê
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="text-[16px] leading-[1.6] text-secondary hover:text-primary transition-all"
              >
                Dự án mới
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h5 className="text-[12px] leading-[1] font-semibold tracking-[0.05em] uppercase text-primary mb-8">
            Hỗ trợ
          </h5>
          <ul className="space-y-4">
            <li>
              <a
                href="#"
                className="text-[16px] leading-[1.6] text-secondary hover:text-primary transition-all"
              >
                Liên hệ
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[16px] leading-[1.6] text-secondary hover:text-primary transition-all"
              >
                Chính sách bảo mật
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[16px] leading-[1.6] text-secondary hover:text-primary transition-all"
              >
                Điều khoản sử dụng
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h5 className="text-[12px] leading-[1] font-semibold tracking-[0.05em] uppercase text-primary mb-8">
            Văn phòng
          </h5>
          <p className="text-[16px] leading-[1.6] text-secondary mb-3">
            123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh
          </p>
          <p className="text-[16px] leading-[1.6] text-secondary mb-3">
            Email: hello@yoedu.vn
          </p>
          <p className="text-[16px] leading-[1.6] text-secondary">
            Hotline: 1900 1234
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-outline-variant py-8 px-5 md:px-16 max-w-[1280px] mx-auto">
        <p className="text-[12px] leading-[1] font-semibold tracking-[0.05em] text-secondary">
          © 2026 YOEDU Property. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
