import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '../components/CheckoutForm'
import { useLang } from '../context/LanguageContext'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder')

function CheckoutModal({ ebook, onClose }) {
  const [clientSecret, setClientSecret] = useState(null)
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)

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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="font-bold text-gray-900">{ebook.title}</h3>
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
              Wird vorbereitet...
            </div>
          )}
          {fetchError && (
            <div className="bg-red-50 text-red-700 border border-red-200 rounded-lg p-4 text-sm">
              {fetchError}
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
  const { t } = useLang()
  const e = t.ebooks
  const h = t.ebooksHome
  const [selected, setSelected] = useState(null)

  const ebooks = [
    {
      id: 'ebook_schimmel',
      title: h.ebook1Title,
      price: h.ebook1Price,
      desc: h.ebook1Desc,
      badge: e.bestseller,
      badgeClass: 'bg-teal-500 text-white',
      gradient: 'from-teal-600 to-teal-800',
      icon: '🍃',
      pages: e.pages60,
      features: e.features.mold,
      image: 'https://images.unsplash.com/photo-1599619585752-c3edb42a414c?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'ebook_krisen',
      title: h.ebook2Title,
      price: h.ebook2Price,
      desc: h.ebook2Desc,
      badge: e.recommended,
      badgeClass: 'bg-orange-500 text-white',
      gradient: 'from-orange-600 to-red-700',
      icon: '🏠',
      pages: e.pages80,
      features: e.features.crisis,
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'ebook_bundle',
      title: h.bundleTitle,
      price: h.bundlePrice,
      desc: h.bundleDesc,
      badge: h.bundleBadge,
      badgeClass: 'bg-yellow-400 text-gray-900',
      gradient: 'from-yellow-500 to-orange-600',
      icon: '📦',
      pages: e.pages140,
      features: e.features.bundle,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
      isBundle: true,
    },
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gray-950 py-16 text-center">
        <span className="inline-block bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 text-sm font-semibold px-4 py-1 rounded-full mb-4">
          {e.badge}
        </span>
        <h1 className="text-4xl font-bold text-white mb-3">{e.headline}</h1>
        <p className="text-gray-400 max-w-xl mx-auto">{e.sub}</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ebooks.map((book) => (
            <div
              key={book.id}
              className={`card flex flex-col overflow-hidden ${
                book.isBundle ? 'ring-2 ring-yellow-400' : ''
              }`}
            >
              {/* Image + gradient header */}
              <div className={`relative bg-gradient-to-br ${book.gradient} p-10 text-white text-center`}>
                <span className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full ${book.badgeClass}`}>
                  {book.badge}
                </span>
                <div className="text-6xl mb-3">{book.icon}</div>
                <h2 className="text-xl font-bold leading-snug">{book.title}</h2>
                <div className="text-4xl font-extrabold mt-3">{book.price}</div>
                <div className="text-white/60 text-xs mt-1">{e.oneTime}</div>
              </div>

              {/* Body */}
              <div className="p-7 flex flex-col flex-grow">
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{book.desc}</p>

                <ul className="space-y-2 mb-6 flex-grow">
                  {book.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="w-4 h-4 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setSelected(book)}
                  className={`w-full font-bold py-3 rounded-xl transition-all text-sm ${
                    book.isBundle
                      ? 'bg-yellow-400 hover:bg-yellow-300 text-gray-900'
                      : 'btn-primary'
                  }`}
                >
                  {e.buyNow} – {book.price}
                </button>
                <p className="text-xs text-center text-gray-400 mt-2">{book.pages}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust */}
        <div className="mt-10 bg-white rounded-2xl p-6 flex flex-wrap justify-center gap-8 text-sm text-gray-500 shadow-sm">
          {[
            { emoji: '🔒', text: e.trustSSL },
            { emoji: '⚡', text: e.trustDownload },
            { emoji: '💳', text: e.trustStripe },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2">
              <span>{item.emoji}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {selected && <CheckoutModal ebook={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
