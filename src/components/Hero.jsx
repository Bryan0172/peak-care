import { useLang } from '../context/LanguageContext'

export default function Hero() {
  const { t } = useLang()

  return (
    <section className="relative overflow-hidden bg-gray-950">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80"
          alt="Wasserschaden in Gebäude"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-teal-950/80 to-gray-900" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-32">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-400/30 text-teal-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
          {t.hero.badge}
        </div>

        {/* Crisis banner */}
        <div className="bg-red-900/40 border border-red-700/40 rounded-xl px-5 py-3 mb-7 max-w-3xl">
          <p className="text-red-200 text-sm leading-relaxed">
            <span className="font-bold text-red-300">⚠ </span>
            {t.hero.crisis}
          </p>
        </div>

        {/* Main headline */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-5 max-w-4xl">
          {t.hero.headline.split('–')[0]}
          <span className="text-teal-400">–</span>
          {t.hero.headline.split('–')[1]}
        </h1>

        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          {t.hero.sub}
        </p>

        {/* CTA Buttons — prominently visible */}
        <div className="flex flex-col sm:flex-row gap-4 mb-14">
          <a
            href="/ebooks"
            className="group flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-yellow-500/20 text-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            {t.hero.btnEbooks}
          </a>
          <a
            href="#kontakt"
            className="flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-teal-500/20 text-lg border border-teal-400/30"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.069A1 1 0 0121 8.82V15.18a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            {t.hero.btnVideo}
          </a>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap gap-6 text-sm text-gray-400">
          {[t.hero.trust1, t.hero.trust2, t.hero.trust3].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <svg className="w-4 h-4 text-teal-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
