import { useSearchParams, Link } from 'react-router-dom';
import { MailWarning } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function RegisterSuccess() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || 'email của bạn';

  return (
    <>
      <Header />
      <main className="pt-24 min-h-screen bg-surface-container-low flex items-center justify-center px-5 py-20">
        <Card className="w-full max-w-md p-10 gap-0 shadow-[0px_8px_40px_rgba(0,0,0,0.07)] text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-surface-container rounded-full mb-6 mx-auto">
            <MailWarning className="size-9 text-primary" />
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

          <Separator className="mb-8" />

          <p className="text-[13px] text-secondary mb-6">
            Không nhận được email? Kiểm tra thư mục <span className="font-medium text-on-surface">Spam / Junk</span> hoặc thử lại.
          </p>

          <Button asChild variant="outline" className="w-full mb-3">
            <Link to="/auth?mode=register">Dùng email khác</Link>
          </Button>

          <Button asChild className="w-full">
            <Link to="/auth?mode=login">Về trang đăng nhập</Link>
          </Button>
        </Card>
      </main>
      <Footer />
    </>
  );
}
