# CLAUDE.md — Peak Care Projektkontext

Dieses Dokument gibt Claude Code vollständigen Kontext über das Projekt.
Immer zuerst diese Datei lesen, bevor Änderungen gemacht werden.

---

## 1. PROJEKT ÜBERSICHT

**Website:** https://www.peak-care.com
**Zweck:** Professionelle Schimmel- und Feuchtigkeitssanierung (Bulgarien/Europa) + digitaler E-Book-Verkauf
**Sprachen:** Deutsch (DE), Englisch (EN), Bulgarisch (BG)
**Kernfunktion:** Verkauf von 3 E-Books in 3 Sprachen über Stripe Payment Intents + automatischer E-Mail-Versand via Resend nach Kauf

---

## 2. ACCOUNTS & ZUGÄNGE

| Service | Account / Login |
|---------|----------------|
| **Netlify** | peakcare@peak-care.com — Site: `peak-care`, Project ID: `82b870e7-5f46-4134-8249-fc52ccdd7167` |
| **GitHub** | https://github.com/Bryan0172/peak-care — Branch: `main` |
| **Resend** | peakcare@peak-care.com — Domain: `send.peak-care.com` |
| **Stripe** | Live-Modus — Keys in Netlify Environment Variables |

**Netlify Environment Variables (gesetzt in Netlify Dashboard):**
- `STRIPE_SECRET_KEY` — Stripe Live Secret Key (`sk_live_...`)
- `VITE_STRIPE_PUBLISHABLE_KEY` — Stripe Live Publishable Key (`pk_live_...`)
- `STRIPE_WEBHOOK_SECRET` — Stripe Webhook Secret (`whsec_...`)
- `RESEND_API_KEY` — Resend API Key

---

## 3. TECH STACK

| Bereich | Technologie |
|---------|------------|
| Frontend | React + Vite (nicht Next.js) |
| Styling | Tailwind CSS |
| Hosting | Netlify (Netlify DNS, Netlify Functions) |
| Payments | Stripe — Payment Intents API (kein Stripe Checkout) |
| E-Mail | Resend — Domain `send.peak-care.com` |
| Sprachen | Eigenes i18n-System via `src/context/LanguageContext.jsx` + `src/i18n/translations.js` |
| Deployment | Automatisch via GitHub Push → Netlify, oder manuell: `netlify deploy --prod` |

---

## 4. PROJEKTPFAD

```
C:\peak-care-neuclaude\
├── src/
│   ├── pages/
│   │   ├── Home.jsx          — Startseite mit Checkout-Modal
│   │   ├── Ebooks.jsx        — Dedizierte E-Books-Seite mit Checkout-Modal
│   │   └── Ebooks.jsx.backup — ALT, ignorieren
│   ├── components/
│   │   ├── CheckoutModal.jsx     — Stripe Elements Modal (shared)
│   │   ├── CheckoutForm.jsx      — Stripe Payment Form
│   │   ├── EbooksHomeSection.jsx — E-Book-Karten auf Startseite
│   │   ├── CrisisSection.jsx     — Krisen-E-Book CTA-Sektion
│   │   ├── Hero.jsx
│   │   ├── ServiceCards.jsx
│   │   ├── NewsBlock.jsx
│   │   └── ContactSection.jsx
│   ├── context/
│   │   └── LanguageContext.jsx   — lang (de/en/bg), t (translations), setLang
│   └── i18n/
│       └── translations.js       — Alle Texte in DE/EN/BG
├── netlify/
│   └── functions/
│       ├── create-payment-intent.js — Erstellt Stripe PaymentIntent, 9 Produkte
│       └── stripe-webhook.js        — Versendet Download-E-Mail nach Kauf via Resend
├── netlify.toml
└── CLAUDE.md
```

---

## 5. PRODUKTE

9 Produkte (3 E-Books × 3 Sprachen), Preise in Cent:

| Produkt-ID | Name | Preis |
|------------|------|-------|
| `ebook_schimmel_de` | Schimmel und Feuchtigkeit im Griff (DE) | €12,00 |
| `ebook_krisen_de` | Krisensicheres Zuhause – Notfallvorsorge (DE) | €17,00 |
| `ebook_bundle_de` | Bundle: Schimmel & Krisensicheres Zuhause (DE) | €22,00 |
| `ebook_schimmel_en` | Mold and Moisture Under Control (EN) | €12,00 |
| `ebook_krisen_en` | Crisis-Proof Home (EN) | €17,00 |
| `ebook_bundle_en` | Bundle: Mold & Crisis-Proof Home (EN) | €22,00 |
| `ebook_schimmel_bg` | Мухъл и влага под контрол (BG) | €12,00 |
| `ebook_krisen_bg` | Кризисно защитен дом (BG) | €17,00 |
| `ebook_bundle_bg` | Пакет: Мухъл и кризисно защитен дом (BG) | €22,00 |

**Produkt-ID Logik:** `${baseId}_${lang}` — z.B. `ebook_schimmel_de`
Die Sprache wird aus `LanguageContext` gelesen und automatisch angehängt.

---

## 6. DNS STATUS

**DNS-Provider:** Netlify DNS (nsone.net Nameserver)
**Nameserver:** dns1-4.p02.nsone.net
**DNS Zone ID:** `69c7e1bff9e81ceb463393d3`

| Record | Hostname | Wert | Status |
|--------|----------|------|--------|
| NETLIFY | `peak-care.com` | peak-care.netlify.app | ✅ aktiv |
| NETLIFY | `www.peak-care.com` | peak-care.netlify.app | ✅ aktiv |
| TXT | `resend._domainkey.peak-care.com` | DKIM Key | ✅ verified |
| TXT | `_dmarc.peak-care.com` | `v=DMARC1; p=none` | ✅ gesetzt |
| MX | `resend.peak-care.com` | feedback-smtp.us-east-1.amazonses.com | ✅ gesetzt (alt) |
| TXT | `resend.peak-care.com` | `v=spf1 include:amazonses.com ~all` | ✅ gesetzt (alt) |
| MX | `send.peak-care.com` | feedback-smtp.eu-west-1.amazonses.com | ✅ verified |
| TXT | `send.peak-care.com` | `v=spf1 include:amazonses.com ~all` | ✅ verified |

**DNS-Records verwalten:** via Netlify CLI:
```bash
netlify api getDnsRecords --data '{"zone_id":"69c7e1bff9e81ceb463393d3"}'
netlify api createDnsRecord --data '{"zone_id":"69c7e1bff9e81ceb463393d3","body":{...}}'
```

---

## 7. ERLEDIGTE TASKS (2026-03-29)

- [x] Stripe Live-Keys in Netlify Environment Variables gesetzt
- [x] `CheckoutModal.jsx` als geteilte Komponente extrahiert (aus `Home.jsx`)
- [x] `Ebooks.jsx` auf Modal umgestellt — keine statischen `buy.stripe.com/test_` Links mehr
- [x] 9 Produkte mit Sprachsuffixen in `create-payment-intent.js` eingetragen
- [x] `useState` → `useEffect` Bug in `CheckoutModal.jsx` behoben (Fetch wurde nie ausgeführt)
- [x] DNS Records für `send.peak-care.com` gesetzt (MX + SPF/TXT)
- [x] Netlify CLI installiert (v24.8.1) und Production-Deploy ausgeführt

---

## 8. OFFENE TASKS

- [x] **Resend Domain-Verifikation** — `send.peak-care.com` vollständig verified (DKIM, MX, SPF), E-Mail-Versand über `peakcare@peak-care.com` aktiv
- [ ] **Stripe Webhook testen** — nach echtem Kauf prüfen ob Download-E-Mail ankommt
- [x] **Webhook-Produkt-IDs angleichen** — `stripe-webhook.js` auf `ebook_schimmel_de` etc. aktualisiert, `product_id` → `productId` Metadata-Key-Bug behoben
- [ ] **PDF-Dateien** für E-Books bereitstellen (aktuell nur Platzhalter-URLs in Webhook)
- [ ] **Ebooks.jsx.backup** löschen (unnötige Datei im Repo)

---

## 9. WICHTIGE URLS

| Was | URL |
|-----|-----|
| Live-Website | https://www.peak-care.com |
| GitHub Repo | https://github.com/Bryan0172/peak-care |
| Netlify Dashboard | https://app.netlify.com/projects/peak-care |
| Netlify Function Logs | https://app.netlify.com/projects/peak-care/logs/functions |
| Stripe Dashboard | https://dashboard.stripe.com |
| Resend Dashboard | https://resend.com/domains |
| Netlify Deploy Logs | https://app.netlify.com/projects/peak-care/deploys |

---

## 11. SOCIAL MEDIA & VERMARKTUNG

**Aktuelle Reichweite:**

| Kanal | Follower | Notizen |
|-------|----------|---------|
| Facebook Business-Seite | ~50 | Organisch, noch im Aufbau |
| Instagram | 15–20 | Noch sehr klein |
| Private Facebook-Seite (Inhaber) | 300+ | Größte aktuelle Reichweite |

**Strategie:**
- Private Facebook-Seite (300+ Follower) ist kurzfristig der stärkste Kanal für erste E-Book-Verkäufe
- Inhalte: Schimmel-Tipps, Krisenvorsorge, Vorher-Nachher-Bilder, Kundenstimmen
- Ziel: Traffic auf peak-care.com → E-Books-Seite
- Sprachen priorisieren: DE und BG zuerst (Kernzielgruppe)
- Organisches Wachstum über Mehrwert-Content, kein bezahltes Advertising in Phase 1

**Nächste Schritte Social Media:**
- [ ] Erste Posts auf privater Facebook-Seite mit Link zur E-Book-Seite
- [ ] Facebook Business-Seite mit Inhalten bestücken
- [ ] Instagram auf gleiches Branding wie Website bringen
- [ ] Kundenbewertungen sammeln und posten

---

## 10. ARBEITSWEISE

- **Immer** über Claude Code Terminal arbeiten — nie manuell Dateien editieren
- **Deploys** entweder via `git push origin main` (Netlify auto-deploy) oder `netlify deploy --prod` für sofortigen Deploy
- **DNS-Änderungen** via `netlify api createDnsRecord` (nicht über Netlify UI)
- **Netlify CLI** ist installiert und eingeloggt als peakcare@peak-care.com
- **Vor jeder Änderung** relevante Dateien lesen (`src/pages/`, `netlify/functions/`)
- **Nach Änderungen** immer: `git add`, `git commit`, `git push`
- **Stripe ist im Live-Modus** — keine Test-Keys verwenden
- **Sprach-Suffix** immer an Produkt-IDs anhängen: `${productId}_${lang}`
