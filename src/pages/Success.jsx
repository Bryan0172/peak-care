import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'

export default function Success() {
  const { t } = useLang()
  const s = t.success

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 bg-gray-950">
      <div className="text-center max-w-lg">
        <div className="w-20 h-20 bg-teal-500/20 border border-teal-400/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-extrabold text-white mb-3">{s.headline}</h1>
        <p className="text-gray-300 text-lg mb-2">{s.msg}</p>
        <p className="text-gray-500 text-sm mb-8">{s.hint}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary">{s.home}</Link>
          <Link to="/blog" className="btn-secondary border-gray-700 text-gray-300 hover:bg-gray-800">{s.blog}</Link>
        </div>
      </div>
    </div>
  )
}
