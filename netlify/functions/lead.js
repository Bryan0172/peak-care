// netlify/functions/lead.js — Peak-Care-Kontaktanfragen → Brevo-Mail (Zustellung in den Posteingang, wie BC).
// AJAX-Endpoint: liefert JSON-Status (kein Redirect). Bei Versand-Fehler 502 → der Client zeigt KEIN
// falsches "gesendet" (verhindert stillen Lead-Verlust). Benötigt env BREVO_API_KEY (Netlify-Site-Settings).
const BREVO_URL = 'https://api.brevo.com/v3/smtp/email';
const SENDER = { email: 'peakcare@peak-care.com', name: 'Peak Care Website' }; // in Brevo verifizierter Absender
const TO = [{ email: 'peakcare@peak-care.com', name: 'Peak Care' }];
const BCC = [{ email: 'andy7203@googlemail.com' }];

// Faellt OPEN bei jedem technischen Fehler (leere/kaputte Cloudflare-Antwort, Netzwerkfehler):
// ein Verifikations-Hickup darf die Funktion nie abstuerzen oder einen echten Lead stillschweigend
// verschlucken — Honeypot + isSpam bleiben als die anderen zwei Spam-Schichten ohnehin bestehen.
async function verifyTurnstile(token, ip) {
  if (!token) return false;
  try {
    const body = new URLSearchParams();
    body.append('secret', process.env.CLOUDFLARE_TURNSTILE_SECRET || '');
    body.append('response', token);
    if (ip) body.append('remoteip', ip);
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v1/siteverify', {
      method: 'POST', body,
    });
    if (!res.ok) {
      console.error(`Turnstile siteverify HTTP ${res.status} — failing open`);
      return true;
    }
    const text = await res.text();
    let json;
    try { json = JSON.parse(text); } catch (e) {
      console.error('Turnstile siteverify returned non-JSON — failing open', text.slice(0, 200));
      return true;
    }
    return json.success === true;
  } catch (e) {
    console.error('Turnstile verification threw — failing open to avoid losing a lead', (e && e.message) || String(e));
    return true;
  }
}

function esc(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// PATCH 31.07.2026 (SEO/GEO) — Sichtbarkeit fuer blockierte Leads, uebernommen aus der
// BC-Fassung (banskoconcierge-website/netlify/functions/lead.js), die genau das seit
// laengerem tut. Grund: ein Turnstile-Token, das fehlt oder abgelaufen ist (Cloudflare-
// Token leben ~300 s), fuehrt hier zu "200 {ok:true}" OHNE Mail — der Absender sieht im
// Frontend "gesendet", und niemand erfaehrt je davon. Auf BC wurde derselbe Fall NUR
// deshalb bemerkt, weil dort diese Benachrichtigung existiert (5 Mails am 29./30.07.).
// Die Antwort an den Client bleibt unveraendert 200 {ok:true} — ein Bot soll weiterhin
// "Erfolg" sehen. Es aendert sich AUSSCHLIESSLICH, dass wir es erfahren.
async function notifyBlocked(reason, data, formName) {
  try {
    const rows = Object.entries(data)
      .filter(([k]) => !['form-name', 'bot-field', 'cf-turnstile-response'].includes(k))
      .map(([k, v]) => `<tr><td style="padding:4px 12px;font-weight:600;vertical-align:top;border-bottom:1px solid #eee">${esc(k)}</td><td style="padding:4px 12px;border-bottom:1px solid #eee">${esc(v)}</td></tr>`)
      .join('');
    await fetch(BREVO_URL, {
      method: 'POST',
      headers: { 'api-key': process.env.BREVO_API_KEY || '', 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({
        sender: SENDER,
        to: TO,
        bcc: BCC,
        subject: `⚠️ LEAD BLOCKIERT (${reason}) — evtl. echter Lead, bitte prüfen (${formName})`,
        htmlContent: `<div style="font-family:Arial,sans-serif;color:#1a1a1a">
          <h2 style="margin:0 0 12px">⚠️ Peak-Care-Anfrage blockiert — ${esc(reason)}</h2>
          <p style="font-size:14px;margin:0 0 12px">Diese Übermittlung wurde <strong>nicht</strong> als Lead zugestellt.
          Der Absender hat im Formular „gesendet" gesehen. Bitte prüfen, ob es ein echter Interessent war.</p>
          <table style="border-collapse:collapse;font-size:14px">${rows}</table>
          <p style="color:#888;font-size:12px;margin-top:14px">Quelle: peak-care.com · Formular „${esc(formName)}" · Grund: ${esc(reason)}</p>
        </div>`,
      }),
    });
  } catch (e) {
    // Benachrichtigung darf den Handler nie zum Absturz bringen.
    console.error('notifyBlocked failed', (e && e.message) || String(e));
  }
}

// Server-seitiger Spam-Filter (Honeypot allein reicht nicht — Bots fuellen die echten Felder).
// Verwirft leere Probe-Submissions + Score aus Casino-/Jackpot-Keywords, Links, fehlender Mail.
function isSpam(data) {
  const name = String(data.name || data.Name || data.fullname || '').trim();
  const email = String(data.email || data.Email || '').trim();
  const msg = String(data.message || data.Message || data.nachricht || '').trim();
  const hay = (name + ' ' + msg + ' ' + (data.service || '')).toLowerCase();
  // Komplett leere / Endpunkt-Probe (kein Name, keine Mail, keine Nachricht) -> Bot.
  if (!name && !email && !msg) return true;
  let score = 0;
  // KEIN Score auf blosse Geldbetraege ($500,000 o. ae.) — fuer eine Immobilien-/Sanierungs-Anfrage
  // ist ein genannter Betrag ein Budget-/Kaufintent-Signal, kein Spam-Signal (siehe BC-Fix 10.07.).
  if (/jackpot|casino|lottery|\blotto\b|viagra|cialis|bitcoin|crypto|forex|\bwinner\b|you won|you have won|congratulations|earn \$|make money|gift ?card|inheritance|loan offer|backlink|seo service|escort|\bnude\b|\bsex\b/i.test(hay)) score += 4;
  const urlCount = (hay.match(/https?:\/\/|www\.|\b\w+\.(ru|cn|tk|top|xyz|click|loan|win)\b/gi) || []).length;
  if (urlCount >= 2) score += 4; else if (urlCount === 1) score += 2;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) score += 2;
  return score >= 4;
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  let data = {};
  try {
    const ct = (event.headers['content-type'] || event.headers['Content-Type'] || '').toLowerCase();
    let raw = event.body || '';
    if (event.isBase64Encoded) raw = Buffer.from(raw, 'base64').toString('utf8');
    if (ct.includes('application/json')) data = JSON.parse(raw);
    else for (const [k, v] of new URLSearchParams(raw)) data[k] = v;
  } catch (e) {
    data = {};
  }

  // PATCH 31.07.2026: formName wird jetzt VOR den Abbruchzweigen bestimmt, damit die
  // Benachrichtigung ueber einen blockierten Lead den Formularnamen nennen kann.
  const formName = data['form-name'] || 'kontakt';

  // Honeypot: gefülltes Bot-Feld → still akzeptieren (kein Mailversand), damit Bots keinen Fehler sehen.
  // Bewusst OHNE Benachrichtigung: das Feld ist im Formular unsichtbar, ein Mensch kann es
  // nicht ausfuellen — hier gibt es keinen Zweifelsfall, den jemand pruefen muesste.
  if (data['bot-field']) return { statusCode: 200, body: JSON.stringify({ ok: true }) };

  // Turnstile: nur aktiv wenn CLOUDFLARE_TURNSTILE_SECRET gesetzt.
  if (process.env.CLOUDFLARE_TURNSTILE_SECRET) {
    const token = data['cf-turnstile-response'];
    const ip = event.headers['cf-connecting-ip'] || event.headers['x-forwarded-for'] || '';
    if (!await verifyTurnstile(token, ip)) {
      // PATCH 31.07.2026: DIES ist der Zweig, der bisher still verlor. verifyTurnstile faellt
      // bei jedem technischen Fehler bewusst OPEN (true) — nur ein FEHLENDES oder abgelaufenes
      // Token faellt CLOSED (false). Genau dieser Fall trifft echte Menschen: Turnstile-Token
      // laufen nach ~300 s ab, wer laenger an seiner Nachricht schreibt, sendet ein leeres Token.
      await notifyBlocked(token ? 'Turnstile-Verifikation fehlgeschlagen' : 'Turnstile-Token fehlte oder war abgelaufen', data, formName);
      return { statusCode: 200, body: JSON.stringify({ ok: true }) };
    }
  }

  // Spam still verwerfen (200 zurück, damit der Bot „Erfolg" sieht und keine echte Mail rausgeht).
  if (isSpam(data)) return { statusCode: 200, body: JSON.stringify({ ok: true }) };

  const name = data.name || data.Name || '';
  const email = data.email || data.Email || '';

  const rows = Object.entries(data)
    .filter(([k]) => !['form-name', 'bot-field'].includes(k))
    .map(([k, v]) => `<tr><td style="padding:4px 12px;font-weight:600;vertical-align:top;border-bottom:1px solid #eee">${esc(k)}</td><td style="padding:4px 12px;border-bottom:1px solid #eee">${esc(v)}</td></tr>`)
    .join('');

  const html = `<div style="font-family:Arial,sans-serif;color:#1a1a1a">
    <h2 style="margin:0 0 12px">🏗️ Neue Peak-Care-Anfrage — ${esc(formName)}</h2>
    <table style="border-collapse:collapse;font-size:14px">${rows}</table>
    <p style="color:#888;font-size:12px;margin-top:14px">Quelle: peak-care.com · Formular „${esc(formName)}"</p>
  </div>`;

  const payload = {
    sender: SENDER,
    to: TO,
    bcc: BCC,
    subject: `🏗️ Peak-Care-Lead: ${formName}${name ? ' — ' + name : ''}`,
    htmlContent: html,
  };
  if (email && /\S+@\S+\.\S+/.test(email)) payload.replyTo = { email, name: name || email };

  try {
    const res = await fetch(BREVO_URL, {
      method: 'POST',
      headers: { 'api-key': process.env.BREVO_API_KEY || '', 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error('Brevo send failed', res.status, await res.text());
      return { statusCode: 502, body: JSON.stringify({ ok: false }) };
    }
  } catch (e) {
    console.error('lead handler exception', e && e.message);
    return { statusCode: 502, body: JSON.stringify({ ok: false }) };
  }

  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};
