import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-teal-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-teal-400 text-teal-900 font-bold text-xl w-9 h-9 flex items-center justify-center rounded-lg">
              P
            </span>
            <span className="font-bold text-xl">Peak Care</span>
          </div>
          <p className="text-teal-200 text-sm leading-relaxed">
            Ihr Experte für Schimmelschutz und Krisenvorsorge in Bulgarien und Europa.
            Professionell. Zuverlässig. Nachhaltig.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold text-teal-300 mb-3 uppercase text-xs tracking-wider">
            Navigation
          </h3>
          <ul className="space-y-2 text-sm text-teal-100">
            <li><Link to="/" className="hover:text-white transition-colors">Startseite</Link></li>
            <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            <li><Link to="/ebooks" className="hover:text-white transition-colors">E-Books</Link></li>
            <li><a href="/#leistungen" className="hover:text-white transition-colors">Leistungen</a></li>
            <li><a href="/#kontakt" className="hover:text-white transition-colors">Kontakt</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-teal-300 mb-3 uppercase text-xs tracking-wider">
            Kontakt
          </h3>
          <ul className="space-y-2 text-sm text-teal-100">
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 mt-0.5 shrink-0 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:info@peak-care.com" className="hover:text-white">info@peak-care.com</a>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 mt-0.5 shrink-0 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href="tel:+35900000000" className="hover:text-white">+359 00 000 000</a>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 mt-0.5 shrink-0 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Sofia, Bulgarien</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-teal-800 text-center text-teal-400 text-xs py-4 px-4">
        © {new Date().getFullYear()} Peak Care. Alle Rechte vorbehalten.
      </div>
    </footer>
  )
}
