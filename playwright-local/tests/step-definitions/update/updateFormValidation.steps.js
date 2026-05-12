const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Then('I should see the local update required field error messages', async function () {
  await expect(this.page.locator('div#field-error--firstname > span')).toContainText('Please fill in your first name');
  await expect(this.page.locator('div#field-error--lastname > span')).toContainText('Please fill in your last name');
  await expect(this.page.locator('div#field-error--postcode > span')).toContainText('Please enter your postcode');
  await expect(this.page.locator('div#field-error--addressDetails > span')).toContainText('Please fill in your address');
});

Then('I should see the local update manual address required error messages', async function () {
  await expect(this.page.locator('div#field-error--address1 > span')).toContainText('Please fill in your address line 1');
  await expect(this.page.locator('div#field-error--town > span')).toContainText('Please fill in your town/city');
});

Then('I should see the local update GiftAid declaration error message', async function () {
  await expect(this.page.locator('div#field-error--giftAidClaimChoice > span')).toContainText('This field is required');
});

Then('I should see the local update first name error message {string}', async function (message) {
  await expect(this.page.locator('#field-error--firstname')).toContainText(message);
});

Then('I should see the local update last name error message {string}', async function (message) {
  await expect(this.page.locator('div#field-error--lastname > span')).toContainText(message);
});

When('I enter the local email {string}', async function (email) {
  await this.page.locator('input#field-input--email').fill(email);
});

Then('I should see the local update email error message {string}', async function (message) {
  await expect(this.page.locator('div#field-error--email > span')).toContainText(message);
});

Then('I should not see the local update email error message', async function () {
  await expect(this.page.locator('div#field-error--email > span')).not.toBeVisible();
});

Then('I should not see the local mobile error message', async function () {
  await expect(this.page.locator('div#field-error--mobile > span')).not.toBeVisible();
});

When('I select the local update lookup address or enter the address manually', async function () {
  if (await this.page.locator('#field-select--addressSelect').isVisible()) {
    await expect(this.page.locator('#field-select--addressSelect')).toBeVisible();
    
    const optionToSelect = await this.page
      .locator('option', { hasText: 'COMIC RELIEF, CAMELFORD HOUSE 87-90' })
      .textContent();
    
    await this.page.locator('select#field-select--addressSelect').selectOption({
      label: optionToSelect,
    });
    
    await expect(this.page.locator('input#field-input--postcode')).toHaveValue('SE1 7TP');
  } else {
    await this.page.locator('a[aria-describedby=field-error--addressDetails]').click();
    await this.page.locator('#field-input--address1').fill('COMIC RELIEF');
    await this.page.locator('#field-input--address2').fill('CAMELFORD HOUSE 87-90');
    await this.page.locator('#field-input--address3').fill('ALBERT EMBANKMENT');
    await this.page.locator('#field-input--town').fill('LONDON');
  }
});
