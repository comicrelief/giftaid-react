// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Postcode validation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/', { timeout: 30000 });

    await page.waitForLoadState('domcontentloaded');
    await page.click('#field-label--giftaid');
    await page.fill('#field-input--mobile', '07123456789');
    await page.fill('input#field-input--firstname', 'test');
    await page.fill('input#field-input--lastname', 'user');
  });
  
  test('Postcode formatting errors', async ({ page }) => {
    const postcodes = [
      { code: 'S E 1 7 T P', message: 'Please enter a valid UK postcode, using a space' },
      { code: 'se17tp', message: 'Please enter a valid UK postcode, using a space' },
      { code: 'SE17TP', message: 'Please enter a valid UK postcode, using a space' },
      { code: 'SE$%TP', message: 'Please enter a valid UK postcode, using a space' }
    ];
    
    for (const { code, message } of postcodes) {
      await page.fill('input#field-input--postcode', code);
      await expect(page.locator('div#field-error--postcode > span')).toBeVisible();
      await expect(page.locator('div#field-error--postcode > span')).toContainText(message);
    }
    await page.close();
  });
  
  test('enter valid UK postcode using postcode lookup should be able to submit the form', async ({ page }) => {
    await page.fill('input#field-input--postcode', 'SE1 7TP');
    await page.click('#postcode_button');
    
    if (await page.isVisible('#field-select--addressSelect')) {
      await page.selectOption('select#field-select--addressSelect', { label: 'COMIC RELIEF, CAMELFORD HOUSE 87-90' });
      await expect(page.locator('input#field-input--postcode')).toHaveValue('SE1 7TP');
    } else {
      await page.click('a[aria-describedby=field-error--addressDetails]');
      await page.fill('#field-input--address1', 'COMIC RELIEF');
      await page.fill('#field-input--address2', 'CAMELFORD HOUSE 87-90');
      await page.fill('#field-input--address3', 'ALBERT EMBANKMENT');
      await page.fill('#field-input--town', 'LONDON');
    }
    
    await page.click('button[type=submit]');
    await expect(page.locator('div > h1')).toContainText('Thank you,\n' + 'test!');
    
    await page.close();
  });
});
