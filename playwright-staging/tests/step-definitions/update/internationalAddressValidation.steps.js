const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { selectors } = require('../../utils/locators');

Given('I enter the update supporter details', async function () {
  // fill in all input fields
  // await page.locator('input#field-input--transactionId').fill(transactionId);
  await this.page.locator(selectors.formFields.firstName).fill('test');
  await this.page.locator(selectors.formFields.lastName).fill('test lastname');
  await this.page.locator(selectors.marketingPreferences.fields.email).fill('giftaid-staging-@email.sls.comicrelief.com');
});

When('I enter the update international address details manually', async function () {
  // manually enter international address details
  await this.page.locator(selectors.address.manualAddressLink).click();
  await this.page.locator(selectors.address.address1).fill('219 Beacon St');
  await this.page.locator(selectors.address.address2).fill('Winder');
  await this.page.locator(selectors.address.address3).fill('Park Ridge');
  await this.page.locator(selectors.address.town).fill('GA');
});

When('I select a non UK country on the update form', async function () {
  // Select a random country from the dropdown (excluding UK to simulate international address)
  const countryOptions = await this.page.$$eval(selectors.address.countryOptions, options =>
    options.map(option => option.value).filter(value => value && value !== 'GB')
  );
  
  const randomCountryCode = countryOptions[Math.floor(Math.random() * countryOptions.length)];
  await this.page.locator(selectors.address.countryByName).selectOption({ value: randomCountryCode });
  
  // Wait for the form to adjust to the selected country
  await this.page.waitForTimeout(2000);
});

Then('the update postcode error should disappear', async function () {
  // When an international country is selected, the postcode error for UK format should not show anymore
  await expect(this.page.locator(selectors.errorMessages.postcode)).not.toBeVisible();
});
