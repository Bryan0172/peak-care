const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const PRODUCTS = {
  ebook_schimmel_de: { name: 'Schimmel und Feuchtigkeit im Griff (DE)', amount: 1200, currency: 'eur' },
  ebook_krisen_de:   { name: 'Krisensicheres Zuhause – Notfallvorsorge für Familien (DE)', amount: 1700, currency: 'eur' },
  ebook_bundle_de:   { name: 'Bundle: Schimmel & Krisensicheres Zuhause (DE)', amount: 2200, currency: 'eur' },
  ebook_schimmel_en: { name: 'Mold and Moisture Under Control (EN)', amount: 1200, currency: 'eur' },
  ebook_krisen_en:   { name: 'Crisis-Proof Home – Emergency Preparedness for Families (EN)', amount: 1700, currency: 'eur' },
  ebook_bundle_en:   { name: 'Bundle: Mold & Crisis-Proof Home (EN)', amount: 2200, currency: 'eur' },
  ebook_schimmel_bg: { name: 'Мухъл и влага под контрол (BG)', amount: 1200, currency: 'eur' },
  ebook_krisen_bg:   { name: 'Кризисно защитен дом – Аварийна подготовка за семейства (BG)', amount: 1700, currency: 'eur' },
  ebook_bundle_bg:   { name: 'Пакет: Мухъл и кризисно защитен дом (BG)', amount: 2200, currency: 'eur' },
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const { productId } = JSON.parse(event.body)
    const product = PRODUCTS[productId]

    if (!product) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Unbekanntes Produkt' }),
      }
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: product.amount,
      currency: product.currency,
      metadata: { productId, productName: product.name },
      automatic_payment_methods: { enabled: true },
    })

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    }
  } catch (err) {
    console.error('Stripe error:', err)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Zahlung konnte nicht initiiert werden.' }),
    }
  }
}
