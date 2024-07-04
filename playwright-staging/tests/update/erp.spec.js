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

test('Verify giftaid update ERP data @regression', async ({ page }) => {
  const commands = new Commands(page);
  const rndmString = await commands.randomString();
  
  const contactInfo = {
    firstName: `testUpdate${chance.first()}`,
    lastName: chance.last(),
    email: `giftaid-update-staging-${chance.email()}`,
    mobile: chance.phone({ country: 'uk', mobile: true }).replace(/\s/g, ''),
    postcode: chance.postcode(),
    address1: chance.address(),
    address2: chance.street(),
    address3: 'test address 3',
    town: chance.city(),
  };
  
  // Navigate to the Giftaid update page
  await page.goto(`${process.env.BASE_URL}update`, { timeout: 30000 });
  await page.waitForLoadState('domcontentloaded');
  
  // Populate all input fields with valid data
  await commands.populateUpdateFormFields(page, contactInfo);
  
  // Select 'Yes' for GiftAid declaration
  await page.locator('#giftAidClaimChoice>div:nth-child(2)>label').click();
  
  // Submit the form and validate the thank you message
  await page.locator('button[type=submit]').click();
  await expect(page.locator('div > h1')).toContainText(`Thank you, ${contactInfo.firstName}!`);
  
  // ERP Steps
  const giftaidUpdate = await erpTester.findOne('Gift Aid Declaration', {
    filters: [
      {
        field: 'first_name',
        value: contactInfo.firstName
      }
    ]
  }, 60, 10000);
  
  console.log('Fetching Giftaid submit data from ERP');
  expect(giftaidUpdate.first_name).toEqual(contactInfo.firstName);
  expect(giftaidUpdate.last_name).toEqual(contactInfo.lastName);
  expect(giftaidUpdate.can_claim_giftaid).toEqual(1);
  expect(giftaidUpdate.source).toEqual('Giftaid Update');
  
  // Supporter ID
  const supporterUUID = giftaidUpdate.supporter_uuid;
  
  console.log('Fetching supporter from ERP');
  const supporter = await erpTester.get('Supporter', supporterUUID, 30, 10000);
  
  console.log('Fetching supporter data from ERP');
  expect(supporter.first_name).toEqual(contactInfo.firstName);
  expect(supporter.last_name).toEqual(contactInfo.lastName);
  expect(supporter.giftaid_status).toEqual(1);
  expect(supporter.email[0].email).toEqual(contactInfo.email);
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
