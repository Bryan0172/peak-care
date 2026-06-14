import { useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import CrisisSection from '../components/CrisisSection'
import EbooksHomeSection from '../components/EbooksHomeSection'
import ServiceCards from '../components/ServiceCards'
import NewsBlock from '../components/NewsBlock'
import LeadMagnet from '../components/LeadMagnet'
import ContactSection from '../components/ContactSection'
import CheckoutModal from '../components/CheckoutModal'
import { useSEO } from '../hooks/useSEO'
import { useLang } from '../context/LanguageContext'

export default function Home() {
  const { t, lang } = useLang()
  const [checkout, setCheckout] = useState(null)

  useSEO({
    title: lang === 'en' ? 'Mould Remediation & Crisis Preparedness in Bulgaria | Peak Care' : 'Schimmelsanierung & Krisenvorsorge in Bulgarien | Peak Care',
    description: lang === 'en' ? 'Peak Care: professional mould remediation, moisture protection and crisis preparedness for property owners in Bulgaria and Europe.' : 'Peak Care: professionelle Schimmelsanierung, Feuchtigkeitsschutz und Krisenvorsorge für Eigentümer in Bulgarien und Europa — Ursache beheben, dauerhaft schützen.',
    canonical: 'https://peak-care.com/',
  })

  const coverSuffix = lang === 'en' ? 'en' : lang === 'bg' ? 'bg' : 'de'

  const PRODUCT_NAMES = {
    [`ebook_schimmel_${lang}`]: t.ebooksHome.ebook1Title,
    [`ebook_krisen_${lang}`]:   t.ebooksHome.ebook2Title,
    [`ebook_bundle_${lang}`]:   t.ebooksHome.bundleTitle,
  }

  const COVER_IMAGES = {
    [`ebook_schimmel_${lang}`]: `/images/covers/schimmel-${coverSuffix}.jpg`,
    [`ebook_krisen_${lang}`]:   `/images/covers/krisensicher-${coverSuffix}.jpg`,
    [`ebook_bundle_${lang}`]:   `/images/covers/bundle-${coverSuffix}.jpg`,
  }

  function handleBuy(productId) {
    const langProductId = `${productId}_${lang}`
    setCheckout({
      productId: langProductId,
      productName: PRODUCT_NAMES[langProductId],
      coverImage: COVER_IMAGES[langProductId],
    })
  }

  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 1b. Renovation Pillars strip */}
      <section className="bg-gray-900 border-y border-gray-800 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm mb-1">{t.pillars.item1Title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{t.pillars.item1Text}</p>
              </div>
            </div>
            {/* Pillar 2 */}
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm mb-1">{t.pillars.item2Title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{t.pillars.item2Text}</p>
              </div>
            </div>
            {/* Pillar 3 */}
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm mb-1">{t.pillars.item3Title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{t.pillars.item3Text}</p>
                <a href="/service/renovierung-umbau-ausbau-bulgarien" className="inline-block mt-2 text-xs text-teal-400 hover:text-teal-300 underline underline-offset-2">
                  {t.pillars.cta} →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Services */}
      <ServiceCards />

      {/* 3. Selected Projects */}
      <section className="py-16 bg-gray-950">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-teal-400 mb-3">
              {lang === 'en' ? 'Selected Projects' : 'Ausgewählte Projekte'}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {lang === 'en' ? 'Real cases. Documented results.' : 'Echte Fälle. Dokumentierte Ergebnisse.'}
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              {lang === 'en'
                ? 'Each project is different. The approach is always the same: identify the real cause, define the right fix, and control the execution until the result is stable.'
                : 'Jedes Projekt ist anders. Die Vorgehensweise bleibt gleich: Ursache erkennen, die richtige Lösung definieren und die Umsetzung bis zu einem stabilen Ergebnis kontrollieren.'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Case 1 — Sofia */}
            <div className="bg-gray-900 border border-teal-800/30 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2.5 py-1 rounded-full">Sofia</span>
                <span className="text-xs text-gray-500">{lang === 'en' ? 'Apartment' : 'Wohnung'}</span>
              </div>
              <h3 className="text-white font-bold text-base mb-3">
                {lang === 'en' ? 'Mold returning despite repeated treatments' : 'Schimmel trotz wiederholter Behandlung'}
              </h3>
              <div className="space-y-2 mb-4">
                <p className="text-gray-400 text-sm leading-relaxed">
                  <span className="font-semibold text-gray-300">{lang === 'en' ? 'Situation' : 'Ausgangslage'}</span><br />
                  {lang === 'en' ? 'Ground-floor apartment in an older building in Sofia. Bedroom with limited ventilation.' : 'Erdgeschosswohnung in einem Altbau in Sofia. Schlafzimmer mit eingeschränkter Belüftung.'}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  <span className="font-semibold text-gray-300">Problem</span><br />
                  {lang === 'en' ? 'The mold kept coming back. Several treatments had been done — each time it looked fixed, but only temporarily. Health symptoms started to appear. The real cause had never been addressed.' : 'Der Schimmel kam immer wieder. Mehrere Behandlungen wurden durchgeführt — jedes Mal schien es behoben, aber nur vorübergehend. Gesundheitliche Beschwerden traten auf. Die eigentliche Ursache wurde nie angegangen.'}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  <span className="font-semibold text-gray-300">{lang === 'en' ? 'What changed' : 'Was sich geändert hat'}</span><br />
                  {lang === 'en' ? 'We stopped treating the surface. Instead, we identified the actual source — moisture combined with structural weak points — and rebuilt the affected areas accordingly.' : 'Wir haben aufgehört, die Oberfläche zu behandeln. Stattdessen haben wir die eigentliche Quelle identifiziert — Feuchtigkeit kombiniert mit strukturellen Schwachstellen — und die betroffenen Bereiche neu aufgebaut.'}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  <span className="font-semibold text-gray-300">{lang === 'en' ? 'Result' : 'Ergebnis'}</span><br />
                  {lang === 'en' ? 'No visible recurrence after remediation. Stable indoor climate. For the first time, the problem was addressed at its source — not covered.' : 'Keine sichtbare Rückkehr nach der Sanierung. Stabiles Raumklima. Zum ersten Mal wurde das Problem an der Ursache behandelt — nicht überdeckt.'}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-md">{lang === 'en' ? 'Mold Removal' : 'Schimmelbeseitigung'}</span>
                <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-md">{lang === 'en' ? 'Root Cause Fix' : 'Ursachenbehandlung'}</span>
              </div>
            </div>

            {/* Case 2 — Bansko */}
            <div className="bg-gray-900 border border-teal-800/30 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2.5 py-1 rounded-full">Bansko</span>
                <span className="text-xs text-gray-500">{lang === 'en' ? 'Holiday Property' : 'Ferienimmobilie'}</span>
              </div>
              <h3 className="text-white font-bold text-base mb-3">
                {lang === 'en' ? 'Property losing value due to hidden structural issues' : 'Wertverlust durch versteckte Baumängel'}
              </h3>
              <div className="space-y-2 mb-4">
                <p className="text-gray-400 text-sm leading-relaxed">
                  <span className="font-semibold text-gray-300">{lang === 'en' ? 'Situation' : 'Ausgangslage'}</span><br />
                  {lang === 'en' ? 'Holiday apartment in Bansko, unused for several years.' : 'Ferienwohnung in Bansko, seit mehreren Jahren ungenutzt.'}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  <span className="font-semibold text-gray-300">Problem</span><br />
                  {lang === 'en' ? 'Outdated surfaces were obvious — but the bigger issue was hidden: wear, inefficiencies, and structural weaknesses that made the property unattractive for rental.' : 'Veraltete Oberflächen waren offensichtlich — das größere Problem war jedoch verborgen: Verschleiß, Ineffizienzen und strukturelle Schwächen, die die Immobilie unattraktiv für die Vermietung machten.'}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  <span className="font-semibold text-gray-300">{lang === 'en' ? 'What changed' : 'Was sich geändert hat'}</span><br />
                  {lang === 'en' ? 'We didn\'t just renovate visually. We reworked the apartment from a usability and longevity perspective — layout, materials, and functional details.' : 'Wir haben nicht nur optisch renoviert. Wir haben die Wohnung aus der Perspektive von Nutzbarkeit und Langlebigkeit überarbeitet — Grundriss, Materialien und funktionale Details.'}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  <span className="font-semibold text-gray-300">{lang === 'en' ? 'Result' : 'Ergebnis'}</span><br />
                  {lang === 'en' ? 'Significantly higher rental appeal. Stronger pricing potential. A property that works again — not just looks better.' : 'Deutlich höhere Vermietungsattraktivität. Stärkeres Preispotenzial. Eine Immobilie, die wieder funktioniert — nicht nur besser aussieht.'}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-md">{lang === 'en' ? 'Renovation' : 'Renovierung'}</span>
                <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-md">{lang === 'en' ? 'Rental Value' : 'Vermietungswert'}</span>
              </div>
            </div>

            {/* Case 3 — Bulgaria */}
            <div className="bg-gray-900 border border-teal-800/30 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2.5 py-1 rounded-full">Rural Bulgaria</span>
                <span className="text-xs text-gray-500">{lang === 'en' ? 'Single-Family House' : 'Einfamilienhaus'}</span>
              </div>
              <h3 className="text-white font-bold text-base mb-3">
                {lang === 'en' ? 'Moisture damaging the building from inside' : 'Feuchtigkeit beschädigt Gebäude von innen'}
              </h3>
              <div className="space-y-2 mb-4">
                <p className="text-gray-400 text-sm leading-relaxed">
                  <span className="font-semibold text-gray-300">{lang === 'en' ? 'Situation' : 'Ausgangslage'}</span><br />
                  {lang === 'en' ? 'Older single-family house without modern sealing systems.' : 'Älteres Einfamilienhaus ohne moderne Abdichtungssysteme.'}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  <span className="font-semibold text-gray-300">Problem</span><br />
                  {lang === 'en' ? 'Moisture rising through multiple walls. Damaged plaster, persistent damp air, declining living quality. This was not a cosmetic issue — it was structural.' : 'Feuchtigkeit stieg durch mehrere Wände auf. Beschädigter Putz, anhaltend feuchte Luft, sinkende Wohnqualität. Das war kein kosmetisches Problem — es war strukturell.'}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  <span className="font-semibold text-gray-300">{lang === 'en' ? 'What changed' : 'Was sich geändert hat'}</span><br />
                  {lang === 'en' ? 'We identified the exact source of moisture and implemented proper sealing solutions before restoring affected areas.' : 'Wir haben die genaue Feuchtigkeitsquelle identifiziert und ordentliche Abdichtungslösungen umgesetzt, bevor wir die betroffenen Bereiche wiederhergestellt haben.'}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  <span className="font-semibold text-gray-300">{lang === 'en' ? 'Result' : 'Ergebnis'}</span><br />
                  {lang === 'en' ? 'Dry walls. Stable indoor conditions. Long-term protection of the building — not temporary repair.' : 'Trockene Wände. Stabile Innenbedingungen. Langfristiger Schutz des Gebäudes — keine vorübergehende Reparatur.'}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-md">{lang === 'en' ? 'Waterproofing' : 'Abdichtung'}</span>
                <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-md">{lang === 'en' ? 'Structural Fix' : 'Strukturelle Sanierung'}</span>
              </div>
            </div>

            {/* Case 4 — Burgas */}
            <div className="bg-gray-900 border border-teal-800/30 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2.5 py-1 rounded-full">Burgas</span>
                <span className="text-xs text-gray-500">{lang === 'en' ? 'Apartment' : 'Wohnung'}</span>
              </div>
              <h3 className="text-white font-bold text-base mb-3">
                {lang === 'en' ? 'Constant noise affecting daily life' : 'Dauerlärm beeinträchtigt den Alltag'}
              </h3>
              <div className="space-y-2 mb-4">
                <p className="text-gray-400 text-sm leading-relaxed">
                  <span className="font-semibold text-gray-300">{lang === 'en' ? 'Situation' : 'Ausgangslage'}</span><br />
                  {lang === 'en' ? 'Apartment located directly on a high-traffic road in Burgas.' : 'Wohnung direkt an einer stark befahrenen Straße in Burgas.'}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  <span className="font-semibold text-gray-300">Problem</span><br />
                  {lang === 'en' ? 'Continuous noise — especially at night and during work hours. Home office almost impossible.' : 'Dauerhafter Lärm — besonders nachts und während der Arbeitszeiten. Homeoffice nahezu unmöglich.'}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  <span className="font-semibold text-gray-300">{lang === 'en' ? 'What changed' : 'Was sich geändert hat'}</span><br />
                  {lang === 'en' ? 'We developed a targeted sound protection solution — combining wall and window adjustments to reduce external noise effectively.' : 'Wir haben eine gezielte Schallschutzlösung entwickelt — Kombination aus Wand- und Fensteranpassungen zur effektiven Reduzierung des Außenlärms.'}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  <span className="font-semibold text-gray-300">{lang === 'en' ? 'Result' : 'Ergebnis'}</span><br />
                  {lang === 'en' ? 'Noticeably quieter environment. Usable living and working space again. Significant improvement in quality of life.' : 'Spürbar ruhigere Umgebung. Wieder nutzbarer Wohn- und Arbeitsraum. Deutliche Verbesserung der Lebensqualität.'}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-md">{lang === 'en' ? 'Sound Protection' : 'Schallschutz'}</span>
                <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-md">{lang === 'en' ? 'Home Office' : 'Homeoffice'}</span>
              </div>
            </div>

            {/* Case 5 — Varna */}
            <div className="bg-gray-900 border border-teal-800/30 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2.5 py-1 rounded-full">Varna</span>
                <span className="text-xs text-gray-500">{lang === 'en' ? 'Rental Property' : 'Mietobjekt'}</span>
              </div>
              <h3 className="text-white font-bold text-base mb-3">
                {lang === 'en' ? 'Property not usable due to multiple issues' : 'Wohnung wegen mehrerer Mängel nicht nutzbar'}
              </h3>
              <div className="space-y-2 mb-4">
                <p className="text-gray-400 text-sm leading-relaxed">
                  <span className="font-semibold text-gray-300">{lang === 'en' ? 'Situation' : 'Ausgangslage'}</span><br />
                  {lang === 'en' ? 'Rental apartment in Varna, vacant for a longer period.' : 'Mietwohnung in Varna, über einen längeren Zeitraum leer stehend.'}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  <span className="font-semibold text-gray-300">Problem</span><br />
                  {lang === 'en' ? 'Combination of moisture, mold, and general deterioration. The apartment was not rentable in its condition.' : 'Kombination aus Feuchtigkeit, Schimmel und allgemeinem Verfall. Die Wohnung war in ihrem Zustand nicht vermietbar.'}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  <span className="font-semibold text-gray-300">{lang === 'en' ? 'What changed' : 'Was sich geändert hat'}</span><br />
                  {lang === 'en' ? 'We approached the project as a system — removing root causes of moisture, eliminating mold, and fully restoring the property.' : 'Wir haben das Projekt als System angegangen — Beseitigung der Feuchtigkeitsursachen, Schimmelentfernung und vollständige Wiederherstellung der Immobilie.'}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  <span className="font-semibold text-gray-300">{lang === 'en' ? 'Result' : 'Ergebnis'}</span><br />
                  {lang === 'en' ? 'Fully functional, rentable apartment. Improved property value and long-term usability restored.' : 'Voll funktionsfähige, vermietbare Wohnung. Verbesserter Immobilienwert und langfristige Nutzbarkeit wiederhergestellt.'}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-md">{lang === 'en' ? 'Full Restoration' : 'Vollsanierung'}</span>
                <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-md">{lang === 'en' ? 'Rental Ready' : 'Vermietungsbereit'}</span>
              </div>
            </div>

          </div>
          <div className="text-center mt-10">
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">
              {lang === 'en'
                ? 'If your property has a recurring moisture, mold, renovation, noise or value-risk problem, we can assess the situation and define a practical solution path.'
                : 'Wenn Ihre Immobilie ein wiederkehrendes Feuchtigkeits-, Schimmel-, Sanierungs-, Schallschutz- oder Wertverlustproblem hat, prüfen wir die Situation und entwickeln einen praktikablen Lösungsweg.'}
            </p>
          </div>
        </div>
      </section>

      {/* 4. Stats */}
      <section className="py-14 bg-teal-600">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {[
              { value: '500+', label: t.stats.objects },
              { value: '25+', label: t.stats.years },
              { value: '98%', label: t.stats.satisfaction },
              { value: '30 min', label: t.stats.response },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-4xl font-extrabold text-white mb-1">{s.value}</div>
                <div className="text-teal-100 text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. All E-Books – full shop section */}
      <EbooksHomeSection onBuy={handleBuy} />

      {/* 7. Crisis Section */}
      <CrisisSection onBuyCrisis={handleBuy} />

      {/* 8. Blog / News */}
      <NewsBlock />

      {/* 7. Lead Magnet – email list builder */}
      <LeadMagnet />

      {/* 8. Contact */}
      <ContactSection />

      {/* Checkout modal */}
      {checkout && (
        <CheckoutModal
          productId={checkout.productId}
          productName={checkout.productName}
          coverImage={checkout.coverImage}
          onClose={() => setCheckout(null)}
        />
      )}
    </>
  )
}
