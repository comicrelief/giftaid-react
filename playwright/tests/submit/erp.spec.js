// @ts-check
const { expect } = require('@playwright/test');
const { test } = require('../../browserstack');
const { Commands } = require('../utils/commands');
const { ErpNextTester } = require('@comicrelief/test-utils/ErpNextTester');

const erpTester = new ErpNextTester(
  process.env.ERP_HOST,
  process.env.ERP_CLIENT,
  process.env.ERP_SECRET,
);

const ChanceJS = require('chance');

const chance = new ChanceJS();

const randomString = chance.string({
  length: 7,
  pool: 'abcdefghijklmnopqrstuvwxyz',
});

const faker = require('faker');

const testData = {
  lastName: faker.name.lastName(),
  mobile: faker.phone.phoneNumber('078########'),
  phone: faker.phone.phoneNumber('0208#######'),
  orgName: faker.company.companyName(),
  address1: faker.address.streetName(20),
  address2: faker.address.streetAddress(),
  address3: faker.address.city(),
  postcode: 'SE17TP',
  town: faker.address.county(),
  country: 'United Kingdom',
};

test.describe('Giftaid ERP test @sanity', () => {

  test('verify giftaid data in ERP', async ({ page }) => {

    const firstName = 'test';
    const lastName = 'user' + randomString;
    console.log('lastName:', lastName);
    const email = `fsu-staging--${Date.now().toString()}@email.sls.comicrelief.com`;
    console.log('email', email);
    const mobile = testData.mobile;

    const commands = new Commands(page);

    await page.goto(process.env.BASE_URL, { timeout: 30000 });

    await page.waitForLoadState('domcontentloaded');

    await page.waitForSelector('#field-label--giftaid');
    await page.locator('#field-label--giftaid').click();

    // entering valid input fields should be able to submit the form
    await commands.populateFormFields();

    // select MP checkboxes
    await commands.selectMarketingPrefs();

    // submit the form
    await page.locator('button[type=submit]').click();

    await expect(page.locator('div > h1')).toContainText('Thank you,\n' +
      'test!');

    await page.close();
  });
});
