import { useSEO } from '../hooks/useSEO'

// Datenschutzerklaerung peak-care.com — erstellt 2026-06-17.
// Inhaltlich an die tatsaechliche Datenverarbeitung der Seite angepasst:
// Netlify-Hosting + Netlify-Forms-Kontaktformular, Google Analytics 4 (Consent Mode v2),
// Google Fonts, Stripe (E-Book-Zahlungen). DSGVO-Betroffenenrechte.
// ⚠️ Verantwortlichen-Anschrift + finale anwaltliche Pruefung sind vom Betreiber zu ergaenzen.

export default function Datenschutz() {
  useSEO({
    title: 'Datenschutzerklärung | Peak Care',
    description: 'Datenschutzerklärung von peak-care.com — wie wir personenbezogene Daten verarbeiten (Hosting, Analyse mit Einwilligung, Kontaktformular, Zahlungen) nach DSGVO.',
    canonical: 'https://peak-care.com/datenschutz',
  })

  const updated = '17. Juni 2026'

  return (
    <div className="bg-white">
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Datenschutzerklärung</h1>
        <p className="text-sm text-gray-500 mb-10">Stand: {updated}</p>

        <div className="space-y-8 text-gray-700 leading-relaxed text-[15px]">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Verantwortlicher</h2>
            <p>Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:</p>
            <p className="mt-3">
              <strong>Peak Care EDPK</strong><br />
              UIC/EIK: 208465067<br />
              Stragite 08, Apt. 39D<br />
              2770 Bansko, Bulgarien<br />
              E-Mail: <a href="mailto:peakcare@peak-care.com" className="text-teal-600 underline">peakcare@peak-care.com</a><br />
              Telefon: <a href="tel:+359898436561" className="text-teal-600 underline">+359 89 843 6561</a><br />
              Website: <a href="https://peak-care.com" className="text-teal-600 underline">peak-care.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Allgemeines zur Datenverarbeitung</h2>
            <p>Wir verarbeiten personenbezogene Daten unserer Nutzer grundsätzlich nur, soweit dies zur Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist oder Sie eingewilligt haben. Rechtsgrundlagen sind insbesondere Art. 6 Abs. 1 lit. a (Einwilligung), lit. b (Vertrag/vorvertragliche Maßnahmen) und lit. f (berechtigtes Interesse) DSGVO.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Hosting &amp; Server-Logdateien</h2>
            <p>Diese Website wird bei <strong>Netlify</strong> (Netlify, Inc., USA) gehostet. Beim Aufruf der Seite werden technisch notwendige Daten automatisch in Server-Logdateien erfasst (u. a. anonymisierte/gekürzte IP-Adresse, Datum und Uhrzeit, abgerufene Datei, übertragene Datenmenge, Referrer, Browser-/Betriebssystem-Informationen). Dies dient dem sicheren und stabilen Betrieb der Website (Art. 6 Abs. 1 lit. f DSGVO). Mit dem Anbieter besteht ein Auftragsverarbeitungsverhältnis; eine Übermittlung in die USA erfolgt auf Grundlage geeigneter Garantien (u. a. EU-Standardvertragsklauseln).</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Cookies &amp; Einwilligung</h2>
            <p>Technisch notwendige Cookies setzen wir ein, um den Betrieb der Website zu gewährleisten. Cookies und vergleichbare Technologien, die nicht zwingend erforderlich sind (insbesondere zur Reichweitenmessung/Analyse), setzen wir nur mit Ihrer <strong>ausdrücklichen Einwilligung</strong> über unser Einwilligungs-Banner ein (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TTDSG).</p>
            <p className="mt-3">Bis zu Ihrer Einwilligung bleiben Analyse-Dienste deaktiviert (Standard: „denied" im Google Consent Mode). Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen, indem Sie die gespeicherte Auswahl in Ihrem Browser löschen (Website-Daten/Cookies für peak-care.com) und die Seite neu laden — das Banner erscheint dann erneut.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Google Analytics 4</h2>
            <p>Nach Ihrer Einwilligung nutzen wir <strong>Google Analytics 4</strong>, einen Dienst der Google Ireland Limited (Gordon House, Barrow Street, Dublin 4, Irland). Google Analytics verwendet Cookies bzw. ähnliche Technologien, um die Nutzung der Website anonymisiert auszuwerten (z. B. Seitenaufrufe, ungefähre Herkunft, verwendete Geräte). Wir setzen den <strong>Google Consent Mode v2</strong> ein: Ohne Einwilligung werden keine Analyse-Cookies gesetzt.</p>
            <p className="mt-3">Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Eine Übermittlung von Daten an Google in den USA kann nicht ausgeschlossen werden; sie erfolgt auf Grundlage der EU-Standardvertragsklauseln. Sie können Ihre Einwilligung jederzeit widerrufen (siehe Abschnitt 4). Weitere Informationen: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">Datenschutzerklärung von Google</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Google Fonts</h2>
            <p>Zur einheitlichen Darstellung von Schriftarten bindet diese Website Schriften von Google Fonts (Google Ireland Limited) ein. Beim Aufruf einer Seite wird hierzu eine Verbindung zu Servern von Google hergestellt, wobei Ihre IP-Adresse an Google übermittelt wird. Rechtsgrundlage ist unser berechtigtes Interesse an einer ansprechenden Darstellung (Art. 6 Abs. 1 lit. f DSGVO). Weitere Informationen: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">Google-Datenschutz</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Kontaktaufnahme &amp; Kontaktformular</h2>
            <p>Wenn Sie uns über das Kontaktformular oder per E-Mail kontaktieren, verarbeiten wir die von Ihnen angegebenen Daten (z. B. Name, E-Mail-Adresse, Nachricht), um Ihre Anfrage zu bearbeiten. Die Übermittlung des Formulars erfolgt über den Formular-Dienst unseres Hosters Netlify (Netlify Forms). Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen/Vertragsanbahnung) bzw. lit. f DSGVO (Bearbeitung von Anfragen). Die Daten werden gelöscht, sobald sie für die Zweckerreichung nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Zahlungsabwicklung (E-Books)</h2>
            <p>Für den Kauf digitaler Produkte (E-Books) nutzen wir den Zahlungsdienstleister <strong>Stripe</strong> (Stripe Payments Europe, Ltd., Irland). Die für die Zahlung erforderlichen Daten (z. B. Name, E-Mail, Zahlungsdaten) werden unmittelbar durch Stripe verarbeitet; wir selbst speichern keine vollständigen Zahlungsdaten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung). Weitere Informationen: <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">Datenschutz von Stripe</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Ihre Rechte als betroffene Person</h2>
            <p>Sie haben nach der DSGVO insbesondere folgende Rechte:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Auskunft über die zu Ihrer Person verarbeiteten Daten (Art. 15 DSGVO)</li>
              <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
              <li>Löschung (Art. 17 DSGVO) und Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
              <li>Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)</li>
            </ul>
            <p className="mt-3">Zur Ausübung Ihrer Rechte genügt eine formlose Nachricht an <a href="mailto:peakcare@peak-care.com" className="text-teal-600 underline">peakcare@peak-care.com</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Beschwerderecht bei der Aufsichtsbehörde</h2>
            <p>Unbeschadet anderweitiger Rechtsbehelfe haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren, wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer Daten gegen die DSGVO verstößt (Art. 77 DSGVO).</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Datensicherheit</h2>
            <p>Diese Website nutzt eine SSL-/TLS-Verschlüsselung (erkennbar an „https://" und dem Schloss-Symbol in der Adresszeile), um die Übertragung Ihrer Daten zu schützen.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Aktualität dieser Datenschutzerklärung</h2>
            <p>Wir passen diese Datenschutzerklärung an, sobald Änderungen der von uns durchgeführten Datenverarbeitung dies erforderlich machen. Es gilt die jeweils auf dieser Seite veröffentlichte aktuelle Fassung.</p>
          </section>

        </div>
      </div>
    </div>
  )
}
