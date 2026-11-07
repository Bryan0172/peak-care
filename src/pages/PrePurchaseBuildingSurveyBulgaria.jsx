import { useSEO } from '../hooks/useSEO'
import { useLang } from '../context/LanguageContext'
import { Link } from '../components/Link'
import ContactSection from '../components/ContactSection'
import { useLocation } from 'react-router-dom'
import { refZusatz } from '../utils/quellkennung'

// ---------------------------------------------------------------------------
// Premium-Landingpage: Bauinspektion VOR dem Kauf (Pre-Purchase Building Inspection)
// Zielgruppe: ausländische + inländische Investoren und Bauherren in Bulgarien.
// WICHTIG: Peak Care ist ein Bauunternehmen, kein zugelassener Gutachter/Sachverständiger.
// Sprachregelung Andreas 22.08.2026: bewusst NICHT "Gutachten/Gutachter/Bauexperte",
// sondern "Besichtigung durch ein Bauunternehmen / schriftliche Zusammenfassung".
// "Inspektion/Bauinspektion" bleibt nur als Suchwort des Kunden (H1, Pfad, Knopf).
// "Unabhängig" nur nach Andreas' A874-Regel 06.11.2026: wenn am selben Objekt nichts verdient wird.
// Eigenständige, kaufintent-fokussierte Seite (getrennt von der laufenden
// Immobilienüberwachung). Nutzt useSEO (NIE react-helmet) + lokalisiertes JSON-LD.
// ---------------------------------------------------------------------------

const WA = 'https://wa.me/359898436561'

const content = {
  de: {
    meta: {
      title: 'Immobilie in Bulgarien kaufen: vorher prüfen lassen – unabhängige Besichtigung | Peak Care',
      description: 'Immobilie in Bulgarien kaufen? Vorher ansehen lassen: unabhängige Besichtigung durch ein Bauunternehmen, mit Blick auf Bausubstanz, Feuchte und sichtbare Mängel. Schriftliche Zusammenfassung mit Fotos, Vorschlägen und Kostenspannen. Für Käufer im Ausland.',
      canonical: 'https://peak-care.com/bauinspektion-vor-dem-kauf-bulgarien',
    },
    hero: {
      tag: 'IMMOBILIE KAUFEN IN BULGARIEN · PRÜFUNG VOR DEM KAUF',
      title: 'Immobilie in Bulgarien kaufen – wissen, was Sie unterschreiben.',
      subtitle: 'Eine unabhängige Besichtigung der Bausubstanz vor Ort, durch ein Bauunternehmen. Sie erfahren, was wir gesehen haben, was es voraussichtlich kostet und ob wir an Ihrer Stelle weitergehen würden.',
      ctaPrimary: 'Bauinspektion anfragen',
      ctaSecondary: 'Direkt per WhatsApp',
      micro: 'Unabhängige Besichtigung durch ein Bauunternehmen · Vor Ort in Bulgarien · Zusammenfassung auf Deutsch oder Englisch',
    },
    trust: [
      { k: 'Offen', v: 'Was gegen den Kauf spricht, sagen wir schriftlich.' },
      { k: 'Vor Ort', v: 'Persönliche Besichtigung in Bulgarien, nicht aus der Ferne.' },
      { k: 'Erfahrung', v: 'Jahrzehntelange Bau- und Sanierungspraxis in der Region.' },
      { k: 'Verständlich', v: 'Klare Zusammenfassung in Ihrer Sprache – kein Fachchinesisch.' },
    ],
    stakes: {
      headline: 'Ein Immobilienkauf in Bulgarien verzeiht keine bösen Überraschungen',
      intro: 'Aus dem Ausland gekauft, vom Makler präsentiert, unter Zeitdruck entschieden – so entstehen die teuersten Fehler. Was auf Fotos und beim Besichtigungstermin gut aussieht, verbirgt oft genau die Mängel, die nach dem Kauf das Budget sprengen.',
      items: [
        { head: 'Feuchte & Schimmel hinter der Fassade', text: 'Aufsteigende Feuchtigkeit, undichte Dächer und Wärmebrücken zeigen sich oft erst Monate nach dem Kauf – die Sanierung kostet dann ein Vielfaches.' },
        { head: 'Unterschätzte Renovierungskosten', text: 'Wer ohne Besichtigung kauft, kalkuliert leicht zu niedrig. Eine realistische Einschätzung vorab verändert die Verhandlung.' },
        { head: 'Verdeckte Bausubstanz-Schäden', text: 'Risse, marode Installationen, fehlerhafte Anbauten ohne Genehmigung – Verkäufer zeigen, was funktioniert. Wir zeigen, was nicht funktioniert.' },
        { head: 'Kein Verhandlungshebel', text: 'Wer die Mängel kennt, verhandelt aus einer stärkeren Position.' },
      ],
    },
    scope: {
      headline: 'Was wir vor Ort prüfen',
      sub: 'Wir besichtigen die zugänglichen Bereiche systematisch und dokumentieren sichtbare Befunde sowie die Grenzen der Besichtigung.',
      groups: [
        { title: 'Tragwerk & Substanz', items: ['Fundament & Keller', 'Wände, Risse & Setzungen', 'Decken & tragende Elemente', 'Dachstuhl & Dacheindeckung'] },
        { title: 'Feuchte & Bauklima', items: ['Aufsteigende & eindringende Feuchte', 'Schimmel & Salzausblühungen', 'Wärmebrücken & Dämmung', 'Belüftung & Kondensat'] },
        { title: 'Gebäudehülle', items: ['Fassade & Putz', 'Fenster & Türen', 'Abdichtung & Entwässerung', 'Balkone & Außenanlagen'] },
        { title: 'Technik (sichtbar)', items: ['Elektroinstallation', 'Wasser & Sanitär', 'Heizung & Warmwasser', 'Erkennbare Genehmigungs-Risiken'] },
      ],
    },
    deliver: {
      headline: 'Was Sie erhalten',
      sub: 'Eine Entscheidungsgrundlage, mit der Sie kaufen, verhandeln oder ablehnen können.',
      items: [
        { title: 'Strukturierte Zusammenfassung', text: 'Schriftlich, übersichtlich gegliedert nach Gebäudebereichen – auf Deutsch oder Englisch.' },
        { title: 'Fotodokumentation', text: 'Alles, was zählt, mit Bild belegt, nachvollziehbar auch aus dem Ausland.' },
        { title: 'Priorisierte Mängelliste', text: 'Sofort / mittelfristig / kosmetisch – Sie sehen, was wirklich drängt.' },
        { title: 'Renovierungskosten-Orientierung', text: 'Realistische Kostenspannen für die wichtigsten Maßnahmen, basierend auf lokaler Markterfahrung.' },
        { title: 'Was nicht geprüft werden konnte – und warum', text: 'Die Zusammenfassung nennt ausdrücklich, was ohne Öffnen, Messgerät oder Zugang nicht beurteilt werden konnte. So wissen Sie, worauf unsere Einschätzung beruht und wo eine Unsicherheit bleibt.' },
        { title: 'Klare Einschätzung zum Kauf', text: 'Was wir an Ihrer Stelle täten: weitergehen, mit Vorbehalt weitergehen oder es lassen.' },
        { title: 'Schriftliche Zusammenfassung', text: 'Nach der Besichtigung erhalten Sie alles schriftlich, damit Sie entscheiden können. Den Termin nennt das Angebot.' },
      ],
    },
    process: {
      headline: 'So läuft es ab',
      steps: [
        { num: '01', title: 'Erstgespräch', text: 'Sie schildern das Objekt, den Standort und Ihren Zeitrahmen. Wir klären, was eine Besichtigung leisten kann – persönlich, per WhatsApp oder Telefon.' },
        { num: '02', title: 'Vor-Ort-Termin', text: 'Unser Bauunternehmen besichtigt das Objekt systematisch und dokumentiert, was es sieht.' },
        { num: '03', title: 'Schriftliche Zusammenfassung', text: 'Sie erhalten, was wir gesehen haben und was wir vorschlagen, mit Fotos, Mängelliste, Kostenspannen und unserer Einschätzung zum Kauf.' },
        { num: '04', title: 'Rückfragen & nächste Schritte', text: 'Wir besprechen die Zusammenfassung mit Ihnen und koordinieren auf Wunsch lokale Fachbetriebe für Sanierung oder Umbau.' },
      ],
    },
    expert: {
      tag: 'IHR BAUUNTERNEHMEN VOR ORT',
      name: 'Andreas Donner · Peak Care',
      text: 'Hinter Peak Care steht jahrzehntelange praktische Erfahrung mit Bausubstanz, Sanierung und Bauüberwachung in Bulgarien und der DACH-Region. Wir kennen die typischen Schwachstellen bulgarischer Immobilien – vom feuchten Plattenbau-Keller bis zum ungenehmigten Anbau – und sagen Ihnen offen, was wir sehen.',
      points: ['Unabhängige Besichtigung durch ein Bauunternehmen', 'Lokale Marktkenntnis Bulgarien', 'Zusammenfassung DE/EN'],
    },
    limitations: {
      headline: 'Was diese Besichtigung nicht ist',
      text: 'Peak Care ist ein Bauunternehmen. Sie erhalten eine Besichtigung mit schriftlicher Zusammenfassung, kein Sachverständigengutachten, keine rechtliche Prüfung und keine Steuerberatung. Wo ein zertifiziertes Gutachten, ein Notar oder ein Anwalt nötig ist, sagen wir es Ihnen.',
    },
    faqHeadline: 'Häufige Fragen',
    faqContact: { text: 'Schreiben Sie uns, wo das Objekt liegt und was Ihnen am meisten Sorgen macht. Gebucht wird erst nach Ihrer Zustimmung.', wa: 'Guten Tag, ich möchte vor dem Kauf einer Immobilie in Bulgarien eine Besichtigung anfragen.', mailSubject: 'Besichtigung vor dem Kauf', waLabel: 'Per WhatsApp schreiben', mailLabel: 'E-Mail' },
    faqs: [
      { q: 'Ich lebe im Ausland und kann nicht anreisen. Können Sie eine Immobilie in Bulgarien für mich prüfen?', a: 'Ja. Wir besichtigen das Objekt in Ihrem Auftrag und stimmen den Zugang direkt mit dem Makler ab, Sie müssen nicht dabei sein. Alles Weitere läuft per E-Mail, Telefon oder WhatsApp, das Ergebnis bekommen Sie schriftlich.' },
      { q: 'Was bekomme ich konkret?', a: 'Eine schriftliche Zusammenfassung auf Deutsch oder Englisch, nach Gebäuden gegliedert: was wir gesehen haben, was wir vorschlagen und welche Arbeiten zuerst nötig sind, damit das Gebäude sicher und wetterfest wird. Dazu Fotos von allem, was zählt, und kurze Videos, wo ein Bild nicht reicht und das Filmen sicher ist. Sanierungskosten nennen wir als Spannen, die Annahmen stehen daneben. Sie helfen bei der Planung und sind keine verbindlichen Angebote.' },
      { q: 'Können Sie das Dach prüfen und sagen, ob sich die Ziegel wiederverwenden lassen?', a: 'Wir sehen uns Tragwerk, Holz und Eindeckung an, soweit sie sicher erreichbar sind, und sagen Ihnen, ob eine Wiederverwendung der Ziegel realistisch aussieht und welche Reparaturen nicht noch einen Winter warten sollten. Wir öffnen keine Bauteile. Was verdeckt ist, bleibt außerhalb dessen, wozu wir etwas sagen können.' },
      { q: 'Können Sie bestätigen, dass das Gebäude statisch sicher ist?', a: 'Nein, das kann eine Besichtigung nicht leisten. Wir beschreiben Fundament und Wände, soweit sie sichtbar sind, dazu Anzeichen von Bewegung, Feuchte oder Verfall, und sagen Ihnen, welche Gebäude wir für erhaltenswert halten. Eine verbindliche Aussage zur Standsicherheit kommt von einem zugelassenen Statiker. Wenn Sie eine brauchen, sagen wir es und führen sie gesondert auf. Beauftragt wird nichts ohne Ihre Zustimmung.' },
      { q: 'Wie schnell habe ich das Ergebnis?', a: 'Den Termin für die Besichtigung und die schriftliche Zusammenfassung nennen wir Ihnen im Angebot. Gebucht wird erst, wenn Sie Umfang und Gesamthonorar zugestimmt haben.' },
      { q: 'Das Haus liegt auf dem Land, mit Brunnen und ohne Kanalanschluss. Können Sie die Frage der Klärgrube prüfen?', a: 'Vor Ort prüfen wir den verfügbaren Platz, den Abstand zum Brunnen und zu einem Bach, den Boden, soweit er sich beurteilen lässt, die Zufahrt für Maschinen und eine vorhandene Entwässerung, soweit sie sichtbar ist. Ob eine Anlage genehmigt wird, entscheiden die zuständigen Behörden; dafür können ein Bodentest und ein Fachplaner nötig sein. Ob das Brunnenwasser trinkbar ist, klärt ein Labor. Wir sagen Ihnen, was davon Sie brauchen, und führen es gesondert auf.' },
      { q: 'Auf dem Grundstück stehen mehrere Gebäude. Können Sie zuerst nur das Haupthaus ansehen?', a: 'Ja. Wenn das Haus über den Kauf entscheidet, ist das meist der richtige Anfang. Die Anfahrt ist bei einem Gebäude dieselbe wie bei dreien, deshalb zeigen wir Ihnen im Vorschlag, was die übrigen zusätzlich kosten würden. Sie entscheiden dann, bevor etwas gebucht ist.' },
      { q: 'Sollte ich mir das Objekt zuerst selbst ansehen?', a: 'Wenn Sie anreisen können, ja. Das ist die richtige Reihenfolge, und was Ihnen nicht zusagt, scheidet so aus, ohne dass Sie uns dafür brauchen. Kommen Sie zu uns, wenn Sie ein Objekt weiterverfolgen möchten. Können Sie nicht anreisen, bekommen Sie durch unsere Besichtigung ein Bild, auf das Sie sich stützen können, bevor Sie sich festlegen.' },
      { q: 'Sie sind ein Bauunternehmen. Kann ich Ihnen trauen, und raten Sie mir auch vom Kauf ab?', a: 'Wir sind ein Bauunternehmen, keine Sachverständigen, und Sie erhalten weder ein amtliches Gutachten noch eine Rechtsauskunft. Spricht das, was wir sehen, gegen den Kauf, sagen wir das schriftlich und mit Fotos. Möchten Sie später sanieren, können Sie frei wählen, wer es macht. Wählen Sie uns, ist das ein eigener Vertrag.' },
      { q: 'Was kostet das?', a: 'Preis auf Anfrage, denn Größe, Entfernung und Zahl der Gebäude sind verschieden. Bevor etwas gebucht wird, erhalten Sie ein Gesamthonorar einschließlich Anfahrt und anfallender Steuer. Fachleistungen stehen gesondert darin.' },
      { q: 'Sehen Sie sich auch Neubauten und Wohnungen an?', a: 'Ja: Häuser, Wohnungen, Altbauten und Neubauten. Bei einem Bauträger-Objekt ist der beste Zeitpunkt vor Übergabe und Restzahlung.' },
    ],
    finalCta: {
      headline: 'Kaufen Sie mit Gewissheit, nicht mit Hoffnung',
      text: 'Beschreiben Sie uns das Objekt – wir melden uns persönlich und klären den sinnvollen nächsten Schritt. Unverbindlich.',
    },
    related: 'Verwandte Leistungen',
    relatedLinks: [
      { to: '/technische-immobilienueberwachung-bulgarien', label: 'Laufende Immobilienüberwachung', tag: 'Service' },
      { to: '/service/renovierung-umbau-ausbau-bulgarien', label: 'Renovierung & Umbau Bulgarien', tag: 'Service' },
      { to: '/service/kellerabdichtung-bansko', label: 'Kellerabdichtung & Feuchteschutz', tag: 'Service' },
    ],
  },

  en: {
    meta: {
      title: 'Buying Property in Bulgaria? Independent Pre-Purchase Inspection by a Contractor | Peak Care',
      description: 'Buying property in Bulgaria from abroad? Have it looked at first: an independent visit by a building contractor, who checks the fabric, damp and visible defects on your behalf. Written summary with photos, proposals and cost ranges.',
      canonical: 'https://peak-care.com/pre-purchase-building-inspection-bulgaria',
    },
    hero: {
      tag: 'BUYING PROPERTY IN BULGARIA · PRE-PURCHASE INSPECTION',
      title: 'Buying property in Bulgaria — know what you are signing.',
      subtitle: 'An independent visit to the property by a building contractor. You learn what we saw, what it is likely to cost, and whether we would go ahead in your place.',
      ctaPrimary: 'Request an inspection',
      ctaSecondary: 'Message on WhatsApp',
      micro: 'Independent visit by a building contractor · On site in Bulgaria · Summary in English or German',
    },
    trust: [
      { k: 'Candid', v: 'If something speaks against the purchase, we say so in writing.' },
      { k: 'On site', v: 'A physical visit in Bulgaria, not a remote opinion.' },
      { k: 'Experienced', v: 'Decades of building and renovation practice in the region.' },
      { k: 'Clear', v: 'A plain-language summary – no impenetrable jargon.' },
    ],
    stakes: {
      headline: 'Buying property in Bulgaria does not forgive nasty surprises',
      intro: 'Bought from abroad, presented by the agent, decided under time pressure – that is how the most expensive mistakes happen. What looks good in photos and at the viewing often hides exactly the defects that blow the budget after completion.',
      items: [
        { head: 'Damp & mould behind the facade', text: 'Rising damp, leaking roofs and thermal bridges often surface months after purchase – and the repair then costs many times more.' },
        { head: 'Underestimated renovation costs', text: 'Buying without a visit makes it easy to budget too low. A realistic view beforehand changes the negotiation.' },
        { head: 'Hidden structural defects', text: 'Cracks, failing installations, unpermitted extensions – sellers show what works. We show what does not.' },
        { head: 'No negotiating leverage', text: 'If you know the defects, you negotiate from a stronger position.' },
      ],
    },
    scope: {
      headline: 'What we look at on site',
      sub: 'We inspect the accessible areas systematically and document visible findings and the limits of the inspection.',
      groups: [
        { title: 'Structure & fabric', items: ['Foundation & basement', 'Walls, cracks & settlement', 'Floors & load-bearing elements', 'Roof structure & covering'] },
        { title: 'Damp & building climate', items: ['Rising & penetrating damp', 'Mould & salt efflorescence', 'Thermal bridges & insulation', 'Ventilation & condensation'] },
        { title: 'Building envelope', items: ['Facade & render', 'Windows & doors', 'Waterproofing & drainage', 'Balconies & external works'] },
        { title: 'Services (visible)', items: ['Electrical installation', 'Water & plumbing', 'Heating & hot water', 'Visible permit risks'] },
      ],
    },
    deliver: {
      headline: 'What you receive',
      sub: 'What you need to decide whether to buy, negotiate or walk away.',
      items: [
        { title: 'Structured summary', text: 'Written, clearly organised by building area – in English or German.' },
        { title: 'Photo documentation', text: 'Everything that matters evidenced with an image, verifiable from abroad.' },
        { title: 'Prioritised defect list', text: 'Urgent / medium-term / cosmetic – you see what actually matters.' },
        { title: 'Renovation cost orientation', text: 'Realistic cost ranges for the key works, based on local market experience.' },
        { title: 'What could not be assessed – and why', text: 'The summary states explicitly which areas could not be judged without opening up, instruments or access, so you know what our view rests on and where uncertainty remains.' },
        { title: 'A clear view on the purchase', text: 'What we would do in your place: go ahead, go ahead with caution, or leave it.' },
        { title: 'Written summary', text: 'After the visit you receive everything in writing, so you can decide. The proposal states the timing.' },
      ],
    },
    process: {
      headline: 'How it works',
      steps: [
        { num: '01', title: 'Initial call', text: 'You describe the property, location and your timeline. We clarify what a visit can cover – in person, by WhatsApp or phone.' },
        { num: '02', title: 'On-site visit', text: 'Our building contractor visits the property, works through it systematically and records what we see.' },
        { num: '03', title: 'Written summary', text: 'You receive what we saw and what we propose, with photos, a defect list, cost ranges and our view on the purchase.' },
        { num: '04', title: 'Questions & next steps', text: 'We talk the summary through with you and, if you wish, coordinate local contractors for renovation or conversion.' },
      ],
    },
    expert: {
      tag: 'YOUR BUILDING CONTRACTOR ON SITE',
      name: 'Andreas Donner · Peak Care',
      text: 'Behind Peak Care stands decades of hands-on experience with building fabric, renovation and construction oversight in Bulgaria and the German-speaking region. We know the typical weak points of Bulgarian property – from the damp prefab basement to the unpermitted extension – and we tell you plainly what we see.',
      points: ['Independent visit by a building contractor', 'Local Bulgarian market knowledge', 'Summary in EN/DE'],
    },
    limitations: {
      headline: 'What this visit is not',
      text: 'Peak Care is a building contractor. You receive a site visit and written summary, not an expert appraisal, legal due diligence or tax advice. Where a certified appraisal, a notary or a lawyer is needed, we tell you.',
    },
    faqHeadline: 'Frequently asked questions',
    faqContact: { text: 'Tell us where the property is and what worries you most. Nothing is booked until you have agreed.', wa: 'Hello, I would like to ask about a visit before buying a property in Bulgaria.', mailSubject: 'Visit before buying', waLabel: 'Message on WhatsApp', mailLabel: 'Email' },
    faqs: [
      { q: 'I live abroad and cannot travel. Can you inspect a property in Bulgaria for me?', a: 'Yes. We visit the property on your behalf and arrange access directly with the estate agent, so you do not need to be there. Everything else runs by email, phone or WhatsApp, and you receive the result in writing.' },
      { q: 'What do I actually receive?', a: 'A written summary in English or German, organised building by building: what we saw, what we propose, and which work comes first to make the building safe and weatherproof. It comes with photographs of everything that matters and short videos where a picture is not enough and filming is safe. Repair costs are given as ranges with the assumptions written next to them. They help you plan, and they are not binding quotations.' },
      { q: 'Can you check the roof and tell me whether the tiles can be reused?', a: 'We look at the structure, timbers and covering as far as they can be reached safely, and tell you whether reusing the tiles looks realistic and which repairs should not wait another winter. We do not open up any part of the building, so anything hidden stays outside what we can comment on.' },
      { q: 'Can you confirm that the building is structurally safe?', a: 'No, and a visual visit cannot do that. We describe the foundations and walls as far as they are visible, along with any signs of movement, damp or decay, and tell you which buildings we think are worth keeping. A formal statement on structural safety comes from a licensed structural engineer. If you need one, we say so and list it separately. Nothing is commissioned without your agreement.' },
      { q: 'How soon will I have the result?', a: 'The proposal states the timing of the visit and the written summary. Nothing is booked until you have agreed the scope and total fee.' },
      { q: 'The house is rural, with a well and no sewer. Can you check the septic tank question?', a: 'On site we look at the space available, the distance to the well and to any stream, the ground as far as it can be judged, access for machinery, and any existing drainage we can see. Whether a system can be approved is for the competent authorities to decide, and it may need a soil test and a specialist planner. Whether the well water is safe to drink is a question for a laboratory. We tell you which of these you need and list them separately.' },
      { q: 'There are several buildings on the plot. Can you start with the main house only?', a: 'Yes. If the house decides the purchase, it usually makes sense to start there. The journey is the same for one building or three, so we show you in the proposal what the others would add. You can then decide before anything is booked.' },
      { q: 'Should I go and see the property first?', a: 'If you can travel, yes. Seeing it yourself first is the right order, and it costs you nothing to rule out a place that is wrong for you. Come to us once you have a property you want to take further. If you cannot travel, the visit is how you get a view you can rely on before you commit.' },
      { q: 'You are a building contractor. Can I trust what you tell me, and will you tell me not to buy?', a: 'We are a building contractor, not a certified surveyor, and what you receive is not an official appraisal or a legal opinion. If what we see speaks against the purchase, we say so in writing, with photographs. If you later want the work done, you can choose anyone. If you choose us, that is a separate contract.' },
      { q: 'What does it cost?', a: 'Price on request, because size, distance and the number of buildings differ. Before anything is booked you receive one total fee, including travel and any applicable tax, with any specialist work listed separately.' },
      { q: 'Do you also look at new builds and apartments?', a: 'Yes: houses, apartments, older buildings and new builds. With a developer\'s unit, the most useful moment is before handover and final payment.' },
    ],
    finalCta: {
      headline: 'Buy with certainty, not with hope',
      text: 'Describe the property to us – we get back to you personally and clarify the sensible next step. No obligation.',
    },
    related: 'Related services',
    relatedLinks: [
      { to: '/technical-property-oversight-bulgaria', label: 'Ongoing property oversight', tag: 'Service' },
      { to: '/service/renovierung-umbau-ausbau-bulgarien', label: 'Renovation & conversion Bulgaria (DE)', tag: 'Service' },
      { to: '/service/kellerabdichtung-bansko', label: 'Basement waterproofing & damp control (DE)', tag: 'Service' },
    ],
  },

  bg: {
    meta: {
      title: 'Купувате имот в България? Проверете го преди покупка – независим оглед | Peak Care',
      description: 'Купувате имот в България? Огледайте го преди това: независим оглед от строителна фирма, с поглед към конструкцията, влагата и видимите дефекти. Писмено резюме със снимки, предложения и ценови диапазони. За купувачи от чужбина.',
      canonical: 'https://peak-care.com/bauinspektion-vor-dem-kauf-bulgarien',
    },
    hero: {
      tag: 'КУПУВАНЕ НА ИМОТ В БЪЛГАРИЯ · ПРОВЕРКА ПРЕДИ ПОКУПКА',
      title: 'Купувате имот в България — знайте какво подписвате.',
      subtitle: 'Независим оглед на конструкцията на място, от строителна фирма. Разбирате какво сме видели, колко вероятно ще струва и дали на ваше място бихме продължили.',
      ctaPrimary: 'Заявете проверка',
      ctaSecondary: 'Пишете в WhatsApp',
      micro: 'Независим оглед от строителна фирма · На място в България · Резюме на немски или английски',
    },
    trust: [
      { k: 'Открито', v: 'Ако нещо говори против покупката, го казваме писмено.' },
      { k: 'На място', v: 'Личен оглед в България, не дистанционно мнение.' },
      { k: 'Опит', v: 'Десетилетия практика в строителството и санирането в региона.' },
      { k: 'Разбираемо', v: 'Ясно резюме на разбираем език – без сложна терминология.' },
    ],
    stakes: {
      headline: 'Покупката на имот в България не прощава неприятни изненади',
      intro: 'Купен от чужбина, представен от брокера, решен под напрежение от времето – така се случват най-скъпите грешки. Това, което изглежда добре на снимки и при огледа, често крие точно дефектите, които взривяват бюджета след покупката.',
      items: [
        { head: 'Влага и мухъл зад фасадата', text: 'Капилярна влага, течащи покриви и термомостове често се появяват месеци след покупката – а ремонтът тогава струва многократно повече.' },
        { head: 'Подценени разходи за ремонт', text: 'Който купува без оглед, лесно калкулира твърде ниско. Реалистична оценка предварително променя преговорите.' },
        { head: 'Скрити конструктивни дефекти', text: 'Пукнатини, дефектни инсталации, незаконни пристройки – продавачите показват какво работи. Ние показваме какво не работи.' },
        { head: 'Без лост за преговори', text: 'Който познава дефектите, преговаря от по-силна позиция.' },
      ],
    },
    scope: {
      headline: 'Какво проверяваме на място',
      sub: 'Оглеждаме достъпните зони систематично и документираме видимите находки, както и границите на огледа.',
      groups: [
        { title: 'Конструкция и субстанция', items: ['Основи и сутерен', 'Стени, пукнатини и слягания', 'Подове и носещи елементи', 'Покривна конструкция и покритие'] },
        { title: 'Влага и микроклимат', items: ['Капилярна и проникваща влага', 'Мухъл и солни налепи', 'Термомостове и изолация', 'Вентилация и кондензация'] },
        { title: 'Обвивка на сградата', items: ['Фасада и мазилка', 'Прозорци и врати', 'Хидроизолация и отводняване', 'Балкони и външни площи'] },
        { title: 'Инсталации (видими)', items: ['Електроинсталация', 'Вода и ВиК', 'Отопление и топла вода', 'Видими рискове по разрешителни'] },
      ],
    },
    deliver: {
      headline: 'Какво получавате',
      sub: 'Това, от което се нуждаете, за да решите дали да купите, да преговаряте или да се откажете.',
      items: [
        { title: 'Структурирано резюме', text: 'Писмен, ясно подреден по зони на сградата – на английски или немски.' },
        { title: 'Снимкова документация', text: 'Всичко, което има значение, е доказано със снимка – проследимо от чужбина.' },
        { title: 'Приоритизиран списък с дефекти', text: 'Спешно / средносрочно / козметично – виждате какво наистина има значение.' },
        { title: 'Ориентир за разходите за ремонт', text: 'Реалистични ценови диапазони за основните работи, на база местен пазарен опит.' },
        { title: 'Какво не можа да бъде проверено – и защо', text: 'Резюмето посочва изрично какво не е могло да бъде оценено без отваряне, уред или достъп. Така знаете на какво се основава нашата оценка и къде остава несигурност.' },
        { title: 'Ясна оценка за покупката', text: 'Какво бихме направили на ваше място: да продължим, да продължим с уговорка или да се откажем.' },
        { title: 'Писмено резюме', text: 'След огледа получавате всичко писмено, за да решите. Срокът е посочен в офертата.' },
      ],
    },
    process: {
      headline: 'Как протича',
      steps: [
        { num: '01', title: 'Първи разговор', text: 'Описвате имота, локацията и времевата рамка. Изясняваме какво може да обхване един оглед – лично, по WhatsApp или телефон.' },
        { num: '02', title: 'Оглед на място', text: 'Нашата строителна фирма оглежда имота систематично и документира видяното.' },
        { num: '03', title: 'Писмено резюме', text: 'Получавате какво сме видели и какво предлагаме, със снимки, списък с дефекти, ценови диапазони и нашата оценка за покупката.' },
        { num: '04', title: 'Въпроси и следващи стъпки', text: 'Обсъждаме резюмето с вас и при желание координираме местни фирми за саниране или преустройство.' },
      ],
    },
    expert: {
      tag: 'ВАШАТА СТРОИТЕЛНА ФИРМА НА МЯСТО',
      name: 'Андреас Донер · Peak Care',
      text: 'Зад Peak Care стоят десетилетия практически опит със строителна субстанция, саниране и строителен надзор в България и немскоезичния регион. Познаваме типичните слаби места на българските имоти – от влажния сутерен на панелките до незаконната пристройка – и ви казваме открито какво виждаме.',
      points: ['Независим оглед от строителна фирма', 'Местно познаване на пазара в България', 'Резюме EN/DE'],
    },
    limitations: {
      headline: 'Какво НЕ е този оглед',
      text: 'Peak Care е строителна фирма. Получавате оглед с писмено резюме – не експертиза, не правна проверка и не данъчна консултация. Когато е необходима сертифицирана експертиза, нотариус или адвокат, ви го казваме.',
    },
    faqHeadline: 'Често задавани въпроси',
    faqContact: { text: 'Кажете ни къде е имотът и какво ви притеснява най-много. Нищо не се резервира, докато не сте се съгласили.', wa: 'Здравейте, искам да запитам за оглед преди покупка на имот в България.', mailSubject: 'Оглед преди покупка', waLabel: 'Пишете в WhatsApp', mailLabel: 'Имейл' },
    faqs: [
      { q: 'Живея в чужбина и не мога да пътувам. Можете ли да огледате имот в България вместо мен?', a: 'Да. Оглеждаме имота по ваше поръчение и уговаряме достъпа директно с брокера, не е нужно да присъствате. Всичко останало минава по имейл, телефон или WhatsApp, а резултата получавате писмено.' },
      { q: 'Какво получавам конкретно?', a: 'Писмено резюме на немски или английски, подредено по сгради: какво сме видели, какво предлагаме и кои работи са първи по ред, за да стане сградата безопасна и защитена от времето. Към него снимки на всичко важно и кратки видеа, когато снимката не стига и снимането е безопасно. Разходите за ремонт посочваме като диапазони, до които стоят допусканията. Те помагат при планирането и не са обвързващи оферти.' },
      { q: 'Можете ли да проверите покрива и да кажете дали керемидите могат да се използват отново?', a: 'Оглеждаме носещата конструкция, дървения материал и покритието, доколкото са безопасно достъпни, и ви казваме дали повторното използване на керемидите изглежда реалистично и кои ремонти не бива да чакат още една зима. Не отваряме части на сградата. Скритото остава извън това, за което можем да кажем нещо.' },
      { q: 'Можете ли да потвърдите, че сградата е конструктивно безопасна?', a: 'Не, един оглед не може да го направи. Описваме основите и стените, доколкото се виждат, заедно с признаци на движение, влага или разпад, и ви казваме кои сгради смятаме за запазване. Обвързваща оценка за устойчивостта дава правоспособен конструктор. Ако ви трябва такава, казваме го и я посочваме отделно. Нищо не се възлага без вашето съгласие.' },
      { q: 'Колко бързо ще имам резултата?', a: 'Срока за огледа и за писменото резюме посочваме в офертата. Нищо не се резервира, докато не сте се съгласили с обхвата и общия хонорар.' },
      { q: 'Къщата е на село, с кладенец и без канализация. Можете ли да проверите въпроса със септичната яма?', a: 'На място проверяваме наличното място, разстоянието до кладенеца и до поток, терена, доколкото може да се прецени, достъпа за техника и съществуващото отводняване, доколкото се вижда. Дали една система ще бъде разрешена, решават компетентните органи; за това могат да са нужни почвен тест и специализиран проектант. Дали водата от кладенеца е питейна, установява лаборатория. Казваме ви какво от това ви трябва и го посочваме отделно.' },
      { q: 'В имота има няколко сгради. Можете ли първо да огледате само главната къща?', a: 'Да. Ако къщата решава покупката, това обикновено е правилното начало. Пътуването е същото за една сграда както за три, затова в предложението показваме какво биха добавили останалите. После решавате, преди нещо да е резервирано.' },
      { q: 'Трябва ли първо да огледам имота сам?', a: 'Ако можете да пътувате, да. Това е правилният ред и онова, което не ви допада, отпада, без да имате нужда от нас. Елате при нас, когато имате имот, който искате да продължите. Ако не можете да пътувате, нашият оглед ви дава представа, на която можете да се опрете, преди да се обвържете.' },
      { q: 'Вие сте строителна фирма. Мога ли да ви вярвам и ще ми кажете ли да не купувам?', a: 'Ние сме строителна фирма, не вещи лица, и не получавате нито официална експертиза, нито правно становище. Ако видяното говори против покупката, го казваме писмено и със снимки. Ако по-късно искате да ремонтирате, свободни сте да изберете кого да е. Ако изберете нас, това е отделен договор.' },
      { q: 'Колко струва?', a: 'Цената е при запитване, защото размерът, разстоянието и броят на сградите са различни. Преди да бъде резервирано каквото и да е, получавате един общ хонорар, включително пътуването и дължимия данък. Специализираните услуги са посочени отделно.' },
      { q: 'Оглеждате ли и ново строителство и апартаменти?', a: 'Да: къщи, апартаменти, стари и нови сгради. При имот от инвеститор най-добрият момент е преди приемането и финалното плащане.' },
    ],
    finalCta: {
      headline: 'Купувайте със сигурност, не с надежда',
      text: 'Опишете ни имота – свързваме се с вас лично и изясняваме разумната следваща стъпка. Без ангажимент.',
    },
    related: 'Свързани услуги',
    relatedLinks: [
      { to: '/technische-immobilienueberwachung-bulgarien', label: 'Текущ надзор на имота', tag: 'Услуга' },
      { to: '/service/renovierung-umbau-ausbau-bulgarien', label: 'Саниране и преустройство (DE)', tag: 'Услуга' },
      { to: '/service/kellerabdichtung-bansko', label: 'Хидроизолация на сутерен (DE)', tag: 'Услуга' },
    ],
  },
}

function buildSchema(c, lang) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: c.meta.title.split('|')[0].trim(),
    serviceType: lang === 'en' ? 'Pre-Purchase Building Inspection' : 'Bauinspektion vor dem Kauf',
    areaServed: { '@type': 'Country', name: 'Bulgaria' },
    provider: {
      '@type': 'LocalBusiness',
      name: 'Peak Care',
      url: 'https://peak-care.com',
      telephone: '+359898436561',
      areaServed: 'Bulgaria',
    },
    description: c.meta.description,
    url: c.meta.canonical,
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Peak Care', item: 'https://peak-care.com/' },
      { '@type': 'ListItem', position: 2, name: c.hero.title, item: c.meta.canonical },
    ],
  }
  return [faqSchema, serviceSchema, breadcrumbSchema]
}

export default function PrePurchaseBuildingSurveyBulgaria() {
  const { lang } = useLang()
  const { pathname } = useLocation()
  const c = content[lang] || content.de
  useSEO({
    title: c.meta.title,
    description: c.meta.description,
    canonical: c.meta.canonical,
    alternates: [
      { hreflang: 'de', href: 'https://peak-care.com/bauinspektion-vor-dem-kauf-bulgarien' },
      { hreflang: 'en', href: 'https://peak-care.com/pre-purchase-building-inspection-bulgaria' },
      { hreflang: 'x-default', href: 'https://peak-care.com/pre-purchase-building-inspection-bulgaria' },
    ],
    jsonLd: buildSchema(c, lang),
  })

  return (
    <>
      {/* Hero */}
      <section className="bg-gray-950 text-white pt-20 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-950/50 to-gray-950" />
        <div className="relative max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-teal-400 uppercase mb-4 block">{c.hero.tag}</span>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">{c.hero.title}</h1>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">{c.hero.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#kontakt" className="inline-block text-center bg-teal-600 hover:bg-teal-500 text-white font-semibold px-7 py-3 rounded transition-colors">
              {c.hero.ctaPrimary}
            </a>
            <a href={WA} className="inline-block text-center border border-gray-600 hover:border-teal-500 text-gray-200 font-semibold px-7 py-3 rounded transition-colors">
              {c.hero.ctaSecondary}
            </a>
          </div>
          <p className="text-gray-500 text-sm mt-6">{c.hero.micro}</p>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-gray-900 border-y border-gray-800 py-8 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {c.trust.map((t, i) => (
            <div key={i}>
              <div className="text-teal-400 font-semibold text-sm mb-1">{t.k}</div>
              <p className="text-gray-400 text-xs leading-relaxed">{t.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stakes */}
      <section className="bg-gray-950 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{c.stakes.headline}</h2>
          <p className="text-gray-300 leading-relaxed mb-10">{c.stakes.intro}</p>
          <div className="grid md:grid-cols-2 gap-6">
            {c.stakes.items.map((item, i) => (
              <div key={i} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <div className="text-teal-400 font-semibold text-sm mb-2">{item.head}</div>
                <p className="text-gray-300 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scope of inspection */}
      <section className="bg-gray-900 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{c.scope.headline}</h2>
          <p className="text-gray-400 mb-10">{c.scope.sub}</p>
          <div className="grid sm:grid-cols-2 gap-6">
            {c.scope.groups.map((g, i) => (
              <div key={i} className="bg-gray-950 rounded-lg p-6 border border-gray-800">
                <div className="text-white font-semibold mb-4">{g.title}</div>
                <ul className="space-y-2">
                  {g.items.map((it, j) => (
                    <li key={j} className="flex items-start gap-2 text-gray-300 text-sm">
                      <svg className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="bg-gray-950 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{c.deliver.headline}</h2>
          <p className="text-gray-400 mb-10">{c.deliver.sub}</p>
          <div className="grid md:grid-cols-3 gap-5">
            {c.deliver.items.map((item, i) => (
              <div key={i} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <div className="text-teal-500 font-bold text-lg mb-2">{String(i + 1).padStart(2, '0')}</div>
                <div className="text-white font-semibold mb-2 text-sm">{item.title}</div>
                <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-gray-900 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">{c.process.headline}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {c.process.steps.map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="text-teal-600 font-bold text-xl mt-0.5 shrink-0">{step.num}</div>
                <div>
                  <div className="text-white font-semibold mb-1">{step.title}</div>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert / authority */}
      <section className="bg-gray-950 py-16 px-4">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-teal-950/40 to-gray-900 border border-gray-800 rounded-xl p-8">
          <div className="text-xs font-bold tracking-widest text-teal-400 uppercase mb-2">{c.expert.tag}</div>
          <div className="text-white font-bold text-xl mb-4">{c.expert.name}</div>
          <p className="text-gray-300 leading-relaxed mb-6">{c.expert.text}</p>
          <div className="flex flex-wrap gap-3">
            {c.expert.points.map((p, i) => (
              <span key={i} className="bg-gray-800 text-gray-200 text-xs font-medium px-3 py-1.5 rounded-full">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Limitations */}
      <section className="bg-gray-900 py-10 px-4">
        <div className="max-w-2xl mx-auto bg-gray-950 border border-gray-800 rounded-lg p-6">
          <div className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">{c.limitations.headline}</div>
          <p className="text-gray-400 text-sm leading-relaxed">{c.limitations.text}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-950 py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">{c.faqHeadline}</h2>
          <div className="space-y-6">
            {c.faqs.map((faq, i) => (
              <div key={i} className="border-b border-gray-800 pb-6">
                <div className="text-white font-semibold mb-2">{faq.q}</div>
                <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
          {/* Kontaktzeile mit Quellkennung (A871-Nachtrag 07.11.2026, MARKETING-Hinweis 5 Monats-Review) */}
          <div className="mt-10 border border-gray-800 rounded p-6">
            <p className="text-gray-200 mb-4">{c.faqContact.text}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`${WA}?text=${encodeURIComponent(c.faqContact.wa)}${refZusatz('W', pathname, lang)}`}
                className="inline-block text-center bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded transition-colors"
              >
                {c.faqContact.waLabel}
              </a>
              <a
                href={`mailto:peakcare@peak-care.com?subject=${encodeURIComponent(c.faqContact.mailSubject)}&body=${refZusatz('M', pathname, lang).replace(/^(%0A)+/, '')}`}
                className="inline-block text-center border border-gray-600 hover:border-teal-500 text-gray-200 font-semibold px-6 py-3 rounded transition-colors"
              >
                {c.faqContact.mailLabel}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lead form (Brevo inbox + GA generate_lead) */}
      <ContactSection />

      {/* Related */}
      <section className="bg-gray-950 py-12 px-4 border-t border-gray-900">
        <div className="max-w-3xl mx-auto">
          <div className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-6">{c.related}</div>
          <div className="grid md:grid-cols-3 gap-4">
            {c.relatedLinks.map((l, i) => (
              <Link key={i} to={l.to} className="block bg-gray-900 border border-gray-800 hover:border-teal-700 rounded-lg p-5 transition-colors group">
                <div className="text-xs text-teal-500 font-semibold mb-1 group-hover:text-teal-400">{l.tag}</div>
                <div className="text-sm text-gray-200 font-medium leading-snug">{l.label}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
