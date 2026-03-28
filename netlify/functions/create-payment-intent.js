const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const PRODUCTS = {
  ebook_schimmel: {
    name: 'Schimmel und Feuchtigkeit im Griff',
    amount: 1200, // cents
    currency: 'eur',
  },
  ebook_krisen: {
    name: 'Krisensicheres Zuhause',
    amount: 1700,
    currency: 'eur',
  },
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const { productId } = JSON.parse(event.body)
    const product = PRODUCTS[productId]

    if (!product) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Unbekanntes Produkt' }) }
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
