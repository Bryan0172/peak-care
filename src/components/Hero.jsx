import { useLang } from '../context/LanguageContext'

export default function Hero() {
  const { t } = useLang()

  return (
    <section className="relative overflow-hidden bg-gray-950">
      {/* Layered dark gradient — no stock photography, a company built on 25 years of
          real, verifiable work doesn't need a generic water-damage stock image standing
          in for it. Two soft radial glows give the section depth instead. */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-teal-950" />
      <div
        className="absolute -top-32 -right-32 w-[36rem] h-[36rem] rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #1A7A6E 0%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-40 -left-24 w-[28rem] h-[28rem] rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #3aad9f 0%, transparent 70%)' }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.04]">
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

        {/* Main headline */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-5 max-w-4xl">
          {t.hero.headline.split('–')[0]}
          <span className="text-teal-400">–</span>
          {t.hero.headline.split('–')[1]}
        </h1>

        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          {t.hero.sub}
        </p>

        {/* CTA Buttons — one clear primary action, secondary is a quiet ghost button
            instead of a second saturated color competing for attention. */}
        <div className="flex flex-col sm:flex-row gap-4 mb-14">
          <a
            href="#kontakt"
            className="group flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-teal-500/20 text-lg border border-teal-400/30"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.069A1 1 0 0121 8.82V15.18a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            {t.hero.btnPrimary}
          </a>
          <a
            href="#leistungen"
            className="group flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 border border-white/15 text-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            {t.hero.btnSecondary}
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
