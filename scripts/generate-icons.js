import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a simple PNG-like file for favicon-32x32.png
// This is a minimal approach - in production you'd use a proper image library
const createSimplePNG = (size, filename) => {
  // Create a simple base64 encoded PNG (1x1 transparent pixel)
  const pngData = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
    'base64'
  );
  
  const filePath = path.join(__dirname, '..', 'public', filename);
  fs.writeFileSync(filePath, pngData);
  console.log(`Created ${filename}`);
};

// Create the missing icon files
createSimplePNG(32, 'favicon-32x32.png');
createSimplePNG(16, 'favicon-16x16.png');
createSimplePNG(180, 'apple-touch-icon.png');

console.log('Icon files created successfully!');
