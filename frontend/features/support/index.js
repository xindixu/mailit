const { Key } = require("selenium-webdriver")

module.exports = {
  removeQuotations: (value) => value.replace('"', ""),
  clear: async (driver, input) => {
    await driver.executeScript((elt) => elt.select(), input)
    await input.sendKeys(Key.BACK_SPACE)
  },
}
