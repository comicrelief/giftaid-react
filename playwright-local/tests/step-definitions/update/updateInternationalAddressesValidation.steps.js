const { When } = require('@cucumber/cucumber');
const { selectors } = require('../../utils/locators');

When('I enter the local update international address details', async function () {
  await this.page.locator(selectors.address.address1).fill('219 Beacon St');
  await this.page.locator(selectors.address.address2).fill('Winder');
  await this.page.locator(selectors.address.address3).fill('Park Ridge');
  await this.page.locator(selectors.address.town).fill('GA');
});

When('I select a random local update non-UK country', async function () {
  const countryOptions = await this.page.$$eval(selectors.address.countryOptions, options =>
    options
      .map(option => option.value)
      .filter(value => value && value !== 'GB')
  );
  
  const randomCountryCode = countryOptions[Math.floor(Math.random() * countryOptions.length)];
  
  await this.page.locator(selectors.address.countryByName).selectOption({
    value: randomCountryCode,
  });
  
  await this.page.waitForTimeout(2000);
});
