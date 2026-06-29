import { useSEO } from '../hooks/useSEO'
import { useLang } from '../context/LanguageContext'
import { Link } from 'react-router-dom'

const content = {
  de: {
    meta: {
      title: 'Technische Bauprüfung & Immobilienüberwachung Bulgarien – vor dem Kauf | Peak Care',
      description: 'Unabhängige technische Prüfung der Bausubstanz vor dem Kauf und laufende Immobilienüberwachung in Bulgarien – für internationale Investoren und Eigentümer. Feuchte- & Schimmelcheck, Zustandsbeurteilung, Renovierungskosten-Einschätzung, schriftlicher Bericht.',
      canonical: 'https://peak-care.com/technische-immobilienueberwachung-bulgarien',
    },
    hero: {
      tag: 'PEAK CARE · BULGARIEN',
      title: 'Technische Immobilienüberwachung Bulgarien',
      subtitle: 'Gebäudezustand beurteilen, Risiken erkennen, fundierte Entscheidungen treffen — für internationale Eigentümer und Investoren.',
      cta: 'Kostenlose Ersteinschätzung anfragen',
    },
    intro: 'Wer eine Immobilie in Bulgarien besitzt oder kauft, braucht mehr als gute Absichten. Feuchtigkeitsschäden, versteckter Schimmel, marode Bausubstanz — diese Probleme entstehen still und sind aus der Ferne nicht erkennbar. Peak Care bietet technische Vor-Ort-Beurteilungen, die Eigentümern und Investoren ein klares Bild geben: was vorhanden ist, was repariert werden muss und was es realistisch kostet.',
    problem: {
      headline: 'Was passiert ohne technische Überwachung',
      items: [
        { head: 'Feuchtigkeitsschäden bleiben unentdeckt', text: 'In geschlossenen Objekten entwickeln sich Schimmel und Feuchtigkeit schnell — oft ohne sichtbare Zeichen bis der Schaden erheblich ist.' },
        { head: 'Renovierungskosten werden unterschätzt', text: 'Wer ohne Grundlage kauft oder renoviert, erlebt regelmäßig, dass die tatsächlichen Kosten zwei- bis dreimal höher liegen als erwartet.' },
        { head: 'Entscheidungen ohne Faktenbasis', text: 'Makler und Verkäufer zeigen, was funktioniert. Eine technische Beurteilung zeigt, was nicht funktioniert — und warum.' },
        { head: 'Abwesenheitsprobleme', text: 'Internationale Eigentümer, die ihr Objekt selten besuchen, merken Schäden oft erst dann, wenn die Behebung teuer wird.' },
      ],
    },
    services: {
      headline: 'Was Peak Care technisch leistet',
      items: [
        { title: 'Feuchtigkeits- und Schimmelbeurteilung', text: 'Sichtprüfung auf Feuchtigkeitsindikatoren, Salzausblühungen, Schimmelbefall und Wärmebrücken. Mit Fotodokumentation und schriftlichem Bericht.' },
        { title: 'Gebäudezustandsbeurteilung', text: 'Beurteilung sichtbarer baulicher Risiken: Fassade, Dach, Keller, Fenster, Installationen. Keine gutachterliche Zertifizierung — aber ein ehrlicher lokaler Befund.' },
        { title: 'Renovierungskosteneinschätzung', text: 'Auf Basis direkt vor Ort gewonnener Erkenntnisse geben wir Kostenspannen für typische Sanierungs- und Renovierungsmaßnahmen in Bulgarien an.' },
        { title: 'Regelmäßige Zustandschecks', text: 'Für Objekte, die saisonal genutzt oder dauerhaft vermietet werden. Zustandsmeldungen mit Fotos nach vereinbartem Rhythmus.' },
        { title: 'Technische Einschätzung vor dem Kauf', text: 'Bevor Sie unterschreiben: eine unabhängige technische Sichtprüfung — kein Kaufvertragsprüfung, aber ein realistisches Bild der Substanz.' },
      ],
    },
    process: {
      headline: 'Wie es funktioniert',
      steps: [
        { num: '01', title: 'Direkter Erstkontakt', text: 'Andreas Donner kontaktiert Sie persönlich — per WhatsApp oder Telefon. Sie schildern das Objekt und Ihren Bedarf. Gemeinsam klären wir, was eine Beurteilung leisten kann.' },
        { num: '02', title: 'Vor-Ort-Termin', text: 'Ein erfahrener Baufachmann besucht das Objekt und prüft die relevanten Bereiche systematisch.' },
        { num: '03', title: 'Schriftlicher Bericht', text: 'Sie erhalten eine strukturierte Dokumentation: was gefunden wurde, was es bedeutet, was als nächstes zu tun ist.' },
        { num: '04', title: 'Folgekoordination', text: 'Bei Bedarf koordinieren wir lokale Handwerker und Fachbetriebe für die nächsten Schritte — auf Wunsch auch langfristig.' },
      ],
    },
    limitations: {
      headline: 'Was dieser Service nicht ersetzt',
      text: 'Peak Care erbringt keine offiziellen Gutachten durch zertifizierte Sachverständige, keine rechtliche Due-Diligence-Prüfung und keine steuerliche Beratung. Wo diese Leistungen benötigt werden, nennen wir die richtigen lokalen Ansprechpartner.',
    },
    faqs: [
      { q: 'Für welche Objekte ist eine technische Beurteilung sinnvoll?', a: 'Für alle Immobilien, bei denen internationale Eigentümer Kaufentscheidungen treffen, Renovierungen planen oder den Zustand eines geschlossenen Objekts verstehen wollen. Besonders relevant: Altbauten, Objekte mit sichtbaren Feuchtigkeitszeichen, Kellerräume und Flachdächer.' },
      { q: 'Kann Peak Care auch nach dem Kauf regelmäßig prüfen?', a: 'Ja. Regelmäßige Zustandschecks für geschlossene oder vermietete Objekte gehören zum Service — mit festgelegter Frequenz und strukturierter Berichterstattung.' },
      { q: 'Ist das ein offizielles Gutachten?', a: 'Nein. Die Beurteilung durch Peak Care ist eine erfahrungsbasierte Sichtprüfung durch einen lokalen Baufachmann — kein zertifiziertes Sachverständigengutachten. Für behördlich anerkannte Gutachten nennen wir die zuständigen lokalen Fachleute.' },
      { q: 'Wie lange dauert eine Vor-Ort-Beurteilung?', a: 'Abhängig von Objektgröße und Umfang. Eine typische Sichtprüfung dauert 2–4 Stunden vor Ort. Der schriftliche Bericht folgt in der Regel innerhalb von 2–3 Werktagen.' },
      { q: 'Kann ich die Beurteilung aus dem Ausland beauftragen?', a: 'Ja. Der Erstkontakt und die Abstimmung erfolgen per E-Mail oder Telefon. Die Beurteilung selbst findet vor Ort statt — ohne dass Sie anwesend sein müssen.' },
    ],
    faqHeadline: 'Häufige Fragen',
    cta: {
      headline: 'Klares Bild. Fundierte Entscheidung.',
      text: 'Beschreiben Sie uns das Objekt und was Sie verstehen wollen. Wir klären, was eine Beurteilung leisten kann und was der sinnvolle nächste Schritt ist.',
      btn: 'Jetzt anfragen',
    },
  },
  en: {
    meta: {
      title: 'Technical Building Inspection & Property Oversight Bulgaria – before buying | Peak Care',
      description: 'Independent technical inspection of the building fabric before you buy, plus ongoing property oversight in Bulgaria – for international investors and owners. Moisture & mold check, condition assessment, renovation cost orientation, written report.',
      canonical: 'https://peak-care.com/technical-property-oversight-bulgaria',
    },
    hero: {
      tag: 'PEAK CARE · BULGARIA',
      title: 'Technical Property Oversight in Bulgaria',
      subtitle: 'Assess building condition, identify risks, make informed decisions — for international property owners and investors.',
      cta: 'Request a free initial assessment',
    },
    intro: 'Owning or buying property in Bulgaria from abroad means making decisions without reliable local information. Moisture damage, hidden mold, structural deterioration — these problems develop quietly and are not visible remotely. Peak Care provides on-site technical assessments that give owners and investors a clear, honest picture: what is there, what needs attention, and what it realistically costs.',
    problem: {
      headline: 'What happens without technical oversight',
      items: [
        { head: 'Moisture damage goes undetected', text: 'In seasonally closed properties, mold and moisture develop fast — often without visible signs until the damage is significant.' },
        { head: 'Renovation costs are underestimated', text: 'Buyers and investors who proceed without a proper assessment regularly find real costs are two to three times higher than initial expectations.' },
        { head: 'Decisions without a factual basis', text: 'Agents and sellers show what works. A technical assessment shows what does not — and why.' },
        { head: 'Absence creates risk', text: 'International owners who visit infrequently often discover damage only after it has become expensive to fix.' },
      ],
    },
    services: {
      headline: 'What Peak Care provides technically',
      items: [
        { title: 'Moisture and mold assessment', text: 'Visual inspection for moisture indicators, salt efflorescence, mold presence and thermal bridges. With photographic documentation and written report.' },
        { title: 'Building condition review', text: 'Assessment of visible structural risks: facade, roof, basement, windows, installations. Not a certified survey — but an honest local appraisal from direct experience.' },
        { title: 'Renovation cost orientation', text: 'Based on direct on-site findings, we provide realistic cost ranges for typical repair and renovation work in Bulgaria.' },
        { title: 'Regular condition checks', text: 'For properties that are seasonally closed or permanently rented. Condition reports with photos at an agreed frequency.' },
        { title: 'Technical review before purchase', text: 'Before you sign: an independent technical visual review — not a contract check, but a realistic picture of the building\'s condition.' },
      ],
    },
    process: {
      headline: 'How it works',
      steps: [
        { num: '01', title: 'Direct first contact', text: 'Andreas Donner contacts you personally — by WhatsApp or phone. You describe the property and your situation. Together we clarify what an assessment can cover.' },
        { num: '02', title: 'On-site visit', text: 'An experienced building professional visits the property and carries out a systematic inspection of the relevant areas.' },
        { num: '03', title: 'Written report', text: 'You receive structured documentation: what was found, what it means, what to do next.' },
        { num: '04', title: 'Follow-up coordination', text: 'Where needed, we coordinate local tradespeople and contractors for next steps — on an ongoing basis if required.' },
      ],
    },
    limitations: {
      headline: 'What this service does not replace',
      text: 'Peak Care does not provide official surveys by certified appraisers, legal due diligence or tax advice. Where these are needed, we will point you to the right local professionals.',
    },
    faqs: [
      { q: 'Which properties benefit most from a technical assessment?', a: 'Any property where international owners are making purchase decisions, planning renovation or want to understand the condition of a closed property. Particularly relevant: older buildings, properties with visible moisture signs, basement spaces and flat roofs.' },
      { q: 'Can Peak Care carry out regular checks after the purchase?', a: 'Yes. Regular condition checks for closed or rented properties are part of the service — at an agreed frequency with structured reporting.' },
      { q: 'Is this an official survey or appraisal?', a: 'No. A Peak Care assessment is an experience-based visual inspection by a local building professional — not a certified appraisal. For officially recognised surveys, we refer you to the relevant local specialists.' },
      { q: 'How long does an on-site assessment take?', a: 'It depends on the property size and scope. A typical visual inspection takes 2–4 hours on site. The written report usually follows within 2–3 working days.' },
      { q: 'Can I commission an assessment from abroad?', a: 'Yes. Initial contact and briefing are handled by email or phone. The assessment takes place on site — without you needing to be present.' },
    ],
    faqHeadline: 'Frequently asked questions',
    cta: {
      headline: 'A clear picture. A sound decision.',
      text: 'Tell us about the property and what you need to understand. We will confirm what an assessment can cover and what the right next step is.',
      btn: 'Get in touch',
    },
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Which properties benefit most from a technical assessment in Bulgaria?',
      acceptedAnswer: { '@type': 'Answer', text: 'Any property where international owners are making purchase decisions, planning renovation or want to understand the condition of a closed property. Particularly relevant: older buildings, properties with visible moisture signs, basement spaces and flat roofs.' },
    },
    {
      '@type': 'Question',
      name: 'Can Peak Care carry out regular checks after the purchase?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Regular condition checks for closed or rented properties are part of the service — at an agreed frequency with structured reporting.' },
    },
    {
      '@type': 'Question',
      name: 'Is a Peak Care technical assessment an official survey or appraisal?',
      acceptedAnswer: { '@type': 'Answer', text: 'No. A Peak Care assessment is an experience-based visual inspection by a local building professional — not a certified appraisal. For officially recognised surveys, we refer you to the relevant local specialists.' },
    },
    {
      '@type': 'Question',
      name: 'How long does an on-site property assessment in Bulgaria take?',
      acceptedAnswer: { '@type': 'Answer', text: 'A typical visual inspection takes 2–4 hours on site. The written report usually follows within 2–3 working days. Duration depends on property size and scope.' },
    },
    {
      '@type': 'Question',
      name: 'Can I commission a technical property assessment in Bulgaria from abroad?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Initial contact and briefing are handled by email or phone. The assessment takes place on site without you needing to be present.' },
    },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Technical Property Oversight Bulgaria',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Peak Care',
    url: 'https://peak-care.com',
    telephone: '+35989843656',
    areaServed: 'Bulgaria',
  },
  serviceType: 'Technical Building Assessment',
  description: 'Professional technical property assessment and ongoing oversight for international owners and investors in Bulgaria. Includes moisture and mold checks, building condition review, renovation cost orientation and regular condition monitoring.',
  url: 'https://peak-care.com/technical-property-oversight-bulgaria',
}

export default function TechnicalPropertyOversightBulgaria() {
  const { lang } = useLang()
  const c = content[lang] || content.en
  useSEO({
    title: c.meta.title,
    description: c.meta.description,
    canonical: c.meta.canonical,
    jsonLd: [faqSchema, serviceSchema],
  })

  return (
    <>

      {/* Hero */}
      <section className="bg-gray-950 text-white pt-20 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-teal-400 uppercase mb-4 block">{c.hero.tag}</span>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6">{c.hero.title}</h1>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">{c.hero.subtitle}</p>
          <a
            href="https://wa.me/359898436561"
            className="inline-block bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded transition-colors"
          >
            {c.hero.cta}
          </a>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-gray-900 py-14 px-4">
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-200 text-base leading-relaxed">{c.intro}</p>
        </div>
      </section>

      {/* Problem section */}
      <section className="bg-gray-950 py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-10">{c.problem.headline}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {c.problem.items.map((item, i) => (
              <div key={i} className="bg-gray-900 rounded p-6 border border-gray-800">
                <div className="text-teal-400 font-semibold text-sm mb-2">{item.head}</div>
                <p className="text-gray-300 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-gray-900 py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-10">{c.services.headline}</h2>
          <div className="space-y-6">
            {c.services.items.map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="text-teal-500 font-bold text-lg mt-0.5 shrink-0">{String(i + 1).padStart(2, '0')}</div>
                <div>
                  <div className="text-white font-semibold mb-1">{item.title}</div>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-gray-950 py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-10">{c.process.headline}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {c.process.steps.map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="text-teal-600 font-bold text-xl mt-0.5 shrink-0">{step.num}</div>
                <div>
                  <div className="text-white font-semibold mb-1">{step.title}</div>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Limitations */}
      <section className="bg-gray-900 py-10 px-4">
        <div className="max-w-2xl mx-auto bg-gray-950 border border-gray-800 rounded p-6">
          <div className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">{c.limitations.headline}</div>
          <p className="text-gray-400 text-sm leading-relaxed">{c.limitations.text}</p>
        </div>
      </section>

      {/* Internal links */}
      <section className="bg-gray-950 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-6">
            {lang === 'de' ? 'Verwandte Seiten' : 'Related pages'}
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              to={lang === 'en' ? '/pre-purchase-building-inspection-bulgaria' : '/bauinspektion-vor-dem-kauf-bulgarien'}
              className="block bg-gray-900 border border-gray-800 hover:border-teal-700 rounded p-5 transition-colors group"
            >
              <div className="text-xs text-teal-500 font-semibold mb-1 group-hover:text-teal-400">
                {lang === 'de' ? 'Vor dem Kauf' : 'Before buying'}
              </div>
              <div className="text-sm text-gray-200 font-medium leading-snug">
                {lang === 'de' ? 'Bauinspektion vor dem Kauf' : 'Pre-Purchase Building Inspection'}
              </div>
            </Link>
            <Link
              to="/service/kellerabdichtung-bansko"
              className="block bg-gray-900 border border-gray-800 hover:border-teal-700 rounded p-5 transition-colors group"
            >
              <div className="text-xs text-teal-500 font-semibold mb-1 group-hover:text-teal-400">
                {lang === 'de' ? 'Service' : 'Service'}
              </div>
              <div className="text-sm text-gray-200 font-medium leading-snug">
                {lang === 'de' ? 'Kellerabdichtung Bulgarien' : 'Basement Waterproofing Bulgaria'}
              </div>
            </Link>
            <a
              href="https://banskoconcierge.com/owner-care-bulgaria"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gray-900 border border-gray-800 hover:border-teal-700 rounded p-5 transition-colors group"
            >
              <div className="text-xs text-teal-500 font-semibold mb-1 group-hover:text-teal-400">
                {lang === 'de' ? 'Eigentumsbetreuung' : 'Owner Care'}
              </div>
              <div className="text-sm text-gray-200 font-medium leading-snug">
                {lang === 'de' ? 'Owner Care Bulgaria — Bansko Concierge' : 'Owner Care Bulgaria — Bansko Concierge'}
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-900 py-14 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-10">{c.faqHeadline}</h2>
          <div className="space-y-6">
            {c.faqs.map((faq, i) => (
              <div key={i} className="border-b border-gray-800 pb-6">
                <div className="text-white font-semibold mb-2">{faq.q}</div>
                <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-950 py-16 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">{c.cta.headline}</h2>
          <p className="text-gray-300 mb-8 leading-relaxed">{c.cta.text}</p>
          <a
            href="https://wa.me/359898436561"
            className="inline-block bg-teal-600 hover:bg-teal-500 text-white font-semibold px-8 py-3 rounded transition-colors"
          >
            {c.cta.btn}
          </a>
          <p className="text-gray-600 text-xs mt-4">WhatsApp · +359 89 843 6561 · peakcare@peak-care.com</p>
        </div>
      </section>
    </>
  )
}
