const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'qr');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const URLS = [
  {
    name: 'bushraimpex-connect',
    url: 'https://bushraimpex.com/connect',
    title: 'Bushra Impex Connect QR',
  },
  {
    name: 'x1power-connect',
    url: 'https://x1power.in/connect',
    title: 'X1 Power Connect QR',
  },
];

async function generateQRCodes() {
  console.log('Generating high-resolution forever QR codes...');

  for (const item of URLS) {
    const svgPath = path.join(OUTPUT_DIR, `${item.name}.svg`);
    const pngPath = path.join(OUTPUT_DIR, `${item.name}.png`);

    // 1. Generate Vector SVG (infinite resolution for large banners/hoardings)
    const svgString = await QRCode.toString(item.url, {
      type: 'svg',
      errorCorrectionLevel: 'H', // 30% damage/dirt recovery for farm equipment
      margin: 2,
      color: {
        dark: '#111111',
        light: '#FFFFFF',
      },
    });
    fs.writeFileSync(svgPath, svgString, 'utf8');
    console.log(`✓ Vector SVG generated: ${svgPath}`);

    // 2. Generate Ultra High-Res PNG (2048x2048, 300+ DPI for offset print catalogues)
    await QRCode.toFile(pngPath, item.url, {
      type: 'png',
      width: 2048,
      errorCorrectionLevel: 'H',
      margin: 2,
      color: {
        dark: '#111111',
        light: '#FFFFFF',
      },
    });
    console.log(`✓ Ultra High-Res PNG generated: ${pngPath}`);
  }

  console.log('All forever QR codes generated successfully in public/qr/');
}

generateQRCodes().catch((err) => {
  console.error('Error generating QR codes:', err);
  process.exit(1);
});
