import { Helmet } from 'react-helmet-async'
import { useLang } from '../context/LanguageContext'

// Stripe Payment Links
const STRIPE_LINKS = {
  de: 'https://buy.stripe.com/9B67sN4ME9SBgdG8EP1Jm0b',
  en: 'https://buy.stripe.com/bJedRb92U8Ox0eIaMX1Jm0c',
  bg: 'https://buy.stripe.com/7sY28t4ME8Ox0eIf3d1Jm0d',
}

// Amazon Kindle Links
const AMAZON_LINKS = {
  de: 'https://amzn.eu/d/05eWsYEZ',
  en: 'https://www.amazon.com/dp/B0G2J74YBK',
  bg: null,
}

const content = {
  de: {
    price: '22 €',
    badge: 'PEAK CARE · 25 Jahre Erfahrung',
    title: 'Mentaler Schutzschild 2026',
    subtitle: 'Endlich Ruhe im Kopf – trotz Nachrichtenchaos',
    intro: 'Seit 2022 schläft Europa schlechter. Nicht wegen persönlicher Probleme — wegen einer Welt, die keine Pause macht. Hier ist das System dagegen.',
    launchBadge: 'Launch-Woche — Einführungspreis 22 €',
    ctaBtn: 'Jetzt kaufen — 22 € · Sofort als PDF',
    ctaSub: 'Sofortiger Download nach Zahlung · Sichere Zahlung via Stripe',
    ctaGuarantee: '30-Tage-Geld-zurück-Garantie — kein Risiko',
    authorName: 'Andreas Donner · Peak Care',
    authorBio: '25 Jahre Gebäude- und Krisenberatung. 500+ Sanierungsprojekte in ganz Europa. In meiner Arbeit mit Immobilienbesitzern erlebe ich seit 2022 täglich dasselbe: Die eigentliche Krise findet nicht im Gebäude statt — sondern im Kopf des Besitzers. Dieses Programm ist die Antwort darauf, die ich mir damals gewünscht hätte.',
    problemHeadline: 'Sie kennen das.',
    problems: [
      { time: '3:00 Uhr', text: 'Wach. Kein Grund. Der Kopf dreht sich um Dinge, die Sie tagsüber kaum beschäftigen.' },
      { time: '10 Minuten', text: 'Nachrichten geschaut. Obwohl Sie wussten, dass Sie danach schlechter dran sind als vorher.' },
      { time: 'Jeden Tag', text: 'Dieses Hintergrundrauschen. Nicht Panik — aber auch nicht Ruhe. Einfach nicht mehr ganz ruhig.' },
    ],
    problemClose: 'Das ist keine Schwäche. Das ist eine Fehlanpassung Ihres Überlebensinstinkts — und sie hat eine Lösung.',
    daysHeadline: 'Was Sie in 7 Tagen bekommen',
    daysSub: 'Jeden Tag: ein Konzept, eine Übung, eine Aufgabe. Max. 30 Minuten.',
    days: [
      { tag: 'TAG 1', title: 'Warum Ihr Gehirn im Krisenmodus feststeckt', result: 'Sie verstehen den Mechanismus — und hören auf, sich dafür zu schämen.' },
      { tag: 'TAG 2', title: 'Die Informations-Entgiftung', result: 'Doomscrolling dauerhaft stoppen — mit einem System, das hält.' },
      { tag: 'TAG 3', title: 'Der Körper als Verbündeter', result: 'Anspannung in 4 Minuten abbauen. Wissenschaftlich belegt.' },
      { tag: 'TAG 4', title: 'Vorbereitung ist die beste Angsttherapie', result: 'Konkret handeln — und dabei ruhiger werden, nicht ängstlicher.' },
      { tag: 'TAG 5', title: 'Gedanken-Hygiene', result: 'Katastrophengedanken in 4 Schritten stoppen. Um 3 Uhr nachts.' },
      { tag: 'TAG 6', title: 'Der soziale Schutzschild', result: 'Ihr Netzwerk als echten Stabilitätsfaktor aufbauen.' },
      { tag: 'TAG 7', title: 'Der nachhaltige Schutzschild', result: 'Das System festigen — so dass es hält, auch wenn die Nachrichten schlechter werden.' },
    ],
    forWhomHeadline: 'Für wen ist dieses Programm?',
    forWhom: [
      { icon: '🌙', who: 'Menschen die nachts wachliegen', desc: 'Wegen der Nachrichten, nicht wegen persönlicher Probleme.' },
      { icon: '🏠', who: 'Immobilienbesitzer & Investoren', desc: 'Die Sicherheit brauchen — auch wenn die Märkte unsicher sind.' },
      { icon: '👨‍👩‍👧', who: 'Familien mit Verantwortung', desc: 'Die Orientierung suchen ohne in den Panik-Modus zu fallen.' },
    ],
    whyHeadline: 'Warum ein System — und kein Ratschlag',
    whySub: 'Ratschläge kennen Sie. Ein System ist etwas anderes.',
    why: [
      { icon: '🧠', title: 'Neurobiologisch fundiert', desc: 'Jedes der 7 Werkzeuge basiert auf peer-reviewten Studien zur Stressregulation (Lieberman, LeDoux, Huberman). Kein Selbsthilfe-Fluff.' },
      { icon: '⏱️', title: 'Max. 30 Min. pro Tag', desc: 'Das Programm ist für Menschen mit echtem Leben gebaut. Nicht für Menschen mit unbegrenzt Zeit. Ein Konzept, eine Übung, eine Aufgabe.' },
      { icon: '📋', title: 'Arbeitsblätter inklusive', desc: 'Was Sie aufschreiben, verankert anders als was Sie nur lesen. Jeder Tag hat ein Arbeitsblatt — ausfüllbar als PDF oder ausgedruckt.' },
    ],
    faqHeadline: 'Häufige Fragen',
    faqs: [
      { q: 'Ist das Esoterik oder Therapie?', a: 'Weder noch. Es ist angewandte Neurobiologie — wissenschaftlich fundiert, praktisch anwendbar. Kein Positives Denken, keine Meditation, keine Therapie.' },
      { q: 'Was wenn ich einen Tag auslasse?', a: 'Weitermachen. Das Programm ist für das echte Leben gebaut. Es vergibt Unterbrechungen — aber nicht Halbherzigkeit.' },
      { q: 'Für wen ist das NICHT geeignet?', a: 'Für Menschen in akuten psychischen Krisen. Wenn Angst Ihren Alltag ernsthaft einschränkt, ist professionelle Hilfe der richtige erste Schritt.' },
      { q: 'In welchem Format erhalte ich das Buch?', a: 'Als PDF — sofort nach Zahlung. Keine App, keine Anmeldung, kein Abo. Einmal kaufen, dauerhaft nutzen.' },
      { q: 'Was wenn es mir nicht hilft?', a: '30-Tage-Geld-zurück-Garantie. Keine Fragen, keine Diskussion. Einfach eine Mail an peakcare@peak-care.com.' },
    ],
    includes: [
      '✓ Vollständiges PDF-Programm (7 Kapitel + Bonus-Toolbox)',
      '✓ Arbeitsblätter für jeden Tag',
      '✓ Sofortiger Download nach Zahlung',
      '✓ Kein Abo, keine Folgekosten',
      '✓ 30-Tage-Geld-zurück-Garantie — kein Risiko',
    ],
    finalCta: 'Jetzt kaufen — Sofort als PDF',
    paymentNote: 'Sichere Zahlung via Stripe · Kreditkarte, SEPA, Google Pay',
    trust: ['25 Jahre Erfahrung', '500+ Projekte', 'Peak Care Qualität'],
    disclaimer: 'Dieses Programm richtet sich an Menschen mit erhöhtem Hintergrundstress — nicht an Menschen in akuten psychischen Krisen. Bei ernsthafter Einschränkung des Alltags empfehlen wir professionelle Unterstützung.',
    amazonNote: 'Auch auf Amazon Kindle erhältlich',
  },
  en: {
    price: '€22',
    badge: 'PEAK CARE · 25 Years of Experience',
    title: 'Mental Shield 2026',
    subtitle: 'Finally Calm – Despite the News Chaos',
    intro: 'Since 2022, Europe has been sleeping worse. Not because of personal problems — because of a world that never pauses. Here is the system against it.',
    launchBadge: 'Launch Week — Introductory Price €22',
    ctaBtn: 'Buy Now — €22 · Instant PDF Download',
    ctaSub: 'Instant download after payment · Secure payment via Stripe',
    ctaGuarantee: '30-day money-back guarantee — zero risk',
    authorName: 'Andreas Donner · Peak Care',
    authorBio: '25 years of building and crisis consulting. 500+ renovation projects across Europe. In my work with property owners since 2022, I see the same thing every day: the real crisis doesn\'t happen in the building — it happens in the owner\'s mind. This programme is the answer I wish had existed back then.',
    problemHeadline: 'You know this.',
    problems: [
      { time: '3:00 AM', text: 'Wide awake. No reason. Your mind races over things that barely bother you during the day.' },
      { time: '10 minutes', text: 'Checked the news. Even though you knew you\'d feel worse afterwards than before.' },
      { time: 'Every day', text: 'That background noise. Not panic — but not calm either. Just never quite at peace anymore.' },
    ],
    problemClose: 'This is not weakness. It\'s a misadaptation of your survival instinct — and it has a solution.',
    daysHeadline: 'What you get in 7 days',
    daysSub: 'Each day: one concept, one exercise, one task. Max. 30 minutes.',
    days: [
      { tag: 'DAY 1', title: 'Why your brain is stuck in crisis mode', result: 'You understand the mechanism — and stop blaming yourself for it.' },
      { tag: 'DAY 2', title: 'The Information Detox', result: 'Stop doomscrolling for good — with a system that actually holds.' },
      { tag: 'DAY 3', title: 'Your body as an ally', result: 'Release tension in 4 minutes. Scientifically proven.' },
      { tag: 'DAY 4', title: 'Preparation is the best anxiety therapy', result: 'Take concrete action — and become calmer in the process, not more anxious.' },
      { tag: 'DAY 5', title: 'Thought Hygiene', result: 'Stop catastrophic thinking in 4 steps. At 3 AM, without turning on the light.' },
      { tag: 'DAY 6', title: 'The Social Shield', result: 'Build your network as a real stability factor.' },
      { tag: 'DAY 7', title: 'The Sustainable Shield', result: 'Lock in the system — so it holds even when the news gets worse.' },
    ],
    forWhomHeadline: 'Who is this programme for?',
    forWhom: [
      { icon: '🌙', who: 'People who lie awake at night', desc: 'Because of the news — not because of personal problems.' },
      { icon: '🏠', who: 'Property owners & investors', desc: 'Who need security — even when markets are uncertain.' },
      { icon: '👨‍👩‍👧', who: 'Families with responsibility', desc: 'Who want orientation without falling into panic mode.' },
    ],
    whyHeadline: 'Why a system — not advice',
    whySub: 'You\'ve heard plenty of advice. A system is different.',
    why: [
      { icon: '🧠', title: 'Neuroscience-based', desc: 'Each of the 7 tools is based on peer-reviewed studies on stress regulation (Lieberman, LeDoux, Huberman). No self-help fluff.' },
      { icon: '⏱️', title: 'Max. 30 min. per day', desc: 'This programme is built for people with real lives. Not for people with unlimited time. One concept, one exercise, one task.' },
      { icon: '📋', title: 'Worksheets included', desc: 'What you write down anchors differently than what you just read. Each day has a worksheet — fillable as PDF or printed out.' },
    ],
    faqHeadline: 'Frequently Asked Questions',
    faqs: [
      { q: 'Is this esoteric or therapy?', a: 'Neither. It\'s applied neurobiology — scientifically grounded, practically applicable. No positive thinking, no meditation, no therapy.' },
      { q: 'What if I miss a day?', a: 'Keep going. The programme is built for real life. It forgives interruptions — but not half-heartedness.' },
      { q: 'Who is this NOT for?', a: 'For people in acute psychological crisis. If anxiety is seriously disrupting your daily life, professional help is the right first step.' },
      { q: 'What format will I receive the book in?', a: 'As a PDF — instantly after payment. No app, no registration, no subscription. Buy once, use forever.' },
      { q: 'What if it doesn\'t help me?', a: '30-day money-back guarantee. No questions, no discussion. Just send an email to peakcare@peak-care.com.' },
    ],
    includes: [
      '✓ Complete PDF programme (7 chapters + bonus toolkit)',
      '✓ Worksheets for every day',
      '✓ Instant download after payment',
      '✓ No subscription, no ongoing costs',
      '✓ 30-day money-back guarantee — zero risk',
    ],
    finalCta: 'Buy Now — Instant PDF Download',
    paymentNote: 'Secure payment via Stripe · Credit card, SEPA, Google Pay',
    trust: ['25 Years Experience', '500+ Projects', 'Peak Care Quality'],
    disclaimer: 'This programme is designed for people with elevated background stress — not for people in acute psychological crisis. If anxiety is seriously disrupting your daily life, we recommend professional support.',
    amazonNote: 'Also available on Amazon Kindle',
  },
}

export default function MentalerSchutzschild() {
  const { lang } = useLang()
  const c = content[lang] || content.de
  const stripeLink = STRIPE_LINKS[lang] || STRIPE_LINKS.de
  const amazonLink = AMAZON_LINKS[lang] || AMAZON_LINKS.en

  const coverSuffix = lang === 'en' ? 'en' : 'de'
  const ogImage = `https://www.peak-care.com/images/covers/mentaler-schutzschild-${coverSuffix}.jpg`
  const ogTitle = lang === 'en'
    ? 'Mental Shield 2026 — Finally calm in your head | Peak Care'
    : 'Mentaler Schutzschild 2026 — Endlich Ruhe im Kopf | Peak Care'
  const ogDesc = lang === 'en'
    ? 'The 9-week program against news anxiety and mental overload. PDF e-book — immediate download. 30-day money-back guarantee.'
    : 'Das 9-Wochen-Programm gegen Nachrichtenangst und mentale Überlastung. PDF-E-Book — Sofort-Download. 30-Tage-Geld-zurück-Garantie.'

  return (
    <>
    <Helmet>
      <title>{ogTitle}</title>
      <meta name="description" content={ogDesc} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDesc} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content="product" />
      <meta property="og:url" content={`https://www.peak-care.com/mentaler-schutzschild`} />
    </Helmet>
    <div className="bg-gray-950 text-white min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #0B1221 0%, #111D35 55%, #1B2E5E 100%)' }}
      >
        <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #2A4A8C, #E8C84A, #2A4A8C)' }} />

        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <div className="inline-block mb-6 px-6 py-2 rounded-full text-sm font-bold tracking-widest"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#4A7FD4' }}>
            {c.badge}
          </div>

          <h1 className="text-5xl md:text-6xl font-black leading-tight mb-4" style={{ color: '#FFFFFF' }}>
            {c.title}
          </h1>
          <p className="text-2xl md:text-3xl font-light mb-8" style={{ color: '#E8C84A' }}>
            {c.subtitle}
          </p>
          <p className="text-lg md:text-xl leading-relaxed mb-10" style={{ color: '#E8EDF5', maxWidth: 600, margin: '0 auto 2.5rem' }}>
            {c.intro}
          </p>

          <div className="inline-block mb-6 px-4 py-2 rounded-full text-sm font-bold"
            style={{ background: 'rgba(232,200,74,0.15)', border: '1px solid rgba(232,200,74,0.4)', color: '#E8C84A' }}>
            🚀 {c.launchBadge}
          </div>

          <div>
            <a
              href={stripeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xl font-bold px-10 py-5 rounded-xl transition-transform hover:scale-105 cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #E8C84A, #D4A820)', color: '#0B1221', textDecoration: 'none' }}
            >
              {c.ctaBtn}
            </a>
          </div>
          <p className="mt-4 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {c.ctaSub}
          </p>
          <p className="mt-2 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {c.ctaGuarantee}
          </p>
        </div>
      </section>

      {/* ── MOCKUP BILD ──────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 py-10 flex justify-center">
        <img
          src={lang === 'en' ? '/images/covers/mentaler-schutzschild-en.jpg' : '/images/covers/mentaler-schutzschild-de.jpg'}
          alt={lang === 'en' ? 'Mental Shield 2026 – Book Cover' : 'Mentaler Schutzschild 2026 – Buchcover'}
          className="w-full max-w-xl rounded-2xl shadow-2xl"
          style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.5)' }}
        />
      </section>

      {/* ── AUTOR-AUTORITÄT ──────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex gap-6 items-start p-7 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(232,200,74,0.2)' }}>
          <div className="shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black"
            style={{ background: 'linear-gradient(135deg, #E8C84A, #D4A820)', color: '#0B1221' }}>AD</div>
          <div>
            <div className="font-bold mb-1" style={{ color: '#E8C84A' }}>{c.authorName}</div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{c.authorBio}</p>
          </div>
        </div>
      </section>

      {/* ── PROBLEM ──────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-black text-center mb-10" style={{ color: '#FFFFFF' }}>
          {c.problemHeadline}
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {c.problems.map((item) => (
            <div key={item.time} className="rounded-2xl p-6"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="text-2xl font-black mb-3" style={{ color: '#E8C84A' }}>{item.time}</div>
              <p className="leading-relaxed" style={{ color: '#E8EDF5' }}>{item.text}</p>
            </div>
          ))}
        </div>
        <p className="text-center mt-8 text-lg" style={{ color: 'rgba(255,255,255,0.6)' }}>
          {c.problemClose}
        </p>
      </section>

      {/* ── 7 TAGE ───────────────────────────────────────────────────── */}
      <section className="py-16" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-black text-center mb-3" style={{ color: '#FFFFFF' }}>
            {c.daysHeadline}
          </h2>
          <p className="text-center mb-10" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {c.daysSub}
          </p>
          <div className="space-y-4">
            {c.days.map((item) => (
              <div key={item.tag} className="flex gap-4 items-start p-5 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.04)', borderLeft: '4px solid #E8C84A' }}>
                <span className="font-black text-sm shrink-0 mt-0.5 w-14" style={{ color: '#E8C84A' }}>{item.tag}</span>
                <div>
                  <div className="font-bold mb-1" style={{ color: '#FFFFFF' }}>{item.title}</div>
                  <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>→ {item.result}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FÜR WEN ──────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-black text-center mb-10" style={{ color: '#FFFFFF' }}>
          {c.forWhomHeadline}
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {c.forWhom.map((item) => (
            <div key={item.who} className="text-center rounded-2xl p-6"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="text-4xl mb-3">{item.icon}</div>
              <div className="font-bold mb-2" style={{ color: '#FFFFFF' }}>{item.who}</div>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SYSTEM-LOGIK ─────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-black text-center mb-3" style={{ color: '#FFFFFF' }}>
          {c.whyHeadline}
        </h2>
        <p className="text-center mb-10 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
          {c.whySub}
        </p>
        <div className="grid gap-5 md:grid-cols-3">
          {c.why.map((item) => (
            <div key={item.title} className="rounded-2xl p-6 text-center"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="text-3xl mb-3">{item.icon}</div>
              <div className="font-bold mb-2" style={{ color: '#E8C84A' }}>{item.title}</div>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="py-16" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-black text-center mb-10" style={{ color: '#FFFFFF' }}>
            {c.faqHeadline}
          </h2>
          <div className="space-y-5">
            {c.faqs.map((item) => (
              <div key={item.q} className="rounded-xl p-5"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="font-bold mb-2" style={{ color: '#FFFFFF' }}>→ {item.q}</div>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREIS & FINALER CTA ───────────────────────────────────────── */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #1B2E5E, #2A4A8C)' }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="text-6xl font-black mb-2" style={{ color: '#E8C84A' }}>{c.price}</div>
          <p className="text-lg mb-2" style={{ color: 'rgba(255,255,255,0.8)' }}>
            {c.title} — {c.subtitle}
          </p>
          <ul className="text-sm mb-8 space-y-1 list-none" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {c.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <a
            href={stripeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xl font-bold px-12 py-5 rounded-xl transition-transform hover:scale-105 cursor-pointer mb-4"
            style={{ background: 'linear-gradient(135deg, #E8C84A, #D4A820)', color: '#0B1221', textDecoration: 'none' }}
          >
            {c.finalCta}
          </a>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {c.paymentNote}
          </p>

          {amazonLink && (
            <div className="mt-4">
              <a
                href={amazonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium px-6 py-3 rounded-lg transition-opacity hover:opacity-80"
                style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}
              >
                <span>🛒</span>
                <span>{c.amazonNote} — €9.99</span>
              </a>
            </div>
          )}

          <div className="mt-10 pt-10 border-t flex justify-center gap-8 flex-wrap"
            style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            {c.trust.map((t) => (
              <span key={t} className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.5)' }}>
                ✓ {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER ───────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 py-8 text-center">
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
          {c.disclaimer}
        </p>
      </section>

    </div>
    </>
  )
}
