import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SERVICES, { SERVICE_CATEGORIES } from '../data/services';
import CONFIG from '../config';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('الكل');
  const heroRef = useRef(null);
  const gridRef = useRef(null);

  const filtered =
    activeCategory === 'الكل'
      ? SERVICES
      : SERVICES.filter((s) => s.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-text',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.svc-card',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power2.out' }
      );
    }, gridRef);
    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-20 noise-overlay overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-obsidian/88 z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-6">
          <p className="hero-text text-champagne text-xs font-mono tracking-widest uppercase mb-4 opacity-0" style={{ fontFamily: 'IBM Plex Mono' }}>
            ما نقدمه
          </p>
          <h1 className="hero-text text-4xl md:text-6xl font-semibold text-ivory mb-4 opacity-0">
            خدماتنا القانونية{' '}
            <span className="font-display italic text-champagne">الشاملة</span>
          </h1>
          <p className="hero-text text-ivory/60 text-base md:text-lg max-w-xl opacity-0">
            من تأسيس الشركات إلى الدفاع في القضايا — نغطي كل جانب من جوانب حاجتك القانونية.
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="bg-obsidian py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-12">
            {SERVICE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-champagne text-obsidian'
                    : 'bg-slate text-ivory/60 hover:text-ivory hover:bg-white/10 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cards grid */}
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  id={service.slug}
                  className={`svc-card bg-slate rounded-[1.5rem] p-7 border transition-all duration-300 hover:border-champagne/30 opacity-0 ${
                    service.featured ? 'border-champagne/30' : 'border-transparent'
                  }`}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-champagne/10 border border-champagne/20 flex items-center justify-center">
                      <Icon size={22} className="text-champagne" />
                    </div>
                    {service.featured && (
                      <span className="text-xs px-2 py-1 rounded-full bg-champagne/10 text-champagne border border-champagne/20">
                        خدمة مميزة
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-ivory mb-3">{service.name}</h3>
                  <p className="text-ivory/60 text-sm leading-relaxed mb-6">{service.fullDescription}</p>
                  <a
                    href={CONFIG.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-champagne hover:text-ivory transition-colors group"
                  >
                    <span>تواصل معنا بشأن هذه الخدمة</span>
                    <span className="group-hover:translate-x-1 transition-transform text-lg leading-none">←</span>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-slate py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-4xl font-semibold text-ivory mb-4">
            لم تجد ما تبحث عنه؟
          </h2>
          <p className="text-ivory/60 mb-8">
            أخبرنا بمشكلتك وسنرشدك للحل المناسب — استشارة أولى سريعة للتقييم.
          </p>
          <Link to="/contact" className="btn-primary">
            تواصل معنا الآن
          </Link>
        </div>
      </section>
    </>
  );
}
