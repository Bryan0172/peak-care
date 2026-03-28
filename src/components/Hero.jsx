export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-teal-700 via-teal-600 to-teal-500 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-36 flex flex-col items-center text-center">
        {/* Badge */}
        <span className="inline-block bg-white/20 text-white text-sm font-medium px-4 py-1 rounded-full mb-6 border border-white/30">
          Professioneller Gebäudeschutz seit 2010
        </span>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6 max-w-4xl">
          Ihr Experte für{' '}
          <span className="text-yellow-300">Schimmelschutz</span>
          {' '}und Krisenvorsorge
        </h1>

        <p className="text-teal-100 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          Professionelle Schimmelbeseitigung und Gebäudeschutz in Bulgarien und Europa.
          Wir schützen Ihr Zuhause – schnell, nachhaltig und zuverlässig.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#kontakt" className="btn-primary bg-yellow-400 hover:bg-yellow-300 text-teal-900 shadow-lg">
            Kostenlose Beratung anfragen
          </a>
          <a href="#leistungen" className="btn-secondary border-white text-white hover:bg-white/10">
            Unsere Leistungen
          </a>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-8 mt-16 text-white/80 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Über 500 erfolgreich sanierte Objekte</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Zertifizierte Fachkräfte</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Kostenlose Erstinspektion</span>
          </div>
        </div>
      </div>
    </section>
  )
}
