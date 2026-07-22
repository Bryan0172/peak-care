import { useParams, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getZipperPage } from '../data/zipperPages'

export default function ZipperPage() {
  const { slug } = useParams()
  const page = getZipperPage(slug)

  if (!page) return <Navigate to="/" replace />

  const { meta, schema, hero, problems, service, trust, faqs, internalLinks } = page
  const phone = '+359 89 843 6561'
  const email = 'peakcare@peak-care.com'

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: schema.name,
    url: schema.url,
    telephone: phone,
    email,
    areaServed: schema.areaServed,
    serviceType: schema.serviceType,
    '@id': schema.url,
  }

  const faqSchemaJson = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <Helmet htmlAttributes={{ lang: page.lang }}>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={schema.url} />
        <script type="application/ld+json">{JSON.stringify(schemaJson)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchemaJson)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-white border-b border-gray-100 py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-teal-50 text-teal-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4">
            {hero.badge}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {hero.headline}
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            {hero.sub}
          </p>
          <a
            href="/#kontakt"
            className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors shadow-sm"
          >
            {hero.cta}
          </a>
          <p className="mt-3 text-sm text-gray-400">
            {page.lang === 'de'
              ? 'Kostenlos · Keine Anreise · Antwort in 30 Minuten'
              : 'Free · No travel costs · Response within 30 minutes'}
          </p>
        </div>
      </section>

      {/* Problem section */}
      <section className="bg-gray-50 py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {page.lang === 'de' ? 'Warum jetzt handeln?' : 'Why act now?'}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {problems.map((p, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{p.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service steps */}
      <section className="bg-white py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {service.headline}
          </h2>
          <div className="space-y-6">
            {service.items.map((item, i) => (
              <div key={i} className="flex gap-5 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-teal-500 text-white font-bold rounded-full flex items-center justify-center text-lg">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="bg-teal-600 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {trust.map((t, i) => (
              <div key={i} className="text-white">
                <div className="text-3xl mb-2">{t.icon}</div>
                <div className="font-bold text-lg mb-1">{t.title}</div>
                <div className="text-teal-100 text-sm">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {page.lang === 'de' ? 'Häufige Fragen' : 'Frequently Asked Questions'}
          </h2>
          <div className="space-y-5">
            {faqs.map((f, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">{f.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-white py-14 px-4 border-t border-gray-100">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {page.lang === 'de' ? 'Jetzt Videoanalyse buchen' : 'Book Your Free Video Assessment'}
          </h2>
          <p className="text-gray-600 mb-6">
            {page.lang === 'de'
              ? '30 Minuten. Kostenlos. Konkrete Antworten und ein Festpreisangebot.'
              : '30 minutes. Free. Concrete answers and a fixed-price quote.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#kontakt"
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
            >
              {hero.cta}
            </a>
            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="border-2 border-teal-600 text-teal-700 hover:bg-teal-50 font-semibold px-8 py-4 rounded-xl transition-colors"
            >
              {phone}
            </a>
          </div>
          <p className="mt-4 text-xs text-gray-400">
            {page.lang === 'de' ? `E-Mail: ${email}` : `Email: ${email}`}
          </p>
        </div>
      </section>

      {/* Internal links */}
      <section className="bg-gray-50 py-10 px-4 border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            {page.lang === 'de' ? 'Weiterführende Artikel' : 'Related Articles'}
          </h3>
          <div className="flex flex-wrap gap-3">
            {internalLinks.map((link, i) => (
              <Link
                key={i}
                to={link.href}
                className="text-sm text-teal-700 hover:text-teal-900 underline underline-offset-2"
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
