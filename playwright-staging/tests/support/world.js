// This defines shared context for each scenario
// Values stored here (browser, page, commands) are accessible across all step definitions via "this"
const { setWorldConstructor } = require('@cucumber/cucumber');

class CustomWorld {
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
    this.commands = null;
  }
}

setWorldConstructor(CustomWorld);
