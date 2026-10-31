import { useSEO } from '../hooks/useSEO'
import { withTrailingSlash } from '../components/Link'
import { LEGIONELLEN_CONTENT, LEGIONELLEN_PATHS } from '../data/legionellenContent'

// Legionellen-Landingpage, DE/EN/BG aus EINER Komponente (Inhalt: src/data/legionellenContent.js).
// Umfang 31.10.2026 (Andreas): Labor in Kooperation mit zugelassenen Laboren, Desinfektion durch uns.
// Freigabe erst nach dot-Prüfung, dann Andreas. Keine Preise („Preis auf Anfrage“).
const SITE = 'https://peak-care.com'
const PHONE_TEL = '+359898436561'

function Bullets({ items }) {
  return (
    <ul className="space-y-4 list-none">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-gray-300 text-sm leading-relaxed">
          <span className="text-teal-500 mt-1">—</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function LegionellenHotelBulgarien({ lang = 'de' }) {
  const c = LEGIONELLEN_CONTENT[lang] || LEGIONELLEN_CONTENT.de
  const canonical = SITE + LEGIONELLEN_PATHS[lang]

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: c.schema.name,
    serviceType: c.schema.serviceType,
    description: c.schema.description,
    inLanguage: c.htmlLang,
    url: canonical,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Peak Care',
      url: SITE,
      telephone: PHONE_TEL,
      areaServed: [
        { '@type': 'City', name: 'Bansko' },
        { '@type': 'City', name: 'Razlog' },
        { '@type': 'City', name: 'Blagoevgrad' },
        { '@type': 'AdministrativeArea', name: 'Blagoevgrad Province' },
        { '@type': 'City', name: 'Sofia' },
        { '@type': 'City', name: 'Plovdiv' },
      ],
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: c.htmlLang,
    mainEntity: c.faq.items.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  useSEO({
    title: c.meta.title,
    description: c.meta.description,
    canonical,
    alternates: [
      { hreflang: 'de', href: SITE + LEGIONELLEN_PATHS.de },
      { hreflang: 'en', href: SITE + LEGIONELLEN_PATHS.en },
      { hreflang: 'bg', href: SITE + LEGIONELLEN_PATHS.bg },
      { hreflang: 'x-default', href: SITE + LEGIONELLEN_PATHS.en },
    ],
    jsonLd: [serviceSchema, faqSchema],
  })

  const mailto = `mailto:peakcare@peak-care.com?subject=${encodeURIComponent(c.cta.subject)}`

  return (
    <>
      {/* Hero */}
      <section className="bg-gray-950 text-white pt-20 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-teal-400 uppercase mb-4 block">{c.hero.tag}</span>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6">{c.hero.title}</h1>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8">{c.hero.sub}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={mailto}
              className="inline-block bg-teal-600 hover:bg-teal-500 text-white font-semibold px-7 py-3 rounded transition-colors"
            >
              {c.hero.cta}
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-block border border-gray-600 hover:border-teal-400 text-gray-200 font-semibold px-7 py-3 rounded transition-colors"
            >
              {c.hero.call}
            </a>
          </div>
        </div>
      </section>

      {/* Key facts */}
      <section className="bg-gray-900 py-10 px-4 border-y border-gray-800">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {c.facts.map(([head, text]) => (
            <div key={head}>
              <div className="text-white font-semibold text-sm mb-1">{head}</div>
              <div className="text-gray-400 text-xs leading-relaxed">{text}</div>
            </div>
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

      {/* Engineering and laboratory belong together */}
      <section className="bg-gray-950 py-14 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">{c.together.headline}</h2>
          <p className="text-gray-300 text-sm leading-relaxed">{c.together.text}</p>
        </div>
      </section>

      {/* Service programme */}
      <section className="bg-gray-900 py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">{c.program.headline}</h2>
          <ol className="space-y-8 list-none">
            {c.program.items.map(([head, text], i) => (
              <li key={head} className="flex gap-4">
                <span className="text-teal-400 text-2xl font-bold leading-none mt-1 w-8 shrink-0">{i + 1}</span>
                <div>
                  <h3 className="text-white font-semibold mb-2">{head}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Audience */}
      <section className="bg-gray-950 py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-xs font-bold tracking-widest text-teal-500 uppercase mb-3">{c.audience.headline}</div>
          <p className="text-gray-300 text-sm leading-relaxed">{c.audience.text}</p>
        </div>
      </section>

      {/* When operators contact us */}
      <section className="bg-gray-900 py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">{c.when.headline}</h2>
          <Bullets items={c.when.items} />
        </div>
      </section>

      {/* Responsibility */}
      <section className="bg-gray-950 py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-xs font-bold tracking-widest text-teal-500 uppercase mb-3">{c.responsibility.headline}</div>
          <p className="text-gray-300 text-sm leading-relaxed">{c.responsibility.text}</p>
        </div>
      </section>

      {/* Clear responsibilities */}
      <section className="bg-gray-900 py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">{c.roles.headline}</h2>
          <Bullets items={c.roles.items} />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-950 py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">{c.faq.headline}</h2>
          <div className="space-y-3">
            {c.faq.items.map(([q, a]) => (
              <details key={q} className="group border border-gray-800 rounded px-5 py-4 bg-gray-900">
                <summary className="cursor-pointer text-white font-medium text-sm list-none flex justify-between gap-4">
                  <span>{q}</span>
                  <span className="text-teal-500 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-gray-300 text-sm leading-relaxed mt-3">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Mould and damp */}
      <section className="bg-gray-900 py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-xs font-bold tracking-widest text-teal-500 uppercase mb-3">{c.mold.headline}</div>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">{c.mold.text}</p>
          <a href={withTrailingSlash(c.mold.link)} className="text-teal-400 hover:text-teal-300 text-sm">{c.mold.linkText}</a>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-950 py-16 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">{c.cta.headline}</h2>
          <p className="text-gray-200 mb-3 leading-relaxed">{c.cta.text}</p>
          <p className="text-gray-400 mb-8 text-sm">{c.cta.price}</p>
          <a
            href={mailto}
            className="inline-block bg-teal-600 hover:bg-teal-500 text-white font-semibold px-8 py-3 rounded transition-colors"
          >
            {c.cta.btn}
          </a>
        </div>
      </section>
    </>
  )
}
