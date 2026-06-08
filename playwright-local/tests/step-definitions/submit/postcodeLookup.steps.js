const { When } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { selectors } = require('../../utils/locators');

When('I select the local lookup address or enter the address manually', async function () {
  if (await this.page.locator(selectors.address.addressSelect).isVisible()) {
    await this.page.locator(selectors.address.addressSelect).selectOption({
      label: 'COMIC RELIEF, 10 WHITECHAPEL HIGH STREET',
    });
    
    await expect(this.page.locator(selectors.formFields.postcode)).toHaveValue('E1 8QS');
  } else {
    await this.page.locator(selectors.address.manualAddressLink).click();
    await this.page.locator(selectors.address.address1).fill('COMIC RELIEF');
    await this.page.locator(selectors.address.address2).fill('10 WHITECHAPEL HIGH STREET');
    await this.page.locator(selectors.address.address3).fill('');
    await this.page.locator(selectors.address.town).fill('LONDON');
  }
});
