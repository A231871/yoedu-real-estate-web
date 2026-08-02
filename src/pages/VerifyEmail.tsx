import { useEffect, useState, useRef } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { CircleCheck } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/lib/hooks/useAuth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

type VerifyStatus = 'verifying' | 'success' | 'error';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { verify } = useAuth();
  const navigate = useNavigate();

  const [status, setStatus] = useState<VerifyStatus>('verifying');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const hasCalledVerify = useRef(false);

  useEffect(() => {
    if (hasCalledVerify.current) return;
    hasCalledVerify.current = true;

    if (!token) {
      // Use setTimeout to avoid synchronous setState inside effect body
      setTimeout(() => {
        setStatus('error');
        setErrorMessage('Mã xác minh không hợp lệ hoặc bị thiếu.');
      }, 0);
      return;
    }

    verify(token)
      .then(() => {
        setStatus('success');
        setTimeout(() => {
          navigate('/');
        }, 3000);
      })
      .catch((err: unknown) => {
        const axiosErr = err as { response?: { data?: { message?: string } }; message?: string };
        const message = axiosErr.response?.data?.message || axiosErr.message || 'Xác minh tài khoản thất bại';
        setStatus('error');
        setErrorMessage(message);
      });
  }, [token, verify, navigate]);

  return (
    <>
      <Header />
      <main className="pt-24 min-h-screen bg-surface-container-low flex items-center justify-center px-5 py-20">
        <Card className="w-full max-w-md p-10 gap-0 shadow-[0px_8px_40px_rgba(0,0,0,0.07)] text-center">
          <h1 className="text-[32px] font-medium leading-[1.3] tracking-[-0.01em] text-primary mb-6">
            Xác minh tài khoản
          </h1>

          {status === 'verifying' && (
            <div className="py-8 space-y-4">
              <div className="inline-block animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
              <p className="text-[14px] text-secondary">Đang xác minh tài khoản của bạn, vui lòng chờ...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="py-6 space-y-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-surface-container rounded-full text-primary">
                <CircleCheck className="size-7" />
              </div>
              <p className="text-[16px] text-primary font-medium">
                Xác minh tài khoản thành công!
              </p>
              <p className="text-[14px] text-secondary">
                Tài khoản của bạn đã được kích hoạt. Tự động chuyển hướng về trang chủ sau 3 giây...
              </p>
              <Button asChild className="w-full mt-4">
                <Link to="/">Về trang chủ ngay</Link>
              </Button>
            </div>
          )}

          {status === 'error' && (
            <div className="py-6 space-y-6">
              <Alert variant="destructive" className="text-left">
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
              <p className="text-[14px] text-secondary">
                Liên kết xác minh của bạn có thể đã hết hạn hoặc không hợp lệ.
              </p>
              <Button asChild className="w-full mt-4">
                <Link to="/auth">Quay lại Đăng nhập / Đăng ký</Link>
              </Button>
            </div>
          )}
        </Card>
      </main>
      <Footer />
    </>
  );
}
