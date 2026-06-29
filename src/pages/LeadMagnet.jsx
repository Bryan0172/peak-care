import { useState } from 'react'

const BREVO_LIST_ID = 3 // Lead Magnet - Schimmel-Sofort-Check
const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY

export default function LeadMagnet() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    setError('')

    try {
      const res = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'api-key': BREVO_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          attributes: { FIRSTNAME: name },
          listIds: [BREVO_LIST_ID],
          updateEnabled: true,
        }),
      })

      if (res.ok || res.status === 204) {
        setStatus('success')
      } else {
        const data = await res.json()
        // Contact already exists → still allow download
        if (data.code === 'duplicate_parameter') {
          setStatus('success')
        } else {
          throw new Error(data.message || 'Fehler')
        }
      }
    } catch (err) {
      setStatus('error')
      setError('Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">📋</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Schimmel-Sofort-Check
          </h1>
          <p className="text-lg text-gray-600">
            10 Zeichen, die Sie jetzt prüfen müssen — kostenlos als PDF
          </p>
          <p className="text-sm text-gray-400 mt-1 italic">
            10 signs to check right now — free PDF checklist
          </p>
        </div>

        {status !== 'success' ? (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Benefits */}
            <ul className="space-y-3 mb-8">
              {[
                ['✅', 'Sofort als PDF — keine Wartezeit'],
                ['✅', '10 konkrete Checkboxen (DE + EN)'],
                ['✅', 'Auswertung: Wie dringend ist Ihr Fall?'],
                ['✅', 'Direkte Empfehlung was zu tun ist'],
              ].map(([icon, text]) => (
                <li key={text} className="flex items-start gap-3 text-gray-700">
                  <span>{icon}</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vorname / First name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Max"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-Mail *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="ihre@email.com"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {error && (
                <p className="text-red-600 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors disabled:opacity-60"
              >
                {status === 'loading'
                  ? 'Wird gesendet…'
                  : '📥 Gratis herunterladen'}
              </button>

              <p className="text-xs text-gray-400 text-center">
                Kein Spam. Keine Kreditkarte. Jederzeit abmeldbar.
              </p>
            </form>
          </div>
        ) : (
          /* SUCCESS STATE */
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Ihr PDF ist bereit!
            </h2>
            <p className="text-gray-600 mb-8">
              Klicken Sie unten um den Schimmel-Sofort-Check herunterzuladen.
            </p>
            <a
              href="/downloads/schimmel-sofort-check.pdf"
              download
              className="inline-block bg-green-700 hover:bg-green-800 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors mb-6"
            >
              📄 Jetzt herunterladen / Download now
            </a>
            <p className="text-sm text-gray-500">
              Sie erhalten in Kürze eine Bestätigungs-E-Mail von Peak Care.
            </p>
            <div className="mt-8 pt-8 border-t border-gray-100">
              <p className="text-gray-700 font-medium mb-3">
                Mehr als 6 Häkchen? Wir helfen Ihnen.
              </p>
              <a
                href="/#contact"
                className="text-green-700 hover:text-green-800 font-semibold underline"
              >
                Jetzt Videoanalyse buchen →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
