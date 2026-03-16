import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Mail, Phone, MapPin, MessageSquare, UserCheck, Send, CheckCircle, AlertCircle } from 'lucide-react';
import CONFIG from '../config';
import SERVICES from '../data/services';

function ContactGate({ onChoice }) {
  return (
    <div className="max-w-lg mx-auto text-center py-12">
      <h2 className="text-2xl md:text-3xl font-semibold mb-3" style={{ color: '#F2EDE4' }}>
        كيف تفضل التواصل معنا؟
      </h2>
      <p className="text-sm mb-10" style={{ color: 'rgba(242,237,228,0.5)' }}>اختر الطريقة الأنسب لك</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => onChoice('email')}
          className="rounded-[1.5rem] p-7 text-right transition-all duration-300 hover:-translate-y-1"
          style={{ background: 'rgba(242,237,228,0.07)', border: '1px solid rgba(242,237,228,0.12)' }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(242,237,228,0.3)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(242,237,228,0.12)'}
        >
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'rgba(242,237,228,0.1)', border: '1px solid rgba(242,237,228,0.2)' }}>
            <UserCheck size={22} style={{ color: '#F2EDE4' }} />
          </div>
          <h3 className="text-base font-semibold mb-2" style={{ color: '#F2EDE4' }}>سجّل بريدك لمتابعة حالتك</h3>
          <p className="text-xs leading-relaxed" style={{ color: 'rgba(242,237,228,0.5)' }}>
            أدخل بريدك الإلكتروني وسنرسل لك تأكيداً وتحديثات حول طلبك.
          </p>
        </button>

        <button
          onClick={() => onChoice('direct')}
          className="rounded-[1.5rem] p-7 text-right transition-all duration-300 hover:-translate-y-1"
          style={{ background: 'rgba(242,237,228,0.04)', border: '1px solid rgba(242,237,228,0.08)' }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(242,237,228,0.2)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(242,237,228,0.08)'}
        >
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'rgba(242,237,228,0.05)', border: '1px solid rgba(242,237,228,0.1)' }}>
            <MessageSquare size={22} style={{ color: 'rgba(242,237,228,0.7)' }} />
          </div>
          <h3 className="text-base font-semibold mb-2" style={{ color: '#F2EDE4' }}>تواصل مباشرة بدون تسجيل</h3>
          <p className="text-xs leading-relaxed" style={{ color: 'rgba(242,237,228,0.5)' }}>
            أرسل رسالتك مباشرة بدون أي التزامات. سنرد عليك في أقرب وقت.
          </p>
        </button>
      </div>
    </div>
  );
}

function EmailRegistration({ onConfirm }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    console.log('[Contact Gate] Email registered:', email);
    setSent(true);
    setTimeout(() => onConfirm(email), 1500);
  };

  if (sent) {
    return (
      <div className="max-w-md mx-auto text-center py-8">
        <CheckCircle size={40} className="mx-auto mb-3" style={{ color: '#F2EDE4' }} />
        <p className="text-sm" style={{ color: 'rgba(242,237,228,0.8)' }}>تم تسجيل بريدك — سنتابع طلبك...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-10">
      <h3 className="text-xl font-semibold mb-2" style={{ color: '#F2EDE4' }}>أدخل بريدك الإلكتروني</h3>
      <p className="text-sm mb-6" style={{ color: 'rgba(242,237,228,0.5)' }}>لمتابعة حالة طلبك وتلقي التأكيد</p>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input type="email" required className="form-input-dark flex-1" placeholder="example@email.com"
          value={email} onChange={(e) => setEmail(e.target.value)} dir="ltr" style={{ textAlign: 'right' }} />
        <button type="submit" className="btn-primary px-5 py-3 shrink-0"><Send size={16} /></button>
      </form>
    </div>
  );
}

function ContactForm({ prefillEmail }) {
  const [form, setForm] = useState({ name: '', phone: '', email: prefillEmail || '', service: '', message: '' });
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
      try { await fetch(CONFIG.CONTACT_WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); }
      catch (err) { console.error(err); }
    } else { console.log('[Contact Form]', payload); }
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
        <CheckCircle size={48} className="mx-auto mb-4" style={{ color: '#F2EDE4' }} />
        <h3 className="text-2xl font-semibold mb-2" style={{ color: '#F2EDE4' }}>تم إرسال رسالتك</h3>
        <p className="text-sm" style={{ color: 'rgba(242,237,228,0.6)' }}>سنتواصل معك في أقرب وقت ممكن.</p>
      </div>
    );
  }

  const labelStyle = { color: 'rgba(242,237,228,0.8)' };
  const reqStyle = { color: '#F2EDE4' };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium mb-2" style={labelStyle}>الاسم <span style={reqStyle}>*</span></label>
          <input type="text" className="form-input-dark" placeholder="اسمك الكامل" value={form.name} onChange={(e) => handleChange('name', e.target.value)} />
          {errors.name && <FieldError msg={errors.name} />}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" style={labelStyle}>الجوال <span style={reqStyle}>*</span></label>
          <input type="tel" className="form-input-dark" placeholder="05XXXXXXXX" value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} dir="ltr" style={{ textAlign: 'right' }} />
          {errors.phone && <FieldError msg={errors.phone} />}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2" style={labelStyle}>البريد الإلكتروني</label>
        <input type="email" className="form-input-dark" placeholder="example@email.com" value={form.email} onChange={(e) => handleChange('email', e.target.value)} dir="ltr" style={{ textAlign: 'right' }} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2" style={labelStyle}>الخدمة المطلوبة</label>
        <select className="form-input-dark" value={form.service} onChange={(e) => handleChange('service', e.target.value)}>
          <option value="">اختر الخدمة (اختياري)...</option>
          {SERVICES.map((s) => <option key={s.id} value={s.name}>{s.name}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2" style={labelStyle}>رسالتك <span style={reqStyle}>*</span></label>
        <textarea className="form-input-dark resize-none" rows={5} placeholder="اشرح احتياجك القانوني..." value={form.message} onChange={(e) => handleChange('message', e.target.value)} />
        {errors.message && <FieldError msg={errors.message} />}
      </div>
      <button type="submit" disabled={loading} className="btn-primary w-full justify-center" style={{ opacity: loading ? 0.7 : 1 }}>
        {loading ? 'جارٍ الإرسال...' : 'إرسال الرسالة'}
      </button>
    </form>
  );
}

function FieldError({ msg }) {
  return (
    <div className="flex items-center gap-1.5 mt-1.5">
      <AlertCircle size={13} className="text-red-400" />
      <span className="text-xs text-red-400">{msg}</span>
    </div>
  );
}

export default function ContactPage() {
  const [gateChoice, setGateChoice] = useState(null);
  const [prefillEmail, setPrefillEmail] = useState('');
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-hero-text', { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out', delay: 0.2 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative pt-32 pb-20 noise-overlay"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1400&q=80')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 z-10" style={{ background: 'rgba(13,31,51,0.88)' }} />
        <div className="relative z-20 max-w-7xl mx-auto px-6">
          <p className="contact-hero-text text-xs font-mono tracking-widest uppercase mb-4 opacity-0" style={{ color: 'rgba(242,237,228,0.7)', fontFamily: 'IBM Plex Mono' }}>ابدأ الآن</p>
          <h1 className="contact-hero-text text-4xl md:text-6xl font-semibold mb-4 opacity-0" style={{ color: '#F2EDE4' }}>
            تواصل <span className="font-display italic" style={{ color: '#FAF8F3' }}>معنا</span>
          </h1>
          <p className="contact-hero-text text-base md:text-lg max-w-xl opacity-0" style={{ color: 'rgba(242,237,228,0.6)' }}>
            مشكلتك القانونية تستحق إجابة واضحة. نحن هنا للاستماع والمساعدة.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16" style={{ background: '#1B3A5C' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Form area */}
            <div className="rounded-[2rem] p-8 md:p-10" style={{ background: 'rgba(13,31,51,0.7)', border: '1px solid rgba(242,237,228,0.08)' }}>
              {!gateChoice && <ContactGate onChoice={setGateChoice} />}
              {gateChoice === 'email' && <EmailRegistration onConfirm={(email) => { setPrefillEmail(email); setGateChoice('form-ready'); }} />}
              {(gateChoice === 'direct' || gateChoice === 'form-ready') && (
                <div>
                  <h2 className="text-2xl font-semibold mb-2" style={{ color: '#F2EDE4' }}>أرسل رسالتك</h2>
                  <p className="text-sm mb-8" style={{ color: 'rgba(242,237,228,0.5)' }}>سنرد عليك خلال ٢٤ ساعة في أيام العمل</p>
                  <ContactForm prefillEmail={prefillEmail} />
                </div>
              )}
            </div>

            {/* Direct contact */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2" style={{ color: '#F2EDE4' }}>تواصل مباشر</h2>
                <p className="text-sm" style={{ color: 'rgba(242,237,228,0.5)' }}>تفضل بالتواصل المباشر معنا عبر القنوات التالية</p>
              </div>

              {/* WhatsApp */}
              <a href={CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-[1.5rem] transition-all duration-300"
                style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(34,197,94,0.5)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(34,197,94,0.25)'}
              >
                <div className="w-12 h-12 rounded-2xl bg-green-600 flex items-center justify-center shrink-0">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-0.5 text-green-400">واتساب</p>
                  <p className="text-sm" style={{ color: 'rgba(242,237,228,0.7)' }} dir="ltr">{CONFIG.whatsapp}</p>
                </div>
              </a>

              {/* Email */}
              <a href={`mailto:${CONFIG.email}`} className="flex items-center gap-4 p-5 rounded-[1.5rem] transition-all duration-300"
                style={{ background: 'rgba(242,237,228,0.05)', border: '1px solid rgba(242,237,228,0.08)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(242,237,228,0.2)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(242,237,228,0.08)'}
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: 'rgba(242,237,228,0.1)', border: '1px solid rgba(242,237,228,0.15)' }}>
                  <Mail size={20} style={{ color: '#F2EDE4' }} />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-0.5" style={{ color: '#F2EDE4' }}>البريد الإلكتروني</p>
                  <p className="text-sm" style={{ color: 'rgba(242,237,228,0.6)' }}>{CONFIG.email}</p>
                </div>
              </a>

              {/* Phone */}
              <a href={`tel:${CONFIG.phone}`} className="flex items-center gap-4 p-5 rounded-[1.5rem] transition-all duration-300"
                style={{ background: 'rgba(242,237,228,0.05)', border: '1px solid rgba(242,237,228,0.08)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(242,237,228,0.2)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(242,237,228,0.08)'}
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: 'rgba(242,237,228,0.1)', border: '1px solid rgba(242,237,228,0.15)' }}>
                  <Phone size={20} style={{ color: '#F2EDE4' }} />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-0.5" style={{ color: '#F2EDE4' }}>الهاتف</p>
                  <p className="text-sm" style={{ color: 'rgba(242,237,228,0.6)' }} dir="ltr">{CONFIG.phone}</p>
                </div>
              </a>

              {/* Address */}
              <div className="flex items-center gap-4 p-5 rounded-[1.5rem]" style={{ background: 'rgba(242,237,228,0.04)', border: '1px solid rgba(242,237,228,0.07)' }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: 'rgba(242,237,228,0.08)', border: '1px solid rgba(242,237,228,0.12)' }}>
                  <MapPin size={20} style={{ color: '#F2EDE4' }} />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-0.5" style={{ color: '#F2EDE4' }}>الموقع</p>
                  <p className="text-sm" style={{ color: 'rgba(242,237,228,0.6)' }}>{CONFIG.address}</p>
                </div>
              </div>

              {/* Working hours */}
              <div className="p-5 rounded-[1.5rem]" style={{ background: 'rgba(242,237,228,0.05)', border: '1px solid rgba(242,237,228,0.08)' }}>
                <p className="text-xs mb-1" style={{ color: 'rgba(242,237,228,0.7)', fontFamily: 'IBM Plex Mono' }}>ساعات العمل</p>
                <p className="text-sm" style={{ color: 'rgba(242,237,228,0.7)' }}>الأحد – الخميس: ٩ص – ٦م</p>
                <p className="text-xs mt-1" style={{ color: 'rgba(242,237,228,0.4)' }}>نرد على واتساب خارج ساعات العمل حسب الإمكانية</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
