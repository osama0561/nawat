import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import CONFIG from '../config';

const QUICK_LINKS = [
  { label: 'الرئيسية', to: '/' },
  { label: 'خدماتنا', to: '/services' },
  { label: 'فريقنا', to: '/team' },
  { label: 'الخدمة المجتمعية', to: '/pro-bono' },
  { label: 'تواصل معنا', to: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-obsidian rounded-t-[3rem] border-t border-white/5 noise-overlay">
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              {/* TODO: Replace with <img src="/logo.svg"> */}
              <span className="text-2xl font-semibold text-ivory" style={{ fontFamily: 'IBM Plex Sans Arabic' }}>
                {CONFIG.brandName}
              </span>
              <span className="w-2 h-2 rounded-full bg-champagne" />
            </div>
            <p className="text-ivory/50 text-sm leading-relaxed mb-6">
              {CONFIG.tagline}
              <br />
              مكتب قانوني متكامل في المملكة العربية السعودية. نبني الحق ونحمي الحقوق.
            </p>
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-green-400 pulse-dot" />
              <span className="text-xs text-ivory/60" style={{ fontFamily: 'IBM Plex Mono' }}>
                النظام يعمل
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-champagne mb-4 tracking-wide uppercase" style={{ fontFamily: 'IBM Plex Mono' }}>
              روابط سريعة
            </h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-ivory/60 hover:text-champagne text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-champagne/30 group-hover:bg-champagne transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-champagne mb-4 tracking-wide uppercase" style={{ fontFamily: 'IBM Plex Mono' }}>
              تواصل معنا
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${CONFIG.email}`}
                  className="flex items-center gap-3 text-ivory/60 hover:text-champagne text-sm transition-colors group"
                >
                  <Mail size={15} className="text-champagne/60 group-hover:text-champagne shrink-0" />
                  {CONFIG.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONFIG.phone}`}
                  className="flex items-center gap-3 text-ivory/60 hover:text-champagne text-sm transition-colors group"
                >
                  <Phone size={15} className="text-champagne/60 group-hover:text-champagne shrink-0" />
                  {CONFIG.phone}
                </a>
              </li>
              <li>
                <span className="flex items-center gap-3 text-ivory/60 text-sm">
                  <MapPin size={15} className="text-champagne/60 shrink-0" />
                  {CONFIG.address}
                </span>
              </li>
            </ul>

            <a
              href={CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600/20 border border-green-600/30 text-green-400 hover:bg-green-600/30 text-sm font-medium transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              واتساب
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-ivory/30 text-xs" style={{ fontFamily: 'IBM Plex Mono' }}>
            © {new Date().getFullYear()} {CONFIG.brandName} — جميع الحقوق محفوظة
          </p>
          <p className="text-ivory/20 text-xs">
            nawatlaw.com
          </p>
        </div>
      </div>
    </footer>
  );
}
