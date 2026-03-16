import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import CONFIG from '../config';

const NAV_LINKS = [
  { label: 'الرئيسية', to: '/' },
  { label: 'خدماتنا', to: '/services' },
  { label: 'فريقنا', to: '/team' },
  { label: 'المجتمعية', to: '/pro-bono' },
  { label: 'تواصل معنا', to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Desktop Navbar */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[calc(100%-2rem)] max-w-4xl hidden md:block">
        <nav
          className={`flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ${
            scrolled
              ? 'backdrop-blur-xl shadow-2xl border'
              : 'bg-transparent'
          }`}
          style={scrolled ? { background: 'rgba(13,31,51,0.88)', borderColor: 'rgba(255,255,255,0.1)' } : {}}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            {/* TODO: Replace with <img src="/logo.svg"> */}
            <span className="text-lg font-semibold tracking-tight" style={{ color: '#F2EDE4', fontFamily: 'IBM Plex Sans Arabic' }}>
              {CONFIG.brandName}
            </span>
            <span className="w-1.5 h-1.5 rounded-full group-hover:scale-150 transition-transform" style={{ background: '#F2EDE4' }} />
          </Link>

          {/* Nav links */}
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="px-4 py-2 rounded-full text-sm transition-all duration-200"
                  style={{
                    color: location.pathname === link.to ? '#F2EDE4' : 'rgba(242,237,228,0.65)',
                    fontWeight: location.pathname === link.to ? '600' : '400',
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            to="/contact"
            className="px-5 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-all duration-300"
            style={{ background: '#F2EDE4', color: '#1B3A5C', transitionTimingFunction: 'cubic-bezier(0.25,0.46,0.45,0.94)' }}
          >
            ابدأ الآن
          </Link>
        </nav>
      </header>

      {/* Mobile Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div
          className={`flex items-center justify-between px-5 py-4 transition-all duration-300 ${
            scrolled || menuOpen ? 'backdrop-blur-xl border-b' : ''
          }`}
          style={scrolled || menuOpen ? { background: 'rgba(13,31,51,0.96)', borderColor: 'rgba(255,255,255,0.1)' } : {}}
        >
          <Link to="/" className="text-base font-semibold" style={{ color: '#F2EDE4', fontFamily: 'IBM Plex Sans Arabic' }}>
            {CONFIG.brandName}
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 transition-colors"
            style={{ color: 'rgba(242,237,228,0.8)' }}
            aria-label="القائمة"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="backdrop-blur-xl border-b px-5 pb-6" style={{ background: 'rgba(13,31,51,0.98)', borderColor: 'rgba(255,255,255,0.1)' }}>
            <ul className="flex flex-col gap-1 pt-2">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="block px-4 py-3 rounded-2xl text-sm transition-colors"
                    style={{
                      color: location.pathname === link.to ? '#F2EDE4' : 'rgba(242,237,228,0.7)',
                      background: location.pathname === link.to ? 'rgba(242,237,228,0.1)' : 'transparent',
                      fontWeight: location.pathname === link.to ? '600' : '400',
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mt-3">
                <Link
                  to="/contact"
                  className="block text-center px-5 py-3 rounded-2xl text-sm font-semibold"
                  style={{ background: '#F2EDE4', color: '#1B3A5C' }}
                >
                  ابدأ الآن
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
}
