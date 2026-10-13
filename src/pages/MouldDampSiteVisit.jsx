import { useSEO } from '../hooks/useSEO'
import { useLang } from '../context/LanguageContext'
import ContactSection from '../components/ContactSection'

// ---------------------------------------------------------------------------
// W2 "Feuchte und Schimmel: Besichtigung" (Landeseite fuer Anzeige PC-3, V-WERBEKAMPAGNE).
// Andreas-Entscheide 12./13.10.2026: nur BG + EN, keine DE-Fassung; Zielgruppe alle in
// Bulgarien Lebenden, neutral formuliert. Seitentext = MARKETING-Vorlage
// MKT_PC-3_V2_Feuchte-Schimmel_BG-EN_Anzeige-Seitentext_ENTWURF_2026-10-12.md, Abschnitt 2,
// woertlich (Texthoheit MARKETING); nur Meta-Title/-Description von SEO.
// Preis auf Anfrage, keine Garantie-/Fristaussage, kein "Gutachten". BG-Gegenlese Vladimir
// vor Live. Nutzt useSEO (nie react-helmet), Formular = ContactSection (Brevo + generate_lead).
// ---------------------------------------------------------------------------

const WA = 'https://wa.me/359898436561'
const URL_BG = 'https://peak-care.com/ogled-muhal-vlaga'
const URL_EN = 'https://peak-care.com/mould-damp-site-visit-bulgaria'

const content = {
  bg: {
    meta: {
      title: 'Мухъл и влага в дома: оглед на място | Peak Care',
      description: 'Мухъл или влажна стена? Измерваме на място откъде идва влагата и предлагаме какво да се направи. Започваме с три снимки. Цена при запитване.',
      canonical: URL_BG,
    },
    tag: 'PEAK CARE · БЪЛГАРИЯ',
    h1: 'Мухъл и влага в дома ви: първо оглед на място',
    intro: 'Мухълът рядко идва от стената, която виждате. Появява се, когато отоплението се включи и първите студени нощи срещнат жилище, останало затворено от пролетта. Намираме откъде идва влагата, преди нещо да бъде боядисано отгоре.',
    ctaPrimary: 'Заявете оглед',
    ctaSecondary: 'Пишете в WhatsApp',
    stepsHeadline: 'Как протича',
    steps: [
      { title: 'Изпращате ни населеното място и три снимки', text: 'на това, което виждате: засегнатата стена, ъгъла, помещението. Чрез формата или във WhatsApp.' },
      { title: 'Идваме на оглед на място, в най-скоро време след запитването.', text: 'Измерваме стената на няколко височини спрямо сравнителна стена и при нужда проверяваме точката на оросяване и правим инфрачервени снимки. Така различаваме конденз от теч, покачваща се влага, топлинен мост или вода отвън.' },
      { title: 'Получавате кратко писмено резюме', text: 'какво сме установили на място и какво предлагаме, със снимки, за да решите, където и да сте.' },
      { title: 'Вие решавате.', text: 'Ако е нужна работа, я изпълняваме и отстраняваме причината, със строителен надзор и фотодокументация от отварянето на стената до крайното състояние. Ако не е нужна, ще знаете и това.' },
    ],
    forWhomHeadline: 'За кого е',
    forWhom: 'За всички, които живеят в България или ползват имот тук, и за купувачи, които искат да знаят състоянието на една стена, преди да купят.',
    causesHeadline: 'Причини, които разграничаваме',
    causes: ['конденз по студени стени', 'течове по тръби или тераси', 'покачваща се влага', 'топлинни мостове в ъглите и балконските плочи', 'вода отвън при основата на стената'],
    faqHeadline: 'Въпроси',
    faqs: [
      { q: 'Трябва ли да съм там?', a: 'Не. Можем да направим оглед, като достъпът е уреден чрез съсед или управител.' },
      { q: 'Колко струва?', a: 'Цена при запитване. Кажете ни населеното място и изпратете снимки, ще отговорим със следващата стъпка.' },
      { q: 'Какво ви е нужно от мен?', a: 'Населеното място, три снимки, кратко описание какво сте забелязали и как да влезем.' },
      { q: 'Извършвате ли и ремонта?', a: 'Да: хидроизолация, премахване на мухъл, обновяване, до ключ.' },
      { q: 'На какви езици?', a: 'Български, английски и немски.' },
    ],
    contactLabel: 'Контакт',
  },
  en: {
    meta: {
      title: 'Mould and damp in your home: site visit | Peak Care',
      description: 'Mould or a damp wall? We measure on site where the moisture comes from and propose what to do. Three photos are enough to start. Price on request.',
      canonical: URL_EN,
    },
    tag: 'PEAK CARE · BULGARIA',
    h1: 'Mould and damp in your home: a site visit first',
    intro: 'Mould is rarely about the wall you can see. It shows when the heating goes on and the first cold nights meet a property that has stood closed since spring. We find where the moisture comes from before anything is painted over.',
    ctaPrimary: 'Request a visit',
    ctaSecondary: 'Message on WhatsApp',
    stepsHeadline: 'What happens',
    steps: [
      { title: 'You send the town and three photos', text: 'of what you see: the affected wall, the corner, the room. By form or WhatsApp.' },
      { title: 'We visit on site, promptly after your request.', text: 'We measure the wall at several heights against a reference wall and, where needed, check the dew point and take infrared readings. This separates condensation from a leak, rising damp, a cold bridge or water entering from outside.' },
      { title: 'You receive a short written summary', text: 'of what we found on site and what we propose, with photographs, so you can decide from wherever you are.' },
      { title: 'You decide.', text: 'If work is needed, we carry it out and treat the cause, with supervision and photo documentation from the opening of the wall to the finished state. If no work is needed, you know that too.' },
    ],
    forWhomHeadline: 'Who this is for',
    forWhom: 'Anyone who lives in Bulgaria or uses a property here, and buyers who want to know the condition of a wall before they buy.',
    causesHeadline: 'Typical causes we separate',
    causes: ['condensation on cold walls', 'leaks in pipes or terraces', 'rising damp', 'cold bridges at corners and balcony slabs', 'water from outside reaching the base of the wall'],
    faqHeadline: 'Questions',
    faqs: [
      { q: 'Do I have to be there?', a: 'No. We can visit with access arranged through a neighbour or manager.' },
      { q: 'What does it cost?', a: 'Price on request. Tell us the town and send photos, and we answer with the next step.' },
      { q: 'What do you need from me?', a: 'The town, three photos, a short description of what you noticed, and how we get in.' },
      { q: 'Do you also do the repair?', a: 'Yes: damp sealing, mould removal, renovation, turnkey.' },
      { q: 'In which languages?', a: 'Bulgarian, English and German.' },
    ],
    contactLabel: 'Contact',
  },
}

function buildSchema(c) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: c.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: c.h1,
      serviceType: 'Mould and damp site visit',
      areaServed: { '@type': 'Country', name: 'Bulgaria' },
      provider: {
        '@type': 'LocalBusiness',
        name: 'Peak Care',
        url: 'https://peak-care.com',
        telephone: '+359898436561',
        areaServed: 'Bulgaria',
      },
      description: c.meta.description,
      url: c.meta.canonical,
    },
  ]
}

const track = () => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') window.gtag('event', 'whatsapp_click', { page: 'w2_mould_damp' })
}

export default function MouldDampSiteVisit() {
  const { lang } = useLang()
  // Keine DE-Fassung (Andreas 12.10.): DE-Umschalter faellt auf EN zurueck.
  const c = content[lang] || content.en
  useSEO({
    title: c.meta.title,
    description: c.meta.description,
    canonical: c.meta.canonical,
    alternates: [
      { hreflang: 'bg', href: URL_BG },
      { hreflang: 'en', href: URL_EN },
      { hreflang: 'x-default', href: URL_EN },
    ],
    jsonLd: buildSchema(c),
  })

  return (
    <>
      {/* Hero */}
      <section className="bg-gray-950 text-white pt-20 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-950/50 to-gray-950" />
        <div className="relative max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-teal-400 uppercase mb-4 block">{c.tag}</span>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">{c.h1}</h1>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">{c.intro}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#kontakt" className="inline-block text-center bg-teal-600 hover:bg-teal-500 text-white font-semibold px-7 py-3 rounded transition-colors">
              {c.ctaPrimary}
            </a>
            <a href={WA} onClick={track} className="inline-block text-center border border-gray-600 hover:border-teal-500 text-gray-200 font-semibold px-7 py-3 rounded transition-colors">
              {c.ctaSecondary}
            </a>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-gray-900 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">{c.stepsHeadline}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {c.steps.map((s, i) => (
              <div key={i} className="flex gap-4">
                <div className="text-teal-600 font-bold text-xl mt-0.5 shrink-0">{String(i + 1).padStart(2, '0')}</div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  <span className="text-white font-semibold">{s.title}</span> {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section className="bg-gray-950 py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-xs font-bold tracking-widest text-teal-500 uppercase mb-3">{c.forWhomHeadline}</div>
          <p className="text-gray-300 text-sm leading-relaxed">{c.forWhom}</p>
        </div>
      </section>

      {/* Causes */}
      <section className="bg-gray-900 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-6">{c.causesHeadline}</h2>
          <ul className="space-y-2">
            {c.causes.map((it, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                <svg className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-950 py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">{c.faqHeadline}</h2>
          <div className="space-y-6">
            {c.faqs.map((f, i) => (
              <div key={i} className="border-b border-gray-800 pb-6">
                <div className="text-white font-semibold mb-2">{f.q}</div>
                <p className="text-gray-400 text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-sm mt-10">
            {c.contactLabel}: <a href={WA} onClick={track} className="text-teal-400 underline">WhatsApp +359 898 436 561</a> · peak-care.com
          </p>
        </div>
      </section>

      {/* Lead form (Brevo inbox + GA generate_lead) */}
      <ContactSection />
    </>
  )
}
