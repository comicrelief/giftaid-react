
const commands = {
  browserIdleHandler(client) {
    return setInterval(() => {
      // just keep interacting with browser to avoid idle timeout
      client.assert.elementPresent('body');
    }, 60 * 1000);
  },
};

module.exports = { commands };
