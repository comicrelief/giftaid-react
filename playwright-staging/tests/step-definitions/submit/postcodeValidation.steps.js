const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { selectors } = require('../../utils/locators');

Given('I enter supporter details', async function () {
  await this.page.fill(selectors.formFields.mobile, '07123456789');
  await this.page.fill(selectors.formFields.firstName, 'test');
  await this.page.fill(selectors.formFields.lastName, 'user');
});

When('I enter postcode {string}', async function (postcode) {
  await this.page.fill(selectors.formFields.postcode, postcode);
});

Then('I should see postcode error message {string}', async function (message) {
  await expect(this.page.locator(selectors.errorMessages.postcode)).toBeVisible();
  await expect(this.page.locator(selectors.errorMessages.postcode)).toContainText(message);
});

When('I search for the postcode', async function () {
  await this.page.click(selectors.formFields.postcodeLookup);
});

When('I select address from lookup or enter address manually', async function () {
  if (await this.page.isVisible(selectors.address.addressSelect)) {
    await this.page.selectOption(selectors.address.addressSelect, { label: 'COMIC RELIEF, CAMELFORD HOUSE 87-90' });
    await expect(this.page.locator(selectors.formFields.postcode)).toHaveValue('SE1 7TP');
  } else {
    await this.page.click(selectors.address.manualAddressLink);
    await this.page.fill(selectors.address.address1, 'COMIC RELIEF');
    await this.page.fill(selectors.address.address2, 'CAMELFORD HOUSE 87-90');
    await this.page.fill(selectors.address.address3, 'ALBERT EMBANKMENT');
    await this.page.fill(selectors.address.town, 'LONDON');
  }
});

Then('I should see the Giftaid thank you message with line break', async function () {
  await expect(this.page.locator(selectors.success.heading)).toContainText('Thank you,\n' + 'test!');
});
