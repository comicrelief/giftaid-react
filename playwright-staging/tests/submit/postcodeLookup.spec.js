// @ts-check
const { expect } = require('@playwright/test');
const { test } = require('../../browserstack');
const { selectors } = require('../utils/locators');

test.describe('Postcode validation @sanity @nightly-sanity', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.BASE_URL, { timeout: 30000 });
    await page.waitForLoadState('domcontentloaded');
    await page.click(selectors.giftaid.option);
    await page.fill(selectors.formFields.mobile, '07123456789');
    await page.fill(selectors.formFields.firstName, 'test');
    await page.fill(selectors.formFields.lastName, 'user');
  });
  
  test('Postcode formatting errors', async ({ page }) => {
    const postcodes = [
      { code: 'S E 1 7 T P', message: 'Please enter a valid UK postcode, using a space. For non-UK addresses, please use manual entry below.' },
      { code: 'SE$%TP', message: 'Please enter a valid UK postcode, using a space. For non-UK addresses, please use manual entry below.' }
    ];
    
    for (const { code, message } of postcodes) {
      await page.fill(selectors.formFields.postcode, code);
      await expect(page.locator(selectors.errorMessages.postcode)).toBeVisible();
      await expect(page.locator(selectors.errorMessages.postcode)).toContainText(message);
    }
    
    await page.close();
  });
  
  test('enter valid UK postcode using postcode lookup should be able to submit the form', async ({ page }) => {
    await page.fill(selectors.formFields.postcode, 'SE1 7TP');
    await page.click(selectors.formFields.postcodeLookup);
    
    if (await page.isVisible(selectors.address.addressSelect)) {
      await page.selectOption(selectors.address.addressSelect, { label: 'COMIC RELIEF, CAMELFORD HOUSE 87-90' });
      await expect(page.locator(selectors.formFields.postcode)).toHaveValue('SE1 7TP');
    } else {
      await page.click(selectors.address.manualAddressLink);
      await page.fill(selectors.address.address1, 'COMIC RELIEF');
      await page.fill(selectors.address.address2, 'CAMELFORD HOUSE 87-90');
      await page.fill(selectors.address.address3, 'ALBERT EMBANKMENT');
      await page.fill(selectors.address.town, 'LONDON');
    }
    
    await page.click(selectors.formFields.submitButton);
    await expect(page.locator(selectors.success.heading)).toContainText('Thank you,\n' + 'test!');
    
    await page.close();
  });
});
