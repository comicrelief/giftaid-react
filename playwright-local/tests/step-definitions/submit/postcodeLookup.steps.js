const { When } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('I select the local lookup address or enter the address manually', async function () {
  if (await this.page.locator('#field-select--addressSelect').isVisible()) {
    await this.page.locator('select#field-select--addressSelect').selectOption({
      label: 'COMIC RELIEF, CAMELFORD HOUSE 87-90',
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
