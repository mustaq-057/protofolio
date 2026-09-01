import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dir = path.join(__dirname, 'src', 'assets', 'tech');

// Download HTML5 PNG from devicon CDN - reliable PNG source
const url = 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg';

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Write as SVG with explicit dimensions
    const out = data.replace('<svg ', '<svg width="256" height="256" ');
    fs.writeFileSync(path.join(dir, 'html.svg'), out);
    console.log('Saved html.svg from devicons');
  });
}).on('error', (e) => {
  console.error('Error:', e.message);
  // Fallback: write inline SVG
  const fallback = `<svg width="256" height="256" viewBox="0 0 452 520" xmlns="http://www.w3.org/2000/svg">
  <path fill="#E44D26" d="M41 460L0 0h452l-41 460-185 52z"/>
  <path fill="#F16529" d="M226 472l149-41 35-394H226z"/>
  <path fill="#EBEBEB" d="M226 212H112l-8-90h122zm-5 93l-60-16-4-45h-58l8 87 114 31z"/>
  <path fill="#fff" d="M226 212v89l59 16 5-61h-64zm0-122v89h119l-4-45h-74v-44z"/>
</svg>`;
  fs.writeFileSync(path.join(dir, 'html.svg'), fallback);
  console.log('Saved fallback html.svg');
});
