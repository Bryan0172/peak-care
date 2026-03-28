import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'

const LANGS = [
  { code: 'de', label: 'DE', full: 'Deutsch' },
  { code: 'en', label: 'EN', full: 'English' },
  { code: 'bg', label: 'BG', full: 'Български' },
]

export default function Header() {
  const { lang, setLang, t } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  const navItems = [
    { to: '/', label: t.nav.home },
    { to: '/blog', label: t.nav.blog },
    { to: '/ebooks', label: t.nav.ebooks },
    { to: '/#leistungen', label: t.nav.services, hash: true },
    { to: '/#kontakt', label: t.nav.contact, hash: true },
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <span className="bg-teal-500 text-white font-bold text-xl w-9 h-9 flex items-center justify-center rounded-lg">
            P
          </span>
          <span className="font-bold text-lg text-gray-900 group-hover:text-teal-600 transition-colors">
            Peak Care
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-5">
          {navItems.map((item) =>
            item.hash ? (
              <a
                key={item.label}
                href={item.to}
                className="text-gray-600 hover:text-teal-600 font-medium transition-colors text-sm"
              >
                {item.label}
              </a>
            ) : (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? 'text-teal-600' : 'text-gray-600 hover:text-teal-600'
                  }`
                }
              >
                {item.label}
              </NavLink>
            )
          )}
        </nav>

        {/* Right side: lang switcher + CTA */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-teal-600 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors"
            >
              {lang.toUpperCase()}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50 w-36">
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false) }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between ${
                      lang === l.code
                        ? 'bg-teal-50 text-teal-700 font-semibold'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    {l.full}
                    {lang === l.code && (
                      <svg className="w-4 h-4 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a href="tel:+35989843561" className="btn-primary text-sm !py-2 !px-4">
            {t.nav.call}
          </a>
        </div>

        {/* Mobile: lang + hamburger */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="text-sm font-bold text-teal-600 border border-teal-200 rounded px-2 py-1"
          >
            {lang.toUpperCase()}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
            aria-label="Menü"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile lang dropdown */}
      {langOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-2 flex gap-3">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); setLangOpen(false) }}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                lang === l.code ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {l.full}
            </button>
          ))}
        </div>
      )}

      {/* Mobile nav menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 pb-4">
          {navItems.map((item) =>
            item.hash ? (
              <a
                key={item.label}
                href={item.to}
                onClick={() => setMenuOpen(false)}
                className="block py-2.5 text-gray-700 hover:text-teal-600 font-medium border-b border-gray-50"
              >
                {item.label}
              </a>
            ) : (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-2.5 font-medium border-b border-gray-50 ${
                    isActive ? 'text-teal-600' : 'text-gray-700 hover:text-teal-600'
                  }`
                }
              >
                {item.label}
              </NavLink>
            )
          )}
          <a href="tel:+35989843561" className="btn-primary block text-center mt-4">
            {t.nav.call}
          </a>
        </div>
      )}
    </header>
  )
}
