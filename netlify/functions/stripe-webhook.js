const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const PRODUCT_FILES = {
  'ebook_schimmel_de': 'ebook_schimmel_de.pdf',
  'ebook_krisen_de':   'ebook_krisen_de.pdf',
  'ebook_bundle_de':   ['ebook_schimmel_de.pdf', 'ebook_krisen_de.pdf'],
  'ebook_schimmel_en': 'ebook_schimmel_en.pdf',
  'ebook_krisen_en':   'ebook_krisen_en.pdf',
  'ebook_bundle_en':   ['ebook_schimmel_en.pdf', 'ebook_krisen_en.pdf'],
  'ebook_schimmel_bg': 'ebook_schimmel_bg.pdf',
  'ebook_krisen_bg':   'ebook_krisen_bg.pdf',
  'ebook_bundle_bg':   ['ebook_schimmel_bg.pdf', 'ebook_krisen_bg.pdf'],
};

function getEmailContent(lang, downloadLinks) {
  const linksHtml = downloadLinks.map(link =>
    `<p><a href="${link.url}" style="background:#0D6B5E;color:white;padding:12px 24px;text-decoration:none;border-radius:6px;display:inline-block;margin:8px 0;">Download: ${link.name}</a></p>`
  ).join('');

  const templates = {
    de: { subject: 'Ihr Peak Care E-Book — Download-Link', greeting: 'Vielen Dank für Ihren Kauf!', info: 'Ihre Download-Links sind 72 Stunden gültig.', closing: 'Bei Fragen: peak-care.com · +359 89 8436561' },
    en: { subject: 'Your Peak Care E-Book — Download Link', greeting: 'Thank you for your purchase!', info: 'Your download links are valid for 72 hours.', closing: 'Questions? peak-care.com · +359 89 8436561' },
    bg: { subject: 'Вашата книга от Peak Care — Линк за изтегляне', greeting: 'Благодарим ви за покупката!', info: 'Линковете са валидни 72 часа.', closing: 'Въпроси? peak-care.com · +359 89 8436561' },
  };

  const t = templates[lang] || templates['de'];
  return {
    subject: t.subject,
    html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#0D6B5E;padding:30px;text-align:center;">
        <h1 style="color:white;margin:0;">Peak Care</h1>
      </div>
      <div style="padding:30px;">
        <p>${t.greeting}</p>
        <p>${t.info}</p>
        ${linksHtml}
        <p style="color:#666;font-size:13px;margin-top:30px;">${t.closing}</p>
      </div>
    </div>`
  };
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method not allowed' };

  const sig = event.headers['stripe-signature'];
  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(event.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  if (stripeEvent.type !== 'checkout.session.completed') return { statusCode: 200, body: 'OK' };

  const session = stripeEvent.data.object;
  const customerEmail = session.customer_details?.email;
  const productId = session.metadata?.productId || 'ebook_schimmel_de';
  const lang = session.metadata?.lang || 'de';

  const baseUrl = 'https://www.peak-care.com/ebooks';
  const files = PRODUCT_FILES[productId];
  const fileList = Array.isArray(files) ? files : [files];
  const downloadLinks = fileList.map(f => ({ url: `${baseUrl}/${f}`, name: f.replace('.pdf','').toUpperCase() }));

  const email = getEmailContent(lang, downloadLinks);

  try {
    await resend.emails.send({
      from: 'Peak Care <peakcare@peak-care.com>',
      to: customerEmail,
      subject: email.subject,
      html: email.html,
    });
    return { statusCode: 200, body: 'OK' };
  } catch (err) {
    return { statusCode: 500, body: 'Error sending email' };
  }
};