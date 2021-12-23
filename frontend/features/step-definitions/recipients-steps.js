const { When } = require("@cucumber/cucumber")
const { By } = require("selenium-webdriver")
const { removeQuotations } = require("../support")
const { driver } = require("./stepdefs")

When(
  "user updates the recipient to {string} {string} {string} {string}",
  async (email, fn, ln, tag) => {
    const fnInput = await driver.findElement(By.id("firstname"))
    const lnInput = await driver.findElement(By.id("lastname"))
    const addTag = await driver.findElement(By.id("add_tag"))
    await addTag.click()
    const tagInput = await driver.findElement(By.id("tag_input"))
    const emailInput = await driver.findElement(By.id("email"))

    await fnInput.sendKeys(removeQuotations(fn))
    await lnInput.sendKeys(removeQuotations(ln))
    await tagInput.sendKeys(removeQuotations(tag))
    await emailInput.sendKeys(removeQuotations(email))
  }
)

When(/user clicks the Submit button/, async () => {
  const button = await driver.findElement(By.id("submit"))
  await button.click()
  await driver.sleep(3000)
})

When("user clicks the delete button for recipient {string}", async (email) => {
  await driver.sleep(1000)
  const button = await driver.findElement(By.id(`delete recipient ${removeQuotations(email)}`))
  await button.click()
  await driver.sleep(1000)
})
