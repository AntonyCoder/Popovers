import puppeteer from "puppeteer";
import { fork } from 'child_process';

jest.setTimeout(30000);

describe('Page start', () => {
  let browser;
  let page;
  let server = null;
  const baseUrl = 'http://localhost:9000';


  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      headless: false,
      slowMo: 500,
      devtools: true,
    });
    page = await browser.newPage();
  });



  afterAll(async () => {
    await browser.close();
    server.kill();
  })

  test('check show popover', async () => {
    await page.goto(baseUrl);

    const button = await page.$('.button')

    await button.click();

    await page.waitForSelector('.popover');
  })
});