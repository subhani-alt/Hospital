import sharp from 'sharp';
import fs from 'fs';

async function processLogo() {
  const inputPath = 'C:/Users/Subhani Shaik/.gemini/antigravity-ide/brain/16d8a871-e4de-4ff1-84fd-890a705f7bd6/media__1785846643248.png';
  
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;

  // Clone buffers for light version (white logo) and dark version (dark teal logo)
  const whiteBuffer = Buffer.from(data);
  const darkBuffer = Buffer.from(data);

  let minX = width, minY = height, maxX = 0, maxY = 0;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const pixelIndex = i / 4;
    const x = pixelIndex % width;
    const y = Math.floor(pixelIndex / width);

    // Teal background check
    const isTealBg = (g > 100 && b > 80 && g > r + 20) || (r < 100 && g > 130 && b > 120);

    if (isTealBg) {
      whiteBuffer[i + 3] = 0; // Transparent
      darkBuffer[i + 3] = 0; // Transparent
    } else {
      // It's part of the logo (white or near white)
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;

      // For white buffer: make it crisp white #FFFFFF
      whiteBuffer[i] = 255;
      whiteBuffer[i + 1] = 255;
      whiteBuffer[i + 2] = 255;
      whiteBuffer[i + 3] = 255;

      // For dark buffer: make it brand dark teal #00695C
      darkBuffer[i] = 0;
      darkBuffer[i + 1] = 105;
      darkBuffer[i + 2] = 92;
      darkBuffer[i + 3] = 255;
    }
  }

  // Padding
  const pad = 15;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(width, maxX + pad);
  maxY = Math.min(height, maxY + pad);

  const cropWidth = maxX - minX;
  const cropHeight = maxY - minY;

  console.log(`Cropping logo to: ${cropWidth}x${cropHeight} from (${minX}, ${minY})`);

  // Save White Transparent Logo
  await sharp(whiteBuffer, { raw: { width, height, channels: 4 } })
    .extract({ left: minX, top: minY, width: cropWidth, height: cropHeight })
    .png()
    .toFile('client/public/prestige-logo-white.png');

  // Save Dark Transparent Logo
  await sharp(darkBuffer, { raw: { width, height, channels: 4 } })
    .extract({ left: minX, top: minY, width: cropWidth, height: cropHeight })
    .png()
    .toFile('client/public/prestige-logo-dark.png');

  // Copy to admin/public as well
  fs.copyFileSync('client/public/prestige-logo-white.png', 'admin/public/prestige-logo-white.png');
  fs.copyFileSync('client/public/prestige-logo-dark.png', 'admin/public/prestige-logo-dark.png');
  fs.copyFileSync('client/public/prestige-logo-dark.png', 'client/public/prestige-logo.png');

  console.log('Transparent logo versions created successfully!');
}

processLogo().catch(console.error);
