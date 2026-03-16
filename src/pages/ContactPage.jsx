import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Mail, Phone, MapPin, MessageSquare, UserCheck, Send, CheckCircle, AlertCircle } from 'lucide-react';
import CONFIG from '../config';
import SERVICES from '../data/services';

// ── Contact gate choices ──
function ContactGate({ onChoice }) {
  return (
    <div className="max-w-lg mx-auto text-center py-12">
      <h2 className="text-2xl md:text-3xl font-semibold text-ivory mb-3">
        كيف تفضل التواصل معنا؟
      </h2>
      <p className="text-ivory/50 text-sm mb-10">اختر الطريقة الأنسب لك</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Option 1 — Register email */}
        <button
          onClick={() => onChoice('email')}
          className="group bg-slate hover:border-champagne/40 border border-transparent rounded-[1.5rem] p-7 text-right transition-all duration-300 hover:-translate-y-1"
        >
          <div className="w-12 h-12 rounded-2xl bg-champagne/10 border border-champagne/20 flex items-center justify-center mb-4 group-hover:bg-champagne/15 transition-colors">
            <UserCheck size={22} className="text-champagne" />
          </div>
          <h3 className="text-base font-semibold text-ivory mb-2">سجّل بريدك لمتابعة حالتك</h3>
          <p className="text-ivory/50 text-xs leading-relaxed">
            أدخل بريدك الإلكتروني وسنرسل لك تأكيداً وتحديثات حول طلبك.
          </p>
        </button>

        {/* Option 2 — Direct */}
        <button
          onClick={() => onChoice('direct')}
          className="group bg-slate hover:border-white/20 border border-transparent rounded-[1.5rem] p-7 text-right transition-all duration-300 hover:-translate-y-1"
        >
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors">
            <MessageSquare size={22} className="text-ivory/70" />
          </div>
          <h3 className="text-base font-semibold text-ivory mb-2">تواصل مباشرة بدون تسجيل</h3>
          <p className="text-ivory/50 text-xs leading-relaxed">
            أرسل رسالتك مباشرة بدون أي التزامات. سنرد عليك في أقرب وقت.
          </p>
        </button>
      </div>
    </div>
  );
}

// ── Email registration step ──
function EmailRegistration({ onConfirm }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    // In production, send confirmation email here
    console.log('[Contact Gate] Email registered:', email);
    setSent(true);
    setTimeout(() => onConfirm(email), 1500);
  };

  if (sent) {
    return (
      <div className="max-w-md mx-auto text-center py-8">
        <CheckCircle size={40} className="text-champagne mx-auto mb-3" />
        <p className="text-ivory/80 text-sm">تم تسجيل بريدك — سنتابع طلبك...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-10">
      <h3 className="text-xl font-semibold text-ivory mb-2">أدخل بريدك الإلكتروني</h3>
      <p className="text-ivory/50 text-sm mb-6">لمتابعة حالة طلبك وتلقي التأكيد</p>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="email"
          required
          className="form-input-dark flex-1"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          dir="ltr"
          style={{ textAlign: 'right' }}
        />
        <button type="submit" className="btn-primary px-5 py-3 shrink-0">
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}

// ── Main contact form ──
function ContactForm({ prefillEmail }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: prefillEmail || '',
    service: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'الاسم مطلوب';
    if (!form.phone.trim()) e.phone = 'رقم الجوال مطلوب';
    if (!form.message.trim()) e.message = 'الرسالة مطلوبة';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);

    const payload = { ...form, submittedAt: new Date().toISOString() };
    if (CONFIG.CONTACT_WEBHOOK_URL) {
      try {
        await fetch(CONFIG.CONTACT_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (err) { console.error(err); }
    } else {
      console.log('[Contact Form]', payload);
    }
    setLoading(false);
    setSubmitted(true);
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle size={48} className="text-champagne mx-auto mb-4" />
        <h3 className="text-2xl font-semibold text-ivory mb-2">تم إرسال رسالتك</h3>
        <p className="text-ivory/60 text-sm">سنتواصل معك في أقرب وقت ممكن.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-ivory/80 mb-2">
            الاسم <span className="text-champagne">*</span>
          </label>
          <input
            type="text"
            className="form-input-dark"
            placeholder="اسمك الكامل"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          {errors.name && <DarkFieldError msg={errors.name} />}
        </div>
        <div>
          <label className="block text-sm font-medium text-ivory/80 mb-2">
            الجوال <span className="text-champagne">*</span>
          </label>
          <input
            type="tel"
            className="form-input-dark"
            placeholder="05XXXXXXXX"
            value={form.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            dir="ltr"
            style={{ textAlign: 'right' }}
          />
          {errors.phone && <DarkFieldError msg={errors.phone} />}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-ivory/80 mb-2">البريد الإلكتروني</label>
        <input
          type="email"
          className="form-input-dark"
          placeholder="example@email.com"
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          dir="ltr"
          style={{ textAlign: 'right' }}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ivory/80 mb-2">الخدمة المطلوبة</label>
        <select
          className="form-input-dark"
          value={form.service}
          onChange={(e) => handleChange('service', e.target.value)}
        >
          <option value="">اختر الخدمة (اختياري)...</option>
          {SERVICES.map((s) => (
            <option key={s.id} value={s.name}>{s.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-ivory/80 mb-2">
          رسالتك <span className="text-champagne">*</span>
        </label>
        <textarea
          className="form-input-dark resize-none"
          rows={5}
          placeholder="اشرح احتياجك القانوني..."
          value={form.message}
          onChange={(e) => handleChange('message', e.target.value)}
        />
        {errors.message && <DarkFieldError msg={errors.message} />}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full justify-center"
        style={{ opacity: loading ? 0.7 : 1 }}
      >
        {loading ? 'جارٍ الإرسال...' : 'إرسال الرسالة'}
      </button>
    </form>
  );
}

function DarkFieldError({ msg }) {
  return (
    <div className="flex items-center gap-1.5 mt-1.5">
      <AlertCircle size={13} className="text-red-400" />
      <span className="text-xs text-red-400">{msg}</span>
    </div>
  );
}

// ── Main Page ──
export default function ContactPage() {
  const [gateChoice, setGateChoice] = useState(null); // null | 'email' | 'direct'
  const [prefillEmail, setPrefillEmail] = useState('');
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-hero-text',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const handleGateChoice = (choice) => setGateChoice(choice);
  const handleEmailConfirm = (email) => {
    setPrefillEmail(email);
    setGateChoice('form-ready');
  };

  return (
    <>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-20 noise-overlay"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1400&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-obsidian/88 z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-6">
          <p className="contact-hero-text text-champagne text-xs font-mono tracking-widest uppercase mb-4 opacity-0" style={{ fontFamily: 'IBM Plex Mono' }}>
            ابدأ الآن
          </p>
          <h1 className="contact-hero-text text-4xl md:text-6xl font-semibold text-ivory mb-4 opacity-0">
            تواصل <span className="font-display italic text-champagne">معنا</span>
          </h1>
          <p className="contact-hero-text text-ivory/60 text-base md:text-lg max-w-xl opacity-0">
            مشكلتك القانونية تستحق إجابة واضحة. نحن هنا للاستماع والمساعدة.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="bg-obsidian py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left — Form area */}
            <div className="bg-slate rounded-[2rem] p-8 md:p-10">
              {!gateChoice && (
                <ContactGate onChoice={handleGateChoice} />
              )}
              {gateChoice === 'email' && (
                <EmailRegistration onConfirm={handleEmailConfirm} />
              )}
              {(gateChoice === 'direct' || gateChoice === 'form-ready') && (
                <div>
                  <h2 className="text-2xl font-semibold text-ivory mb-2">أرسل رسالتك</h2>
                  <p className="text-ivory/50 text-sm mb-8">سنرد عليك خلال ٢٤ ساعة في أيام العمل</p>
                  <ContactForm prefillEmail={prefillEmail} />
                </div>
              )}
            </div>

            {/* Right — Direct contact */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-ivory mb-2">تواصل مباشر</h2>
                <p className="text-ivory/50 text-sm">تفضل بالتواصل المباشر معنا عبر القنوات التالية</p>
              </div>

              {/* WhatsApp — prominent */}
              <a
                href={CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-[1.5rem] bg-green-900/20 border border-green-700/30 hover:border-green-500/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-green-600 flex items-center justify-center shrink-0">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-400 mb-0.5">واتساب</p>
                  <p className="text-ivory/70 text-sm" dir="ltr">{CONFIG.whatsapp}</p>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${CONFIG.email}`}
                className="flex items-center gap-4 p-5 rounded-[1.5rem] bg-slate border border-white/5 hover:border-champagne/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-champagne/10 border border-champagne/20 flex items-center justify-center shrink-0">
                  <Mail size={20} className="text-champagne" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ivory mb-0.5">البريد الإلكتروني</p>
                  <p className="text-ivory/60 text-sm">{CONFIG.email}</p>
                </div>
              </a>

              {/* Phone */}
              <a
                href={`tel:${CONFIG.phone}`}
                className="flex items-center gap-4 p-5 rounded-[1.5rem] bg-slate border border-white/5 hover:border-champagne/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-champagne/10 border border-champagne/20 flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-champagne" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ivory mb-0.5">الهاتف</p>
                  <p className="text-ivory/60 text-sm" dir="ltr">{CONFIG.phone}</p>
                </div>
              </a>

              {/* Address */}
              <div className="flex items-center gap-4 p-5 rounded-[1.5rem] bg-slate border border-white/5">
                <div className="w-12 h-12 rounded-2xl bg-champagne/10 border border-champagne/20 flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-champagne" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ivory mb-0.5">الموقع</p>
                  <p className="text-ivory/60 text-sm">{CONFIG.address}</p>
                </div>
              </div>

              {/* Working hours note */}
              <div className="p-5 rounded-[1.5rem] bg-champagne/5 border border-champagne/10">
                <p className="text-xs text-champagne/80 font-mono mb-1" style={{ fontFamily: 'IBM Plex Mono' }}>
                  ساعات العمل
                </p>
                <p className="text-ivory/60 text-sm">الأحد – الخميس: ٩ص – ٦م</p>
                <p className="text-ivory/40 text-xs mt-1">نرد على واتساب خارج ساعات العمل حسب الإمكانية</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
