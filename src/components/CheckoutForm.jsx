import { useState } from 'react'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'

export default function CheckoutForm({ productName, onBack }) {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!stripe || !elements) return

    setProcessing(true)
    setError(null)

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/erfolg`,
      },
    })

    if (stripeError) {
      setError(stripeError.message)
      setProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-teal-50 rounded-lg px-4 py-3 text-sm text-teal-800 font-medium">
        Zahlung für: <span className="font-bold">{productName}</span>
      </div>

      <PaymentElement />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onBack} className="btn-secondary flex-1 text-sm">
          Zurück
        </button>
        <button
          type="submit"
          disabled={!stripe || processing}
          className="btn-primary flex-1 text-sm"
        >
          {processing ? 'Wird verarbeitet...' : 'Jetzt kaufen'}
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Sichere Zahlung über Stripe
      </div>
    </form>
  )
}
