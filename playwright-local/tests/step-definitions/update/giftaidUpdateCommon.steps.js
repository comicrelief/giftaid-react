const { Given, When } = require('@cucumber/cucumber');

Given('I am on the local Giftaid update page', async function () {
  await this.page.goto(`${process.env.BASE_URL}/update`, {
    waitUntil: 'networkidle',
    timeout: 60000,
  });
});

When('I complete the local Giftaid update form with valid details', async function () {
  await this.commands.populateUpdateFormFields(this.page);
});

When('I complete the local update supporter details', async function () {
  await this.page.locator('#field-input--firstname').fill('test');
  await this.page.locator('#field-input--lastname').fill('test lastname');
  await this.page.locator('input#field-input--email').fill('giftaid-staging-@email.sls.comicrelief.com');
});

When('I select yes for the local update GiftAid declaration', async function () {
  await this.page.locator('#giftAidClaimChoice>div:nth-child(2)>label').click();
});
