import { useLang } from '../context/LanguageContext'

const SERVICE_IMAGES = [
  '/images/Schimmelbeseitigung.jpeg',
  '/images/Gebäuderenovierung.jpeg',
]

const VIDEO_SRC = '/Videoanalyse.mp4'

export default function ServiceCards() {
  const { t, lang } = useLang()
  const s = t.services
  const oversightUrl = lang === 'en' ? '/technical-property-oversight-bulgaria' : '/technische-immobilienueberwachung-bulgarien'
  const surveyUrl = lang === 'en' ? '/pre-purchase-building-inspection-bulgaria' : '/bauinspektion-vor-dem-kauf-bulgarien'
  const moreText = lang === 'en' ? 'Learn more →' : lang === 'bg' ? 'Научете повече →' : 'Mehr erfahren →'

  const services = [
    {
      key: 'videoAnalysis',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.82V15.18a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      img: SERVICE_IMAGES[1],
      imgAlt: 'Begutachtung per Videoanalyse',
      highlight: true,
      data: s.videoAnalysis,
    },
    {
      key: 'inspection',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
      imgAlt: 'Bausubstanz-Begutachtung vor dem Kauf',
      highlight: false,
      data: s.inspection,
      link: surveyUrl,
    },
    {
      key: 'renovation',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      img: SERVICE_IMAGES[1],
      imgAlt: 'Gebäudesanierung',
      highlight: false,
      data: s.renovation,
    },
    {
      key: 'oversight',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
      imgAlt: 'Technische Immobilienüberwachung',
      highlight: false,
      data: s.oversight,
      link: oversightUrl,
    },
    {
      key: 'soundInsulation',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072M12 6v12m0 0l-3-3m3 3l3-3M6.343 9.657a8 8 0 000 4.686M4.929 7.929a10 10 0 000 8.142" />
        </svg>
      ),
      img: '/images/Schallschutz.jpeg',
      imgAlt: 'Schallschutz Wohnung Lärmschutz',
      highlight: false,
      data: s.soundInsulation,
    },
    {
      key: 'mold',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      img: SERVICE_IMAGES[0],
      imgAlt: 'Schimmel- & Feuchtigkeitssanierung',
      highlight: false,
      data: s.mold,
    },
  ]

  return (
    <section id="leistungen" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-heading">{s.headline}</h2>
          <p className="section-subheading">{s.sub}</p>
        </div>

        {/* Video Analysis – full-width highlight card */}
        <div className="card overflow-hidden mb-8 md:flex">
          <div className="md:w-2/5 relative overflow-hidden min-h-48">
            {/* Kein Autoplay + preload=none + Poster + controls: die 16-MB-MP4 wird NICHT mehr
                bei jedem Aufruf/Bot geladen (Bandbreiten-/Credit-Leck gestopft, 02.07.),
                lädt+spielt aber auf Klick (Play-Button). Overlay = pointer-events-none, damit
                der Play-Button klickbar bleibt. */}
            <video
              muted
              loop
              playsInline
              controls
              preload="none"
              poster="/images/Gebäuderenovierung.jpeg"
              className="w-full h-full object-cover"
            >
              <source src={VIDEO_SRC} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-teal-700/60 to-transparent pointer-events-none" />
            <div className="absolute top-4 left-4 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              ● Online
            </div>
          </div>
          <div className="p-8 flex flex-col justify-center flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-teal-500">{services[0].icon}</div>
              <h3 className="text-2xl font-bold text-gray-900">{services[0].data.title}</h3>
            </div>
            <p className="text-gray-600 leading-relaxed mb-5">{services[0].data.desc}</p>
            <ul className="grid grid-cols-2 gap-2 mb-6">
              {services[0].data.features.map((f) => (
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
            <a href="#kontakt" className="btn-primary self-start">
              {services[0].data.title}
            </a>
          </div>
        </div>

        {/* Other 3 services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.slice(1).map((svc) => (
            <div key={svc.key} className="card flex flex-col overflow-hidden">
              <div className="relative h-44 overflow-hidden">
                <img
                  src={svc.img}
                  alt={svc.imgAlt}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-2 text-teal-500">
                  {svc.icon}
                  <h3 className="text-lg font-bold text-gray-900">{svc.data.title}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">{svc.data.desc}</p>
                <ul className="space-y-1.5 mb-5">
                  {svc.data.features.map((f) => (
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
                {svc.link ? (
                  <a href={svc.link} className="btn-secondary text-center text-sm">
                    {moreText}
                  </a>
                ) : (
                  <a href="#kontakt" className="btn-secondary text-center text-sm">
                    {t.contact.bookVideo}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Onsite note */}
        <p className="text-center text-sm text-gray-400 mt-6 flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {s.onsite}
        </p>
      </div>
    </section>
  )
}
