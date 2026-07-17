import { useRef, useEffect } from 'react'

// Oeffentlicher Cloudflare-Sitekey — gehoert ins Bundle (wie ein Stripe-Publishable-Key).
// Das Gegenstueck ist CLOUDFLARE_TURNSTILE_SECRET, das ausschliesslich serverseitig
// (netlify/functions) liegen darf.
export const TURNSTILE_SITEKEY = '0x4AAAAAADtugrvEnoy83UQj'

/**
 * Turnstile-Widget als wiederverwendbare Komponente.
 *
 * Die Logik stammt 1:1 aus ContactSection.jsx (Fixes 11.07., dort im Einsatz und bewaehrt).
 * Sie ist hier herausgezogen, damit die zwei unten beschriebenen Fallen an EINER Stelle
 * geloest bleiben statt in jeder Formular-Kopie neu.
 *
 * onToken(token) wird mit dem Token aufgerufen, bzw. mit '' wenn es ablaeuft/fehlschlaegt.
 */
export default function TurnstileWidget({ onToken, theme = 'light', className = '' }) {
  const containerRef = useRef(null)
  const widgetId = useRef(null)

  // onToken ueber ein Ref halten: sonst muesste es in die Dep-Liste, und ein inline
  // uebergebener Callback wuerde das Widget bei jedem Parent-Render neu aufbauen.
  const onTokenRef = useRef(onToken)
  onTokenRef.current = onToken

  // FALLE 1: Explizites Rendern statt implizitem data-sitekey-Auto-Scan. Das Turnstile-Script
  // (async defer) laeuft haeufig VOR React den Container mountet — der implizite Scan sieht
  // ihn dann nie, und es entsteht real nie ein Token (stiller Lead-Verlust ohne Fehlermeldung).
  useEffect(() => {
    let cancelled = false
    let pollTimer = null

    function renderWidget() {
      if (cancelled || !containerRef.current || widgetId.current !== null) return
      widgetId.current = window.turnstile.render(containerRef.current, {
        sitekey: TURNSTILE_SITEKEY,
        theme,
        callback: (token) => onTokenRef.current(token),
        'expired-callback': () => onTokenRef.current(''),
        'error-callback': () => onTokenRef.current(''),
      })
    }

    if (window.turnstile) {
      renderWidget()
    } else {
      pollTimer = setInterval(() => {
        if (window.turnstile) {
          clearInterval(pollTimer)
          renderWidget()
        }
      }, 200)
    }

    return () => {
      cancelled = true
      if (pollTimer) clearInterval(pollTimer)
      if (widgetId.current !== null && window.turnstile) {
        try { window.turnstile.remove(widgetId.current) } catch (e) { /* noop */ }
      }
    }
  }, [theme])

  // FALLE 2: Kein "cf-turnstile"-Klassenname. Cloudflares eigener MutationObserver scannt
  // Elemente mit dieser Klasse implizit, versucht ohne data-sitekey selbst zu rendern,
  // crasht dabei intern und blockiert den gewollten expliziten render()-Aufruf oben.
  return <div ref={containerRef} className={`turnstile-widget ${className}`} style={{ marginBottom: '8px' }} />
}
