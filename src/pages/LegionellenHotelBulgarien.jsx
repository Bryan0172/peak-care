import { useSEO } from '../hooks/useSEO'
import { withTrailingSlash } from '../components/Link'

// Legionellen-Landingpage (REQ-2026-10-30-EIL-LEGIONELLEN-LANDINGPAGE-ZUERST-BEHOERDENMAIL-MONTAG-02-11,
// Andreas-Auftrag 30.10.2026). Nur DE: die Leitfassung von MARKETING liegt bisher nur deutsch vor,
// EN/BG folgen erst mit freigegebenem Text (kein erfundener Wortlaut). Leistungen und Grenzen aus dem
// CONSTRUCTION-Leistungsumfang 30.10. (§1/§2/§6, Nachtrag §6a/§6b 31.10.: eigene Ausführung, Dipl.-Ing. HLS). Leitplanken: keine Preise, kein Labor-/Desinfektions-
// anspruch, keine Partner- oder Projektnamen, keine Keimfreiheitszusage, keine Winterspitze.
const CANONICAL = 'https://peak-care.com/legionellen-wasserhygiene-hotel-bulgarien'

const c = {
  meta: {
    title: 'Legionellen im Hotel-Wassersystem: Klarheit vor der Saison | Peak Care',
    description: 'Peak Care klärt mit Hotelbetreibern in Bansko und Region die technische Ausgangslage, die Pflichten nach Наредба 9 und einen dokumentierten Maßnahmenplan.',
  },
  hero: {
    tag: 'PEAK CARE · WASSERHYGIENE · BULGARIEN',
    title: 'Legionellen im Hotel-Wassersystem: Klarheit vor der Saison',
  },
  intro: [
    'Sie betreiben ein Hotel, eine Ferienanlage oder ein öffentliches Gebäude und möchten wissen, was im Wassersystem zu tun ist? Peak Care klärt mit Ihnen die technische Ausgangslage, ordnet die geltenden Pflichten für Ihr Objekt ein und koordiniert einen nachvollziehbaren, dokumentierten Maßnahmenplan, abgestimmt mit den zuständigen Fachstellen.',
  ],
  why: {
    headline: 'Warum das Thema jetzt auf den Tisch gehört',
    paragraphs: [
      'Seit der Änderung der Наредба № 9 sind Unterkünfte der Klassen A und B (Hotels, Apartmentanlagen, Pensionen, Gästehäuser, Ferienhäuser, Campingplätze) verpflichtet, die interne Wasserverteilung einer Risikobewertung zu unterziehen und Legionellen sowie Blei zu überwachen. Der Monitoringplan wird mit der örtlichen Regionalen Gesundheitsinspektion (RZI) abgestimmt, die Laboruntersuchungen übernehmen akkreditierte Labore. Die Untersuchungsdaten mehrerer Jahre bilden die Grundlage der ersten Vorlage, deshalb lohnt es sich, früh und geordnet zu beginnen.',
      'Die Wintersaison ist dafür ein betrieblicher Anlass: Zimmer werden nach Leerstand wieder belegt, Warmwasseranlagen laufen unter Volllast.',
    ],
  },
  what: {
    headline: 'Was Legionellen sind',
    text: 'Legionellen sind Bakterien, die sich in warmem, stehendem Wasser vermehren und über feine Tröpfchen, etwa beim Duschen oder im Whirlpool, eingeatmet werden können. Sie können eine schwere Lungenentzündung verursachen. Im EU/EWR-Bericht für 2024 wurden 15.362 Fälle gemeldet; bei 12.041 Fällen mit bekanntem Ausgang wurden 1.117 Todesfälle erfasst (ECDC, 2026). Diese Meldedaten beschreiben weder das Risiko eines einzelnen Hotelgastes noch eine weltweite Zahl. Entscheidend für Betreiber sind die konkrete Anlage, die vorgeschriebene Risikobewertung und ein fachgerecht abgestimmter Kontroll- und Maßnahmenplan.',
  },
  when: {
    headline: 'Wann Betreiber uns ansprechen',
    items: [
      'Sie möchten die Risikobewertung und den Monitoringplan vorbereiten und wissen nicht, wo Sie anfangen sollen.',
      'Ein Laborbefund ist auffällig, und Sie brauchen einen geordneten technischen Weg.',
      'Ein Gebäude oder Flügel geht nach Leerstand oder Umbau wieder in Betrieb.',
      'Die Unterlagen zum Wassersystem (Schemata, Wartung, Materialien) sind lückenhaft.',
    ],
  },
  services: {
    headline: 'Was wir leisten',
    items: [
      'Unterlagen und Ist-Stand sichten: vorhandene Risikobewertung, Monitoringplan, Laborbefunde, Wartungs- und Störungshistorie, Pläne. Lücken gegenüber Наредба 9 benennen wir schriftlich.',
      'Technische Begehung der Trinkwasser-Installation: Übergabe, Warmwasserbereitung und Speicher, Zirkulation, Steigstränge, Endpunkte, stillgelegte und selten genutzte Leitungen, Temperaturen an Speicher, Rücklauf und entferntem Endpunkt, Zustand von Armaturen, Duschköpfen und Filtern.',
      'Getrennte Warm- und Kaltwasserschemata je Gebäude erstellen oder aktualisieren.',
      'Einen Vorschlag für Probenstellen, den Sie mit der RZI und dem Labor abstimmen.',
      'Eine priorisierte Liste der technischen Ursachen und Maßnahmen, etwa Stagnation, stillgelegte Leitungen oder zu niedrige Warmwassertemperatur.',
      'Bauliche und installationstechnische Umsetzung der freigegebenen Maßnahmen durch unser eigenes Team: Totleitungen zurückbauen, Armaturen und Filter tauschen, Dämmung trennen, Leitungsabschnitte erneuern, Zugänglichkeit und Spülanschlüsse herstellen. Den konkreten Umfang legen wir nach Prüfung der Anlage fest.',
      'Eine Betriebsroutine als Entwurf, zum Beispiel Spülplan für unbelegte Zimmer und Temperaturprotokoll, abgestimmt auf den örtlichen Plan.',
      'Koordination von Labor, Hotelleitung und Unterlagen für die RZI, mit einem Bericht über Ergebnisse und offene Punkte.',
      'Im selben Termin eine Ersteinschätzung von Feuchte- und Schimmelursachen im Gebäude.',
    ],
  },
  steps: {
    headline: 'So arbeiten wir',
    items: [
      ['Ausgangslage erfassen', 'Objekt, vorhandene Unterlagen, bisherige Befunde.'],
      ['Umfang und Zuständigkeiten klären', 'was Ihre Anlage braucht und wer was übernimmt.'],
      ['Fachstellen koordinieren', 'Probenahme und Laboruntersuchung durch akkreditierte Stellen, Abstimmung mit der RZI.'],
      ['Maßnahmen umsetzen', 'Bauliche und installationstechnische Maßnahmen, etwa Rückbau stillgelegter Leitungen, Austausch von Armaturen und Filtern, Dämmung, führt unser eigenes Team in Bansko und Umgebung unter der Verantwortung eines Diplom-Ingenieurs HLS aus. Probenahme und Laboranalyse bleiben beim akkreditierten Labor; Desinfektion bieten wir nicht an. Wir koordinieren und dokumentieren.'],
      ['Dokumentieren', 'Ergebnisse und offene Punkte nachvollziehbar festhalten.'],
    ],
  },
  experience: {
    headline: 'Erfahrung',
    text: 'Verantwortlich ist ein deutscher Diplom-Ingenieur der Fachrichtung Heizung, Lüftung, Sanitär mit Zulassung für Arbeiten an Trinkwasserleitungen: Andreas Donner, Leiter von Peak Care. Er bringt Erfahrung aus internationalem Bau- und technischem Projektmanagement mit, darunter Praxis aus dem technischen Projektmanagement eines Hotel-Wassersystems in Deutschland mit Legionellenbefund.',
  },
  limits: {
    headline: 'Was wir nicht tun',
    items: [
      'Wir sind kein Labor. Probenahme und Laboranalyse übernehmen akkreditierte Labore.',
      'Wir führen keine thermische oder chemische Desinfektion durch und setzen keine Biozide ein.',
      'Wir unterschreiben die Risikobewertung nicht als Verfasser. Wir liefern Unterlagen und Entwurf, eingereicht wird sie vom Betreiber.',
      'Wir geben keine Garantie auf Keimfreiheit und keine Zusage behördlicher Anerkennung.',
      'Wir stellen keine medizinischen Diagnosen.',
      'Eigenbrunnen, Küche, Pools, Spa und Whirlpools sowie Kühltürme gehören nicht zum Standardumfang, nur nach Einzelprüfung.',
    ],
  },
  area: {
    headline: 'Wo wir arbeiten',
    text: 'Bansko, Razlog, Blagoevgrad und Region; Sofia und Plovdiv nach Terminabsprache.',
  },
  mold: {
    headline: 'Feuchte und Schimmel',
    text: 'Dieselbe technische Sorgfalt gilt für Feuchte- und Schimmelursachen in Gebäuden.',
    link: '/service/schimmelbeseitigung-bansko',
    linkText: 'Zur Seite Schimmel- und Feuchtigkeitssanierung →',
  },
  cta: {
    headline: 'Technische Ausgangslage besprechen',
    text: 'Nennen Sie uns Objektart und Ort, Ihren Ansprechpartner und den Anlass. Bitte senden Sie uns keine Gesundheitsdaten.',
    price: 'Preis auf Anfrage.',
    btn: 'E-Mail schreiben',
  },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Technische Wasserhygiene- und Legionellen-Ausgangslage für Hotels',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Peak Care',
    url: 'https://peak-care.com',
    telephone: '+359898436561',
    areaServed: [
      { '@type': 'City', name: 'Bansko' },
      { '@type': 'City', name: 'Razlog' },
      { '@type': 'City', name: 'Blagoevgrad' },
      { '@type': 'AdministrativeArea', name: 'Blagoevgrad Province' },
      { '@type': 'City', name: 'Sofia' },
      { '@type': 'City', name: 'Plovdiv' },
    ],
  },
  serviceType: 'Technische Bestandsaufnahme Trinkwasser-Installation',
  description: 'Technische Ausgangslage, Einordnung der Pflichten nach Наредба 9 und dokumentierter Maßnahmenplan für Hotels und Unterkünfte. Keine Laboranalyse, keine Desinfektion.',
  url: CANONICAL,
}

export default function LegionellenHotelBulgarien() {
  useSEO({
    title: c.meta.title,
    description: c.meta.description,
    canonical: CANONICAL,
    alternates: [
      { hreflang: 'de', href: CANONICAL },
      { hreflang: 'x-default', href: CANONICAL },
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

      {/* Why now */}
      <section className="bg-gray-950 py-14 px-4">
        <div className="max-w-2xl mx-auto space-y-5">
          <h2 className="text-2xl font-bold text-white mb-6">{c.why.headline}</h2>
          {c.why.paragraphs.map((p, i) => (
            <p key={i} className="text-gray-300 text-sm leading-relaxed">{p}</p>
          ))}
        </div>
      </section>

      {/* What legionella are */}
      <section className="bg-gray-900 py-14 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">{c.what.headline}</h2>
          <p className="text-gray-300 text-sm leading-relaxed">{c.what.text}</p>
        </div>
      </section>

      {/* When operators contact us */}
      <section className="bg-gray-950 py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">{c.when.headline}</h2>
          <ul className="space-y-4 list-none">
            {c.when.items.map((item, i) => (
              <li key={i} className="flex gap-3 text-gray-300 text-sm leading-relaxed">
                <span className="text-teal-500 mt-1">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services */}
      <section className="bg-gray-900 py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">{c.services.headline}</h2>
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

      {/* How we work */}
      <section className="bg-gray-950 py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">{c.steps.headline}</h2>
          <ol className="space-y-4 list-none">
            {c.steps.items.map(([head, text], i) => (
              <li key={i} className="flex gap-3 text-gray-300 text-sm leading-relaxed">
                <span className="text-teal-500 font-bold">{i + 1}.</span>
                <span><strong className="text-white">{head}:</strong> {text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Experience */}
      <section className="bg-gray-900 py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-xs font-bold tracking-widest text-teal-500 uppercase mb-3">{c.experience.headline}</div>
          <p className="text-gray-300 text-sm leading-relaxed">{c.experience.text}</p>
        </div>
      </section>

      {/* Limits */}
      <section className="bg-gray-950 py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">{c.limits.headline}</h2>
          <ul className="space-y-4 list-none">
            {c.limits.items.map((item, i) => (
              <li key={i} className="flex gap-3 text-gray-300 text-sm leading-relaxed">
                <span className="text-teal-500 mt-1">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Area */}
      <section className="bg-gray-900 py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-xs font-bold tracking-widest text-teal-500 uppercase mb-3">{c.area.headline}</div>
          <p className="text-gray-300 text-sm leading-relaxed">{c.area.text}</p>
        </div>
      </section>

      {/* Mould and damp */}
      <section className="bg-gray-950 py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-xs font-bold tracking-widest text-teal-500 uppercase mb-3">{c.mold.headline}</div>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">{c.mold.text}</p>
          <a href={withTrailingSlash(c.mold.link)} className="text-teal-400 hover:text-teal-300 text-sm">{c.mold.linkText}</a>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 py-16 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">{c.cta.headline}</h2>
          <p className="text-gray-200 mb-3 leading-relaxed">{c.cta.text}</p>
          <p className="text-gray-400 mb-8 text-sm">{c.cta.price}</p>
          <a
            href="mailto:peakcare@peak-care.com?subject=Legionellen%20%2F%20Wasserhygiene"
            className="inline-block bg-teal-600 hover:bg-teal-500 text-white font-semibold px-8 py-3 rounded transition-colors"
          >
            {c.cta.btn}
          </a>
        </div>
      </section>
    </>
  )
}
