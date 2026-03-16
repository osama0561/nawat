import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Linkedin } from 'lucide-react';
import SERVICES from '../data/services';
import CONFIG from '../config';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────
// Hero Section
// ─────────────────────────────────────────
function HeroSection() {
  const heroRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [line1Ref.current, line2Ref.current, subtextRef.current, ctaRef.current],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.18, ease: 'power3.out', delay: 0.3 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] flex items-end pb-24 noise-overlay overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=1600&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to top, #0D1F33 30%, rgba(13,31,51,0.6) 70%, rgba(13,31,51,0.2) 100%)' }} />
      <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to right, rgba(13,31,51,0.4), transparent)' }} />

      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-2xl">
          <p ref={line1Ref} className="text-lg md:text-xl font-semibold mb-2 tracking-wide opacity-0" style={{ color: 'rgba(242,237,228,0.65)' }}>
            القانون ليس تعقيداً —
          </p>
          <h1 ref={line2Ref} className="font-display italic text-5xl md:text-8xl leading-none mb-6 opacity-0" style={{ color: '#F2EDE4' }}>
            هو{' '}
            <span style={{ color: '#FAF8F3' }}>الحل.</span>
          </h1>
          <p ref={subtextRef} className="text-base md:text-lg mb-8 leading-relaxed opacity-0" style={{ color: 'rgba(242,237,228,0.6)' }}>
            مكتب نواة القانون | خبرة قانونية شاملة في المملكة العربية السعودية
          </p>
          <div ref={ctaRef} className="flex items-center gap-4 flex-wrap opacity-0">
            <Link to="/contact" className="btn-primary">
              احجز استشارة
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-2xl font-semibold text-base transition-all duration-300 hover:scale-[1.03]"
              style={{ background: 'rgba(242,237,228,0.1)', color: '#F2EDE4', border: '1px solid rgba(242,237,228,0.2)', backdropFilter: 'blur(8px)' }}
            >
              استعرض خدماتنا
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <div className="w-px h-12 animate-pulse" style={{ background: 'linear-gradient(to bottom, rgba(242,237,228,0.5), transparent)' }} />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// Services Grid Section
// ─────────────────────────────────────────
function ServicesSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.service-card-anim',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: 'power2.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 noise-overlay" style={{ background: '#FAF8F3' }}>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="mb-14">
          <p className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: '#1B3A5C', fontFamily: 'IBM Plex Mono' }}>
            خدماتنا القانونية
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold leading-tight" style={{ color: '#1B3A5C' }}>
            حلول قانونية <span className="font-display italic" style={{ color: '#0D1F33' }}>شاملة</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.id}
                to={`/services#${service.slug}`}
                className={`service-card service-card-anim block ${service.featured ? 'featured' : ''}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon size={24} style={{ color: '#1B3A5C' }} />
                  {service.featured && (
                    <span className="text-xs px-2 py-1 rounded-full font-mono" style={{ background: 'rgba(27,58,92,0.08)', color: '#1B3A5C', border: '1px solid rgba(27,58,92,0.2)' }}>
                      مميزة
                    </span>
                  )}
                </div>
                <h3 className="text-base font-semibold mb-2" style={{ color: '#1B3A5C' }}>{service.name}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(27,58,92,0.6)' }}>{service.description}</p>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link to="/services" className="btn-primary inline-flex">
            استعرض جميع الخدمات
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// Philosophy Section
// ─────────────────────────────────────────
function PhilosophySection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.philosophy-word', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' } });
      gsap.fromTo('.philosophy-sub', { opacity: 0 }, { opacity: 1, duration: 1, scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const dramaWords = ['نحن', 'نركز', 'على:', 'بناء', 'الحق.'];

  return (
    <section
      ref={sectionRef}
      className="relative py-32 noise-overlay overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=1400&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 z-10" style={{ background: 'rgba(13,31,51,0.92)' }} />
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
        <p className="philosophy-sub text-base md:text-lg mb-8 opacity-0" style={{ color: 'rgba(242,237,228,0.5)' }}>
          معظم المكاتب القانونية تركز على: إتمام المعاملة.
        </p>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          {dramaWords.map((word, i) => (
            <span key={i} className={`philosophy-word font-display italic text-4xl md:text-7xl leading-tight opacity-0`}
              style={{ color: word === 'الحق.' ? '#FAF8F3' : 'rgba(242,237,228,0.85)' }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// Stats Bar
// ─────────────────────────────────────────
const STATS = [
  { value: 100, suffix: '+', label: 'قضية مُنجزة' },
  { value: 50, suffix: '+', label: 'عميل راضٍ' },
  { value: 3, suffix: '', label: 'مؤسسين متخصصين' },
  { value: 100, suffix: '٪', label: 'التزام قانوني' },
];

function StatsBar() {
  const sectionRef = useRef(null);
  const numRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      STATS.forEach((stat, i) => {
        gsap.fromTo({ val: 0 }, { val: stat.value }, {
          duration: 2, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
          onUpdate: function () {
            if (numRefs.current[i]) numRefs.current[i].textContent = Math.round(this.targets()[0].val) + stat.suffix;
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16" style={{ background: '#1B3A5C' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <div key={i} className="text-center">
              <p ref={(el) => (numRefs.current[i] = el)} className="stat-number text-4xl md:text-5xl font-bold mb-2" style={{ color: '#F2EDE4' }}>
                0{stat.suffix}
              </p>
              <p className="text-sm" style={{ color: 'rgba(242,237,228,0.6)' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// Team Preview Section
// ─────────────────────────────────────────
const FOUNDERS = [
  { initials: 'م', name: 'د. محمد', title: 'يُحدَّد لاحقاً', specialization: 'القانون التجاري والشركات' },
  { initials: 'م', name: 'المؤسس الثاني', title: 'يُحدَّد لاحقاً', specialization: 'القانون المدني والعقود' },
  { initials: 'ه', name: 'هاشم', title: 'يُحدَّد لاحقاً', specialization: 'الملكية الفكرية والإعلام القانوني' },
];

function TeamSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.team-card', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power2.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24" style={{ background: '#F2EDE4' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14">
          <p className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: '#1B3A5C', fontFamily: 'IBM Plex Mono' }}>
            مجلس الإدارة
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold" style={{ color: '#1B3A5C' }}>
            الفريق <span className="font-display italic" style={{ color: '#0D1F33' }}>المؤسس</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FOUNDERS.map((founder, i) => (
            <div key={i} className="team-card rounded-[1.5rem] p-8 text-center group transition-all duration-300 opacity-0"
              style={{ background: '#FFFFFF', border: '1px solid rgba(27,58,92,0.1)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(27,58,92,0.35)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(27,58,92,0.1)'}
            >
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 transition-all duration-300"
                style={{ background: '#FAF8F3', border: '2px solid rgba(27,58,92,0.2)' }}
              >
                <span className="text-2xl font-semibold" style={{ color: '#1B3A5C' }}>{founder.initials}</span>
              </div>
              <h3 className="text-lg font-semibold mb-1" style={{ color: '#1B3A5C' }}>{founder.name}</h3>
              <p className="text-sm mb-2" style={{ color: '#0D1F33' }}>{founder.title}</p>
              <p className="text-xs mb-5" style={{ color: 'rgba(27,58,92,0.55)' }}>{founder.specialization}</p>
              <a href={CONFIG.linkedin} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs transition-colors"
                style={{ color: 'rgba(27,58,92,0.4)' }}
              >
                <Linkedin size={14} />
                LinkedIn
              </a>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/team" className="btn-primary inline-flex">
            تعرف على الفريق
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// CTA Strip
// ─────────────────────────────────────────
function CTAStrip() {
  return (
    <section className="py-20 noise-overlay" style={{ background: '#1B3A5C' }}>
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-semibold mb-6 leading-tight" style={{ color: '#F2EDE4' }}>
          مشكلتك القانونية
          <br />
          <span className="font-display italic" style={{ color: '#FAF8F3' }}>تستحق حلاً حقيقياً</span>
        </h2>
        <p className="text-base mb-10" style={{ color: 'rgba(242,237,228,0.65)' }}>
          لا تتأخر — كل يوم تأخير قد يكلف أكثر. تواصل معنا اليوم.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-2xl font-semibold text-base transition-all duration-300 hover:scale-[1.03]"
            style={{ background: '#F2EDE4', color: '#1B3A5C' }}
          >
            احجز استشارة مدفوعة
          </Link>
          <Link to="/pro-bono" className="btn-outline"
            style={{ color: '#F2EDE4', borderColor: 'rgba(242,237,228,0.5)' }}
          >
            <Heart size={16} />
            تقدم للخدمة المجتمعية
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <PhilosophySection />
      <StatsBar />
      <TeamSection />
      <CTAStrip />
    </>
  );
}
