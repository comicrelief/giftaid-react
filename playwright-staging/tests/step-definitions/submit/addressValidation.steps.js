const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { selectors } = require('../../utils/locators');

When('I clear the postcode field', async function () {
  await this.page.locator(selectors.formFields.postcode).fill('');
});

Then('I should see the address dropdown', async function () {
  await expect(this.page.locator(selectors.address.addressSelect)).toBeVisible();
});

Then('I should see address select error message {string}', async function (message) {
  await expect(this.page.locator(selectors.errorMessages.addressSelect)).toHaveText(message);
});

Then('I should see the manual address link', async function () {
  await expect(this.page.locator(selectors.address.manualAddressLink)).toBeVisible();
});

When('I click the manual address link', async function () {
  await this.page.locator(selectors.address.manualAddressLink).click();
});

Then('I should see the manual address fields', async function () {
  await expect(this.page.locator(selectors.address.address1)).toBeVisible();
  await expect(this.page.locator(selectors.address.address2)).toBeVisible();
  await expect(this.page.locator(selectors.address.address3)).toBeVisible();
  await expect(this.page.locator(selectors.address.town)).toBeVisible();
  await expect(this.page.locator(selectors.address.country)).toBeVisible();
});

When('I enter invalid address line 1', async function () {
  // Should see error message for address1 when input with special characters is entered
  await this.page.locator(selectors.address.address1).fill('@£%3dComic Relief');
});

Then('I should see address line 1 error message', async function () {
  await expect(this.page.locator(selectors.errorMessages.address1)).toHaveText("This field only accepts alphanumeric characters and ' . - & _ /");
});

When('I enter invalid town', async function () {
  await this.page.locator(selectors.address.town).fill('  Comic Relief');
});

Then('I should see town error message', async function () {
  await expect(this.page.locator(selectors.errorMessages.town)).toHaveText("This field only accepts alphanumeric characters and ' . - & _ /");
});
