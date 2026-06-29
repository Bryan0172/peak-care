import { useState } from 'react'
import { useLang } from '../context/LanguageContext'

const CONTENT = {
  de: {
    badge: 'KOSTENLOS',
    headline: 'Haben Sie ein verstecktes Schimmelproblem?',
    sub: 'Finden Sie es in 5 Minuten heraus — mit unserem kostenlosen 5-Punkte-Sofort-Check.',
    bullets: [
      '5-Punkte-Check zum sofortigen Einsatz in Ihrer Immobilie',
      'Klare Auswertung: Kein Risiko / Erhöhtes Risiko / Dringend handeln',
      'Konkrete nächste Schritte für jedes Szenario',
    ],
    placeholder: 'Ihre E-Mail-Adresse',
    btn: 'Gratis herunterladen',
    note: 'Kein Spam. Jederzeit abmeldbar.',
    success: 'Perfekt! Hier ist Ihr kostenloser Schimmel-Sofort-Check:',
    download: 'PDF jetzt herunterladen',
    error: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.',
  },
  en: {
    badge: 'FREE',
    headline: 'Do you have a hidden mold problem?',
    sub: 'Find out in 5 minutes — with our free 5-point quick check.',
    bullets: [
      '5-point check for immediate use at your property',
      'Clear result: No risk / Elevated risk / Urgent action needed',
      'Concrete next steps for every scenario',
    ],
    placeholder: 'Your email address',
    btn: 'Download free',
    note: 'No spam. Unsubscribe any time.',
    success: 'Here is your free Mold Quick-Check:',
    download: 'Download PDF now',
    error: 'Something went wrong. Please try again.',
  },
  bg: {
    badge: 'БЕЗПЛАТНО',
    headline: 'Имате скрит проблем с мухъл?',
    sub: 'Разберете за 5 минути — с нашата безплатна проверка.',
    bullets: [
      'Проверка в 5 стъпки за вашия имот',
      'Ясна оценка: Без риск / Повишен риск / Спешно действие',
      'Конкретни следващи стъпки за всеки сценарий',
    ],
    placeholder: 'Вашият имейл адрес',
    btn: 'Изтеглете безплатно',
    note: 'Без спам. Отпишете се по всяко време.',
    success: 'Ето вашата безплатна проверка за мухъл:',
    download: 'Изтеглете PDF',
    error: 'Нещо се обърка. Моля, опитайте отново.',
  },
}

export default function LeadMagnet() {
  const { lang } = useLang()
  const c = CONTENT[lang] || CONTENT.de

  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')

    try {
      const res = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': import.meta.env.VITE_BREVO_API_KEY,
        },
        body: JSON.stringify({
          email,
          listIds: [3],
          updateEnabled: true,
        }),
      })
      if (res.ok || res.status === 204) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="py-20 bg-gray-950">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left: Copy */}
          <div>
            <span className="inline-block bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-wide">
              {c.badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
              {c.headline}
            </h2>
            <p className="text-gray-400 text-lg mb-6">{c.sub}</p>
            <ul className="space-y-3">
              {c.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300">
                  <svg className="w-5 h-5 text-teal-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Form */}
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            {status === 'success' ? (
              <div className="text-center py-6">
                <div className="text-5xl mb-3">✅</div>
                <p className="text-gray-800 font-semibold text-lg mb-5">{c.success}</p>
                <a
                  href="/downloads/schimmel-sofort-check.pdf"
                  download
                  className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg transition-colors text-base"
                >
                  📥 {c.download}
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    {c.placeholder}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 px-6 rounded-lg transition-colors disabled:opacity-60 text-base"
                >
                  {status === 'loading' ? '...' : `📋 ${c.btn}`}
                </button>

                {status === 'error' && (
                  <p className="text-red-500 text-sm text-center">{c.error}</p>
                )}

                <p className="text-gray-400 text-xs text-center">{c.note}</p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
