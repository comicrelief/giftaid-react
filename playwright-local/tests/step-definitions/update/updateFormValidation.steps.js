const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { selectors } = require('../../utils/locators');

// When steps
When('I enter the local email {string}', async function (email) {
  await this.page.locator(selectors.formFields.email).fill(email);
});

When('I select the local update lookup address or enter the address manually', async function () {
  if (await this.page.locator(selectors.address.manualAddressLink).isVisible()) {
    await expect(this.page.locator(selectors.address.addressSelect)).toBeVisible();
    
    const optionToSelect = await this.page
      .locator('option', { hasText: 'COMIC RELIEF, 10 WHITECHAPEL HIGH STREET' })
      .textContent();
    
    await this.page.locator(selectors.address.addressSelect).selectOption({
      label: optionToSelect,
    });
    
    await expect(this.page.locator(selectors.formFields.postcode)).toHaveValue('E1 8QS');
  } else {
    await this.page.locator(selectors.errorMessages.addressDetails).click();
    await this.page.locator(selectors.address.address1).fill('COMIC RELIEF');
    await this.page.locator(selectors.address.address2).fill('10 WHITECHAPEL HIGH STREET');
    await this.page.locator(selectors.address.address3).fill('');
    await this.page.locator(selectors.address.town).fill('LONDON');
  }
});

// Then steps
Then('I should see the local update required field error messages', async function () {
  await expect(this.page.locator(selectors.errorMessages.firstName)).toContainText('Please fill in your first name');
  await expect(this.page.locator(selectors.errorMessages.lastName)).toContainText('Please fill in your last name');
  await expect(this.page.locator(selectors.errorMessages.postcode)).toContainText('Please enter your postcode');
  await expect(this.page.locator(selectors.errorMessages.addressDetails)).toContainText('Please fill in your address');
});

Then('I should see the local update manual address required error messages', async function () {
  await expect(this.page.locator(selectors.errorMessages.address1)).toContainText('Please fill in your address line 1');
  await expect(this.page.locator(selectors.errorMessages.town)).toContainText('Please fill in your town/city');
});

Then('I should see the local update GiftAid declaration error message', async function () {
  await expect(this.page.locator(selectors.errorMessages.giftAidClaimChoice)).toContainText('This field is required');
});

Then('I should see the local update first name error message {string}', async function (message) {
  await expect(this.page.locator(selectors.errorMessages.firstName)).toContainText(message);
});

Then('I should see the local update last name error message {string}', async function (message) {
  await expect(this.page.locator(selectors.errorMessages.lastName)).toContainText(message);
});

Then('I should see the local update email error message {string}', async function (message) {
  await expect(this.page.locator(selectors.errorMessages.email)).toContainText(message);
});

Then('I should not see the local update email error message', async function () {
  await expect(this.page.locator(selectors.errorMessages.email)).not.toBeVisible();
});

Then('I should not see the local mobile error message', async function () {
  await expect(this.page.locator(selectors.errorMessages.mobile)).not.toBeVisible();
});
