const { Given } = require("@cucumber/cucumber")
const { Builder, Capabilities } = require("selenium-webdriver")

const { getLinkByText } = require("../routes")

const BASE_URL = "http://localhost:8080"

const capabilities = Capabilities.safari()
capabilities.set("chromeOptions", { w3c: false })
const driver = new Builder().withCapabilities(capabilities).build()

Given(/user is on the (\w+) page/, async (pageName) => {
  const link = getLinkByText(pageName)

  await driver.get(`${BASE_URL}${link}`)
})

module.exports = {
  driver,
}
