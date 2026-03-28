const services = [
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Schimmelbeseitigung',
    description:
      'Professionelle Analyse, Entfernung und dauerhafte Sanierung von Schimmelbefall – in Wohnungen, Häusern und Gewerbeimmobilien. Mit zertifizierten Methoden und Materialien.',
    features: ['Ursachenanalyse', 'Schimmelentfernung', 'Vorbeugender Schutzanstrich', '2 Jahre Garantie'],
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: 'Gebäudeschutz & Abdichtung',
    description:
      'Wir schützen Ihr Gebäude dauerhaft vor Feuchtigkeit – von der Kellerabdichtung über Dachsanierung bis hin zur Fassadenversiegelung.',
    features: ['Kellerabdichtung', 'Fassadensanierung', 'Dachabdichtung', 'Horizontalsperre'],
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Krisenvorsorge & Beratung',
    description:
      'Wir helfen Ihnen, Ihr Gebäude krisenfest zu machen – von der Rückstauklappe bis zum Notfallplan. Vorsorge ist der beste Schutz.',
    features: ['Gebäude-Risikoanalyse', 'Notfallplanung', 'Rückstauklappeninstallation', 'Präventionsberatung'],
  },
]

export default function ServiceCards() {
  return (
    <section id="leistungen" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-heading">Unsere Leistungen</h2>
          <p className="section-subheading">
            Von der Schimmelanalyse bis zur umfassenden Gebäudesanierung – wir decken alles ab, was Ihr Gebäude schützt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s) => (
            <div key={s.title} className="card p-8 flex flex-col">
              <div className="text-teal-500 mb-5">{s.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-grow">{s.description}</p>
              <ul className="space-y-2">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="w-4 h-4 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#kontakt" className="mt-6 btn-secondary text-center text-sm">
                Anfrage stellen
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
