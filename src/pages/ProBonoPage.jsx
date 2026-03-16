import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Heart, CheckCircle, AlertCircle } from 'lucide-react';
import CONFIG from '../config';

const PROBLEM_TYPES = [
  { value: '', label: 'اختر نوع المشكلة...' },
  { value: 'عمالي', label: 'عمالي' },
  { value: 'أسري', label: 'أسري' },
  { value: 'مدني', label: 'مدني' },
  { value: 'جنائي', label: 'جنائي' },
  { value: 'إداري', label: 'إداري' },
  { value: 'أخرى', label: 'أخرى' },
];

export default function ProBonoPage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    problemType: '',
    description: '',
    confirmed: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pb-hero-text',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'الاسم مطلوب';
    if (!form.phone.trim()) e.phone = 'رقم الجوال مطلوب';
    if (!form.problemType) e.problemType = 'يرجى اختيار نوع المشكلة';
    if (form.description.trim().length < 100)
      e.description = `الوصف يجب أن يكون 100 حرف على الأقل (${form.description.trim().length}/100)`;
    if (form.description.trim().length > 1000) e.description = 'الوصف لا يتجاوز 1000 حرف';
    if (!form.confirmed) e.confirmed = 'يرجى تأكيد صحة المعلومات';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);

    const payload = {
      service: 'pro-bono',
      name: form.name,
      phone: form.phone,
      email: form.email || 'لم يُقدَّم',
      problemType: form.problemType,
      description: form.description,
      submittedAt: new Date().toISOString(),
    };

    if (CONFIG.PROBONO_WEBHOOK_URL) {
      try {
        await fetch(CONFIG.PROBONO_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.error('Webhook error:', err);
      }
    } else {
      console.log('[Pro Bono Form Submission]', payload);
    }

    setLoading(false);
    setSubmitted(true);
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <div style={{ background: '#FAF8F3', minHeight: '100vh', color: '#1B3A5C' }}>
      {/* Hero */}
      <section
        ref={heroRef}
        className="pt-32 pb-16 px-6"
        style={{ background: 'linear-gradient(to bottom, #EDE9E0, #FAF8F3)' }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <div className="pb-hero-text inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 opacity-0"
            style={{ background: 'rgba(27,58,92,0.12)', border: '1px solid rgba(27,58,92,0.25)' }}
          >
            <Heart size={28} style={{ color: '#1B3A5C' }} />
          </div>
          <h1 className="pb-hero-text text-4xl md:text-6xl font-semibold mb-4 leading-tight opacity-0" style={{ color: '#1B3A5C' }}>
            الخدمة المجتمعية
            <br />
            <span className="font-display italic" style={{ color: '#1B3A5C' }}>لوجه الله</span>
          </h1>
          <p className="pb-hero-text text-base md:text-lg leading-relaxed opacity-0" style={{ color: '#4a4a4a' }}>
            تطوع قانوني — Pro Bono
          </p>
        </div>
      </section>

      {/* Concept */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-[1.5rem] p-8 mb-8" style={{ background: 'white', border: '1px solid #e5e0d5' }}>
            <p className="text-base leading-8" style={{ color: '#333' }}>
              في مكتب <strong>نواة القانون</strong>، نؤمن بأن العدالة لا ينبغي أن تكون حكراً على من يملك ثمنها.
              لذلك، نخصّص بشكل دوري قضية واحدة لتمثيلها <strong>مجاناً تاماً</strong> — لا رسوم، لا التزامات،
              فقط خدمة قانونية حقيقية لمن يستحقها ولا يستطيع الوصول إليها.
            </p>
            <p className="text-base leading-8 mt-4" style={{ color: '#333' }}>
              هذه الخدمة هي <strong>تطوع قانوني</strong> خالص، انطلاقاً من مسؤوليتنا تجاه مجتمعنا،
              واقتداءً بمبدأ العدالة للجميع.
            </p>
          </div>

          {/* Eligibility */}
          <div className="rounded-[1.5rem] p-8 mb-12" style={{ background: 'white', border: '1px solid #e5e0d5' }}>
            <h2 className="text-xl font-semibold mb-5" style={{ color: '#1B3A5C' }}>معايير الأهلية</h2>
            <p className="text-sm mb-5" style={{ color: '#666' }}>
              لا توجد معايير صارمة — نحكم بالفهم والتقدير. لكن نأخذ في الاعتبار عادةً:
            </p>
            <ul className="space-y-3">
              {[
                'محدودية الدخل وعدم القدرة على تحمّل أتعاب المحاماة',
                'طبيعة القضية الإنسانية أو الاجتماعية',
                'غياب خيارات قانونية أخرى متاحة للمتقدم',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle size={18} className="mt-0.5 shrink-0" style={{ color: '#1B3A5C' }} />
                  <span className="text-sm leading-relaxed" style={{ color: '#333' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Form or Success */}
          {submitted ? (
            <div className="rounded-[1.5rem] p-10 text-center" style={{ background: 'white', border: '1px solid #1B3A5C' }}>
              <CheckCircle size={48} className="mx-auto mb-5" style={{ color: '#1B3A5C' }} />
              <h2 className="text-2xl font-semibold mb-3" style={{ color: '#1B3A5C' }}>
                تم استلام طلبك
              </h2>
              <p className="text-base leading-relaxed" style={{ color: '#555' }}>
                سيتواصل معك فريقنا خلال <strong>٧ أيام عمل</strong> للقضايا المقبولة.
                نشكرك على ثقتك بنا.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-[1.5rem] p-8 space-y-6"
              style={{ background: 'white', border: '1px solid #e5e0d5' }}
              noValidate
            >
              <div>
                <h2 className="text-2xl font-semibold mb-1" style={{ color: '#1B3A5C' }}>
                  تقدم بطلبك
                </h2>
                <p className="text-sm" style={{ color: '#888' }}>
                  لا يلزم إنشاء حساب — ملأ النموذج وسنتواصل معك مباشرة.
                </p>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                  الاسم الكامل <span style={{ color: '#1B3A5C' }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="أدخل اسمك الكامل"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
                {errors.name && <FieldError msg={errors.name} />}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                  رقم الجوال <span style={{ color: '#1B3A5C' }}>*</span>
                  <span className="text-xs font-normal mr-2" style={{ color: '#888' }}>(واتساب مفضل)</span>
                </label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="05XXXXXXXX"
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  dir="ltr"
                  style={{ textAlign: 'right' }}
                />
                {errors.phone && <FieldError msg={errors.phone} />}
              </div>

              {/* Email (optional) */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                  البريد الإلكتروني
                  <span className="text-xs font-normal mr-2" style={{ color: '#888' }}>(اختياري)</span>
                </label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="example@email.com"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  dir="ltr"
                  style={{ textAlign: 'right' }}
                />
              </div>

              {/* Problem type */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                  نوع المشكلة القانونية <span style={{ color: '#1B3A5C' }}>*</span>
                </label>
                <select
                  className="form-input"
                  value={form.problemType}
                  onChange={(e) => handleChange('problemType', e.target.value)}
                >
                  {PROBLEM_TYPES.map((opt) => (
                    <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.problemType && <FieldError msg={errors.problemType} />}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                  وصف المشكلة <span style={{ color: '#1B3A5C' }}>*</span>
                </label>
                <textarea
                  className="form-input resize-none"
                  rows={5}
                  placeholder="اشرح مشكلتك بالتفصيل (100-1000 حرف)..."
                  value={form.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  maxLength={1000}
                />
                <div className="flex justify-between mt-1">
                  {errors.description && <FieldError msg={errors.description} />}
                  <span className="text-xs mr-auto" style={{ color: '#aaa' }}>
                    {form.description.length}/1000
                  </span>
                </div>
              </div>

              {/* Confirmation */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1 w-4 h-4 [accent-color:#1B3A5C] shrink-0"
                    checked={form.confirmed}
                    onChange={(e) => handleChange('confirmed', e.target.checked)}
                  />
                  <span className="text-sm leading-relaxed" style={{ color: '#333' }}>
                    أقر بأن المعلومات المقدمة صحيحة، وأن طلبي مقدم بنية حسنة.
                  </span>
                </label>
                {errors.confirmed && <FieldError msg={errors.confirmed} />}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl font-semibold text-base transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: '#1B3A5C',
                  color: '#F2EDE4',
                  opacity: loading ? 0.7 : 1,
                  transitionTimingFunction: 'cubic-bezier(0.25,0.46,0.45,0.94)',
                }}
              >
                {loading ? 'جارٍ الإرسال...' : 'إرسال الطلب'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

function FieldError({ msg }) {
  return (
    <div className="flex items-center gap-1.5 mt-1.5">
      <AlertCircle size={13} style={{ color: '#dc2626' }} />
      <span className="text-xs" style={{ color: '#dc2626' }}>{msg}</span>
    </div>
  );
}
