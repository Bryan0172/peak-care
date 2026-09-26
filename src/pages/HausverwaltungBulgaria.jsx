import { useSEO } from '../hooks/useSEO'
import { useLang } from '../context/LanguageContext'

const content = {
  de: {
    meta: {
      title: 'Hausverwaltung, eingetragen und versichert | Peak Care',
      description: 'Peak Care ist im Register des MRRB als professioneller Hausverwalter nach Art. 47b ЗУЕС eingetragen, Bescheinigung Nr. 02-01-576. Hausverwaltung für Eigentümer und Eigentümergemeinschaften in Bulgarien.',
      canonical: 'https://peak-care.com/service/hausverwaltung-bulgarien',
    },
    hero: {
      tag: 'PEAK CARE · BULGARIEN',
      title: 'Hausverwaltung, eingetragen und versichert',
    },
    intro: [
      'Seit dem 10.09.2026 ist Peak Care im Register des Ministeriums für Regionalentwicklung und Bauwesen als professioneller Hausverwalter nach Art. 47b des Gesetzes über die Verwaltung von Wohnungseigentum (ЗУЕС) eingetragen, Bescheinigung Nr. 02-01-576, gültig bis 10.09.2031. Außerdem tragen wir die Berufshaftpflichtversicherung, die das Gesetz von eingetragenen Verwaltern verlangt.',
      'Der praktische Unterschied liegt nicht im Eintrag, sondern in seiner Prüfbarkeit. Wer aus dem Ausland eine Wohnung hier besitzt, muss sonst glauben, was ihm über den Verwalter gesagt wird. Diese Angabe lässt sich im öffentlichen Register nachschlagen, ohne uns zu fragen.',
    ],
    services: {
      headline: 'Was Hausverwaltung umfasst',
      items: [
        'Das Gemeinschaftseigentum in Ordnung gehalten und in festen Abständen begangen, mit einer datierten schriftlichen Notiz über den Befund.',
        'Die Versammlungen der Eigentümergemeinschaft vorbereitet, ihre Beschlüsse festgehalten und danach umgesetzt.',
        'Reparaturen an der gemeinsamen Substanz mit den Gewerken organisiert und bis zum Abschluss begleitet, nicht mit der ersten Rechnung übergeben.',
        'Beiträge und laufende Kosten schriftlich abgerechnet, in einer Form, die ein Eigentümer im Ausland lesen kann.',
        'Ein Ansprechpartner, der antwortet, auf Deutsch, Englisch oder Bulgarisch.',
      ],
    },
    forWhom: {
      headline: 'Für wen',
      text: 'Eigentümer und Eigentümergemeinschaften von Wohngebäuden in Bulgarien, besonders Eigentümer, die nicht hier leben. Wir arbeiten direkt für die Eigentümer. Bestände anderer Verwaltungsfirmen übernehmen wir nicht.',
    },
    connection: {
      headline: 'Wo es mit dem Gebäude selbst zusammenhängt',
      text: 'Weil dasselbe Unternehmen technische Prüfungen und Reparaturen ausführt, wird ein Mangel, der beim Rundgang auffällt, in derselben Woche gemessen und beschrieben, statt gemeldet und vergessen zu werden.',
    },
    cta: {
      text: 'Preis auf Anfrage. Schreiben Sie an peakcare@peak-care.com, mit Ort und Größe des Gebäudes.',
      btn: 'E-Mail schreiben',
    },
  },
  en: {
    meta: {
      title: 'Building management, registered and insured | Peak Care',
      description: 'Peak Care is entered in the MRDPW register as a professional property manager under Art. 47b ZUES, Certificate No. 02-01-576. Building management for owners and owners’ associations in Bulgaria.',
      canonical: 'https://peak-care.com/service/building-management-bulgaria',
    },
    hero: {
      tag: 'PEAK CARE · BULGARIA',
      title: 'Building management, registered and insured',
    },
    intro: [
      'Since 10 September 2026 Peak Care has been entered in the register of the Ministry of Regional Development and Public Works as a professional property manager under Art. 47b of the Condominium Management Act (ZUES), Certificate No. 02-01-576, valid to 10 September 2031. We also hold the professional liability insurance the Act requires of registered managers.',
      'The practical difference is not the entry itself but the fact that it can be checked. An owner abroad otherwise has to take on trust what they are told about the person managing their building. This can be looked up in the public register without asking us.',
    ],
    services: {
      headline: 'What building management covers',
      items: [
        'The common parts kept in order and walked through at fixed intervals, with a dated written note of what was found.',
        'The owners’ association’s meetings prepared, its decisions recorded, and then carried out.',
        'Repairs to the shared fabric organised with the trades and followed through to completion, not handed over at the first invoice.',
        'Contributions and running costs accounted for in writing, in a form an owner abroad can read.',
        'One contact who answers, in English, German or Bulgarian.',
      ],
    },
    forWhom: {
      headline: 'Who this is for',
      text: 'Owners and owners’ associations of residential buildings in Bulgaria, and especially owners who do not live here. We work for the owners directly. We do not take over portfolios from other management companies.',
    },
    connection: {
      headline: 'Where it connects to the building itself',
      text: 'Because the same company carries out technical inspections and repairs, a defect found on a walk-through is measured and described in the same week, not reported and forgotten.',
    },
    cta: {
      text: 'Fees on request. Write to peakcare@peak-care.com with the town and the size of the building.',
      btn: 'Send email',
    },
  },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Building Management Bulgaria',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Peak Care',
    url: 'https://peak-care.com',
    telephone: '+359898436561',
    areaServed: 'Bulgaria',
  },
  serviceType: 'Building Management',
  description: 'Peak Care is entered in the register of the Ministry of Regional Development and Public Works as a professional property manager under Art. 47b of the Condominium Management Act (ZUES), Certificate No. 02-01-576, valid to 10 September 2031.',
  url: 'https://peak-care.com/service/building-management-bulgaria',
}

export default function HausverwaltungBulgaria() {
  const { lang } = useLang()
  const c = content[lang] || content.en

  useSEO({
    title: c.meta.title,
    description: c.meta.description,
    canonical: c.meta.canonical,
    alternates: [
      { hreflang: 'de', href: 'https://peak-care.com/service/hausverwaltung-bulgarien' },
      { hreflang: 'en', href: 'https://peak-care.com/service/building-management-bulgaria' },
      { hreflang: 'x-default', href: 'https://peak-care.com/service/building-management-bulgaria' },
    ],
    jsonLd: [serviceSchema],
  })

  return (
    <>
      {/* Hero */}
      <section className="bg-gray-950 text-white pt-20 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-teal-400 uppercase mb-4 block">{c.hero.tag}</span>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6">{c.hero.title}</h1>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-gray-900 py-14 px-4">
        <div className="max-w-2xl mx-auto space-y-5">
          {c.intro.map((p, i) => (
            <p key={i} className="text-gray-200 text-base leading-relaxed">{p}</p>
          ))}
        </div>
      </section>

      {/* What building management covers */}
      <section className="bg-gray-950 py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-10">{c.services.headline}</h2>
          <ul className="space-y-4 list-none">
            {c.services.items.map((item, i) => (
              <li key={i} className="flex gap-3 text-gray-300 text-sm leading-relaxed">
                <span className="text-teal-500 mt-1">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Who this is for */}
      <section className="bg-gray-900 py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-xs font-bold tracking-widest text-teal-500 uppercase mb-3">{c.forWhom.headline}</div>
          <p className="text-gray-300 text-sm leading-relaxed">{c.forWhom.text}</p>
        </div>
      </section>

      {/* Connection to the building itself */}
      <section className="bg-gray-950 py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-xs font-bold tracking-widest text-teal-500 uppercase mb-3">{c.connection.headline}</div>
          <p className="text-gray-300 text-sm leading-relaxed">{c.connection.text}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 py-16 px-4">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-gray-200 mb-8 leading-relaxed">{c.cta.text}</p>
          <a
            href="mailto:peakcare@peak-care.com"
            className="inline-block bg-teal-600 hover:bg-teal-500 text-white font-semibold px-8 py-3 rounded transition-colors"
          >
            {c.cta.btn}
          </a>
        </div>
      </section>
    </>
  )
}
