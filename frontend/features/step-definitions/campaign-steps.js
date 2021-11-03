const { expect } = require("chai")
const { When, Then } = require("@cucumber/cucumber")
const { By } = require("selenium-webdriver")
const { removeQuotations } = require("../support")
const { driver } = require("./stepdefs")

Then(/user can see the Create Campaign button/, async () => {
  const button = await driver.findElement(By.id("create_campaign"))
  expect(await button.getAttribute("innerHTML")).to.contain(removeQuotations("Create Campaign"))
})

When("user updates the campaign name to {string}", async (value) => {
  const nameInput = await driver.findElement(By.id("campaign_name"))

  await nameInput.sendKeys(removeQuotations(value))
})

When("user add {string} tag", async (value) => {
  const addTag = await driver.findElement(By.id("add_tag"))
  await addTag.click()
  const tagInput = await driver.findElement(By.id("tag_input"))
  await tagInput.sendKeys(removeQuotations(value))
})

When(
  "user updates the campaign recipient {int} to {string} {string} {string}",
  async (num, fn, ln, em) => {
    const fnInput = await driver.findElement(By.id(`first_name${num}`))
    const lnInput = await driver.findElement(By.id(`last_name${num}`))
    const emailInput = await driver.findElement(By.id(`email${num}`))

    await fnInput.sendKeys(removeQuotations(fn))
    await lnInput.sendKeys(removeQuotations(ln))
    await emailInput.sendKeys(removeQuotations(em))
  }
)

When(/user click the Create Campaign button/, async () => {
  const button = await driver.findElement(By.id("create_campaign"))
  await button.click()
})
