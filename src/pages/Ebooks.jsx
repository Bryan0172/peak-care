import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '../components/CheckoutForm'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder')

const ebooks = [
  {
    id: 'ebook_schimmel',
    title: 'Schimmel und Feuchtigkeit im Griff',
    price: 12,
    badge: 'Bestseller',
    badgeColor: 'bg-teal-500',
    description:
      'Der komplette Ratgeber: Schimmelarten erkennen, Ursachen finden, dauerhaft beseitigen – und vorsorgen, bevor es zu spät ist.',
    features: [
      'Alle gängigen Schimmelarten und ihre Risiken',
      'Schritt-für-Schritt-Sanierungsanleitung',
      'Richtig lüften und Feuchtigkeit messen',
      'Wann Profis gefragt sind',
      'Checklisten zum Ausdrucken',
      'Ca. 60 Seiten, PDF-Format',
    ],
    gradient: 'from-teal-500 to-teal-700',
    icon: '🍃',
  },
  {
    id: 'ebook_krisen',
    title: 'Krisensicheres Zuhause',
    price: 17,
    badge: 'Empfohlen',
    badgeColor: 'bg-yellow-500',
    description:
      'Wie Sie Ihr Zuhause und Ihre Familie auf Blackouts, Extremwetter und Krisenszenarien vorbereiten – ohne Panikmache.',
    features: [
      '14-Tage-Vorrat aufbauen: konkrete Listen',
      'Notfallplan für die ganze Familie',
      'Gebäude krisenfest machen',
      'Notstrom & Wasser-Backup',
      '30-Tage-Vorbereitungsplan',
      'Ca. 80 Seiten, PDF-Format',
    ],
    gradient: 'from-yellow-500 to-orange-500',
    icon: '🏠',
  },
]

function EbookCard({ ebook, onBuy }) {
  return (
    <div className="card flex flex-col overflow-hidden">
      {/* Header */}
      <div className={`bg-gradient-to-br ${ebook.gradient} p-10 text-white text-center relative`}>
        <span className={`absolute top-4 right-4 ${ebook.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
          {ebook.badge}
        </span>
        <div className="text-6xl mb-4">{ebook.icon}</div>
        <h2 className="text-2xl font-bold leading-snug">{ebook.title}</h2>
        <div className="mt-4 text-5xl font-extrabold">
          {ebook.price} €
        </div>
        <div className="text-white/70 text-sm mt-1">einmalig · sofort verfügbar</div>
      </div>

      {/* Body */}
      <div className="p-8 flex flex-col flex-grow">
        <p className="text-gray-600 leading-relaxed mb-6">{ebook.description}</p>
        <ul className="space-y-2 mb-8 flex-grow">
          {ebook.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="w-5 h-5 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              {f}
            </li>
          ))}
        </ul>

        <button
          onClick={() => onBuy(ebook)}
          className="btn-primary w-full text-center"
        >
          Jetzt kaufen – {ebook.price} €
        </button>

        <p className="text-xs text-center text-gray-400 mt-3">
          Sichere Zahlung · Sofort-Download nach Kauf
        </p>
      </div>
    </div>
  )
}

function CheckoutModal({ ebook, onClose }) {
  const [clientSecret, setClientSecret] = useState(null)
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)

  // Initiate payment intent when modal opens
  useState(() => {
    async function init() {
      try {
        const res = await fetch('/.netlify/functions/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId: ebook.id }),
        })
        const data = await res.json()
        if (data.error) throw new Error(data.error)
        setClientSecret(data.clientSecret)
      } catch (err) {
        setFetchError(err.message)
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [])

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="font-bold text-gray-900">Bestellung abschließen</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          {loading && (
            <div className="text-center py-8 text-gray-500">
              <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              Zahlung wird vorbereitet...
            </div>
          )}
          {fetchError && (
            <div className="bg-red-50 text-red-700 border border-red-200 rounded-lg p-4 text-sm">
              Fehler: {fetchError}
              <p className="mt-1 text-xs">Bitte stellen Sie sicher, dass der Stripe-Key konfiguriert ist.</p>
            </div>
          )}
          {clientSecret && (
            <Elements
              stripe={stripePromise}
              options={{ clientSecret, appearance: { theme: 'stripe' } }}
            >
              <CheckoutForm productName={ebook.title} onBack={onClose} />
            </Elements>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Ebooks() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Digital & Sofort verfügbar</span>
        <h1 className="text-4xl font-bold text-gray-900 mt-2 mb-3">E-Books</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Professionelles Wissen aus der Praxis – kompakt, verständlich und direkt umsetzbar.
          Als PDF nach dem Kauf sofort zum Download.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {ebooks.map((e) => (
          <EbookCard key={e.id} ebook={e} onBuy={setSelected} />
        ))}
      </div>

      {/* Trust section */}
      <div className="mt-12 bg-gray-50 rounded-2xl p-8 text-center">
        <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            SSL-verschlüsselte Zahlung
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Sofort-Download nach Kauf
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            Zahlung über Stripe
          </div>
        </div>
      </div>

      {selected && (
        <CheckoutModal ebook={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}
