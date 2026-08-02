import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, CircleUserRound } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLink = (to: string, label: string) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`font-medium text-[16px] leading-[1.6] transition-colors ${
          isActive
            ? 'text-primary font-semibold border-b-2 border-primary pb-1'
            : 'text-secondary hover:text-primary'
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-surface-container-lowest border-b border-outline-variant h-25 transition-shadow ${
        scrolled ? 'shadow-[0px_4px_20px_rgba(0,0,0,0.05)]' : ''
      }`}
    >
      <nav className="max-w-[1280px] mx-auto px-5 md:px-16 h-full flex justify-between items-center">
        {/* Left: Logo + Nav Links */}
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center">
            <img src="/logo.webp" alt="YOEDU Logo" className="h-24 w-auto" />
          </Link>
          <div className="hidden md:flex gap-8">
            {navLink('/ban', 'Nhà đất bán')}
            {navLink('/cho-thue', 'Nhà đất cho thuê')}
          </div>
        </div>

        {/* Right: Auth + CTA */}
        <div className="flex items-center gap-5">
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-4">
              <span className="text-[14px] text-primary font-medium flex items-center gap-1">
                <CircleUserRound className="size-[18px]" />
                {user?.email}
              </span>
              <Button
                variant="link"
                onClick={logout}
                className="h-auto p-0 text-xs text-secondary hover:text-primary hover:no-underline"
              >
                Đăng xuất
              </Button>
            </div>
          ) : (
            <>
              <Button asChild variant="link" className="hidden md:inline-flex uppercase tracking-[0.05em] text-xs">
                <Link to="/auth?mode=login">Đăng nhập</Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="hidden md:inline-flex">
                <Link to="/auth?mode=register">Đăng ký</Link>
              </Button>
            </>
          )}

          <Button>Đăng tin</Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-surface-container-lowest">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <Link to="/" onClick={() => setMobileOpen(false)} className="inline-flex items-center">
                    <img src="/logo.webp" alt="YOEDU Logo" className="h-12 w-auto" />
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 px-4">
                <Link to="/ban" onClick={() => setMobileOpen(false)} className="text-[16px] text-on-surface hover:text-primary transition-colors">
                  Nhà đất bán
                </Link>
                <Link to="/cho-thue" onClick={() => setMobileOpen(false)} className="text-[16px] text-on-surface hover:text-primary transition-colors">
                  Nhà đất cho thuê
                </Link>
                {isAuthenticated ? (
                  <div className="flex flex-col gap-2 pt-4 border-t border-outline-variant">
                    <span className="text-[14px] text-primary font-medium">{user?.email}</span>
                    <button
                      onClick={() => {
                        logout();
                        setMobileOpen(false);
                      }}
                      className="text-left text-[14px] text-secondary hover:text-primary transition-colors"
                    >
                      Đăng xuất
                    </button>
                  </div>
                ) : (
                  <Link to="/auth?mode=login" onClick={() => setMobileOpen(false)} className="text-[16px] text-on-surface hover:text-primary transition-colors">
                    Đăng nhập / Đăng ký
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
