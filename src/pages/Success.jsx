import { Link } from 'react-router-dom'

export default function Success() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-3">Zahlung erfolgreich!</h1>
        <p className="text-gray-500 text-lg mb-2">
          Vielen Dank für Ihren Kauf. Sie erhalten Ihr E-Book in Kürze per E-Mail.
        </p>
        <p className="text-gray-400 text-sm mb-8">
          Bitte überprüfen Sie auch Ihren Spam-Ordner, falls die E-Mail nicht innerhalb von 5 Minuten ankommt.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary">Zur Startseite</Link>
          <Link to="/blog" className="btn-secondary">Zum Blog</Link>
        </div>
      </div>
    </div>
  )
}
