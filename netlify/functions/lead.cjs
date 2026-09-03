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

// PATCH 21.08.2026 (SEO/GEO, REQ-2026-08-21-DIE-TURNSTILE-WARNMAIL-STUFT-OFFENSICHTLICHEN-LINKSPAM-
// ALS-MENSCH-MOEGLICH-EIN, gebaut+getestet 21.08. fuer BC, deployt 03.09. auch hier fuer
// Konsistenz -- die Heuristik stand seit dem urspruenglichen Patch wortgleich in beiden Fassungen).
// Getestet 8/8 gegen den echten Spam vom 20.08. und sechs legitime Uebermittlungen, 0 Fehlalarme.
// Der Vokal-Check matcht nur reine ASCII-a-z0-9-Token -- kyrillische/hebraeische/griechische
// Kundenpost besteht aus anderen Unicode-Bereichen und kann dieses Muster nicht treffen.
function botContentSignals(payload) {
  const IDENT_SKIP = ['message', 'nachricht', 'comments', 'comment', 'email', 'e-mail', 'mail'];
  const LINK_RE = /(https?:\/\/|www\.|\b[a-z0-9][a-z0-9-]{1,}\.(com|net|org|ru|xyz|top|info|shop|click|link)\b)/i;
  const signals = [];
  let linkCount = 0;
  let randomTokens = 0;
  for (const [k, vRaw] of payload) {
    const key = String(k || '').toLowerCase();
    const v = String(vRaw == null ? '' : vRaw).trim();
    if (!v) continue;
    if (!IDENT_SKIP.includes(key) && LINK_RE.test(v)) signals.push('Link/Domain im Feld "' + k + '"');
    if (/^[a-z0-9]{5,12}$/i.test(v) && /\d/.test(v) && /[a-z]/i.test(v) && !/[aeiouäöüy]/i.test(v)) randomTokens++;
    const m = v.match(/https?:\/\//gi);
    if (m) linkCount += m.length;
  }
  if (randomTokens >= 2) signals.push(randomTokens + ' Felder mit Zufallsketten ohne Vokale');
  if (linkCount >= 2) signals.push(linkCount + ' Links in der Uebermittlung');
  return signals;
}

// PATCH 31.07.2026 (SEO/GEO) — Sichtbarkeit fuer blockierte Leads, uebernommen aus der
// BC-Fassung (banskoconcierge-website/netlify/functions/lead.js), die genau das seit
// laengerem tut. Grund: ein Turnstile-Token, das fehlt oder abgelaufen ist (Cloudflare-
// Token leben ~300 s), fuehrt hier zu "200 {ok:true}" OHNE Mail — der Absender sieht im
// Frontend "gesendet", und niemand erfaehrt je davon. Auf BC wurde derselbe Fall NUR
// deshalb bemerkt, weil dort diese Benachrichtigung existiert (5 Mails am 29./30.07.).
// Die Antwort an den Client bleibt unveraendert 200 {ok:true} — ein Bot soll weiterhin
// "Erfolg" sehen. Es aendert sich AUSSCHLIESSLICH, dass wir es erfahren.
async function notifyBlocked(reason, data, formName, client) {
  try {
    // PATCH 09.08.2026 (SEO/GEO, auf REQ-2026-08-09-SEO-BLOCKIERT-ALARM-...): Die Mail trug bisher
    // NUR die uebermittelten Felder. Bei einem Bot mit leerem Body ist die Tabelle leer — und sieht
    // exakt aus wie bei einem Menschen, dessen Turnstile-Token ablief und der nichts ausfuellte.
    // Die Unterscheidung war nur durch Lesen dieses Quellcodes moeglich und wurde am 31.07., 06.08.
    // und 08.08. jedes Mal von vorn gefuehrt — einmal sogar falsch herum (Abend-Digest meldete
    // erkannte Bots als „kann ein echter Interessent sein"). Jetzt steht die Antwort IN der Mail.
    // PATCH 02.09.2026 (SEO/GEO, A386-SEO): von Blacklist auf Whitelist umgestellt. Die alte Form
    // (alles AUSSER drei bekannten Namen zaehlt als "Nutzfeld") laesst jeden injizierten Zusatz-
    // Schluessel ungeprueft in die Ausgefuellt-Zaehlung einfliessen — eine Bot-Variante, die
    // zusaetzliche Feldnamen mitschickt, wuerde die Zaehlung nach oben verzerren, ohne dass es
    // an dieser Stelle auffaellt. Die Whitelist listet ausschliesslich die Feldnamen, die das
    // Formular selbst kennt (ContactSection.jsx: name, email, phone, message) — alles andere wird
    // fuer die Tabelle und die Zaehlung ignoriert, taucht aber weiterhin im Netlify-Funktionslog auf.
    const KNOWN_FIELDS = ['name', 'email', 'phone', 'message'];
    const payload = Object.entries(data)
      .filter(([k]) => KNOWN_FIELDS.includes(k));
    const rows = payload
      .map(([k, v]) => `<tr><td style="padding:4px 12px;font-weight:600;vertical-align:top;border-bottom:1px solid #eee">${esc(k)}</td><td style="padding:4px 12px;border-bottom:1px solid #eee">${esc(v)}</td></tr>`)
      .join('');
    const filled = payload.filter(([, v]) => String(v || '').trim() !== '').length;
    // PATCH 03.09.2026 (SEO/GEO, REQ-2026-08-26-SEO-SE4-ZUSTELLTEST-...): die Heuristik zaehlte
    // bisher nur Nutzfelder und ignorierte den User-Agent — ein eigener curl-Zustelltest mit
    // ausgefuellten Feldern kam als "MENSCH MOEGLICH" durch, obwohl "curl/8.17.0" die deutlichste
    // Bot-Signatur ist, die es gibt. Rein additive Praezisierung: bekannte Nicht-Browser-UAs
    // bekommen ein eigenes Verdikt, die Turnstile-Blockade selbst aendert sich nicht.
    const ua = (client && client.ua) || '';
    const NON_BROWSER_UA = /\bcurl\/|\bwget\/|python-requests|node-fetch|axios\/|Go-http-client|PostmanRuntime/i;
    const contentSignals = botContentSignals(payload);
    const verdict = filled === 0
      ? '<strong style="color:#b00">BOT (sehr wahrscheinlich)</strong> — kein einziges Nutzfeld ausgefuellt; ein Mensch haette mindestens eines befuellt.'
      : NON_BROWSER_UA.test(ua)
      ? '<strong style="color:#b00">TESTVERKEHR/BOT (Nicht-Browser-User-Agent)</strong> — Nutzfelder gefuellt, aber der User-Agent stammt erkennbar nicht aus einem Browser.'
      : contentSignals.length
      ? '<strong style="color:#b00">BOT WAHRSCHEINLICH</strong> — Inhaltsmerkmale automatisierter Uebermittlung: ' + esc(contentSignals.join(' · ')) + '.'
      : '<strong style="color:#0a0">MENSCH MOEGLICH</strong> — es wurden Nutzfelder ausgefuellt, bitte inhaltlich pruefen.';
    // PATCH 03.09.2026 (SEO/GEO, REQ-2026-09-02-EIN-TEIL-DER-LEAD-BLOCKIERT-ALARME-KOMMT-VON-
    // UNSERER-EIGENEN-IP): STRATEGIE hat gemessen, dass ein Teil der Blockier-Alarme von der
    // ausgehenden IP DIESES Haushalts/Netzwerks stammt (deckungsgleich mit der healthchecks.io-
    // Ping-Quelle) — vermutlich Diagnose-Aufrufe aus SEO/GEO-Sitzungen, nicht externe Bots.
    // Bewusst NICHT unterdrueckt (STRATEGIEs Punkt 1) — eine IP-Uebereinstimmung heute beweist
    // nichts fuer morgen (DHCP), und eine still weggefilterte Mail koennte einen echten Fall
    // verstecken. Stattdessen nur gekennzeichnet (Punkt 2), damit die Alarmklasse lesbar bleibt,
    // ohne dass jemand etwas verliert.
    const KNOWN_OWN_IPS = ['149.62.204.85'];
    const srcIp = (client && client.ip) || '';
    const srcLabel = KNOWN_OWN_IPS.some(ip => srcIp.includes(ip))
      ? '<strong style="color:#666">eigene Infrastruktur (bekannte IP)</strong>'
      : '<strong style="color:#0a0">extern</strong>';
    const diag = `<p style="font-size:13px;margin:10px 0 0;padding:8px 10px;background:#f6f6f6;border-left:3px solid #999">
          Einschaetzung: ${verdict}<br>
          Nutzfelder gesamt: <strong>${payload.length}</strong> · davon ausgefuellt: <strong>${filled}</strong>
          · Quelle: ${srcLabel}
          · IP: ${esc(srcIp || 'unbekannt')}
          · User-Agent: ${esc((client && client.ua) || 'unbekannt')}
        </p>`;
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
          ${diag}
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
      await notifyBlocked(token ? 'Turnstile-Verifikation fehlgeschlagen' : 'Turnstile-Token fehlte oder war abgelaufen', data, formName, { ip, ua: event.headers['user-agent'] || event.headers['User-Agent'] || '' });
      return { statusCode: 200, body: JSON.stringify({ ok: true }) };
    }
  }

  // Spam still verwerfen (200 zurück, damit der Bot „Erfolg" sieht und keine echte Mail rausgeht).
  if (isSpam(data)) return { statusCode: 200, body: JSON.stringify({ ok: true }) };

  const name = data.name || data.Name || '';
  const email = data.email || data.Email || '';

  const rows = Object.entries(data)
    // 'cf-turnstile-response' ergaenzt (SEO 13.08.): der Blockier-Pfad oben filtert den Token
    // bereits heraus, der Erfolgs-Pfad nicht — dadurch stand in JEDER echten Lead-Mail eine
    // 300+ Zeichen lange Token-Zeile ueber den Nutzfeldern. Kein Sicherheitsproblem (interne
    // Mail, Einmal-Token), aber es hat die eigentliche Anfrage nach unten gedrueckt.
    .filter(([k]) => !['form-name', 'bot-field', 'cf-turnstile-response'].includes(k))
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
