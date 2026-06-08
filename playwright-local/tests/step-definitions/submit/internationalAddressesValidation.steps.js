const { When } = require('@cucumber/cucumber');
const { selectors } = require('../../utils/locators');

// When steps
When('I enter the local international address details', async function () {
  await this.page.locator(selectors.address.address1).fill('219 Beacon St');
  await this.page.locator(selectors.address.address2).fill('Winder');
  await this.page.locator(selectors.address.town).fill('GA');
});

When('I select a random local non-UK country', async function () {
  const countries = await this.page.$$eval(selectors.address.countryOptions, options =>
    options
      .map(option => option.value)
      .filter(value => value && value !== 'GB')
  );
  
  const randomCountryCode = countries[Math.floor(Math.random() * countries.length)];
  
  await this.page.selectOption(selectors.address.countryByName, { value: randomCountryCode });
});
