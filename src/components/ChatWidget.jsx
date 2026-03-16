import { useState, useRef, useEffect } from 'react';
import { X, Scale, Send } from 'lucide-react';
import CONFIG from '../config';
import { useNavigate } from 'react-router-dom';

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
    text: 'نتعامل مع جميع أنواع القضايا: المدنية والتجارية والجنائية والعمالية والأسرية وغيرها.',
    navigate: '/services',
    navigateLabel: 'استعرض الخدمات',
    options: [{ label: 'رجوع للقائمة', key: 'greeting' }],
  },
  probono: {
    text: 'الخدمة المجتمعية (Pro Bono) هي تمثيل قانوني مجاني لوجه الله لمن لا يستطيع تحمّل أتعاب المحاماة.',
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
    <div className="flex items-center gap-1 px-4 py-3 rounded-2xl rounded-br-sm w-fit" style={{ background: 'rgba(27,58,92,0.15)' }}>
      <span className="w-2 h-2 rounded-full typing-dot" style={{ background: 'rgba(27,58,92,0.5)' }} />
      <span className="w-2 h-2 rounded-full typing-dot" style={{ background: 'rgba(27,58,92,0.5)' }} />
      <span className="w-2 h-2 rounded-full typing-dot" style={{ background: 'rgba(27,58,92,0.5)' }} />
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
      setMessages((prev) => [...prev, {
        from: 'bot',
        text: response.text,
        options: response.options,
        navigate: response.navigate,
        navigateLabel: response.navigateLabel,
        whatsapp: response.whatsapp,
      }]);
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
        className={`fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 ${open ? 'hidden' : 'flex'}`}
        style={{ background: '#1B3A5C', color: '#F2EDE4', boxShadow: '0 8px 32px rgba(27,58,92,0.5)' }}
        aria-label="فتح المحادثة"
      >
        <Scale size={22} />
      </button>

      {/* Chat Panel */}
      {open && (
        <div
          className="fixed bottom-6 left-6 z-50 w-[340px] max-h-[520px] flex flex-col rounded-[1.5rem] overflow-hidden shadow-2xl chat-panel"
          style={{ background: '#FAF8F3', border: '1px solid rgba(27,58,92,0.15)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ background: '#1B3A5C', borderColor: 'rgba(242,237,228,0.1)' }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(242,237,228,0.15)', border: '1px solid rgba(242,237,228,0.25)' }}>
                <Scale size={16} style={{ color: '#F2EDE4' }} />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: '#F2EDE4' }}>مساعد نواة القانون</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-dot" />
                  <span className="text-xs" style={{ color: 'rgba(242,237,228,0.5)' }}>متاح الآن</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 rounded-xl transition-colors"
              style={{ color: 'rgba(242,237,228,0.5)' }}
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
                    <div className="rounded-2xl rounded-br-sm px-4 py-3 text-sm leading-relaxed max-w-[85%] whitespace-pre-line"
                      style={{ background: 'rgba(27,58,92,0.08)', color: '#1B3A5C', border: '1px solid rgba(27,58,92,0.1)' }}
                    >
                      {msg.text}
                    </div>
                    {msg.navigate && (
                      <button
                        onClick={() => { navigate(msg.navigate); handleClose(); }}
                        className="text-xs px-4 py-2 rounded-xl transition-colors"
                        style={{ background: 'rgba(27,58,92,0.1)', border: '1px solid rgba(27,58,92,0.2)', color: '#1B3A5C' }}
                      >
                        {msg.navigateLabel} ←
                      </button>
                    )}
                    {msg.whatsapp && (
                      <a
                        href={CONFIG.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs px-4 py-2 rounded-xl transition-colors"
                        style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', color: '#16a34a' }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        تواصل عبر واتساب
                      </a>
                    )}
                    {i === messages.length - 1 && msg.options && (
                      <div className="flex flex-wrap gap-2 mt-1">
                        {msg.options.map((opt) => (
                          <button
                            key={opt.key}
                            onClick={() => handleOption(opt.key)}
                            className="text-xs px-3 py-1.5 rounded-full transition-all"
                            style={{ border: '1px solid rgba(27,58,92,0.2)', color: '#1B3A5C' }}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex justify-start">
                    <div className="rounded-2xl rounded-bl-sm px-4 py-3 text-sm max-w-[85%]"
                      style={{ background: '#1B3A5C', color: '#F2EDE4' }}
                    >
                      {msg.text}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {typing && <div><TypingIndicator /></div>}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t flex items-center gap-2" style={{ borderColor: 'rgba(27,58,92,0.08)' }}>
            <Send size={13} style={{ color: 'rgba(27,58,92,0.3)' }} />
            <p className="text-xs" style={{ color: 'rgba(27,58,92,0.4)' }}>اختر أحد الخيارات أعلاه للمتابعة</p>
          </div>
        </div>
      )}
    </>
  );
}
