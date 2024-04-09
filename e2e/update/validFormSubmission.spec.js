// @ts-check
const { test, expect } = require('@playwright/test');
const { Commands } = require('../utils/commands');

test.describe('Valid giftaid update submission', () => {

  test('submit giftaid update form with valid inputs', async ({ page }) => {

    const commands = new Commands(page);

    await page.goto('/update', { timeout: 30000 });

    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('input#field-input--firstname')).toBeVisible();

    // entering valid input fields should be able to submit the form
    await commands.populateUpdateFormFields();

    // select giftaid declaration
    await page.locator('#giftAidClaimChoice>div:nth-child(2)>label').click();

    // submit the form
    await page.locator('button[type=submit]').click();

    await expect(page.locator('div > h1')).toContainText('Thank you,\n' +
      'test!');

    await page.close();
  });
});

