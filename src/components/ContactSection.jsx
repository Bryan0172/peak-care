import { useState } from 'react'

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    // Replace with your actual form endpoint (Netlify Forms, Formspree, etc.)
    await new Promise((r) => setTimeout(r, 1000))
    setSent(true)
    setLoading(false)
  }

  return (
    <section id="kontakt" className="py-20 bg-teal-700">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Jetzt kostenlose Beratung anfragen
            </h2>
            <p className="text-teal-100 mb-8 text-lg leading-relaxed">
              Schreiben Sie uns oder rufen Sie an – wir melden uns innerhalb von 24 Stunden.
              Die Erstinspektion ist für Sie kostenlos und unverbindlich.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-teal-600 w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-teal-300 text-xs uppercase tracking-wider">Telefon</div>
                  <a href="tel:+35900000000" className="text-white font-semibold hover:underline">
                    +359 00 000 000
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-teal-600 w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-teal-300 text-xs uppercase tracking-wider">E-Mail</div>
                  <a href="mailto:info@peak-care.com" className="text-white font-semibold hover:underline">
                    info@peak-care.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-teal-600 w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-teal-300 text-xs uppercase tracking-wider">Standort</div>
                  <span className="text-white font-semibold">Sofia, Bulgarien</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            {sent ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Nachricht gesendet!</h3>
                <p className="text-gray-500">Wir melden uns innerhalb von 24 Stunden bei Ihnen.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" name="kontakt" method="POST" data-netlify="true">
                <input type="hidden" name="form-name" value="kontakt" />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                    Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                    placeholder="Ihr vollständiger Name"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                      E-Mail *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                      placeholder="ihre@email.de"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">
                      Telefon
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                      placeholder="+359 ..."
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">
                    Nachricht *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent resize-none"
                    placeholder="Beschreiben Sie kurz Ihr Anliegen..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full text-center"
                >
                  {loading ? 'Wird gesendet...' : 'Nachricht senden'}
                </button>
                <p className="text-xs text-gray-400 text-center">
                  Wir verwenden Ihre Daten ausschließlich zur Bearbeitung Ihrer Anfrage.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
