// @ts-check
const { expect } = require('@playwright/test');
const { test } = require('../../browserstack');
const { Commands } = require('../utils/commands');
const { selectors } = require('../utils/locators');

test('Validate Giftaid declaration claim selections @sanity @nightly-sanity', async ({ page }) => {
  const commands = new Commands(page);
  await page.goto(process.env.BASE_URL + 'update', { timeout: 30000 });
  await page.waitForLoadState('domcontentloaded');
  
  // Populate fields and submit the form to get to the Giftaid declaration part
  await commands.populateUpdateFormFields(page);
  await page.locator(selectors.formFields.submitButton).click();
  
  // Select 'Yes' for Giftaid declaration and verify it is selected
  await page.locator(selectors.giftAidClaimChoice.yes).click();
  expect(await page.locator(selectors.giftAidClaimChoice.yesInput).isChecked()).toBeTruthy();
  expect(await page.locator(selectors.giftAidClaimChoice.noInput).isChecked()).toBeFalsy();
  
  // Select 'No' for Giftaid declaration and verify it is selected
  await page.locator(selectors.giftAidClaimChoice.no).click();
  expect(await page.locator(selectors.giftAidClaimChoice.noInput).isChecked()).toBeTruthy();
  expect(await page.locator(selectors.giftAidClaimChoice.yesInput).isChecked()).toBeFalsy();
  
  await page.locator(selectors.formFields.submitButton).click();
  await expect(page.locator(selectors.success.heading)).toHaveText('Thanks for letting us know');
  
  await page.close();
});
