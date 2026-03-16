import { useState, useRef, useEffect } from 'react';
import { X, Scale, Send } from 'lucide-react';
import CONFIG from '../config';
import { useNavigate } from 'react-router-dom';

// ── State Machine Chat Responses ──
const BOT_RESPONSES = {
  greeting: {
    text: 'أهلاً وسهلاً! كيف أقدر أساعدك اليوم؟',
    options: [
      { label: 'كيف أحجز استشارة؟', key: 'booking' },
      { label: 'ما أنواع القضايا التي تتعاملون معها؟', key: 'cases' },
      { label: 'ما الخدمة المجتمعية؟', key: 'probono' },
      { label: 'كيف أتواصل معكم؟', key: 'contact' },
    ],
  },
  booking: {
    text: 'لحجز استشارة قانونية، تفضل بزيارة صفحة "تواصل معنا" وسيتواصل معك أحد المختصين في أقرب وقت.',
    navigate: '/contact',
    navigateLabel: 'اذهب لصفحة التواصل',
    options: [{ label: 'رجوع للقائمة', key: 'greeting' }],
  },
  cases: {
    text: 'نتعامل مع جميع أنواع القضايا: المدنية والتجارية والجنائية والعمالية والأسرية وغيرها. يمكنك الاطلاع على خدماتنا الكاملة في صفحة الخدمات.',
    navigate: '/services',
    navigateLabel: 'استعرض الخدمات',
    options: [{ label: 'رجوع للقائمة', key: 'greeting' }],
  },
  probono: {
    text: 'الخدمة المجتمعية (Pro Bono) هي تمثيل قانوني مجاني لوجه الله لمن لا يستطيع تحمّل أتعاب المحاماة. نختار قضية واحدة بشكل دوري لخدمتها مجاناً.',
    navigate: '/pro-bono',
    navigateLabel: 'تقدم بطلب الخدمة المجتمعية',
    options: [{ label: 'رجوع للقائمة', key: 'greeting' }],
  },
  contact: {
    text: `يمكنك التواصل معنا مباشرة:\n📱 واتساب: ${CONFIG.whatsapp}\n📧 البريد: ${CONFIG.email}`,
    whatsapp: true,
    options: [{ label: 'رجوع للقائمة', key: 'greeting' }],
  },
  fallback: {
    text: 'شكراً على سؤالك. سأحيلك لأحد المختصين في المكتب للإجابة عليك بشكل أدق.',
    whatsapp: true,
    options: [{ label: 'رجوع للقائمة', key: 'greeting' }],
  },
};

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 bg-slate rounded-2xl rounded-br-sm w-fit">
      <span className="w-2 h-2 rounded-full bg-ivory/40 typing-dot" />
      <span className="w-2 h-2 rounded-full bg-ivory/40 typing-dot" />
      <span className="w-2 h-2 rounded-full bg-ivory/40 typing-dot" />
    </div>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [currentState, setCurrentState] = useState('greeting');
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open && messages.length === 0) {
      // Initial greeting
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        const greeting = BOT_RESPONSES.greeting;
        setMessages([{ from: 'bot', text: greeting.text, options: greeting.options }]);
        setCurrentState('greeting');
      }, 800);
    }
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const handleOption = (key) => {
    const userMsg = BOT_RESPONSES[currentState]?.options?.find((o) => o.key === key)?.label || key;
    setMessages((prev) => [...prev, { from: 'user', text: userMsg }]);
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      const response = BOT_RESPONSES[key] || BOT_RESPONSES.fallback;
      setMessages((prev) => [
        ...prev,
        {
          from: 'bot',
          text: response.text,
          options: response.options,
          navigate: response.navigate,
          navigateLabel: response.navigateLabel,
          whatsapp: response.whatsapp,
        },
      ]);
      setCurrentState(key);
    }, 1000);
  };

  const handleClose = () => {
    setOpen(false);
    setMessages([]);
    setCurrentState('greeting');
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full bg-champagne text-obsidian shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 ${open ? 'hidden' : 'flex'}`}
        style={{ boxShadow: '0 8px 32px rgba(201,168,76,0.4)' }}
        aria-label="فتح المحادثة"
      >
        <Scale size={22} />
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-6 left-6 z-50 w-[340px] max-h-[520px] flex flex-col rounded-[1.5rem] overflow-hidden shadow-2xl chat-panel border border-white/10"
          style={{ background: '#0D0D12' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-slate border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-champagne/10 border border-champagne/30 flex items-center justify-center">
                <Scale size={16} className="text-champagne" />
              </div>
              <div>
                <p className="text-sm font-semibold text-ivory">مساعد نواة القانون</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-dot" />
                  <span className="text-xs text-ivory/40">متاح الآن</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 rounded-xl text-ivory/40 hover:text-ivory hover:bg-white/5 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
            {messages.map((msg, i) => (
              <div key={i}>
                {msg.from === 'bot' ? (
                  <div className="space-y-2">
                    <div className="bg-slate rounded-2xl rounded-br-sm px-4 py-3 text-sm text-ivory/90 leading-relaxed max-w-[85%] whitespace-pre-line">
                      {msg.text}
                    </div>
                    {/* Navigate button */}
                    {msg.navigate && (
                      <button
                        onClick={() => { navigate(msg.navigate); handleClose(); }}
                        className="text-xs px-4 py-2 rounded-xl bg-champagne/10 border border-champagne/30 text-champagne hover:bg-champagne/20 transition-colors"
                      >
                        {msg.navigateLabel} ←
                      </button>
                    )}
                    {/* WhatsApp button */}
                    {msg.whatsapp && (
                      <a
                        href={CONFIG.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs px-4 py-2 rounded-xl bg-green-600/10 border border-green-600/30 text-green-400 hover:bg-green-600/20 transition-colors"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        تواصل عبر واتساب
                      </a>
                    )}
                    {/* Quick reply options */}
                    {i === messages.length - 1 && msg.options && (
                      <div className="flex flex-wrap gap-2 mt-1">
                        {msg.options.map((opt) => (
                          <button
                            key={opt.key}
                            onClick={() => handleOption(opt.key)}
                            className="text-xs px-3 py-1.5 rounded-full border border-white/15 text-ivory/70 hover:border-champagne/50 hover:text-champagne transition-all"
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex justify-start">
                    <div className="bg-champagne/15 rounded-2xl rounded-bl-sm px-4 py-3 text-sm text-champagne max-w-[85%]">
                      {msg.text}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {typing && (
              <div>
                <TypingIndicator />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer hint */}
          <div className="px-4 py-3 border-t border-white/5 flex items-center gap-2">
            <Send size={13} className="text-ivory/20" />
            <p className="text-xs text-ivory/25">اختر أحد الخيارات أعلاه للمتابعة</p>
          </div>
        </div>
      )}
    </>
  );
}
