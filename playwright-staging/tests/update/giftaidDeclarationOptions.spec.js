// @ts-check
const { expect } = require('@playwright/test');
const { test } = require('../../browserstack');
const { Commands } = require('../utils/commands');

test.describe('Giftaid declaration validation @sanity @nightly-sanity', () => {
  test('select yes for giftaid claim should show as selected', async ({ page }) => {

    const commands = new Commands(page);

    await page.goto(process.env.BASE_URL + 'update', { timeout: 30000 });

    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('input#field-input--firstname')).toBeVisible();

    // entering valid input fields should be able to submit the form
    await commands.populateUpdateFormFields();

    // submit the form
    await page.locator('button[type=submit]').click();

    // select yes fof giftaid declaration
    await page.locator('#giftAidClaimChoice>div:nth-child(2)>label').click();

    // check if yes is selected
    expect(await page.locator('#giftAidClaimChoice>div:nth-child(2)>label').isChecked()).toBeTruthy();

    // no option for giftaid claim should not be selected.
    expect(await page.locator('#giftAidClaimChoice>div:nth-child(3)>label').isChecked()).toBeFalsy();

    await expect(page.locator('div > h1')).toContainText('');

    await page.close();
  });

  test('select no for giftaid claim should show as selected', async ({ page }) => {

    const commands = new Commands(page);

    await page.goto(process.env.BASE_URL + 'update', { timeout: 30000 });

    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('input#field-input--firstname')).toBeVisible();

    // entering valid input fields should be able to submit the form
    await commands.populateUpdateFormFields();

    // submit the form
    await page.locator('button[type=submit]').click();

    // select yes fof giftaid declaration
    await page.locator('#giftAidClaimChoice>div:nth-child(3)>label').click();

    // check if yes is selected
    expect(await page.locator('#giftAidClaimChoice>div:nth-child(3)>label').isChecked()).toBeTruthy();

    // no option for giftaid claim should not be selected.
    expect(await page.locator('#giftAidClaimChoice>div:nth-child(2)>label').isChecked()).toBeFalsy();

    await expect(page.locator('div > h1')).toContainText('');

    await page.close();
  });
});

