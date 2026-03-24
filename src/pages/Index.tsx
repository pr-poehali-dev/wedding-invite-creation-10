import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const HERO_IMAGE = 'https://cdn.poehali.dev/projects/140881a4-8e91-4ec5-815e-15487a91c2d1/files/8bab7bfa-0460-4033-b6f0-df7844e73ced.jpg';
const WEDDING_DATE = new Date('2026-07-25T13:00:00');
const RSVP_DEADLINE = '01.05.2026';

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: '#home', label: 'Главная' },
    { href: '#program', label: 'Программа' },
    { href: '#rsvp', label: 'Подтвердить' },
    { href: '#contacts', label: 'Контакты' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--wedding-ivory)]/90 backdrop-blur-sm border-b border-[var(--wedding-rose)]/10">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" className="font-cormorant text-xl italic text-[var(--wedding-rose)] tracking-wide">
          К & К
        </a>

        <ul className="hidden md:flex gap-8">
          {links.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-montserrat text-xs tracking-widest uppercase text-[var(--wedding-taupe)] hover:text-[var(--wedding-rose)] transition-colors duration-300"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button className="md:hidden text-[var(--wedding-rose)]" onClick={() => setOpen(!open)}>
          <Icon name={open ? 'X' : 'Menu'} size={20} />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[var(--wedding-ivory)] border-t border-[var(--wedding-rose)]/10 px-6 py-4">
          <ul className="flex flex-col gap-4">
            {links.map(l => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-montserrat text-xs tracking-widest uppercase text-[var(--wedding-taupe)] hover:text-[var(--wedding-rose)] transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATE);

  return (
    <section id="home" className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Свадебные цветы"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[var(--wedding-ivory)]/72" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p className="animate-fade-up font-montserrat text-xs tracking-[0.3em] uppercase text-[var(--wedding-rose)] mb-6">
          Приглашаем вас разделить с нами
        </p>

        <h1 className="animate-fade-up-delay-1 font-cormorant text-6xl md:text-8xl font-light italic text-[var(--wedding-taupe)] leading-none mb-2">
          Кирилл
        </h1>
        <p className="animate-fade-up-delay-2 font-cormorant text-3xl md:text-4xl text-[var(--wedding-rose)] mb-2 font-light">
          &amp;
        </p>
        <h1 className="animate-fade-up-delay-2 font-cormorant text-6xl md:text-8xl font-light italic text-[var(--wedding-taupe)] leading-none mb-10">
          Кристина
        </h1>

        <div className="animate-fade-up-delay-3 divider-ornament mb-8">
          <span className="font-cormorant text-lg italic text-[var(--wedding-rose)]">самый счастливый день</span>
        </div>

        <p className="animate-fade-up-delay-3 font-cormorant text-2xl md:text-3xl text-[var(--wedding-taupe)] mb-12 font-light">
          25 июля 2026 года
        </p>

        <div className="animate-fade-up-delay-4 grid grid-cols-4 gap-3 md:gap-6 max-w-md mx-auto">
          {[
            { value: days, label: 'дней' },
            { value: hours, label: 'часов' },
            { value: minutes, label: 'минут' },
            { value: seconds, label: 'секунд' },
          ].map(({ value, label }) => (
            <div key={label} className="bg-white/60 backdrop-blur-sm border border-[var(--wedding-rose)]/20 rounded py-3 px-2">
              <div className="font-cormorant text-3xl md:text-4xl text-[var(--wedding-rose)] font-light leading-none">
                {String(value).padStart(2, '0')}
              </div>
              <div className="font-montserrat text-[10px] tracking-widest uppercase text-[var(--wedding-taupe)] mt-1">
                {label}
              </div>
            </div>
          ))}
        </div>

        <div className="animate-fade-up-delay-4 mt-10">
          <a
            href="#rsvp"
            className="inline-block font-montserrat text-xs tracking-widest uppercase bg-[var(--wedding-rose)] text-white px-8 py-3 hover:bg-[var(--wedding-taupe)] transition-colors duration-300"
          >
            Подтвердить присутствие
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float text-[var(--wedding-rose)]/60">
        <Icon name="ChevronDown" size={24} />
      </div>
    </section>
  );
}

function ProgramSection() {
  const events = [
    { time: '13:00', icon: '💍', title: 'Регистрация брака', desc: 'Торжественная церемония бракосочетания' },
    { time: '13:30', icon: '📸', title: 'Фотосессия', desc: 'Прогулка и памятные снимки с молодожёнами' },
    { time: '15:00', icon: '🌸', title: 'Сбор гостей', desc: 'Встречаем гостей у банкетного зала, лёгкий фуршет' },
    { time: '15:30', icon: '💃', title: 'Репетиция встречи молодых', desc: 'Подготовка к торжественной встрече молодожёнов' },
    { time: '16:00', icon: '🍽', title: 'Начало банкета', desc: 'Праздничный ужин, тосты, музыка и танцы' },
    { time: 'До 23:00', icon: '✨', title: 'Веселье', desc: 'Слёзы радости, море улыбок и минимум неловких тостов (но это не точно)' },
  ];

  return (
    <section id="program" className="py-24 px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-montserrat text-xs tracking-[0.3em] uppercase text-[var(--wedding-rose)] mb-4">
            День свадьбы
          </p>
          <h2 className="font-cormorant text-5xl md:text-6xl italic font-light text-[var(--wedding-taupe)]">
            Программа
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-[52px] top-0 bottom-0 w-px bg-[var(--wedding-rose)]/20 hidden md:block" />
          <div className="flex flex-col gap-10">
            {events.map((event, i) => (
              <div key={i} className="flex gap-6 md:gap-8 items-start group">
                <div className="flex-shrink-0 w-[52px] text-right">
                  <span className="font-cormorant text-sm italic text-[var(--wedding-rose)]">{event.time}</span>
                </div>
                <div className="hidden md:flex flex-shrink-0 w-8 h-8 rounded-full border border-[var(--wedding-rose)]/40 bg-[var(--wedding-ivory)] items-center justify-center text-sm relative z-10 group-hover:border-[var(--wedding-rose)] transition-colors">
                  {event.icon}
                </div>
                <div className="flex-1 pb-2">
                  <div className="md:hidden text-xl mb-1">{event.icon}</div>
                  <h3 className="font-cormorant text-2xl italic text-[var(--wedding-taupe)] mb-1">{event.title}</h3>
                  <p className="font-montserrat text-sm text-muted-foreground leading-relaxed">{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RSVPSection() {
  const [name, setName] = useState('');
  const [guests, setGuests] = useState('1');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="rsvp" className="py-24 px-6 bg-[var(--wedding-blush)]">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-montserrat text-xs tracking-[0.3em] uppercase text-[var(--wedding-rose)] mb-4">
            Ждём вашего ответа
          </p>
          <h2 className="font-cormorant text-5xl md:text-6xl italic font-light text-[var(--wedding-taupe)] mb-4">
            Подтверждение
          </h2>
          <p className="font-montserrat text-sm text-muted-foreground">
            Пожалуйста, подтвердите своё присутствие до <strong className="text-[var(--wedding-rose)]">{RSVP_DEADLINE}</strong>
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-16 bg-white/60 backdrop-blur-sm border border-[var(--wedding-rose)]/20 rounded">
            <div className="text-4xl mb-4">💌</div>
            <h3 className="font-cormorant text-3xl italic text-[var(--wedding-taupe)] mb-3">
              Спасибо, {name}!
            </h3>
            <p className="font-montserrat text-sm text-muted-foreground">
              Мы будем рады видеть вас в этот особенный день
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white/60 backdrop-blur-sm border border-[var(--wedding-rose)]/20 rounded p-8 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-montserrat text-xs tracking-widest uppercase text-[var(--wedding-taupe)]">
                Ваше имя
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Иван Иванов"
                className="border border-[var(--wedding-rose)]/30 bg-transparent px-4 py-3 font-montserrat text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[var(--wedding-rose)] transition-colors rounded-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-montserrat text-xs tracking-widest uppercase text-[var(--wedding-taupe)]">
                Количество гостей
              </label>
              <select
                value={guests}
                onChange={e => setGuests(e.target.value)}
                className="border border-[var(--wedding-rose)]/30 bg-white px-4 py-3 font-montserrat text-sm text-foreground focus:outline-none focus:border-[var(--wedding-rose)] transition-colors rounded-sm"
              >
                {['1', '2', '3', '4', '5+'].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-montserrat text-xs tracking-widest uppercase text-[var(--wedding-taupe)]">
                Комментарий (необязательно)
              </label>
              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Предпочтения по алкоголю: шампанское, красное вино, белое вино, коньяк и т.д."
                rows={3}
                className="border border-[var(--wedding-rose)]/30 bg-transparent px-4 py-3 font-montserrat text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[var(--wedding-rose)] transition-colors rounded-sm resize-none"
              />
            </div>

            <button
              type="submit"
              className="font-montserrat text-xs tracking-widest uppercase bg-[var(--wedding-rose)] text-white px-8 py-4 hover:bg-[var(--wedding-taupe)] transition-colors duration-300"
            >
              Подтвердить присутствие
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function ContactsSection() {
  const faq = [
    { q: 'Дресс-код?', a: 'Приветствуется нарядная одежда в пастельных и нейтральных тонах. Пожалуйста, избегайте белого цвета.' },
    { q: 'Где будет проходить торжество?', a: 'Адрес и схема проезда будут отправлены каждому гостю дополнительно.' },
    { q: 'Можно ли взять детей?', a: 'Мы с радостью примем маленьких гостей — пожалуйста, укажите их в форме подтверждения.' },
    { q: 'Нужен ли подарок?', a: 'Ваше присутствие — лучший подарок для нас. Но если хотите порадовать — спросите у организаторов.' },
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="contacts" className="py-24 px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-montserrat text-xs tracking-[0.3em] uppercase text-[var(--wedding-rose)] mb-4">
            Есть вопросы?
          </p>
          <h2 className="font-cormorant text-5xl md:text-6xl italic font-light text-[var(--wedding-taupe)] mb-8">
            Контакты
          </h2>

          <div className="flex flex-col md:flex-row gap-6 justify-center mb-12">
            <div className="flex flex-col items-center gap-2 p-6 border border-[var(--wedding-rose)]/20 rounded">
              <span className="text-2xl">👰</span>
              <p className="font-montserrat text-xs tracking-widest uppercase text-[var(--wedding-taupe)]">Невеста</p>
              <a
                href="tel:+79537916923"
                className="font-cormorant text-xl italic text-[var(--wedding-rose)] hover:text-[var(--wedding-taupe)] transition-colors"
              >
                +7 (953) 791-69-23
              </a>
              <p className="font-montserrat text-xs text-muted-foreground">Кристина</p>
              <a
                href="https://t.me/kristina_pkm"
                className="font-montserrat text-xs text-[var(--wedding-rose)] hover:text-[var(--wedding-taupe)] transition-colors"
              >
                @kristina_pkm
              </a>
            </div>
            <div className="flex flex-col items-center gap-2 p-6 border border-[var(--wedding-rose)]/20 rounded">
              <span className="text-2xl">🤵</span>
              <p className="font-montserrat text-xs tracking-widest uppercase text-[var(--wedding-taupe)]">Жених</p>
              <a
                href="tel:+79529004125"
                className="font-cormorant text-xl italic text-[var(--wedding-rose)] hover:text-[var(--wedding-taupe)] transition-colors"
              >
                +7 (952) 900-41-25
              </a>
              <p className="font-montserrat text-xs text-muted-foreground">Кирилл</p>
              <a
                href="https://t.me/ROST_TMT"
                className="font-montserrat text-xs text-[var(--wedding-rose)] hover:text-[var(--wedding-taupe)] transition-colors"
              >
                @ROST_TMT
              </a>
            </div>
          </div>
        </div>

        <div className="mb-6 text-center">
          <p className="font-montserrat text-xs tracking-[0.25em] uppercase text-muted-foreground">
            Часто задаваемые вопросы
          </p>
        </div>

        <div className="flex flex-col gap-0 border-t border-[var(--wedding-rose)]/20">
          {faq.map((item, i) => (
            <div key={i} className="border-b border-[var(--wedding-rose)]/20">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left gap-4"
              >
                <span className="font-cormorant text-xl italic text-[var(--wedding-taupe)]">{item.q}</span>
                <Icon
                  name={openIdx === i ? 'ChevronUp' : 'ChevronDown'}
                  size={16}
                  className="text-[var(--wedding-rose)] flex-shrink-0"
                />
              </button>
              {openIdx === i && (
                <p className="font-montserrat text-sm text-muted-foreground pb-5 leading-relaxed">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-6 bg-[var(--wedding-blush)] text-center">
      <p className="font-cormorant text-3xl italic text-[var(--wedding-rose)] mb-3">
        Кирилл &amp; Кристина
      </p>
      <p className="font-montserrat text-xs tracking-widest uppercase text-[var(--wedding-taupe)] mb-6">
        25 июля 2026 года
      </p>
      <div className="divider-ornament max-w-xs mx-auto mb-6">
        <span className="text-[var(--wedding-rose)]">♡</span>
      </div>
      <p className="font-montserrat text-xs text-muted-foreground">
        Будем счастливы видеть вас рядом в этот особенный день
      </p>
    </footer>
  );
}

const Index = () => {
  return (
    <div className="min-h-screen bg-[var(--wedding-ivory)]">
      <Nav />
      <HeroSection />
      <ProgramSection />
      <RSVPSection />
      <ContactsSection />
      <Footer />
    </div>
  );
};

export default Index;