const { Given, When } = require('@cucumber/cucumber');
const { selectors } = require('../../utils/locators');

Given('I am on the local Giftaid update page', async function () {
  await this.page.goto(`${process.env.BASE_URL}/update`, {
    waitUntil: 'networkidle',
    timeout: 60000,
  });
});

When('I complete the local Giftaid update form with valid details', async function () {
  await this.commands.populateUpdateFormFields();
});

When('I complete the local update supporter details', async function () {
  await this.page.locator(selectors.formFields.firstName).fill('test');
  await this.page.locator(selectors.formFields.lastName).fill('test lastname');
  await this.page.locator(selectors.formFields.email).fill('giftaid-staging-@email.sls.comicrelief.com');
});

When('I select yes for the local update GiftAid declaration', async function () {
  await this.page.locator(selectors.giftAidClaimChoice.yes).click();
});
