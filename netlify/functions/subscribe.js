// Peak Care – Lead Magnet Subscription
// Adds contact to Brevo + sends welcome mail with free PDF link

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }

  let body
  try {
    body = JSON.parse(event.body)
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON' }) }
  }

  const { email, name, lang = 'de' } = body

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid email' }) }
  }

  const BREVO_API_KEY = process.env.BREVO_API_KEY
  const LEAD_MAGNET_LIST_ID = 2 // Brevo list ID for lead magnet subscribers

  // 1. Add contact to Brevo list
  try {
    await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        attributes: { FIRSTNAME: name || '', LANGUAGE: lang.toUpperCase(), SOURCE: 'lead_magnet' },
        listIds: [LEAD_MAGNET_LIST_ID],
        updateEnabled: true,
      }),
    })
  } catch (err) {
    console.error('Brevo contact error:', err)
  }

  // 2. Send welcome email with lead magnet PDF
  const templates = {
    de: {
      subject: 'Ihr kostenloser Schimmel-Check ist da 📋',
      heading: 'Ihr 5-Punkte-Sofort-Check',
      intro: `Herzlichen Glückwunsch – Sie haben den ersten Schritt gemacht.`,
      body: `In weniger als 5 Minuten wissen Sie, ob Ihre Immobilie ein Schimmelproblem hat – oder nicht.<br><br>
Hier ist Ihr kostenloser Check:<br><br>
<a href="https://www.peak-care.com/downloads/schimmel-sofort-check.pdf"
   style="background:#0D6B5E;color:white;padding:14px 28px;text-decoration:none;border-radius:6px;display:inline-block;font-weight:bold;">
📋 Sofort-Check herunterladen
</a><br><br>
<strong>Was Sie als nächstes tun können:</strong><br>
<ul>
<li>Führen Sie den Check in Ihrer Wohnung durch (dauert 5 Minuten)</li>
<li>Wenn Sie 7+ Punkte erreichen: Buchen Sie eine kostenlose Ersteinschätzung</li>
<li>Lesen Sie unsere aktuellen Blog-Artikel zu Schimmel und Krisenvorsorge</li>
</ul>`,
      cta_text: 'Videoanalyse buchen',
      cta_url: 'https://www.peak-care.com/#kontakt',
      closing: 'Bei Fragen antworten Sie einfach auf diese Mail.',
    },
    en: {
      subject: 'Your free mold check is here 📋',
      heading: 'Your 5-Point Quick Check',
      intro: 'Congratulations – you\'ve taken the first step.',
      body: `In less than 5 minutes, you\'ll know whether your property has a mold problem — or not.<br><br>
Here is your free check:<br><br>
<a href="https://www.peak-care.com/downloads/mold-quick-check.pdf"
   style="background:#0D6B5E;color:white;padding:14px 28px;text-decoration:none;border-radius:6px;display:inline-block;font-weight:bold;">
📋 Download Quick Check
</a><br><br>
<strong>What you can do next:</strong><br>
<ul>
<li>Complete the check at your property (takes 5 minutes)</li>
<li>If you score 7+ points: book a free initial consultation</li>
<li>Read our latest blog articles on mold and crisis preparedness</li>
</ul>`,
      cta_text: 'Book Video Analysis',
      cta_url: 'https://www.peak-care.com/#kontakt',
      closing: 'Any questions? Just reply to this email.',
    },
  }

  const t = templates[lang] || templates['de']

  const html = `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;">
  <div style="background:#0D6B5E;padding:30px;text-align:center;">
    <h1 style="color:white;margin:0;font-size:24px;">Peak Care</h1>
    <p style="color:#a7f3d0;margin:8px 0 0;font-size:14px;">Schimmelschutz & Krisenvorsorge</p>
  </div>
  <div style="padding:32px;">
    <h2 style="color:#1a1a1a;margin-top:0;">${t.heading}</h2>
    <p style="color:#444;">${t.intro}</p>
    <div style="color:#444;line-height:1.7;">${t.body}</div>
    <div style="text-align:center;margin:32px 0;">
      <a href="${t.cta_url}" style="background:#0D6B5E;color:white;padding:14px 28px;text-decoration:none;border-radius:6px;display:inline-block;font-weight:bold;">
        ${t.cta_text}
      </a>
    </div>
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;">
    <p style="color:#888;font-size:13px;">${t.closing}</p>
    <p style="color:#888;font-size:12px;">
      Peak Care · Bansko, Bulgarien ·
      <a href="https://www.peak-care.com" style="color:#0D6B5E;">peak-care.com</a>
    </p>
  </div>
</div>`

  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'Peak Care', email: 'info@peak-care.com' },
        to: [{ email, name: name || email }],
        subject: t.subject,
        htmlContent: html,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Brevo send error:', err)
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'Email send failed' }) }
    }
  } catch (err) {
    console.error('Email error:', err)
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Email error' }) }
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ success: true }),
  }
}
