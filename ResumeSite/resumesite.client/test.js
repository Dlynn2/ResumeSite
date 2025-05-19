const puppeteer = require('puppeteer');

async function bingSearch(query) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://www.bing.com');
  await page.type('input[name="q"]', query);
  await page.keyboard.press('Enter');

  // Wait for search results to load (adjust the selector and timeout as needed)
  await page.waitForSelector('.b_algo');

  // Extract search results (adjust the selector and extraction logic as needed)
  const results = await page.$$eval('.b_algo', (results) => {
    return results.map(result => result.textContent);
  });

  await browser.close();

  return results;
}

// Example usage:
bingSearch('puppeteer')
  .then(results => console.log(results))
  .catch(error => console.error(error));