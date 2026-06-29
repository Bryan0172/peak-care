import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder')

export default function CheckoutModal({ productId, productName, coverImage, onClose }) {
  const [clientSecret, setClientSecret] = useState(null)
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)

  useEffect(() => {
    async function init() {
      try {
        const res = await fetch('/.netlify/functions/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId }),
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
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b sticky top-0 bg-white rounded-t-2xl z-10">
          <div>
            <h3 className="font-bold text-gray-900 text-sm">{productName}</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors ml-4 shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          {loading && (
            <div className="text-center py-10 text-gray-500">
              <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm font-medium text-gray-600">Zahlungsformular wird geladen…</p>
              <p className="text-xs text-gray-400 mt-1">Einen Moment bitte (ca. 5–10 Sekunden)</p>
            </div>
          )}
          {fetchError && (
            <div className="bg-red-50 text-red-700 border border-red-200 rounded-lg p-4 text-sm">
              ⚠️ {fetchError}<br />
              <span className="text-xs text-red-500 mt-1 block">Bitte Seite neu laden und erneut versuchen.</span>
            </div>
          )}
          {clientSecret && (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                locale: 'de',
                appearance: {
                  theme: 'stripe',
                  variables: {
                    colorPrimary: '#0d9488',
                    borderRadius: '8px',
                  },
                },
              }}
            >
              <CheckoutForm productName={productName} onBack={onClose} />
            </Elements>
          )}
        </div>
      </div>
    </div>
  )
}
