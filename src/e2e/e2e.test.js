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
      slowMo: 100,
      devtools: true,
    });
    page = await browser.newPage();
  });



  afterAll(async () => {
    await browser.close();
    server.kill();
  })

  test('check valid card number', async () => {
    await page.goto(baseUrl);

    const form = await page.$('.input-button-block')
    const input = await form.$('.input');
    const button = await form.$('.button');

    await input.type('371449635398431');
    await button.click();

    await page.waitForSelector('.input.input-valid');
  })

  test('check invalid card number', async () => {
    await page.goto(baseUrl);

    const form = await page.$('.input-button-block')
    const input = await form.$('.input');
    const button = await form.$('.button');

    await input.type('3714496353984');
    await button.click();

    await page.waitForSelector('.input.input-invalid');
  });
});