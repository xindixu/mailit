const { expect } = require("chai")
const { When } = require("@cucumber/cucumber")
const { By } = require("selenium-webdriver")
const { removeQuotations } = require("../support")
const { driver } = require("./stepdefs")

When(
  "user clicks Forget Your Password?",
  async () => {
    const resetLink = await driver.findElement(By.id("reset-link"))
    await resetLink.click()
    await driver.sleep(3000)
  }
)

When(/user clicks Submit for email/, async () => {
  const button = await driver.findElement(By.id("submit-email-button"))
  await button.click()
  await driver.sleep(3000)
})

When("user updates email to {string}", async (email) => {
    const emailInput = await driver.findElement(By.id("basic_email"))
    await emailInput.clear()
    await emailInput.sendKeys(removeQuotations(email))
})


