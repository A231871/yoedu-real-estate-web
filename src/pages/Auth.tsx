import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

type Mode = 'login' | 'register';

export default function Auth() {
  const [mode, setMode] = useState<Mode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(mode === 'login' ? 'Đăng nhập thành công!' : 'Tạo tài khoản thành công!');
  };

  return (
    <>
      <Header />
      <main className="pt-24 min-h-screen bg-surface-container-low flex items-center justify-center px-5 py-20">
        <div className="w-full max-w-md bg-white border border-outline-variant p-10 shadow-[0px_8px_40px_rgba(0,0,0,0.07)]">
          {/* Tabs */}
          <div className="flex mb-10 border-b border-outline-variant">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 pb-4 text-[12px] font-semibold leading-[1] tracking-[0.05em] uppercase transition-all border-b-2 -mb-px ${
                mode === 'login'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-secondary hover:text-primary'
              }`}
            >
              Đăng nhập
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 pb-4 text-[12px] font-semibold leading-[1] tracking-[0.05em] uppercase transition-all border-b-2 -mb-px ${
                mode === 'register'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-secondary hover:text-primary'
              }`}
            >
              Đăng ký
            </button>
          </div>

          <h1 className="text-[32px] font-medium leading-[1.3] tracking-[-0.01em] text-primary mb-8">
            {mode === 'login' ? 'Chào mừng trở lại' : 'Tạo tài khoản mới'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'register' && (
              <div>
                <label className="block text-[12px] font-semibold tracking-[0.05em] uppercase text-secondary mb-2">
                  Họ và tên
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border border-outline-variant px-4 py-3 text-[16px] outline-none focus:border-primary transition-colors bg-transparent"
                  placeholder="Nguyễn Văn A"
                />
              </div>
            )}

            <div>
              <label className="block text-[12px] font-semibold tracking-[0.05em] uppercase text-secondary mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-outline-variant px-4 py-3 text-[16px] outline-none focus:border-primary transition-colors bg-transparent"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="block text-[12px] font-semibold tracking-[0.05em] uppercase text-secondary mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border border-outline-variant px-4 py-3 pr-12 text-[16px] outline-none focus:border-primary transition-colors bg-transparent"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors"
                  aria-label={showPwd ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPwd ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {mode === 'login' && (
              <div className="flex justify-end">
                <a href="#" className="text-[14px] text-secondary hover:text-primary transition-colors underline">
                  Quên mật khẩu?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-on-primary py-4 text-[12px] font-semibold leading-[1] tracking-[0.05em] uppercase hover:opacity-90 transition-all mt-4 active:scale-[0.99]"
            >
              {mode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}
            </button>
          </form>

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
              <>Chưa có tài khoản? <button onClick={() => setMode('register')} className="text-primary font-semibold underline">Đăng ký ngay</button></>
            ) : (
              <>Đã có tài khoản? <button onClick={() => setMode('login')} className="text-primary font-semibold underline">Đăng nhập</button></>
            )}
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
