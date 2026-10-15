const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH);
const assert = require('node:assert/strict');
const base = 'http://127.0.0.1:8765';
const deadline = setTimeout(() => { console.error('Browser checks timed out'); process.exit(1); }, 120000);
deadline.unref();

async function localOnly(context) {
  await context.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
}

async function checkWidth(page, label) {
  const size = await page.evaluate(() => ({
    content: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
    wide: Array.from(document.querySelectorAll('body *')).filter(el => el.getBoundingClientRect().right > window.innerWidth + 1).slice(0, 5).map(el => el.tagName + '.' + el.className)
  }));
  assert.ok(size.content <= size.viewport + 1, label + ': ' + JSON.stringify(size));
}

(async () => {
  const browser = await chromium.launch({headless: true});
  try {
    const context = await browser.newContext({viewport: {width: 390, height: 844}});
    await localOnly(context);
    const page = await context.newPage();
    page.setDefaultTimeout(10000);
    const errors = [];
    page.on('pageerror', error => errors.push(String(error)));
    await page.goto(base, {waitUntil: 'domcontentloaded'});
    await page.locator('.menu-toggle').click();
    assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'true');
    assert.equal(await page.locator('.menu-toggle').getAttribute('aria-label'), 'Close menu');
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
    await page.locator('.menu-toggle').click();
    await page.locator('.nav a').first().click();
    assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
    assert.equal(await page.locator('.email-link').getAttribute('href'), 'mailto:mathenjwankosinathi006@gmail.com');
    for (const width of [390, 1440]) {
      await page.setViewportSize({width, height: 900});
      await checkWidth(page, 'Creator website width ' + width);
    }
    for (const src of await page.locator('img').evaluateAll(images => images.map(image => image.getAttribute('src')))) {
      assert.equal((await context.request.get(new URL(src, base).toString())).status(), 200, src);
    }
    const nojs = await browser.newContext({javaScriptEnabled: false, viewport: {width:390,height:844}});
    await localOnly(nojs);
    const fallback = await nojs.newPage();
    await fallback.goto(base, {waitUntil: 'domcontentloaded'});
    assert.equal(await fallback.locator('.reveal').first().evaluate(el => getComputedStyle(el).opacity), '1');
    console.log('PASS: mobile menu, keyboard dismissal, anchor navigation, contact link, image files, desktop/mobile widths and no-JavaScript content.');
    assert.deepEqual(errors, []);
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error.stack); process.exit(1); });
