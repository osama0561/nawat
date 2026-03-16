import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Linkedin, Award, BookOpen } from 'lucide-react';
import CONFIG from '../config';

const TEAM = [
  {
    initials: 'م',
    name: 'د. محمد',
    title: 'يُحدَّد لاحقاً',
    specialization: 'القانون التجاري والشركات',
    bio: 'مؤسس المكتب ومتخصص في قانون الأعمال والشركات. يتمتع بخبرة واسعة في تأسيس المشاريع والعقود التجارية وتمثيل الشركات أمام الجهات القضائية والتنظيمية في المملكة العربية السعودية.',
    areas: ['تأسيس الشركات', 'العقود التجارية', 'الامتياز التجاري', 'الملكية الفكرية'],
  },
  {
    initials: 'م',
    name: 'المؤسس الثاني',
    title: 'يُحدَّد لاحقاً',
    specialization: 'القانون المدني والعقود',
    bio: 'مختص في القانون المدني وقضايا الأفراد والعائلات. يمتلك سجلاً حافلاً في تصفية التركات وتسوية النزاعات المدنية وتحصيل الديون عبر المسارات القانونية المناسبة.',
    areas: ['القضايا المدنية', 'تصفية التركات', 'تحصيل الديون', 'النزاعات الأسرية'],
  },
  {
    initials: 'ه',
    name: 'هاشم',
    title: 'يُحدَّد لاحقاً',
    specialization: 'الملكية الفكرية والإعلام القانوني',
    bio: 'رائد في مجال الملكية الفكرية والإعلام القانوني. يتولى حماية العلامات التجارية وبراءات الاختراع، ويقود مبادرة الإعلام القانوني للمكتب بهدف نشر الوعي القانوني في المجتمع السعودي.',
    areas: ['الملكية الفكرية', 'العلامات التجارية', 'الإعلام القانوني', 'الخدمة المجتمعية'],
  },
];

export default function TeamPage() {
  const heroRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.team-hero-text', { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out', delay: 0.2 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.team-card-full', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.2, ease: 'power2.out', delay: 0.3 });
    }, cardsRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative pt-32 pb-20 noise-overlay overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1400&q=80')",
          backgroundSize: 'cover', backgroundPosition: 'center top',
        }}
      >
        <div className="absolute inset-0 z-10" style={{ background: 'rgba(13,31,51,0.88)' }} />
        <div className="relative z-20 max-w-7xl mx-auto px-6">
          <p className="team-hero-text text-xs font-mono tracking-widest uppercase mb-4 opacity-0" style={{ color: 'rgba(242,237,228,0.7)', fontFamily: 'IBM Plex Mono' }}>
            مجلس الإدارة
          </p>
          <h1 className="team-hero-text text-4xl md:text-6xl font-semibold mb-4 opacity-0" style={{ color: '#F2EDE4' }}>
            الفريق{' '}
            <span className="font-display italic" style={{ color: '#FAF8F3' }}>المؤسس</span>
          </h1>
          <p className="team-hero-text text-base md:text-lg max-w-xl opacity-0" style={{ color: 'rgba(242,237,228,0.6)' }}>
            ثلاثة مختصين، رؤية واحدة — تقديم الخدمة القانونية بأعلى معايير الاحترافية والأمانة.
          </p>
        </div>
      </section>

      {/* Team Cards */}
      <section ref={cardsRef} className="py-20" style={{ background: '#FAF8F3' }}>
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          {TEAM.map((member, i) => (
            <div key={i} className="team-card-full rounded-[2rem] p-8 md:p-10 grid md:grid-cols-[200px_1fr] gap-8 items-start opacity-0 transition-all duration-300"
              style={{ background: '#FFFFFF', border: '1px solid rgba(27,58,92,0.1)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(27,58,92,0.25)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(27,58,92,0.1)'}
            >
              {/* Avatar */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-28 h-28 rounded-full flex items-center justify-center" style={{ background: '#F2EDE4', border: '2px solid rgba(27,58,92,0.2)' }}>
                  <span className="text-3xl font-bold" style={{ color: '#1B3A5C' }}>{member.initials}</span>
                </div>
                <a href={CONFIG.linkedin} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full transition-colors"
                  style={{ color: 'rgba(27,58,92,0.5)', border: '1px solid rgba(27,58,92,0.15)' }}
                >
                  <Linkedin size={12} />
                  LinkedIn
                </a>
              </div>

              {/* Info */}
              <div>
                <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
                  <div>
                    <h2 className="text-2xl font-semibold" style={{ color: '#1B3A5C' }}>{member.name}</h2>
                    <p className="text-sm mt-0.5" style={{ color: '#0D1F33' }}>{member.title}</p>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full" style={{ background: 'rgba(27,58,92,0.06)', color: 'rgba(27,58,92,0.7)' }}>
                    <BookOpen size={12} style={{ color: '#1B3A5C' }} />
                    {member.specialization}
                  </span>
                </div>

                <p className="text-sm leading-8 mb-6" style={{ color: 'rgba(27,58,92,0.7)' }}>{member.bio}</p>

                <div>
                  <p className="text-xs mb-3 flex items-center gap-1.5" style={{ color: 'rgba(27,58,92,0.6)', fontFamily: 'IBM Plex Mono' }}>
                    <Award size={12} />
                    مجالات التخصص
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {member.areas.map((area) => (
                      <span key={area} className="text-xs px-3 py-1.5 rounded-full" style={{ background: 'rgba(27,58,92,0.07)', color: '#1B3A5C', border: '1px solid rgba(27,58,92,0.12)' }}>
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-16" style={{ background: '#F2EDE4' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: '#1B3A5C' }}>
            تريد الانضمام للفريق؟
          </h2>
          <p className="mb-8 text-sm leading-relaxed" style={{ color: 'rgba(27,58,92,0.65)' }}>
            نرحب بالمحامين والمستشارين القانونيين المتميزين الراغبين في الانضمام لرؤيتنا.
          </p>
          <a href={`mailto:${CONFIG.email}?subject=طلب انضمام للفريق`} className="btn-primary">
            تواصل معنا
          </a>
        </div>
      </section>
    </>
  );
}
