import { useSEO } from '../hooks/useSEO'

// Impressum peak-care.com — erstellt 2026-10-29 (SEO, REQ-2026-10-29-BC-IMPRESSUM-...).
// Bis dahin hatte peak-care.com kein Impressum; Angaben wie PCAI-/BC-Impressum (gleicher Rechtstraeger).

export default function Impressum() {
  useSEO({
    title: 'Impressum | Peak Care',
    description: 'Impressum von peak-care.com — Anbieter, Registereintrag, USt-IdNr. und Kontakt.',
    canonical: 'https://peak-care.com/impressum',
  })

  return (
    <div className="bg-white">
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Impressum</h1>
        <p className="text-sm text-gray-500 mb-10">Stand: 29. Oktober 2026</p>

        <div className="space-y-8 text-gray-700 leading-relaxed text-[15px]">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Anbieter</h2>
            <p>
              Peak Care ist eine Marke der<br />
              <strong>„PEAK CARE" ЕДПК (EDPK)</strong><br />
              ul. Stragite 8, bl. D, et. 3, ap. 39<br />
              2770 Bansko, Bulgarien
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Registereintrag</h2>
            <p>
              Rechtsform: Einpersonengesellschaft mit variablem Kapital (ЕДПК), Bulgarien<br />
              UIC / ЕИК: 208465067<br />
              USt-IdNr. (ДДС №): BG208465067
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Geschäftsführer</h2>
            <p>Mathias Andreas Donner</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Kontakt</h2>
            <p>
              E-Mail: <a href="mailto:peakcare@peak-care.com" className="text-teal-600 underline">peakcare@peak-care.com</a><br />
              Telefon: <a href="tel:+359898436561" className="text-teal-600 underline">+359 89 843 6561</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Verantwortlich für den Inhalt</h2>
            <p>Mathias Andreas Donner, Anschrift wie oben.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Haftungsausschluss</h2>
            <p>Die Inhalte dieser Website wurden mit Sorgfalt erstellt. Peak Care EDPK übernimmt keine Haftung für die Richtigkeit, Vollständigkeit oder Aktualität der bereitgestellten Informationen. Für Inhalte verlinkter externer Seiten sind ausschließlich deren Betreiber verantwortlich.</p>
          </section>

        </div>
      </div>
    </div>
  )
}
