import { useSearchParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function RegisterSuccess() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || 'email của bạn';

  return (
    <>
      <Header />
      <main className="pt-24 min-h-screen bg-surface-container-low flex items-center justify-center px-5 py-20">
        <div className="w-full max-w-md bg-white border border-outline-variant p-10 shadow-[0px_8px_40px_rgba(0,0,0,0.07)] text-center">

          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-surface-container rounded-full mb-6">
            <span className="material-symbols-outlined text-[36px] text-primary">mark_email_unread</span>
          </div>

          <h1 className="text-[28px] font-medium leading-[1.3] tracking-[-0.01em] text-primary mb-4">
            Kiểm tra hộp thư!
          </h1>

          <p className="text-[15px] text-secondary leading-relaxed mb-2">
            Chúng tôi đã gửi email xác minh tới:
          </p>
          <p className="text-[15px] font-semibold text-primary mb-6 break-all">
            {email}
          </p>
          <p className="text-[14px] text-secondary leading-relaxed mb-10">
            Vui lòng mở email và nhấn vào liên kết xác minh để kích hoạt tài khoản của bạn.
            Liên kết sẽ hết hạn sau <span className="font-medium text-on-surface">15 phút</span>.
          </p>

          {/* Divider */}
          <div className="h-px bg-outline-variant mb-8" />

          <p className="text-[13px] text-secondary mb-6">
            Không nhận được email? Kiểm tra thư mục <span className="font-medium text-on-surface">Spam / Junk</span> hoặc thử lại.
          </p>

          <Link
            to="/auth?mode=register"
            className="inline-block w-full border border-primary text-primary py-3 text-[12px] font-semibold leading-[1] tracking-[0.05em] uppercase hover:bg-primary hover:text-on-primary transition-all mb-3"
          >
            Dùng email khác
          </Link>

          <Link
            to="/auth?mode=login"
            className="inline-block w-full bg-primary text-on-primary py-4 text-[12px] font-semibold leading-[1] tracking-[0.05em] uppercase hover:opacity-90 transition-all"
          >
            Về trang đăng nhập
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
