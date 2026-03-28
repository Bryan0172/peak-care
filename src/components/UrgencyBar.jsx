import { useState } from 'react'
import { useLang } from '../context/LanguageContext'

export default function UrgencyBar() {
  const { t } = useLang()
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="bg-red-700 text-white text-sm">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1 justify-center">
          <span className="hidden sm:inline-block w-2 h-2 bg-red-300 rounded-full animate-pulse shrink-0" />
          <span className="font-medium text-center leading-snug">
            {t.urgencyBar.text}
          </span>
        </div>
        <button
          onClick={() => setVisible(false)}
          aria-label="Schließen"
          className="text-red-200 hover:text-white transition-colors shrink-0 text-lg leading-none"
        >
          {t.urgencyBar.dismiss}
        </button>
      </div>
    </div>
  )
}
