const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { selectors } = require('../../utils/locators');

When('I enter a non UK postcode', async function () {
  await this.page.fill(selectors.formFields.postcode, '30916-395');
});

Then('I should see postcode validation error for UK format', async function () {
  await expect(this.page.locator(selectors.errorMessages.postcode)).toContainText(
    'Please enter a valid UK postcode, using a space. For non-UK addresses, please use manual entry below.'
  );
});

When('I enter international address details manually', async function () {
  await this.page.click(selectors.address.manualAddressLink);
  await this.page.fill(selectors.address.address1, '219 Beacon St');
  await this.page.fill(selectors.address.address2, 'Winder');
  await this.page.fill(selectors.address.town, 'GA');
});

When('I select a non UK country', async function () {
  const countries = await this.page.$$eval(selectors.address.countryOptions, options =>
    options
      .map(option => option.value)
      .filter(value => value && value !== 'GB')
  );
  
  const randomCountryCode = countries[Math.floor(Math.random() * countries.length)];
  await this.page.selectOption(selectors.address.countryByName, { value: randomCountryCode });
});

Then('postcode error should disappear', async function () {
  await expect(this.page.locator(selectors.errorMessages.postcode)).not.toBeVisible();
});
