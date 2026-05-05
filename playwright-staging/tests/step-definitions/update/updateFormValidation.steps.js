const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const Chance = require('chance');
const { selectors } = require('../../utils/locators');

const chance = new Chance();

Given('I am on the Giftaid update page', async function () {
  await this.page.goto(`${process.env.BASE_URL}update`, { timeout: 30000 });
  await this.page.waitForLoadState('domcontentloaded');
});

When('I submit the Giftaid update form', async function () {
  await this.page.click(selectors.formFields.submitButton);
});

Then('I should see required update form error messages', async function () {
  await expect(this.page.locator(selectors.errorMessages.firstName)).toHaveText('Please fill in your first name');
  await expect(this.page.locator(selectors.errorMessages.lastName)).toHaveText('Please fill in your last name');
  await expect(this.page.locator(selectors.errorMessages.email)).toHaveText('Please fill in your email address');
  await expect(this.page.locator(selectors.errorMessages.postcode)).toHaveText('Please enter your postcode');
  await expect(this.page.locator(selectors.errorMessages.addressDetails)).toHaveText('Please fill in your address');
  await expect(this.page.locator(selectors.errorMessages.giftAidClaimChoice)).toHaveText('This field is required');
});

When('I enter update first name {string}', async function (firstName) {
  const value = firstName === 'SPACE' ? ' ' : firstName;
  await this.page.fill(selectors.formFields.firstName, value);
  await this.page.keyboard.press('Enter');
});

Then('I should see update first name error message {string}', async function (message) {
  await expect(this.page.locator(selectors.errorMessages.firstName)).toHaveText(message);
});

When('I complete the Giftaid update form with first name {string}', async function (firstName) {
  await this.page.fill(selectors.formFields.firstName, '');
  await this.commands.populateUpdateFormFields(this.page, { firstName });
});

When('I select yes for GiftAid declaration', async function () {
  await this.page.click(selectors.giftAidClaimChoice.yes);
});

When('I select no for GiftAid declaration', async function () {
  await this.page.click(selectors.giftAidClaimChoice.no);
});

Then('I should see update thank you message for {string}', async function (firstName) {
  await expect(
    this.page.locator(selectors.success.heading)).toHaveText(`Thank you, ${firstName}!`);
});

When('I enter update email {string}', async function (email) {
  await this.page.fill(selectors.marketingPreferences.fields.email, '');
  await this.page.fill(selectors.marketingPreferences.fields.email, email);
  await this.page.keyboard.press('Enter');
});

Then('I should see update email error message {string}', async function (message) {
  await expect(this.page.locator(selectors.errorMessages.email)).toBeVisible();
  await expect(this.page.locator(selectors.errorMessages.email)).toHaveText(message);
});

When('I complete the Giftaid update form with generated email', async function () {
  const validEmail = `giftaid-update-staging-${chance.email()}`;
  await this.page.fill(selectors.marketingPreferences.fields.email, '');
  await this.commands.populateUpdateFormFields(this.page, { email: validEmail });
});

Then('I should see update no declaration message', async function () {
  await expect(
    this.page.locator(selectors.success.heading)).toHaveText('Thanks for letting us know');
});

When('I enter update mobile number {string}', async function (mobile) {
  await this.page.locator(selectors.formFields.mobile).fill('');
  await this.page.locator(selectors.formFields.mobile).type(mobile, { delay: 100 });
});

Then('I should see update mobile error message {string}', async function (message) {
  await expect(this.page.locator(selectors.errorMessages.mobile)).toHaveText(message);
});

Then('I should not see update mobile error message', async function () {
  await expect(this.page.locator(selectors.errorMessages.mobile)).not.toBeVisible();
});

When('I complete the Giftaid update form with generated mobile and last name {string}', async function (lastName) {
  const prefixes = ['071', '073', '074', '075', '077', '078', '079'];
  const prefix = chance.pickone(prefixes);
  const mobile = `${prefix}${chance.string({ pool: '0123456789', length: 8 })}`;
  
  await this.page.locator(selectors.formFields.mobile).fill('');
  await this.commands.populateUpdateFormFields(this.page, { lastName, mobile });
});

When('I enter update postcode {string}', async function (postcode) {
  await this.page.fill(selectors.formFields.postcode, '');
  await this.page.type(selectors.formFields.postcode, postcode);
});

Then('I should see update postcode error message {string}', async function (message) {
  await expect(this.page.locator(selectors.errorMessages.postcode)).toBeVisible();
  await expect(this.page.locator(selectors.errorMessages.postcode)).toHaveText(message);
});

When('I search for the update postcode', async function () {
  await this.page.click(selectors.formFields.postcodeLookup);
});

When('I select update address from lookup or enter address manually', async function () {
  if (await this.page.locator(selectors.address.addressSelect).isVisible()) {
    const options = await this.page.$$eval(selectors.address.addressSelectOptions, options => options.map(option => option.value));
    await this.page.selectOption(selectors.address.addressSelect, options[1]);
    await this.page.click(selectors.formFields.submitButton);
  } else {
    await this.page.click(selectors.address.manualAddressLink);
    await this.page.fill(selectors.address.address1, 'COMIC RELIEF');
    await this.page.fill(selectors.address.address2, 'CAMELFORD HOUSE 87-90');
    await this.page.fill(selectors.address.address3, 'ALBERT EMBANKMENT');
    await this.page.fill(selectors.address.town, 'LONDON');
    await this.page.click(selectors.formFields.submitButton);
  }
});

When('I complete remaining update form fields', async function () {
  await this.page.locator(selectors.formFields.firstName).fill('test');
  await this.page.locator(selectors.formFields.lastName).fill(chance.last());
  await this.page.locator(selectors.marketingPreferences.fields.email).fill(`giftaid-update-staging-${chance.email()}`);
  await this.page.fill(selectors.formFields.postcode, 'SE1 7TP');
});
