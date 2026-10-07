import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const SHOTS_DIR = './lab/shots';
mkdirSync(SHOTS_DIR, { recursive: true });

async function shoot() {
  const browser = await chromium.launch();

  // Desktop viewport
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:4321', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000); // let GSAP animations settle

  // Get page height
  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const viewportHeight = 900;
  const totalScroll = pageHeight - viewportHeight;

  console.log(`Page height: ${pageHeight}px, total scroll: ${totalScroll}px`);

  // Take screenshots at 10 scroll positions (0%, 10%, 20%, ..., 90%, 100%)
  for (let i = 0; i <= 10; i++) {
    const scrollTo = Math.round((i / 10) * totalScroll);
    const pct = i * 10;

    await page.evaluate((y) => window.scrollTo(0, y), scrollTo);
    await page.waitForTimeout(800); // let scroll-driven animations settle

    await page.screenshot({
      path: `${SHOTS_DIR}/desktop-${String(pct).padStart(3, '0')}pct.png`,
      fullPage: false
    });
    console.log(`  Desktop ${pct}% (scroll ${scrollTo}px)`);
  }

  // Mobile viewport
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto('http://localhost:4321', { waitUntil: 'networkidle' });
  await mobile.waitForTimeout(2000);

  const mobileHeight = await mobile.evaluate(() => document.documentElement.scrollHeight);
  const mobileTotalScroll = mobileHeight - 844;

  // Mobile: 5 key positions
  for (const pct of [0, 25, 50, 75, 100]) {
    const scrollTo = Math.round((pct / 100) * mobileTotalScroll);
    await mobile.evaluate((y) => window.scrollTo(0, y), scrollTo);
    await mobile.waitForTimeout(800);

    await mobile.screenshot({
      path: `${SHOTS_DIR}/mobile-${String(pct).padStart(3, '0')}pct.png`,
      fullPage: false
    });
    console.log(`  Mobile ${pct}% (scroll ${scrollTo}px)`);
  }

  await browser.close();
  console.log('\nDone. Screenshots in ./lab/shots/');
}

shoot().catch(console.error);
