import { useLang } from '../context/LanguageContext'

const BULLET_ICONS = ['⚡', '💳', '💊', '🚨', '📉']

export default function CrisisSection({ onBuyCrisis }) {
  const { t } = useLang()
  const cs = t.crisisSection

  return (
    <section className="bg-gray-950 border-b border-red-900/40 relative overflow-hidden">
      {/* Red glow top-left */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-700/10 rounded-full blur-3xl pointer-events-none" />
      {/* Orange glow bottom-right */}
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT: Text + bullets */}
          <div>
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-red-900/40 border border-red-700/50 text-red-300 text-xs font-bold px-3 py-1.5 rounded-full mb-5 uppercase tracking-wider">
              <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
              Krisenvorsorge
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-5">
              {cs.headline}
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              {cs.sub}
            </p>

            {/* Bullet points */}
            <ul className="space-y-3">
              {cs.bullets.map((bullet, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 bg-gray-900/60 border border-gray-800 rounded-xl px-4 py-3"
                >
                  <span className="text-xl shrink-0 mt-0.5">{BULLET_ICONS[i]}</span>
                  <span className="text-white font-semibold leading-snug">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: E-Book card + CTA */}
          <div className="flex flex-col items-center lg:items-start">
            {/* E-Book visual */}
            <div className="relative w-full max-w-sm mb-6">
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-orange-900/30 border border-orange-500/20">
                <img
                  src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80"
                  alt="Krisensicheres Zuhause für Familien"
                  className="w-full h-52 object-cover"
                />
                <div className="bg-gradient-to-br from-orange-600 to-red-700 p-6 text-white">
                  <div className="text-3xl mb-2">🏠</div>
                  <h3 className="font-extrabold text-xl leading-tight">
                    {t.ebooksHome.ebook2Title}
                  </h3>
                  <div className="text-4xl font-extrabold mt-3">
                    {t.ebooksHome.ebook2Price}
                  </div>
                  <div className="text-orange-200 text-xs mt-1">{t.ebooks.oneTime}</div>
                </div>
              </div>

              {/* Urgency badge */}
              <div className="absolute -top-3 -right-3 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-red-400">
                Jetzt handeln
              </div>
            </div>

            {/* CTA box */}
            <div className="w-full max-w-sm bg-gray-900 border border-orange-500/30 rounded-2xl p-6">
              <p className="text-orange-300 text-sm font-semibold mb-4 text-center">
                {cs.ctaText}
              </p>

              <button
                onClick={() => onBuyCrisis('ebook_krisen')}
                className="w-full bg-orange-500 hover:bg-orange-400 text-white font-extrabold py-4 rounded-xl transition-all duration-200 text-lg shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Kaufen – {cs.ctaPrice}
              </button>

              <p className="text-gray-500 text-xs text-center mt-3">{cs.ctaSubtext}</p>

              {/* Feature list mini */}
              <ul className="mt-4 space-y-1.5">
                {t.ebooks.features.crisis.slice(0, 4).map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-gray-400">
                    <svg className="w-3.5 h-3.5 text-orange-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
