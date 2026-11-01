import { useSEO } from '../hooks/useSEO'

// Privacy Policy (EN) of peak-care.com — 01.11.2026. Content-faithful English version of src/pages/Datenschutz.jsx
// Prepared at Andreas' direction (01.11.2026), based on the translation delivered by dot/Root; no new legal statements added.

export default function PrivacyPolicy() {
  useSEO({
    title: 'Privacy Policy | Peak Care',
    description: 'Privacy policy of peak-care.com: how we process personal data (hosting, analytics with consent, contact form) under the GDPR.',
    canonical: 'https://peak-care.com/privacy-policy',
    alternates: [
      { hreflang: 'de', href: 'https://peak-care.com/datenschutz/' },
      { hreflang: 'en', href: 'https://peak-care.com/privacy-policy/' },
      { hreflang: 'bg', href: 'https://peak-care.com/politika-za-poveritelnost/' },
      { hreflang: 'x-default', href: 'https://peak-care.com/privacy-policy/' },
    ],
  })

  const updated = '24 October 2026'

  return (
    <div className="bg-white">
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: {updated} · <a href="/datenschutz/" className="text-teal-600 underline">Datenschutzerklärung (DE)</a></p>

        <div className="space-y-8 text-gray-700 leading-relaxed text-[15px]">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Controller</h2>
            <p>The controller within the meaning of the General Data Protection Regulation (GDPR) is:</p>
            <p className="mt-3">
              <strong>Peak Care EDPK</strong><br />
              UIC/EIK: 208465067<br />
              Stragite 08, Apt. 39D<br />
              2770 Bansko, Bulgaria<br />
              Email: <a href="mailto:peakcare@peak-care.com" className="text-teal-600 underline">peakcare@peak-care.com</a><br />
              Phone: <a href="tel:+359898436561" className="text-teal-600 underline" onClick={() => { if (typeof window !== 'undefined' && typeof window.gtag === 'function') window.gtag('event', 'phone_click') }}>+359 89 843 6561</a><br />
              Website: <a href="https://peak-care.com" className="text-teal-600 underline">peak-care.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. General information on data processing</h2>
            <p>We process the personal data of our users only to the extent necessary to provide a functioning website and our content and services, or where you have given your consent. The legal bases are in particular Art. 6(1)(a) (consent), (b) (contract or pre-contractual measures) and (f) (legitimate interest) GDPR.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Hosting &amp; server log files</h2>
            <p>This website is hosted by <strong>Netlify</strong> (Netlify, Inc., USA). When you visit the site, technically necessary data is recorded automatically in server log files (including an anonymised/shortened IP address, date and time, the file requested, the amount of data transferred, referrer, browser and operating system information). This serves the secure and stable operation of the website (Art. 6(1)(f) GDPR). A data processing agreement is in place with the provider; any transfer to the USA takes place on the basis of appropriate safeguards (including EU Standard Contractual Clauses).</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Cookies &amp; consent</h2>
            <p>We use technically necessary cookies to ensure the operation of the website. Cookies and similar technologies that are not strictly necessary (in particular for reach measurement/analytics) are used only with your <strong>express consent</strong> via our consent banner (Art. 6(1)(a) GDPR, Section 25(1) TTDSG).</p>
            <p className="mt-3">Until you give your consent, analytics storage is denied by default (default setting: “denied” in Google Consent Mode). You can withdraw your consent at any time with effect for the future by deleting the stored choice in your browser (website data/cookies for peak-care.com) and reloading the page — the banner will then appear again.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Google Analytics 4</h2>
            <p>After you consent, we use <strong>Google Analytics 4</strong>, a service of Google Ireland Limited (Gordon House, Barrow Street, Dublin 4, Ireland). Google Analytics uses cookies or similar technologies to evaluate the use of the website in anonymised form (e.g. page views, approximate origin, devices used). We use <strong>Google Consent Mode v2</strong>: without consent, no analytics cookies are set.</p>
            <p className="mt-3">The legal basis is your consent (Art. 6(1)(a) GDPR). A transfer of data to Google in the USA cannot be ruled out; it takes place on the basis of the EU Standard Contractual Clauses. You can withdraw your consent at any time (see section 4). Further information: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">Google Privacy Policy</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Fonts</h2>
            <p>The Inter typeface is provided locally by our website. No connection to Google Fonts servers is established for this font integration.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Contact &amp; contact form</h2>
            <p>If you contact us via the contact form or by email, we process the data you provide (e.g. name, email address, message) in order to handle your enquiry. The form is submitted through a function of our host Netlify; the enquiry is then delivered to us by email via the delivery service <strong>Brevo</strong> (Brevo SAS, Paris, France), which acts as a processor on our behalf. The legal basis is Art. 6(1)(b) GDPR (pre-contractual measures) or (f) GDPR (handling of enquiries). The data is deleted as soon as it is no longer required to fulfil its purpose and no statutory retention obligations apply.</p>
            <p className="mt-3">To protect against spam and automated requests we use <strong>Cloudflare Turnstile</strong> (Cloudflare, Inc., San Francisco, USA). Technical data such as your IP address and browser characteristics are transmitted to Cloudflare to determine whether the request comes from a human. The legal basis is our legitimate interest in an abuse-free contact form (Art. 6(1)(f) GDPR). Any transfer to the USA takes place on the basis of the EU-US Data Privacy Framework or, alternatively, the EU Standard Contractual Clauses.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7a. Contact via WhatsApp and digital assistant</h2>
            <p>If you write to us via WhatsApp (+359 89 843 6561), we process your phone number, profile name, messages and the photos you send in order to handle your enquiry (Art. 6(1)(b) GDPR, pre-contractual measures, or (f) GDPR, handling of enquiries). The service is provided by WhatsApp Ireland Limited, Dublin, Ireland (Meta group). A transfer to the USA cannot be ruled out; according to the provider it takes place on the basis of the EU-US Data Privacy Framework or the EU Standard Contractual Clauses.</p>
            <p className="mt-3">First replies on WhatsApp may be given by an AI-supported assistant from Meta. It records your request and hands it over to a member of Peak Care staff. Binding statements on services, appointments and costs are made exclusively by a member of staff. Please do not send identity, bank or health data via WhatsApp.</p>
            <p className="mt-3">Chats that do not lead to an order are deleted after six months at the latest; otherwise the statutory retention periods apply. Further information: <a href="https://www.whatsapp.com/legal/privacy-policy-eea" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">WhatsApp Privacy Policy</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Your rights as a data subject</h2>
            <p>Under the GDPR you have in particular the following rights:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Access to the data processed about you (Art. 15 GDPR)</li>
              <li>Rectification of inaccurate data (Art. 16 GDPR)</li>
              <li>Erasure (Art. 17 GDPR) and restriction of processing (Art. 18 GDPR)</li>
              <li>Data portability (Art. 20 GDPR)</li>
              <li>Objection to processing (Art. 21 GDPR)</li>
              <li>Withdrawal of consent given, with effect for the future (Art. 7(3) GDPR)</li>
            </ul>
            <p className="mt-3">To exercise your rights, an informal message to <a href="mailto:peakcare@peak-care.com" className="text-teal-600 underline">peakcare@peak-care.com</a> is sufficient.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Right to lodge a complaint with a supervisory authority</h2>
            <p>Without prejudice to any other remedy, you have the right to lodge a complaint with a data protection supervisory authority if you believe that the processing of your data violates the GDPR (Art. 77 GDPR).</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Data security</h2>
            <p>This website uses SSL/TLS encryption (recognisable by “https://” and the lock symbol in the address bar) to protect the transmission of your data.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Currentness of this privacy policy</h2>
            <p>We adapt this privacy policy as soon as changes to the data processing we carry out make this necessary. The current version published on this page applies.</p>
          </section>

        </div>
      </div>
    </div>
  )
}
