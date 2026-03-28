import { useState } from 'react'
import { useLang } from '../context/LanguageContext'

export default function ContactSection() {
  const { t } = useLang()
  const c = t.contact
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 900))
    setSent(true)
    setLoading(false)
  }

  return (
    <section id="kontakt" className="py-20 bg-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-950/60 to-gray-950" />

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{c.headline}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{c.sub}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left: info */}
          <div className="space-y-6">
            {/* Video Analysis highlight box */}
            <div className="bg-teal-500/10 border border-teal-500/30 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="bg-teal-500 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.069A1 1 0 0121 8.82V15.18a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{c.videoTitle}</h3>
                  <p className="text-gray-400 text-sm mt-1 leading-relaxed">{c.videoDesc}</p>
                  <a
                    href="mailto:info@peak-care.com?subject=Videoanalyse buchen"
                    className="inline-block mt-4 bg-teal-500 hover:bg-teal-400 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors"
                  >
                    {c.bookVideo}
                  </a>
                </div>
              </div>
            </div>

            {/* Contact details */}
            <div className="space-y-4">
              {[
                {
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  ),
                  label: c.phone,
                  value: '+359 89 843 6561',
                  href: 'tel:+35989843561',
                },
                {
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  ),
                  label: c.email,
                  value: 'info@peak-care.com',
                  href: 'mailto:info@peak-care.com',
                },
                {
                  icon: (
                    <>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </>
                  ),
                  label: c.location,
                  value: c.locationVal,
                  href: null,
                },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="bg-gray-800 w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {item.icon}
                    </svg>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs uppercase tracking-wider">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-white font-semibold hover:text-teal-400 transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-white font-semibold">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: contact form */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            {sent ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{c.formSuccess}</h3>
                <p className="text-gray-500">{c.formSuccessMsg}</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
                name="kontakt"
                method="POST"
                data-netlify="true"
              >
                <input type="hidden" name="form-name" value="kontakt" />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{c.formName} *</label>
                  <input
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder={c.formNamePh}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{c.formEmail} *</label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder={c.formEmailPh}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{c.formPhone}</label>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder={c.formPhonePh}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{c.formMessage} *</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder={c.formMsgPh}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent resize-none"
                  />
                </div>

                <button type="submit" disabled={loading} className="btn-primary w-full">
                  {loading ? c.formSending : c.formSubmit}
                </button>

                <p className="text-xs text-gray-400 text-center">{c.privacy}</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
