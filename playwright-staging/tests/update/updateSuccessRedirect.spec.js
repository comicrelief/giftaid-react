// @ts-check
const { expect } = require('@playwright/test');
const { test } = require('../../browserstack');

test.describe('Success page redirect @sanity @nightly-sanity', () => {
  test('Accessing success page should redirect to giftaid update homepage', async ({ page }) => {
    // Navigate to the success page of the Giftaid update directly
    await page.goto(`${process.env.BASE_URL}update/success`, { timeout: 30000 });
    await page.waitForLoadState('domcontentloaded');
    
    // Confirm the page has the expected Giftaid title after redirection
    const pageTitle = await page.locator('h1[class="giftaid-title"]').textContent();
    expect(pageTitle).toContain('Giftaid it');
    
    // Verify that the transaction ID input is visible
    // const transactionIdInputVisible = await page.locator('input#field-input--transactionId').isVisible();
    // expect(transactionIdInputVisible).toBeTruthy();
    
    await page.close();
  });
});
