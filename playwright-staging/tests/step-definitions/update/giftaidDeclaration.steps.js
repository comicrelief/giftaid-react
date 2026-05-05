const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { selectors } = require('../../utils/locators');

When('I complete the Giftaid update form with valid details', async function () {
  await this.commands.populateUpdateFormFields(this.page);
});

Then('I should see the Giftaid declaration section', async function () {
  await expect(this.page.locator(selectors.giftAidClaimChoice.yes)).toBeVisible();
  await expect(this.page.locator(selectors.giftAidClaimChoice.no)).toBeVisible();
});

Then('yes option should be selected and no option should not be selected', async function () {
  await expect(this.page.locator(selectors.giftAidClaimChoice.yesInput)).toBeChecked();
  await expect(this.page.locator(selectors.giftAidClaimChoice.noInput)).not.toBeChecked();
});

Then('no option should be selected and yes option should not be selected', async function () {
  await expect(this.page.locator(selectors.giftAidClaimChoice.noInput)).toBeChecked();
  await expect(this.page.locator(selectors.giftAidClaimChoice.yesInput)).not.toBeChecked();
});
