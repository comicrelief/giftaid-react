// @ts-check
const { expect } = require('@playwright/test');
const { test } = require('../../browserstack');
const { Commands } = require('../utils/commands');
const { MarketingPrefsVerify } = require('../utils/marketingPrefsVerify');

const Chance = require('chance');
const chance = new Chance();

test('Verify giftaid marketing preferences data in contact-store @sanity @nightly-sanity', async ({ page }) => {
  const firstName = chance.first();
  const lastName = chance.last();
  const phone = chance.phone({ country: 'uk', mobile: false }).replace(/\s/g, '') // UK phone number
  const mobile = chance.phone({ country: "uk", mobile: true }).replace(/\s/g, '') // UK mobile number
  const address1 = chance.street();
  const address2 = chance.street();
  const address3 = chance.city();
  const postcode = 'SE1 7TP';
  const town = chance.county();
  const email = `giftaid-staging-${Date.now().toString()}@email.sls.comicrelief.com`;
  
  const commands = new Commands(page);
  
  // Navigate to the giftaid page
  await page.goto(process.env.BASE_URL, { timeout: 30000 });
  await page.waitForLoadState('load');
  await page.locator('#field-label--giftaid').click();
  
  // Populate all input fields using Commands class
  await commands.populateFormFields(page, {
    mobile, firstName, lastName, address1, address2, address3, town, postcode, email
  });
  
  // Select marketing preferences using Commands class
  await commands.selectMarketingPrefs(page, { email, phone });
  
  // Submit the form
  await page.locator('button[type=submit]').click();
  
  // Verify success message
  await expect(page.locator('div > h1')).toHaveText(`Thank you, ${firstName}!`);
  
  // Retrieve and verify marketing preferences data
  const mpData = await MarketingPrefsVerify.get(email);
  
  expect(mpData.campaign).toEqual('RND24');
  expect(mpData.firstname).toEqual(firstName);
  expect(mpData.lastname).toEqual(lastName);
  expect(mpData.email).toEqual(email);
  expect(mpData.address1).toEqual(address1);
  expect(mpData.town).toEqual(town);
  expect(mpData.country).toEqual('GB');
  expect(mpData.transsourceurl).toContain(process.env.BASE_URL);
  expect(mpData.transsource).toEqual('RND24_GiftAid');
  expect(mpData.transtype).toEqual('prefs');
  expect(mpData.permissionemail).toEqual('1');
  expect(mpData.permissionsms).toEqual('1');
  expect(mpData.permissionphone).toEqual('1');
  expect(mpData.phone).toEqual(phone);
  expect(mpData.mobile).toEqual(mobile.replace(/^[07]{1}/, '+44'));
  
  await page.close();
});
