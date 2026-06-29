import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'

export default function Footer() {
  const { t, lang } = useLang()
  const f = t.footer
  const n = t.nav

  // Cluster-Rebalancing (REFOCUS Gate 2): site-weite interne Links auf die Hoch-Wert-Money-Pages
  // (Investoren/Bauherren-first). Schimmel bleibt vertreten, aber zuletzt/untergeordnet.
  const isEn = lang === 'en'
  const isBg = lang === 'bg'
  const svcHead = isEn ? 'Services' : isBg ? 'Услуги' : 'Leistungen'
  const services = [
    { to: isEn ? '/pre-purchase-building-inspection-bulgaria' : '/bauinspektion-vor-dem-kauf-bulgarien',
      label: isEn ? 'Pre-Purchase Building Inspection' : isBg ? 'Техническа проверка преди покупка' : 'Bauinspektion vor dem Kauf' },
    { to: isEn ? '/technical-property-oversight-bulgaria' : '/technische-immobilienueberwachung-bulgarien',
      label: isEn ? 'Technical Property Oversight' : isBg ? 'Технически надзор на имоти' : 'Technische Immobilienüberwachung' },
    { to: '/service/renovierung-umbau-ausbau-bulgarien',
      label: isEn ? 'Renovation & Conversion' : isBg ? 'Саниране и преустройство' : 'Renovierung & Umbau' },
    { to: '/service/schimmelbeseitigung-bansko',
      label: isEn ? 'Mould & Damp' : isBg ? 'Мухъл и влага' : 'Schimmel & Feuchte' },
  ]

  return (
    <footer className="bg-gray-950 text-white border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-teal-500 text-white font-bold text-xl w-9 h-9 flex items-center justify-center rounded-lg">
              P
            </span>
            <span className="font-bold text-xl">Peak Care</span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">{f.tagline}</p>
        </div>

        {/* Leistungen / Services — Money-Pages (REFOCUS Cluster-Rebalancing) */}
        <div>
          <h3 className="font-semibold text-gray-400 mb-3 uppercase text-xs tracking-wider">{svcHead}</h3>
          <ul className="space-y-2 text-sm text-gray-500">
            {services.map((s) => (
              <li key={s.to}>
                <Link to={s.to} className="hover:text-teal-400 transition-colors">{s.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold text-gray-400 mb-3 uppercase text-xs tracking-wider">{f.nav}</h3>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><Link to="/" className="hover:text-teal-400 transition-colors">{n.home}</Link></li>
            <li><Link to="/blog" className="hover:text-teal-400 transition-colors">{n.blog}</Link></li>
            <li><Link to="/ebooks" className="hover:text-teal-400 transition-colors">{n.ebooks}</Link></li>
            <li><a href="/#leistungen" className="hover:text-teal-400 transition-colors">{n.services}</a></li>
            <li><a href="/#kontakt" className="hover:text-teal-400 transition-colors">{n.contact}</a></li>
            <li className="pt-2 border-t border-white/5">
              <a href="https://www.peakcare-bansko.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors flex items-center gap-1">
                <span className="text-teal-500">↗</span> peakcare-bansko.com
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-gray-400 mb-3 uppercase text-xs tracking-wider">{f.contact}</h3>
          <ul className="space-y-3 text-sm text-gray-500">
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 mt-0.5 shrink-0 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href="tel:+35989843561" className="hover:text-teal-400 transition-colors">+359 89 843 6561</a>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 mt-0.5 shrink-0 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:peakcare@peak-care.com" className="hover:text-teal-400 transition-colors">peakcare@peak-care.com</a>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 mt-0.5 shrink-0 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Bansko, Bulgarien – seit 2 Jahren bulgarienweiter Service</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 text-center text-gray-600 text-xs py-4 px-4">
        © {new Date().getFullYear()} Peak Care. {f.rights}
        {' · '}
        <Link to="/datenschutz" className="hover:text-teal-400 transition-colors underline">Datenschutz</Link>
      </div>
    </footer>
  )
}
