const { expect } = require("chai")
const { When, Then } = require("@cucumber/cucumber")
const { By, until } = require("selenium-webdriver")
const { removeQuotations } = require("../support")
const { driver } = require("./stepdefs")

Then(/user can see the template name and content/, async () => {
  // wait until data is fetched
  await driver.wait(until.elementLocated(By.id("name")))

  const nameInput = await driver.findElement(By.id("name"))
  const contentInput = await driver.findElement(By.css("textarea"))

  expect(await nameInput.getAttribute("value")).to.equal("Midterm")
  expect(await contentInput.getText()).to.match(/^Dear {{first_name}}:/)
})

When("user updates the template name to {string}", async (value) => {
  await driver.wait(until.elementLocated(By.id("name")))

  const nameInput = await driver.findElement(By.id("name"))

  await nameInput.sendKeys(removeQuotations(value))
})

Then("user can see the template name to be {string}", async (value) => {
  const nameInput = await driver.findElement(By.id("name"))
  expect(await nameInput.getAttribute("value")).to.contain(removeQuotations(value))
})

When("user click the Update button", async () => {
  const button = await driver.findElement(By.css("[type=submit]"))
  await button.click()
  await driver.sleep(3000)
})
