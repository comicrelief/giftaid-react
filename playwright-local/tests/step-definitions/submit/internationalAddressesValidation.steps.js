const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('I enter the local international address details', async function () {
  await this.page.locator('#field-input--address1').fill('219 Beacon St');
  await this.page.locator('#field-input--address2').fill('Winder');
  await this.page.locator('input#field-input--town').fill('GA');
});

When('I select a random local non-UK country', async function () {
  const countries = await this.page.$$eval('select#field-select--country > option', options =>
    options
      .map(option => option.value)
      .filter(value => value && value !== 'GB')
  );
  
  const randomCountryCode = countries[Math.floor(Math.random() * countries.length)];
  
  await this.page.selectOption('select[name="country"]', { value: randomCountryCode });
});
