const { expect } = require("chai")
const { When, Then } = require("@cucumber/cucumber")
const { By } = require("selenium-webdriver")
const { removeQuotations, clearField } = require("../support")
const { driver } = require("./stepdefs")

Then(/user can see the template name and content/, async () => {
  const nameInput = await driver.findElement(By.id("name"))
  const contentInput = await driver.findElement(By.css("textarea"))

  expect(await nameInput.getAttribute("value")).to.equal("Midterm")
  expect(await contentInput.getText()).to.match(/^\nDear {{first_name}}:/)
})

When("user updates the template name to {string}", async (value) => {
  const nameInput = await driver.findElement(By.id("name"))

  await nameInput.sendKeys(removeQuotations(value))
})

Then("user can see the template name to be {string}", async (value) => {
  const nameInput = await driver.findElement(By.id("name"))
  expect(await nameInput.getAttribute("value")).to.contain(removeQuotations(value))
})
