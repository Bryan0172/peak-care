import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Startseite' },
  { to: '/blog', label: 'Blog' },
  { to: '/ebooks', label: 'E-Books' },
  { to: '/#leistungen', label: 'Leistungen' },
  { to: '/#kontakt', label: 'Kontakt' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="bg-teal-500 text-white font-bold text-xl w-9 h-9 flex items-center justify-center rounded-lg">
            P
          </span>
          <span className="font-bold text-lg text-gray-900 group-hover:text-teal-600 transition-colors">
            Peak Care
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) =>
            l.to.startsWith('/#') ? (
              <a
                key={l.label}
                href={l.to}
                className="text-gray-600 hover:text-teal-600 font-medium transition-colors text-sm"
              >
                {l.label}
              </a>
            ) : (
              <NavLink
                key={l.label}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? 'text-teal-600' : 'text-gray-600 hover:text-teal-600'
                  }`
                }
              >
                {l.label}
              </NavLink>
            )
          )}
          <a
            href="tel:+35900000000"
            className="btn-primary text-sm !py-2 !px-4"
          >
            Jetzt anrufen
          </a>
        </nav>

        {/* Hamburger */}
        <button
          className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
          onClick={() => setOpen(!open)}
          aria-label="Menü öffnen"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4">
          {navLinks.map((l) =>
            l.to.startsWith('/#') ? (
              <a
                key={l.label}
                href={l.to}
                onClick={() => setOpen(false)}
                className="block py-2 text-gray-700 hover:text-teal-600 font-medium"
              >
                {l.label}
              </a>
            ) : (
              <NavLink
                key={l.label}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block py-2 font-medium ${isActive ? 'text-teal-600' : 'text-gray-700 hover:text-teal-600'}`
                }
              >
                {l.label}
              </NavLink>
            )
          )}
          <a href="tel:+35900000000" className="btn-primary block text-center mt-3">
            Jetzt anrufen
          </a>
        </div>
      )}
    </header>
  )
}
