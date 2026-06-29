// Netlify Edge Function — injects Open Graph meta tags per route
// LinkedIn's crawler reads only raw HTML (no JS). This function injects
// og:image / og:title / og:description server-side before the response.

const OG_DATA = {
  '/mentaler-schutzschild': {
    title: 'Mentaler Schutzschild 2026 — Endlich Ruhe im Kopf | Peak Care',
    description: 'Das 9-Wochen-Programm gegen Nachrichtenangst und mentale Überlastung. PDF-E-Book — Sofort-Download. 30-Tage-Geld-zurück-Garantie.',
    image: 'https://www.peak-care.com/images/covers/mentaler-schutzschild-linkedin.jpg',
    url: 'https://www.peak-care.com/mentaler-schutzschild',
  },
  '/krisensicheres-zuhause': {
    title: 'Krisensicheres Zuhause — Schritt-für-Schritt vorbereitet für Blackout & Versorgungsengpass | Peak Care',
    description: 'Der praktische Ratgeber für Familien: Wasser, Lebensmittel, Licht, Wärme, Medikamente — alles was Sie brauchen bevor die nächste Krise kommt. PDF-E-Book — Sofort-Download.',
    image: 'https://www.peak-care.com/images/covers/krisensicher-linkedin.jpg',
    url: 'https://www.peak-care.com/krisensicheres-zuhause',
  },
}

export default async function handler(request, context) {
  const url = new URL(request.url)
  const og = OG_DATA[url.pathname]

  // No matching route — pass through unchanged
  if (!og) return context.next()

  // Fetch the original index.html
  const response = await context.next()
  const html = await response.text()

  // Build the OG meta tag block
  const ogTags = `
    <meta property="og:title" content="${og.title}" />
    <meta property="og:description" content="${og.description}" />
    <meta property="og:image" content="${og.image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:type" content="product" />
    <meta property="og:url" content="${og.url}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${og.title}" />
    <meta name="twitter:description" content="${og.description}" />
    <meta name="twitter:image" content="${og.image}" />
    <title>${og.title}</title>`

  // Inject before </head>
  const injected = html.replace('</head>', `${ogTags}\n  </head>`)

  return new Response(injected, {
    status: response.status,
    headers: {
      ...Object.fromEntries(response.headers),
      'content-type': 'text/html; charset=utf-8',
    },
  })
}

export const config = {
  path: ['/mentaler-schutzschild', '/krisensicheres-zuhause'],
}
