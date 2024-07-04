// @ts-check
const { expect } = require('@playwright/test');
const { test } = require('../../browserstack');
const { Commands } = require('../utils/commands');
const { ErpNextTester } = require('@comicrelief/test-utils/ErpNextTester');
const Chance = require('chance');
const chance = new Chance();

const erpTester = new ErpNextTester(
  process.env.ERP_HOST,
  process.env.ERP_API_KEY,
  process.env.ERP_API_SECRET,
);

test('Verify giftaid submit ERP data @regression', async ({ page }) => {
  const commands = new Commands(page);
  const rndmString = await commands.randomString();
  
  const contactInfo = {
    mobile: chance.phone({ country: 'uk', mobile: true }).replace(/\s/g, ''), // Remove spaces from the phone number
    firstName: `test${rndmString}`,
    lastName: chance.last(),
    email: `giftaid-staging-${chance.email()}`,
    postcode: chance.postcode(),
    address1: chance.address(),
    address2: chance.street(),
    address3: 'test address 3',
    town: chance.city()
  };
  
  // Navigate to the giftaid page
  await page.goto(process.env.BASE_URL, { timeout: 30000 });
  await page.waitForLoadState('domcontentloaded');
  
  // Click the Giftaid checkbox
  await page.click('#field-label--giftaid');
  
  // Populate all the form fields with valid inputs
  await commands.populateFormFields(page, contactInfo);
  
  // Select marketing preferences as required
  await commands.selectMarketingPrefs(page);
  
  // Submit the form and wait for the navigation to ensure the submission goes through
  await Promise.all([
    page.waitForNavigation(), // This ensures that the navigation happens before the check
    page.click('button[type=submit]')
  ]);
  
  // Check for the thank you message to confirm successful submission
  await expect(page.locator('div.success-wrapper--inner h1')).toHaveText(`Thank you, ${contactInfo.firstName}!`);
  
  // ERP Steps
  const giftaidSubmit = await erpTester.findOne('Gift Aid Declaration', {
    filters: [
      {
        field: 'first_name',
        value: contactInfo.firstName
      }
    ]
  }, 60, 10000);
  
  console.log('Fetching Giftaid submit data from ERP');
  expect(giftaidSubmit.first_name).toEqual(contactInfo.firstName);
  expect(giftaidSubmit.last_name).toEqual(contactInfo.lastName);
  expect(giftaidSubmit.can_claim_giftaid).toEqual(1);
  expect(giftaidSubmit.source).toEqual('Giftaid Submit');
  
  // Supporter ID
  const supporterUUID = giftaidSubmit.supporter_uuid;
 
  console.log('Fetching supporter from ERP');
  const supporter = await erpTester.get('Supporter', supporterUUID, 30, 10000);
  
  console.log('Fetching supporter data from ERP');
  expect(supporter.first_name).toEqual(contactInfo.firstName);
  expect(supporter.last_name).toEqual(contactInfo.lastName);
  
  // Fetch supporter's phone number
  expect(supporter.phone[0].type).toEqual('Mobile');
  expect(supporter.phone[0].number).toEqual(contactInfo.mobile.replace(/^[07]{1}/, '+44'));
  
  // Get supporter's postal ID
  const getPostalID = supporter.giftaid_declarations[0];
  const postalID = getPostalID.postal_id;
  console.log('postalID', postalID);
  
  // Fetch supporter's postal data
  console.log('Fetching postal data from ERP');
  const postal = await erpTester.get('Postal', postalID, 30, 10000);
  expect(postal.name).toEqual(postalID);
  expect(postal.line_1).toEqual(contactInfo.address1);
  expect(postal.line_2).toEqual(contactInfo.address2);
  expect(postal.line_3).toEqual(contactInfo.address3);
  expect(postal.post_code).toEqual(contactInfo.postcode);
  expect(postal.town).toEqual(contactInfo.town);
  expect(postal.country).toEqual('GB');
  
  await page.close();
});
