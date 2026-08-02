import { useEffect, useState, useRef } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useAuth } from '@/lib/hooks/useAuth';

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
        <div className="w-full max-w-md bg-white border border-outline-variant p-10 shadow-[0px_8px_40px_rgba(0,0,0,0.07)] text-center">
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
                <span className="material-symbols-outlined text-[28px]">check_circle</span>
              </div>
              <p className="text-[16px] text-primary font-medium">
                Xác minh tài khoản thành công!
              </p>
              <p className="text-[14px] text-secondary">
                Tài khoản của bạn đã được kích hoạt. Tự động chuyển hướng về trang chủ sau 3 giây...
              </p>
              <Link
                to="/"
                className="inline-block w-full bg-primary text-on-primary py-4 text-[12px] font-semibold leading-[1] tracking-[0.05em] uppercase hover:opacity-90 transition-all mt-4"
              >
                Về trang chủ ngay
              </Link>
            </div>
          )}

          {status === 'error' && (
            <div className="py-6 space-y-6">
              <div className="p-4 bg-error-container text-on-error-container text-[14px] text-left rounded-sm border border-outline-variant">
                {errorMessage}
              </div>
              <p className="text-[14px] text-secondary">
                Liên kết xác minh của bạn có thể đã hết hạn hoặc không hợp lệ.
              </p>
              <Link
                to="/auth"
                className="inline-block w-full bg-primary text-on-primary py-4 text-[12px] font-semibold leading-[1] tracking-[0.05em] uppercase hover:opacity-90 transition-all mt-4"
              >
                Quay lại Đăng nhập / Đăng ký
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
