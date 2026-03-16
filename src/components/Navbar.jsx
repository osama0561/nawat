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
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[calc(100%-2rem)] max-w-4xl hidden md:block`}
      >
        <nav
          className={`flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ${
            scrolled
              ? 'bg-obsidian/80 backdrop-blur-xl border border-white/10 shadow-2xl'
              : 'bg-transparent'
          }`}
        >
          {/* Logo — right side (RTL) */}
          <Link to="/" className="flex items-center gap-2 group">
            {/* TODO: Replace with <img src="/logo.svg"> */}
            <span
              className="text-lg font-semibold text-ivory tracking-tight"
              style={{ fontFamily: 'IBM Plex Sans Arabic' }}
            >
              {CONFIG.brandName}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-champagne group-hover:scale-150 transition-transform" />
          </Link>

          {/* Nav links */}
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                    location.pathname === link.to
                      ? 'text-champagne font-semibold'
                      : 'text-ivory/70 hover:text-ivory'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            to="/contact"
            className="px-5 py-2 rounded-full text-sm font-semibold bg-champagne text-obsidian hover:scale-105 transition-all duration-300"
            style={{ transitionTimingFunction: 'cubic-bezier(0.25,0.46,0.45,0.94)' }}
          >
            ابدأ الآن
          </Link>
        </nav>
      </header>

      {/* Mobile Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div
          className={`flex items-center justify-between px-5 py-4 transition-all duration-300 ${
            scrolled || menuOpen ? 'bg-obsidian/95 backdrop-blur-xl border-b border-white/10' : ''
          }`}
        >
          <Link to="/" className="text-base font-semibold text-ivory" style={{ fontFamily: 'IBM Plex Sans Arabic' }}>
            {CONFIG.brandName}
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-ivory/80 hover:text-champagne transition-colors"
            aria-label="القائمة"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="bg-obsidian/98 backdrop-blur-xl border-b border-white/10 px-5 pb-6">
            <ul className="flex flex-col gap-1 pt-2">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`block px-4 py-3 rounded-2xl text-sm transition-colors ${
                      location.pathname === link.to
                        ? 'text-champagne bg-champagne/10 font-semibold'
                        : 'text-ivory/80 hover:text-ivory hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mt-3">
                <Link
                  to="/contact"
                  className="block text-center px-5 py-3 rounded-2xl text-sm font-semibold bg-champagne text-obsidian"
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
