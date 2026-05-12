const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('I clear the local postcode field', async function () {
  await this.page.locator('input#field-input--postcode').fill('');
});

Then('I should see the local address dropdown', async function () {
  await expect(this.page.locator('#field-select--addressSelect')).toBeVisible();
});

Then('I should see the local address select error message {string}', async function (message) {
  await expect(this.page.locator('div#field-error--addressSelect > span')).toHaveText(message);
});

Then('I should see the local manual address link', async function () {
  await expect(this.page.locator('a[aria-describedby=field-error--addressDetails]')).toBeVisible();
});

Then('I should see the local manual address fields', async function () {
  await expect(this.page.locator('#field-input--address1')).toBeVisible();
  await expect(this.page.locator('#field-input--address2')).toBeVisible();
  await expect(this.page.locator('#field-input--address3')).toBeVisible();
  await expect(this.page.locator('#field-input--town')).toBeVisible();
  await expect(this.page.locator('select#field-select--country')).toBeVisible();
});

When('I enter the local invalid address line 1', async function () {
  // Should see error message for address1 when input with special characters is entered
  await this.page.locator('#field-input--address1').fill('@£%3dComic Relief');
});

Then('I should see the local address line 1 error message', async function () {
  await expect(this.page.locator('#field-error--address1 > span')).toHaveText(
    "This field only accepts alphanumeric characters and ' . - & _ /"
  );
});

When('I enter the local invalid town', async function () {
  await this.page.locator('#field-input--town').fill('  Comic Relief');
});

Then('I should see the local town error message', async function () {
  await expect(this.page.locator('#field-error--town > span')).toHaveText(
    "This field only accepts alphanumeric characters and ' . - & _ /"
  );
});
