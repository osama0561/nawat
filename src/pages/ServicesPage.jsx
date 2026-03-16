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

  const filtered = activeCategory === 'الكل' ? SERVICES : SERVICES.filter((s) => s.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-text', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out', delay: 0.2 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.svc-card', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power2.out' });
    }, gridRef);
    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative pt-32 pb-20 noise-overlay overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&q=80')",
          backgroundSize: 'cover', backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 z-10" style={{ background: 'rgba(13,31,51,0.88)' }} />
        <div className="relative z-20 max-w-7xl mx-auto px-6">
          <p className="hero-text text-xs font-mono tracking-widest uppercase mb-4 opacity-0" style={{ color: 'rgba(242,237,228,0.7)', fontFamily: 'IBM Plex Mono' }}>
            ما نقدمه
          </p>
          <h1 className="hero-text text-4xl md:text-6xl font-semibold mb-4 opacity-0" style={{ color: '#F2EDE4' }}>
            خدماتنا القانونية{' '}
            <span className="font-display italic" style={{ color: '#FAF8F3' }}>الشاملة</span>
          </h1>
          <p className="hero-text text-base md:text-lg max-w-xl opacity-0" style={{ color: 'rgba(242,237,228,0.6)' }}>
            من تأسيس الشركات إلى الدفاع في القضايا — نغطي كل جانب من جوانب حاجتك القانونية.
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section style={{ background: '#FAF8F3' }} className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-12">
            {SERVICE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  background: activeCategory === cat ? '#1B3A5C' : 'white',
                  color: activeCategory === cat ? '#F2EDE4' : '#1B3A5C',
                  border: activeCategory === cat ? 'none' : '1px solid rgba(27,58,92,0.2)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  id={service.slug}
                  className="svc-card rounded-[1.5rem] p-7 transition-all duration-300 opacity-0"
                  style={{
                    background: '#FFFFFF',
                    border: service.featured ? '1px solid rgba(27,58,92,0.35)' : '1px solid rgba(27,58,92,0.1)',
                  }}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(27,58,92,0.08)', border: '1px solid rgba(27,58,92,0.15)' }}>
                      <Icon size={22} style={{ color: '#1B3A5C' }} />
                    </div>
                    {service.featured && (
                      <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(27,58,92,0.08)', color: '#1B3A5C', border: '1px solid rgba(27,58,92,0.2)' }}>
                        خدمة مميزة
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: '#1B3A5C' }}>{service.name}</h3>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(27,58,92,0.65)' }}>{service.fullDescription}</p>
                  <a
                    href={CONFIG.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm transition-colors group"
                    style={{ color: '#1B3A5C' }}
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
      <section className="py-16" style={{ background: '#F2EDE4' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-4xl font-semibold mb-4" style={{ color: '#1B3A5C' }}>
            لم تجد ما تبحث عنه؟
          </h2>
          <p className="mb-8" style={{ color: 'rgba(27,58,92,0.65)' }}>
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
