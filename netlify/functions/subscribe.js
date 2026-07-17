// Peak Care – Lead Magnet Subscription
// Adds contact to Brevo + sends welcome mail with free PDF link
//
// Turnstile ist hier PFLICHT, nicht Kosmetik: der Endpoint verschickt Mail an eine frei
// waehlbare Adresse ueber unseren verifizierten Absender. Ohne Schutz waere das ein offenes
// Mail-Relay — wer es findet, verbrennt unsere Absender-Reputation und unser Brevo-Konto.
// Logik 1:1 aus lead.js (dort bewaehrt).

// Faellt OPEN bei jedem technischen Fehler (leere/kaputte Cloudflare-Antwort, Netzwerkfehler):
// ein Verifikations-Hickup darf nie einen echten Lead verschlucken. Ein FEHLENDES Token gilt
// dagegen als Bot — das ist kein technischer Fehler, sondern eine ausgebliebene Challenge.
async function verifyTurnstile(token, ip) {
  if (!token) return false
  try {
    const body = new URLSearchParams()
    body.append('secret', process.env.CLOUDFLARE_TURNSTILE_SECRET || '')
    body.append('response', token)
    if (ip) body.append('remoteip', ip)
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v1/siteverify', {
      method: 'POST', body,
    })
    if (!res.ok) {
      console.error(`Turnstile siteverify HTTP ${res.status} — failing open`)
      return true
    }
    const text = await res.text()
    let json
    try { json = JSON.parse(text) } catch (e) {
      console.error('Turnstile siteverify returned non-JSON — failing open', text.slice(0, 200))
      return true
    }
    return json.success === true
  } catch (e) {
    console.error('Turnstile verification threw — failing open to avoid losing a lead', (e && e.message) || String(e))
    return true
  }
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const headers = {
    'Access-Control-Allow-Origin': 'https://www.peak-care.com',
    'Content-Type': 'application/json',
  }

  let body
  try {
    body = JSON.parse(event.body)
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON' }) }
  }

  const { email, name, lang = 'de', listId } = body

  // Honeypot: gefuelltes Bot-Feld -> still akzeptieren, damit der Bot keinen Fehler sieht
  // und das Formular nicht als kaputt erkennt.
  if (body['bot-field']) {
    return { statusCode: 200, headers, body: JSON.stringify({ success: true }) }
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid email' }) }
  }

  // Turnstile: nur aktiv wenn CLOUDFLARE_TURNSTILE_SECRET gesetzt ist (wie lead.js).
  // Bot -> 200 ohne Wirkung: kein Kontakt, kein Mailversand, aber auch kein Fehlersignal.
  if (process.env.CLOUDFLARE_TURNSTILE_SECRET) {
    const token = body['cf-turnstile-response']
    const ip = event.headers['cf-connecting-ip'] || event.headers['x-forwarded-for'] || ''
    if (!await verifyTurnstile(token, ip)) {
      return { statusCode: 200, headers, body: JSON.stringify({ success: true }) }
    }
  }

  const BREVO_API_KEY = process.env.BREVO_API_KEY
  // Allowlist: der Client darf die Liste waehlen, aber nur aus bekannten Lead-Magnet-Listen —
  // sonst koennte ein Fremder ueber diesen oeffentlichen Endpoint in beliebige Listen schreiben.
  const ALLOWED_LISTS = [2, 3]
  const LEAD_MAGNET_LIST_ID = ALLOWED_LISTS.includes(Number(listId)) ? Number(listId) : 2
  // Kontakt anlegen. Der Willkommens-Mailversand liegt NICHT mehr hier, sondern in der
  // Brevo-Automation "Lead Magnet - Welcome Email" (Trigger "Contact added to list" -> Liste 3),
  // die das gestaltete zweisprachige Template schickt. Vorher sendeten BEIDE -> der Anmelder bekam
  // zwei Mails (verifiziert 17.07. im Brevo-Log: 06:55:25 diese Funktion, 06:55:29 die Automation).
  //
  // Nebeneffekt, der zaehlt: diese Funktion verschickt jetzt gar keine Mail mehr an eine frei
  // waehlbare Adresse. Das Mail-Relay-Risiko entfaellt damit vollstaendig, statt nur durch
  // Turnstile gedeckt zu sein.
  //
  // Der Kontakt ist damit der EINZIGE Ausloeser der Willkommensmail. Schlaegt er fehl, darf hier
  // KEIN Erfolg gemeldet werden - sonst wartet der Anmelder auf eine Mail, die nie kommt (der
  // frueher hier verschluckte Fehler fiel nur deshalb nicht auf, weil die Mail separat rausging).
  try {
    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: { 'api-key': BREVO_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        attributes: { FIRSTNAME: name || '', LANGUAGE: lang.toUpperCase(), SOURCE: 'lead_magnet' },
        listIds: [LEAD_MAGNET_LIST_ID],
        updateEnabled: true,
      }),
    })
    if (!res.ok) {
      console.error('Brevo contact add failed', res.status, await res.text())
      return { statusCode: 502, headers, body: JSON.stringify({ error: 'Subscription failed' }) }
    }
  } catch (err) {
    console.error('Brevo contact exception:', (err && err.message) || String(err))
    return { statusCode: 502, headers, body: JSON.stringify({ error: 'Subscription failed' }) }
  }

  return { statusCode: 200, headers, body: JSON.stringify({ success: true }) }
}
