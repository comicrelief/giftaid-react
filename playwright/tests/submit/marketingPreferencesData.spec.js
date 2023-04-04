// @ts-check
const { expect } = require('@playwright/test');
const { test } = require('../../browserstack');
const { Commands } = require('../utils/commands');
const { MarketingPrefsVerify } = require('../utils/marketingPrefsVerify');

const faker = require('faker');

test.describe('Marketing preferences data @sanity @nightly-sanity', () => {
  test('verify giftaid submit marketing preferences data in contact-store', async ({ page }) => {

    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const phone = faker.phone.phoneNumber('0208#######');
    const mobile = faker.phone.phoneNumber('078########');
    const address1 = faker.address.streetName();
    const address2 = faker.address.streetAddress();
    const address3 = faker.address.city();
    const postcode = 'SE1 7TP';
    const town = faker.address.county();

    const email = `giftaid-staging-${Date.now().toString()}@email.sls.comicrelief.com`;
    console.log('email:', email);

    const commands = new Commands(page);
    await page.goto(process.env.BASE_URL, { timeout: 30000 });

    await page.waitForLoadState('load');

    await page.waitForSelector('#field-label--giftaid');
    await page.locator('#field-label--giftaid').click();

    // fill in all input fields
    await commands.populateFormFields({ firstName, lastName, mobile, address1, address2, address3, town, postcode });

    // select MP checkboxes
    await commands.selectMarketingPrefs({ email, phone });

    // submit the form
    await page.locator('button[type=submit]').click();

    await expect(page.locator('div > h1')).toContainText('Thank you,\n' +
      `${firstName}!`);

    await MarketingPrefsVerify.get(email, (data) => {

      expect(data.campaign).toEqual('RND23');
      expect(data.firstname).toEqual(firstName);
      expect(data.lastname).toEqual(lastName);
      expect(data.email).toEqual(email);
      expect(data.address1).toEqual(address1);
      expect(data.town).toEqual(town);
      expect(data.country).toEqual('GB');
      expect(data.transsourceurl).toContain(process.env.BASE_URL);
      expect(data.transsource).toEqual('RND23_GiftAid');
      expect(data.transtype).toEqual('prefs');
      expect(data.permissionemail).toEqual('1');
      expect(data.permissionsms).toEqual('1');
      expect(data.permissionphone).toEqual('1');
      expect(data.permissionpost).toEqual('1');
      expect(data.phone).toEqual(phone);
      expect(data.mobile).toEqual(mobile);
    });
    await page.close();
  });
});
