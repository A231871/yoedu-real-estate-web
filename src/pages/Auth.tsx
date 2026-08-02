import { useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/lib/hooks/useAuth';

type Mode = 'login' | 'register';

function PasswordToggle({ show, onToggle }: { show: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors"
      aria-label={show ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
    >
      <span className="material-symbols-outlined text-[20px]">
        {show ? 'visibility_off' : 'visibility'}
      </span>
    </button>
  );
}

export default function Auth() {
  // Read initial mode from URL once — after that, mode is pure local state
  // so switching tabs never triggers a URL change (which Chrome intercepts to prompt "Save password?")
  const [searchParams] = useSearchParams();
  const initialMode: Mode = searchParams.get('mode') === 'register' ? 'register' : 'login';
  const [mode, setMode] = useState<Mode>(initialMode);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const { login, register, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/';

  const validateCommon = (): boolean => {
    if (!email.includes('@')) {
      setErrorMsg('Email không hợp lệ. Vui lòng nhập đúng định dạng email (ví dụ: ten@example.com).');
      return false;
    }
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    if (!validateCommon()) return;

    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } }; message?: string };
      setErrorMsg(axiosErr.response?.data?.message || axiosErr.message || 'Đăng nhập thất bại');
    }
  };

  const handleRegister = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    if (!validateCommon()) return;

    const pwdPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!pwdPattern.test(password)) {
      setErrorMsg('Tối thiểu 8 ký tự, gồm ít nhất 1 chữ hoa, 1 chữ thường và 1 chữ số.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Mật khẩu xác nhận không khớp.');
      return;
    }

    try {
      await register({ email, password, fullName, phone: phone || undefined });
      navigate(`/auth/register-success?email=${encodeURIComponent(email)}`);
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } }; message?: string };
      setErrorMsg(axiosErr.response?.data?.message || axiosErr.message || 'Đăng ký thất bại');
    }
  };

  // Tab switch: pure state change — no URL update, so Chrome never sees a navigation
  const handleTabChange = (newMode: Mode) => {
    setMode(newMode);
    setErrorMsg(null);
    setSuccessMsg(null);
    setPassword('');
    setConfirmPassword('');
    setShowPwd(false);
    setShowConfirmPwd(false);
  };

  const inputClass = 'w-full border border-outline-variant px-4 py-3 text-[16px] outline-none focus:border-primary transition-colors bg-transparent';
  const labelClass = 'block text-[12px] font-semibold tracking-[0.05em] uppercase text-secondary mb-2';

  return (
    <>
      <Header />
      <main className="pt-24 min-h-screen bg-surface-container-low flex items-center justify-center px-5 py-20">
        <div className="w-full max-w-md bg-white border border-outline-variant p-10 shadow-[0px_8px_40px_rgba(0,0,0,0.07)]">

          {/* Tabs */}
          <div className="flex mb-10 border-b border-outline-variant">
            <button
              onClick={() => handleTabChange('login')}
              className={`flex-1 pb-4 text-[12px] font-semibold leading-[1] tracking-[0.05em] uppercase transition-all border-b-2 -mb-px ${
                mode === 'login' ? 'border-primary text-primary' : 'border-transparent text-secondary hover:text-primary'
              }`}
            >
              Đăng nhập
            </button>
            <button
              onClick={() => handleTabChange('register')}
              className={`flex-1 pb-4 text-[12px] font-semibold leading-[1] tracking-[0.05em] uppercase transition-all border-b-2 -mb-px ${
                mode === 'register' ? 'border-primary text-primary' : 'border-transparent text-secondary hover:text-primary'
              }`}
            >
              Đăng ký
            </button>
          </div>

          <h1 className="text-[32px] font-medium leading-[1.3] tracking-[-0.01em] text-primary mb-8">
            {mode === 'login' ? 'Chào mừng trở lại' : 'Tạo tài khoản mới'}
          </h1>

          {/* Error & Success Messages */}
          {errorMsg && (
            <div className="p-4 mb-6 bg-error-container text-on-error-container text-[14px] rounded-sm border border-outline-variant">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="p-4 mb-6 bg-surface-container text-primary text-[14px] rounded-sm border border-outline-variant">
              {successMsg}
            </div>
          )}

          {/* ── LOGIN: real <form> so browser offers to save AFTER successful login + navigate ── */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className={labelClass}>Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  maxLength={254}
                  className={inputClass}
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className={labelClass}>Mật khẩu *</label>
                <div className="relative">
                  <input
                    type={showPwd ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    maxLength={128}
                    autoComplete="current-password"
                    className={`${inputClass} pr-12`}
                    placeholder="••••••••"
                  />
                  <PasswordToggle show={showPwd} onToggle={() => setShowPwd((s) => !s)} />
                </div>
              </div>

              <div className="flex justify-end">
                <a href="#" className="text-[14px] text-secondary hover:text-primary transition-colors underline">
                  Quên mật khẩu?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-on-primary py-4 text-[12px] font-semibold leading-[1] tracking-[0.05em] uppercase hover:opacity-90 transition-all mt-4 active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading
                  ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>Đang đăng nhập...</span></>
                  : <span>Đăng nhập</span>
                }
              </button>
            </form>
          )}

          {/* ── REGISTER: <div> (no <form>) + no URL change on switch = browser never prompts Save Password ── */}
          {mode === 'register' && (
            <div className="space-y-5" role="form" aria-label="Đăng ký tài khoản">
              <div>
                <label className={labelClass}>Họ và tên *</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="off"
                  maxLength={100}
                  className={inputClass}
                  placeholder="Nguyễn Văn A"
                />
              </div>

              <div>
                <label className={labelClass}>Số điện thoại</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  autoComplete="off"
                  inputMode="numeric"
                  maxLength={15}
                  className={inputClass}
                  placeholder="0912345678"
                />
              </div>

              <div>
                <label className={labelClass}>Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  maxLength={254}
                  className={inputClass}
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className={labelClass}>Mật khẩu *</label>
                <div className="relative">
                  <input
                    type={showPwd ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                    minLength={8}
                    maxLength={128}
                    className={`${inputClass} pr-12`}
                    placeholder="••••••••"
                  />
                  <PasswordToggle show={showPwd} onToggle={() => setShowPwd((s) => !s)} />
                </div>
                <p className="text-[12px] text-secondary mt-1">
                  Tối thiểu 8 ký tự, gồm ít nhất 1 chữ hoa, 1 chữ thường và 1 chữ số.
                </p>
              </div>

              <div>
                <label className={labelClass}>Xác nhận mật khẩu *</label>
                <div className="relative">
                  <input
                    type={showConfirmPwd ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="off"
                    minLength={8}
                    maxLength={128}
                    className={`${inputClass} pr-12`}
                    placeholder="••••••••"
                  />
                  <PasswordToggle show={showConfirmPwd} onToggle={() => setShowConfirmPwd((s) => !s)} />
                </div>
              </div>

              <button
                type="button"
                onClick={handleRegister}
                disabled={isLoading}
                className="w-full bg-primary text-on-primary py-4 text-[12px] font-semibold leading-[1] tracking-[0.05em] uppercase hover:opacity-90 transition-all mt-4 active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading
                  ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>Đang xử lý...</span></>
                  : <span>Tạo tài khoản</span>
                }
              </button>
            </div>
          )}

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-outline-variant" />
            <span className="text-[12px] text-secondary tracking-widest uppercase">hoặc</span>
            <div className="flex-1 h-px bg-outline-variant" />
          </div>

          <button className="w-full border border-outline-variant py-3 text-[14px] font-semibold text-on-surface flex items-center justify-center gap-3 hover:bg-surface-container-low transition-colors">
            <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M44.5 20H24v8.5h11.8C34.7 33.9 29.9 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 5.1 29.6 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z" fill="#FFC107"/>
              <path d="M6.3 14.7l7 5.1C15.1 16 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 5.1 29.6 3 24 3 16.3 3 9.6 7.9 6.3 14.7z" fill="#FF3D00"/>
              <path d="M24 43c5.8 0 10.7-1.9 14.6-5.1l-6.7-5.5C29.9 34.7 27.1 36 24 36c-5.8 0-10.6-3-12.1-7.5l-7 5.4C8.2 39.2 15.5 43 24 43z" fill="#4CAF50"/>
              <path d="M44.5 20H24v8.5h11.8c-.9 2.5-2.6 4.6-4.8 6L37.8 39c3.9-3.6 6.2-8.9 6.2-15 0-1.3-.1-2.7-.5-4z" fill="#1976D2"/>
            </svg>
            Tiếp tục với Google
          </button>

          <p className="text-center text-[14px] text-secondary mt-8">
            {mode === 'login' ? (
              <>Chưa có tài khoản? <button onClick={() => handleTabChange('register')} className="text-primary font-semibold underline">Đăng ký ngay</button></>
            ) : (
              <>Đã có tài khoản? <button onClick={() => handleTabChange('login')} className="text-primary font-semibold underline">Đăng nhập</button></>
            )}
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
