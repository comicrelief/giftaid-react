// @ts-check
const { expect } = require('@playwright/test');
const { test } = require('../../browserstack');
const { Commands } = require('../utils/commands');

test('Validate Giftaid declaration claim selections @sanity @nightly-sanity', async ({ page }) => {
  const commands = new Commands(page);
  await page.goto(process.env.BASE_URL + 'update', { timeout: 30000 });
  await page.waitForLoadState('domcontentloaded');
  
  // Populate fields and submit the form to get to the Giftaid declaration part
  await commands.populateUpdateFormFields(page);
  await page.locator('button[type=submit]').click();
  
  // Select 'Yes' for Giftaid declaration and verify it is selected
  await page.locator('#giftAidClaimChoice>div:nth-child(2)>label').click();
  expect(await page.locator('#giftAidClaimChoice>div:nth-child(2)>input').isChecked()).toBeTruthy();
  expect(await page.locator('#giftAidClaimChoice>div:nth-child(3)>input').isChecked()).toBeFalsy();
  
  // Select 'No' for Giftaid declaration and verify it is selected
  await page.locator('#giftAidClaimChoice>div:nth-child(3)>label').click();
  expect(await page.locator('#giftAidClaimChoice>div:nth-child(3)>input').isChecked()).toBeTruthy();
  expect(await page.locator('#giftAidClaimChoice>div:nth-child(2)>input').isChecked()).toBeFalsy();

  await page.locator('button[type=submit]').click();
  await expect(page.locator('div > h1')).toHaveText('Thanks for letting us know');
  
  await page.close();
});
