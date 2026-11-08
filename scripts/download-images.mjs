import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const imagesToDownload = [
  {
    name: 'seasonal-bouquet.jpg',
    url: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=900&auto=format&fit=crop&q=80',
  },
  {
    name: 'sunflowers.jpg',
    url: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=900&auto=format&fit=crop&q=80',
  },
  {
    name: 'table-arrangement.jpg',
    url: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=900&auto=format&fit=crop&q=80',
  },
  {
    name: 'rose-arrangement.jpg',
    url: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=900&auto=format&fit=crop&q=80',
  },
  {
    name: 'heart-box.jpg',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&auto=format&fit=crop&q=80',
  },
  {
    name: 'pastel-box.jpg',
    url: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=900&auto=format&fit=crop&q=80',
  },
  {
    name: 'bridal-classic.jpg',
    url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=900&auto=format&fit=crop&q=80',
  },
  {
    name: 'bridal-modern.jpg',
    url: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=900&auto=format&fit=crop&q=80',
  },
  {
    name: 'engagement-table.jpg',
    url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&auto=format&fit=crop&q=80',
  },
  {
    name: 'condolence-wreath.jpg',
    url: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=900&auto=format&fit=crop&q=80',
  },
  {
    name: 'condolence-basket.jpg',
    url: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?w=900&auto=format&fit=crop&q=80',
  },
  {
    name: 'bonsai.jpg',
    url: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=900&auto=format&fit=crop&q=80',
  },
  {
    name: 'succulent-terrarium.jpg',
    url: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=900&auto=format&fit=crop&q=80',
  },
  {
    name: 'lavender-pot.jpg',
    url: 'https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?w=900&auto=format&fit=crop&q=80',
  },
  {
    name: 'purple-orchid.jpg',
    url: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=900&auto=format&fit=crop&q=80',
  },
  {
    name: 'story-florist.jpg',
    url: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=900&auto=format&fit=crop&q=80',
  },
  {
    name: 'banner-wedding.jpg',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&auto=format&fit=crop&q=80',
  },
  {
    name: 'banner-orchid.jpg',
    url: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=1600&auto=format&fit=crop&q=80',
  },
];

async function download(item) {
  const dest = path.join(uploadsDir, item.name);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
    console.log(`[EXISTS] ${item.name}`);
    return;
  }
  try {
    const res = await fetch(item.url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const arrayBuffer = await res.arrayBuffer();
    fs.writeFileSync(dest, Buffer.from(arrayBuffer));
    console.log(`[DONE] ${item.name} (${Math.round(arrayBuffer.byteLength / 1024)} KB)`);
  } catch (err) {
    console.error(`[ERROR] ${item.name}:`, err.message);
  }
}

async function main() {
  console.log(`🌸 Downloading ${imagesToDownload.length} flower images to public/uploads...`);
  for (const item of imagesToDownload) {
    await download(item);
  }
  console.log('✨ All downloads completed!');
}

main();
