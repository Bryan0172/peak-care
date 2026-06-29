// Peak Care – E-Book Follow-up Sequenz via Brevo
// Wird von stripe-webhook.js aufgerufen nach Kauf

const BREVO_API_KEY = process.env.BREVO_API_KEY
const EBOOK_BUYER_LIST_ID = 3 // Brevo list ID for ebook buyers

async function addToBrevoList(email, name, productId, lang) {
  try {
    await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: { 'api-key': BREVO_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        attributes: {
          FIRSTNAME: name || '',
          LANGUAGE: lang.toUpperCase(),
          PRODUCT_PURCHASED: productId,
          SOURCE: 'ebook_purchase',
        },
        listIds: [EBOOK_BUYER_LIST_ID],
        updateEnabled: true,
      }),
    })
  } catch (err) {
    console.error('Brevo list error:', err)
  }
}

async function sendFollowupEmail(email, name, lang, delayDays) {
  const templates = {
    de: {
      day3: {
        subject: 'Das übersehen die meisten Hausbesitzer (und zahlen dafür)',
        html: `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
  <div style="background:#0D6B5E;padding:24px 30px;">
    <h1 style="color:white;margin:0;font-size:20px;">Peak Care</h1>
  </div>
  <div style="padding:30px;">
    <p style="color:#444;">Hallo${name ? ' ' + name : ''},</p>
    <p style="color:#444;">ich hoffe, das E-Book hat Ihnen schon erste Erkenntnisse gebracht.</p>
    <p style="color:#444;">Heute möchte ich Ihnen etwas mitgeben, das viele Leser erst beim zweiten Lesen wirklich ernst nehmen:</p>
    <div style="background:#fef3c7;border-left:4px solid #f59e0b;padding:16px;margin:20px 0;">
      <strong style="color:#92400e;">Das teuerste Wort in der Gebäudesanierung: "Warten"</strong>
      <p style="color:#78350f;margin:8px 0 0;">Schimmel verdoppelt seine Fläche unter guten Bedingungen in 24–48 Stunden. Ein Problem, das heute 500 € kostet, kann in drei Monaten 5.000 € kosten.</p>
    </div>
    <p style="color:#444;">Wenn Sie unsicher sind, ob Ihre Immobilie ein Problem hat — buchen Sie eine Videoanalyse.</p>
    <p style="color:#444;"><strong>30 Minuten. Keine Anfahrtskosten. Konkrete Einschätzung.</strong></p>
    <div style="text-align:center;margin:28px 0;">
      <a href="https://www.peak-care.com/#kontakt" style="background:#0D6B5E;color:white;padding:14px 28px;text-decoration:none;border-radius:6px;display:inline-block;font-weight:bold;">
        Videoanalyse buchen →
      </a>
    </div>
    <hr style="border:none;border-top:1px solid #e5e7eb;">
    <p style="color:#888;font-size:12px;">Peak Care · Bansko, Bulgarien · <a href="https://www.peak-care.com" style="color:#0D6B5E;">peak-care.com</a></p>
  </div>
</div>`,
      },
      day7: {
        subject: 'Eine kurze Frage an Sie',
        html: `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
  <div style="background:#0D6B5E;padding:24px 30px;">
    <h1 style="color:white;margin:0;font-size:20px;">Peak Care</h1>
  </div>
  <div style="padding:30px;">
    <p style="color:#444;">Hallo${name ? ' ' + name : ''},</p>
    <p style="color:#444;">vor einer Woche haben Sie unser E-Book heruntergeladen.</p>
    <p style="color:#444;">Ich schreibe diese Mails nicht, um zu verkaufen. Ich schreibe sie, weil gutes Wissen oft nicht in die Praxis umgesetzt wird — nicht weil es fehlt, sondern weil der erste Schritt fehlt.</p>
    <div style="background:#f0fdf4;border-left:4px solid #0D6B5E;padding:16px;margin:20px 0;">
      <strong style="color:#065f46;">Haben Sie schon etwas umgesetzt?</strong>
      <ul style="color:#374151;margin:8px 0 0;padding-left:20px;">
        <li>Den 5-Punkte-Check an Ihrer Immobilie durchgeführt?</li>
        <li>Die Krisenvorsorge-Checkliste angesehen?</li>
        <li>Jemanden in Ihrer Familie mit dem Thema konfrontiert?</li>
      </ul>
    </div>
    <p style="color:#444;">Falls Sie Fragen haben — antworten Sie einfach auf diese Mail. Wir antworten persönlich, ohne Verkaufsdruck.</p>
    <p style="color:#444;">
      📞 <strong>+359 89 843 6561</strong><br>
      📧 <strong>info@peak-care.com</strong>
    </p>
    <hr style="border:none;border-top:1px solid #e5e7eb;">
    <p style="color:#888;font-size:12px;">Peak Care · Bansko, Bulgarien · <a href="https://www.peak-care.com" style="color:#0D6B5E;">peak-care.com</a></p>
  </div>
</div>`,
      },
    },
    en: {
      day3: {
        subject: 'What most homeowners overlook (and pay for later)',
        html: `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
  <div style="background:#0D6B5E;padding:24px 30px;">
    <h1 style="color:white;margin:0;font-size:20px;">Peak Care</h1>
  </div>
  <div style="padding:30px;">
    <p style="color:#444;">Hello${name ? ' ' + name : ''},</p>
    <p style="color:#444;">I hope the e-book has already given you some useful insights.</p>
    <div style="background:#fef3c7;border-left:4px solid #f59e0b;padding:16px;margin:20px 0;">
      <strong style="color:#92400e;">The most expensive word in building remediation: "waiting"</strong>
      <p style="color:#78350f;margin:8px 0 0;">Mold can double its surface area within 24–48 hours. A problem that costs €500 today can cost €5,000 in three months.</p>
    </div>
    <p style="color:#444;">If you're unsure whether your property has a problem — book a video analysis.</p>
    <div style="text-align:center;margin:28px 0;">
      <a href="https://www.peak-care.com/#kontakt" style="background:#0D6B5E;color:white;padding:14px 28px;text-decoration:none;border-radius:6px;display:inline-block;font-weight:bold;">
        Book Video Analysis →
      </a>
    </div>
    <hr style="border:none;border-top:1px solid #e5e7eb;">
    <p style="color:#888;font-size:12px;">Peak Care · Bansko, Bulgaria · <a href="https://www.peak-care.com" style="color:#0D6B5E;">peak-care.com</a></p>
  </div>
</div>`,
      },
      day7: {
        subject: 'A quick question for you',
        html: `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
  <div style="background:#0D6B5E;padding:24px 30px;">
    <h1 style="color:white;margin:0;font-size:20px;">Peak Care</h1>
  </div>
  <div style="padding:30px;">
    <p style="color:#444;">Hello${name ? ' ' + name : ''},</p>
    <p style="color:#444;">A week ago you downloaded our e-book. Have you had a chance to act on any of it?</p>
    <p style="color:#444;">If you have any questions — just reply to this email. We respond personally, no sales pressure.</p>
    <p style="color:#444;">
      📞 <strong>+359 89 843 6561</strong><br>
      📧 <strong>info@peak-care.com</strong>
    </p>
    <hr style="border:none;border-top:1px solid #e5e7eb;">
    <p style="color:#888;font-size:12px;">Peak Care · Bansko, Bulgaria · <a href="https://www.peak-care.com" style="color:#0D6B5E;">peak-care.com</a></p>
  </div>
</div>`,
      },
    },
  }

  const t = (templates[lang] || templates['de'])[`day${delayDays}`]
  if (!t) return

  // Schedule via Brevo transactional email with scheduled time
  const scheduledAt = new Date(Date.now() + delayDays * 24 * 60 * 60 * 1000).toISOString()

  await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'api-key': BREVO_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sender: { name: 'Peak Care', email: 'info@peak-care.com' },
      to: [{ email, name: name || email }],
      subject: t.subject,
      htmlContent: t.html,
      scheduledAt,
    }),
  })
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  let body
  try {
    body = JSON.parse(event.body)
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' }
  }

  const { email, name, productId, lang = 'de' } = body

  if (!email) return { statusCode: 400, body: 'Missing email' }

  // Add to Brevo list
  await addToBrevoList(email, name, productId, lang)

  // Schedule Day 3 and Day 7 follow-ups
  await Promise.all([
    sendFollowupEmail(email, name, lang, 3),
    sendFollowupEmail(email, name, lang, 7),
  ])

  return { statusCode: 200, body: JSON.stringify({ success: true }) }
}
