const fs = require('fs');

const files = [
  'C:/Users/andre/OneDrive/Desktop/Business/Bulgarien/PeakCare/Aesha/Books/DE-Prepared Home 2026/Google Drive Link.pdf',
  'C:/Users/andre/OneDrive/Desktop/Business/Bulgarien/PeakCare/Aesha/Books/EN-Prepared Home 2026/Prepared Home 2026 Link Google Drive.pdf',
  'C:/Users/andre/OneDrive/Desktop/Business/Bulgarien/PeakCare/Aesha/Books/DE_Smart Renovation/DE_Google Drive Link-Smart Renovation.pdf',
  'C:/Users/andre/OneDrive/Desktop/Business/Bulgarien/PeakCare/Aesha/5 GUIDES - DE.pdf',
  'C:/Users/andre/OneDrive/Desktop/Business/Bulgarien/PeakCare/Aesha/5 GUIDES - EN.pdf',
  'C:/Users/andre/OneDrive/Desktop/Business/Bulgarien/PeakCare/Aesha/5 GUIDES BG.pdf',
  'C:/Users/andre/OneDrive/Dokumente/EBook1_MuhulVlaga_BG.pdf',
];

files.forEach(p => {
  try {
    const buf = fs.readFileSync(p);
    const txt = buf.toString('binary');
    const urls = [...new Set((txt.match(/https?:\/\/[^\s\x00-\x1f\)>\x22\\\\]+/g) || []))];
    const name = p.split('/').pop();
    console.log('\n=== ' + name + ' (' + Math.round(buf.length/1024) + 'KB) ===');
    if (urls.length) {
      urls.forEach(u => console.log('  URL:', u));
    } else {
      console.log('  No URLs found');
      // Show first 200 readable chars
      const readable = txt.replace(/[^\x20-\x7E]/g, ' ').replace(/\s+/g,' ').substring(0, 300);
      console.log('  Preview:', readable);
    }
  } catch(e) {
    console.log('ERROR reading', p.split('/').pop(), ':', e.message);
  }
});
