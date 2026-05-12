const { When } = require('@cucumber/cucumber');

When('I enter the local update international address details', async function () {
  await this.page.locator('#field-input--address1').fill('219 Beacon St');
  await this.page.locator('#field-input--address2').fill('Winder');
  await this.page.locator('#field-input--address3').fill('Park Ridge');
  await this.page.locator('#field-input--town').fill('GA');
});

When('I select a random local update non-UK country', async function () {
  const countryOptions = await this.page.$$eval('select#field-select--country>option', options =>
    options
      .map(option => option.value)
      .filter(value => value && value !== 'GB')
  );
  
  const randomCountryCode = countryOptions[Math.floor(Math.random() * countryOptions.length)];
  
  await this.page.locator('select[name="country"]').selectOption({
    value: randomCountryCode,
  });
  
  await this.page.waitForTimeout(2000);
});
