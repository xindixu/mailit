const { Given, Then } = require("@cucumber/cucumber")
const { expect } = require("chai")
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

Then(/user should be on the (\w+) page/, async (pageName) => {
  const link = getLinkByText(pageName)
  const expectLink = `${BASE_URL}${link}`

  expect(await driver.getCurrentUrl()).to.equal(expectLink)
})

Then(/user should be on (\w+) like page/, async (pageName) => {
  const regex = getLinkByText(pageName)

  expect(await driver.getCurrentUrl()).to.match(regex)
})

module.exports = {
  driver,
}
