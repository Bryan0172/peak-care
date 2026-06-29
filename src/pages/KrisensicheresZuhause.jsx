import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLang } from '../context/LanguageContext'
import CheckoutModal from '../components/CheckoutModal'

const content = {
  de: {
    price: '17 €',
    badge: 'PEAK CARE · 25 Jahre Erfahrung',
    tag: 'Krisenvorsorge · Familienplanung',
    title: 'Krisensicheres Zuhause',
    subtitle: 'Schritt-für-Schritt vorbereitet — für Blackout, Wasserausfall und Versorgungsengpass',
    intro: 'April 2025: Iberian Blackout. 60 Millionen Menschen. 18 Stunden kein Strom, kein Wasser, kein Netz. Die meisten waren nicht vorbereitet. Dieser Ratgeber ändert das — konkret, schnell, ohne Panik.',
    ctaBtn: 'Jetzt kaufen — 17 € · Sofort als PDF',
    ctaSub: 'Sofortiger Download nach Zahlung · Sichere Zahlung via Stripe',
    ctaGuarantee: '30-Tage-Geld-zurück-Garantie — kein Risiko',
    authorName: 'Andreas Donner · Peak Care',
    authorBio: '25 Jahre Gebäude- und Krisenberatung. 500+ Sanierungsprojekte in ganz Europa. In meiner Arbeit sehe ich täglich: Gebäude kann man reparieren. Familien, die unvorbereitet in eine Krise geraten, haben es schwerer. Dieser Ratgeber ist mein praktischstes Werkzeug — destilliert aus 25 Jahren Erfahrung.',
    problemHeadline: 'Was passiert, wenn das Netz ausfällt?',
    problems: [
      { time: 'Stunde 1', text: 'Kein Strom. Heizung aus. Telefon lädt nicht. Die meisten Familien wissen in diesem Moment nicht, was sie tun sollen.' },
      { time: 'Stunde 6', text: 'Kein Wasser aus dem Hahn. Kein Bargeld greifbar. Keine Informationen aus dem Radio. Kinder fragen: Was ist los?' },
      { time: 'Stunde 18', text: 'Lebensmittel verderben. Medikamente fehlen. Der Nachbar hat einen Plan — Sie nicht. Das Gefühl: Hilflosigkeit.' },
    ],
    problemClose: 'Das ist keine Schwarzmalerei — das ist was im April 2025 in Spanien und Portugal passiert ist. Vorbereitung dauert 2 Stunden. Die Ruhe danach: dauerhaft.',
    chaptersHeadline: 'Was Sie in diesem Ratgeber bekommen',
    chaptersSub: 'Konkrete Anleitungen. Keine Theorie. Direkt umsetzbar.',
    chapters: [
      { tag: 'KAPITEL 1', title: 'Wasservorrat richtig anlegen', result: 'Wie viel, welche Behälter, wie lagern — für 72 Stunden und darüber hinaus.' },
      { tag: 'KAPITEL 2', title: 'Lebensmittelvorrat ohne Angst', result: 'Was wirklich lange hält, was nicht — und wie man ohne Kocher auskommt.' },
      { tag: 'KAPITEL 3', title: 'Licht, Wärme, Kommunikation', result: 'Welche Geräte sich wirklich lohnen. Was die Bundesregierung empfiehlt — und was sie verschweigt.' },
      { tag: 'KAPITEL 4', title: 'Medizinische Grundversorgung', result: 'Die 12 Medikamente, die in jedem Haushalt sein sollten. Inklusive Checkliste.' },
      { tag: 'KAPITEL 5', title: 'Bargeld & Dokumente', result: 'Welche Dokumente kopiert sein müssen. Wie viel Bargeld in welchen Scheinen.' },
      { tag: 'KAPITEL 6', title: 'Evakuierungsplan für die Familie', result: 'Treffpunkte, Notfallkontakte, Ablauf — auch wenn das Handy nicht funktioniert.' },
      { tag: 'KAPITEL 7', title: 'Kinder und ältere Angehörige', result: 'Wie man Kinder vorbereitet, ohne Angst zu machen. Spezialausstattung für Senioren.' },
    ],
    forWhomHeadline: 'Für wen ist dieser Ratgeber?',
    forWhom: [
      { icon: '👨‍👩‍👧', who: 'Familien mit Kindern', desc: 'Die Verantwortung tragen und konkrete Antworten brauchen — nicht Angst.' },
      { icon: '🏠', who: 'Immobilienbesitzer & Investoren', desc: 'Besonders in Bulgarien und Südosteuropa — mit anderer Infrastruktur als Westeuropa.' },
      { icon: '👴', who: 'Haushalte mit älteren Angehörigen', desc: 'Für die ein Versorgungsausfall schnell zur medizinischen Frage wird.' },
    ],
    whyHeadline: 'Warum dieser Ratgeber — und kein YouTube-Video',
    whySub: 'Konkret. Vollständig. Offline verfügbar.',
    why: [
      { icon: '📋', title: '47-Punkte-Checkliste', desc: 'Alle Empfehlungen auf einer Seite. Ausdruckbar. Abhakbar. Ohne Zurückblättern.' },
      { icon: '💶', title: 'Budgetiert ab 180 EUR', desc: '72-Stunden-Vorrat für eine vierköpfige Familie — mit konkreten Produktempfehlungen und realistischen Kosten.' },
      { icon: '📴', title: 'Offline nutzbar', desc: 'PDF-Format. Kein Internet nötig. Ausdrucken und in den Notfallordner legen — genau dann verfügbar, wenn es zählt.' },
    ],
    faqHeadline: 'Häufige Fragen',
    faqs: [
      { q: 'Ist das für Prepper oder für normale Familien?', a: 'Für normale Familien. Kein Bunker, keine Waffen, keine Paranoia. Die Deutsche Bundesregierung empfiehlt seit 2016 genau das was in diesem Ratgeber steht — die meisten setzen es nur nicht um.' },
      { q: 'Wie lange dauert die Umsetzung?', a: 'Das Lesen: 2-3 Stunden. Die Umsetzung (Einkaufen, Einlagern, Plan festigen): ein Wochenende. Danach: dauerhaft vorbereitet.' },
      { q: 'Was wenn ich in einer Mietwohnung lebe?', a: 'Der Ratgeber hat ein eigenes Kapitel für Mieter. Vieles ist unabhängig von der Wohnform umsetzbar.' },
      { q: 'In welchem Format erhalte ich den Ratgeber?', a: 'Als PDF — sofort nach Zahlung. Kein Abo, keine Anmeldung. Einmal kaufen, dauerhaft nutzen. Ausdrucken empfohlen.' },
      { q: 'Was wenn ich unzufrieden bin?', a: '30-Tage-Geld-zurück-Garantie. Keine Fragen, keine Diskussion. Einfach eine Mail an peakcare@peak-care.com.' },
    ],
    includes: [
      '✓ Vollständiger Ratgeber als PDF (7 Kapitel)',
      '✓ 47-Punkte-Checkliste (ausdruckbar)',
      '✓ Budgetplan ab 180 EUR für 4 Personen',
      '✓ Evakuierungsplan-Vorlage für Ihre Familie',
      '✓ Sofortiger Download nach Zahlung',
      '✓ Kein Abo, keine Folgekosten',
      '✓ 30-Tage-Geld-zurück-Garantie',
    ],
    finalCta: 'Jetzt kaufen — Sofort als PDF',
    paymentNote: 'Sichere Zahlung via Stripe · Kreditkarte, SEPA, Google Pay',
    trust: ['25 Jahre Erfahrung', '500+ Projekte', 'Peak Care Qualität'],
    disclaimer: 'Dieser Ratgeber dient der privaten Krisenvorsorge und ersetzt keine behördlichen Evakuierungsanweisungen oder medizinische Notfallversorgung. Im akuten Notfall folgen Sie immer den Anweisungen der Behörden.',
  },
  en: {
    price: '€17',
    badge: 'PEAK CARE · 25 Years of Experience',
    tag: 'Crisis Preparedness · Family Planning',
    title: 'Crisis-Proof Home',
    subtitle: 'Step-by-step prepared — for blackout, water outage and supply shortages',
    intro: 'April 2025: Iberian Blackout. 60 million people. 18 hours without power, water or internet. Most were unprepared. This guide changes that — concrete, fast, without panic.',
    ctaBtn: 'Buy Now — €17 · Instant PDF Download',
    ctaSub: 'Instant download after payment · Secure payment via Stripe',
    ctaGuarantee: '30-day money-back guarantee — zero risk',
    authorName: 'Andreas Donner · Peak Care',
    authorBio: '25 years of building and crisis consulting. 500+ renovation projects across Europe. In my work I see it daily: buildings can be repaired. Families caught unprepared in a crisis have a much harder time. This guide is my most practical tool — distilled from 25 years of experience.',
    problemHeadline: 'What happens when the grid goes down?',
    problems: [
      { time: 'Hour 1', text: 'No power. Heating off. Phone won\'t charge. Most families don\'t know what to do in this moment.' },
      { time: 'Hour 6', text: 'No water from the tap. No cash on hand. No information from the radio. Children ask: what\'s happening?' },
      { time: 'Hour 18', text: 'Food spoiling. Medication running out. Your neighbour has a plan — you don\'t. The feeling: helplessness.' },
    ],
    problemClose: 'This isn\'t scaremongering — this is what happened in Spain and Portugal in April 2025. Preparation takes 2 hours. The calm it brings: permanent.',
    chaptersHeadline: 'What you get in this guide',
    chaptersSub: 'Concrete instructions. No theory. Immediately actionable.',
    chapters: [
      { tag: 'CHAPTER 1', title: 'Water storage done right', result: 'How much, which containers, how to store — for 72 hours and beyond.' },
      { tag: 'CHAPTER 2', title: 'Food supply without fear', result: 'What really keeps long, what doesn\'t — and how to manage without a cooker.' },
      { tag: 'CHAPTER 3', title: 'Light, heat, communication', result: 'Which devices are actually worth it. What governments recommend — and what they don\'t tell you.' },
      { tag: 'CHAPTER 4', title: 'Basic medical supplies', result: 'The 12 medications every household should have. Includes checklist.' },
      { tag: 'CHAPTER 5', title: 'Cash & documents', result: 'Which documents need to be copied. How much cash in which denominations.' },
      { tag: 'CHAPTER 6', title: 'Family evacuation plan', result: 'Meeting points, emergency contacts, procedure — even when the phone doesn\'t work.' },
      { tag: 'CHAPTER 7', title: 'Children and elderly relatives', result: 'How to prepare children without creating fear. Special equipment for seniors.' },
    ],
    forWhomHeadline: 'Who is this guide for?',
    forWhom: [
      { icon: '👨‍👩‍👧', who: 'Families with children', desc: 'Who carry responsibility and need concrete answers — not anxiety.' },
      { icon: '🏠', who: 'Property owners & investors', desc: 'Especially in Bulgaria and Southeast Europe — with different infrastructure to Western Europe.' },
      { icon: '👴', who: 'Households with elderly relatives', desc: 'For whom a supply failure can quickly become a medical issue.' },
    ],
    whyHeadline: 'Why this guide — and not a YouTube video',
    whySub: 'Concrete. Complete. Available offline.',
    why: [
      { icon: '📋', title: '47-point checklist', desc: 'All recommendations on one page. Printable. Tickable. No flipping back.' },
      { icon: '💶', title: 'Budgeted from €180', desc: '72-hour supply for a family of four — with concrete product recommendations and realistic costs.' },
      { icon: '📴', title: 'Usable offline', desc: 'PDF format. No internet needed. Print it and put it in your emergency folder — available exactly when it counts.' },
    ],
    faqHeadline: 'Frequently Asked Questions',
    faqs: [
      { q: 'Is this for preppers or normal families?', a: 'For normal families. No bunker, no weapons, no paranoia. The German government has recommended exactly what\'s in this guide since 2016 — most people just haven\'t acted on it.' },
      { q: 'How long does implementation take?', a: 'Reading: 2-3 hours. Implementation (shopping, storing, finalising the plan): one weekend. After that: permanently prepared.' },
      { q: 'What if I live in a rented flat?', a: 'The guide has a dedicated chapter for renters. Much of it is applicable regardless of housing type.' },
      { q: 'What format will I receive the guide in?', a: 'As a PDF — instantly after payment. No subscription, no registration. Buy once, use forever. Printing recommended.' },
      { q: 'What if I\'m not satisfied?', a: '30-day money-back guarantee. No questions, no discussion. Just send an email to peakcare@peak-care.com.' },
    ],
    includes: [
      '✓ Complete guide as PDF (7 chapters)',
      '✓ 47-point checklist (printable)',
      '✓ Budget plan from €180 for 4 people',
      '✓ Family evacuation plan template',
      '✓ Instant download after payment',
      '✓ No subscription, no ongoing costs',
      '✓ 30-day money-back guarantee',
    ],
    finalCta: 'Buy Now — Instant PDF Download',
    paymentNote: 'Secure payment via Stripe · Credit card, SEPA, Google Pay',
    trust: ['25 Years Experience', '500+ Projects', 'Peak Care Quality'],
    disclaimer: 'This guide is intended for private crisis preparedness and does not replace official evacuation instructions or emergency medical services. In an acute emergency, always follow the instructions of the authorities.',
  },
}

export default function KrisensicheresZuhause() {
  const { lang } = useLang()
  const c = content[lang] || content.de
  const [checkout, setCheckout] = useState(null)

  const coverSuffix = lang === 'en' ? 'en' : 'de'
  const productId = `ebook_krisen_${lang === 'en' ? 'en' : 'de'}`

  function handleBuy() {
    setCheckout({
      productId,
      productName: c.title,
      coverImage: `/images/covers/krisensicher-${coverSuffix}.jpg`,
    })
  }

  const ogImage = `https://www.peak-care.com/images/covers/krisensicher-${coverSuffix}.jpg`
  const ogTitle = lang === 'en'
    ? 'Crisis-Proof Home — Step-by-step prepared for blackout & supply shortages | Peak Care'
    : 'Krisensicheres Zuhause — Schritt-für-Schritt vorbereitet für Blackout & Versorgungsengpass | Peak Care'
  const ogDesc = lang === 'en'
    ? 'The practical guide for families: water, food, light, heat, medicine — everything you need before the next crisis. PDF e-book — immediate download.'
    : 'Der praktische Ratgeber für Familien: Wasser, Lebensmittel, Licht, Wärme, Medikamente — alles was Sie brauchen bevor die nächste Krise kommt. PDF-E-Book — Sofort-Download.'

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
      <meta property="og:url" content="https://www.peak-care.com/krisensicheres-zuhause" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
    <div className="bg-gray-950 text-white min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #0B1221 0%, #1A1A0A 55%, #2D1F00 100%)' }}
      >
        <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #C2410C, #F97316, #C2410C)' }} />

        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <div className="inline-block mb-6 px-6 py-2 rounded-full text-sm font-bold tracking-widest"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#F97316' }}>
            {c.badge}
          </div>

          <h1 className="text-5xl md:text-6xl font-black leading-tight mb-4" style={{ color: '#FFFFFF' }}>
            {c.title}
          </h1>
          <p className="text-2xl md:text-3xl font-light mb-8" style={{ color: '#F97316' }}>
            {c.subtitle}
          </p>
          <p className="text-lg md:text-xl leading-relaxed mb-10" style={{ color: '#E8EDF5', maxWidth: 600, margin: '0 auto 2.5rem' }}>
            {c.intro}
          </p>

          <div>
            <button
              onClick={handleBuy}
              className="inline-block text-xl font-bold px-10 py-5 rounded-xl transition-transform hover:scale-105 cursor-pointer border-0"
              style={{ background: 'linear-gradient(135deg, #F97316, #C2410C)', color: '#FFFFFF' }}
            >
              {c.ctaBtn}
            </button>
          </div>
          <p className="mt-4 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {c.ctaSub}
          </p>
          <p className="mt-2 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {c.ctaGuarantee}
          </p>
        </div>
      </section>

      {/* ── COVER BILD ───────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 py-10 flex justify-center">
        <img
          src={`/images/covers/krisensicher-${coverSuffix}.jpg`}
          alt={lang === 'en' ? 'Crisis-Proof Home – Book Cover' : 'Krisensicheres Zuhause – Buchcover'}
          className="w-full max-w-xl rounded-2xl shadow-2xl"
          style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.5)' }}
        />
      </section>

      {/* ── AUTOR-AUTORITÄT ──────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex gap-6 items-start p-7 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(249,115,22,0.2)' }}>
          <div className="shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black"
            style={{ background: 'linear-gradient(135deg, #F97316, #C2410C)', color: '#FFFFFF' }}>AD</div>
          <div>
            <div className="font-bold mb-1" style={{ color: '#F97316' }}>{c.authorName}</div>
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
              <div className="text-2xl font-black mb-3" style={{ color: '#F97316' }}>{item.time}</div>
              <p className="leading-relaxed" style={{ color: '#E8EDF5' }}>{item.text}</p>
            </div>
          ))}
        </div>
        <p className="text-center mt-8 text-lg" style={{ color: 'rgba(255,255,255,0.6)' }}>
          {c.problemClose}
        </p>
      </section>

      {/* ── KAPITEL ──────────────────────────────────────────────────── */}
      <section className="py-16" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-black text-center mb-3" style={{ color: '#FFFFFF' }}>
            {c.chaptersHeadline}
          </h2>
          <p className="text-center mb-10" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {c.chaptersSub}
          </p>
          <div className="space-y-4">
            {c.chapters.map((item) => (
              <div key={item.tag} className="flex gap-4 items-start p-5 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.04)', borderLeft: '4px solid #F97316' }}>
                <span className="font-black text-sm shrink-0 mt-0.5 w-20" style={{ color: '#F97316' }}>{item.tag}</span>
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

      {/* ── WARUM ────────────────────────────────────────────────────── */}
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
              <div className="font-bold mb-2" style={{ color: '#F97316' }}>{item.title}</div>
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
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #1C0A00, #2D1F00)' }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="text-6xl font-black mb-2" style={{ color: '#F97316' }}>{c.price}</div>
          <p className="text-lg mb-2" style={{ color: 'rgba(255,255,255,0.8)' }}>
            {c.title} — {c.subtitle}
          </p>
          <ul className="text-sm mb-8 space-y-1 list-none" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {c.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <button
            onClick={handleBuy}
            className="inline-block text-xl font-bold px-12 py-5 rounded-xl transition-transform hover:scale-105 cursor-pointer border-0 mb-4"
            style={{ background: 'linear-gradient(135deg, #F97316, #C2410C)', color: '#FFFFFF' }}
          >
            {c.finalCta}
          </button>
          <p className="text-xs block" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {c.paymentNote}
          </p>

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

      {/* ── CHECKOUT MODAL ───────────────────────────────────────────── */}
      {checkout && (
        <CheckoutModal
          productId={checkout.productId}
          productName={checkout.productName}
          coverImage={checkout.coverImage}
          onClose={() => setCheckout(null)}
        />
      )}

    </div>
    </>
  )
}
