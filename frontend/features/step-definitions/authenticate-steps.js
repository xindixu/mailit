const { expect } = require("chai")
const { When, Then, Given } = require("@cucumber/cucumber")
const { By } = require("selenium-webdriver")
const { removeQuotations } = require("../support")
const { driver } = require("./stepdefs")
const { apiFetch } = require("../api-fetch")

Given("user is logged in with email {string} and password {string}", async (email, pw) => {
    const emailInput = await driver.findElement(By.id("basic_email"))
    await emailInput.clear()
    await emailInput.sendKeys(removeQuotations(email))

    const pwInput = await driver.findElement(By.id("basic_password"))
    await pwInput.clear()
    await pwInput.sendKeys(removeQuotations(pw))
    
    const loginButton = await driver.findElement(By.id("login-button"))
    await loginButton.click()
    await driver.sleep(3000)
})

When("user fill in the email to {string}", async (value) => {
    const emailInput = await driver.findElement(By.id("basic_email"))
    await emailInput.clear()
    await emailInput.sendKeys(removeQuotations(value))
})

When("user fill in the password to {string}", async (value) => {
    const pwInput = await driver.findElement(By.id("basic_password"))
    await pwInput.clear()
    await pwInput.sendKeys(removeQuotations(value))
})

When("user fill in the username to {string}", async (value) => {
    const unInput = await driver.findElement(By.id("basic_username"))
    await unInput.clear()
    await unInput.sendKeys(removeQuotations(value))
})

When("user clicks the login button", async () => {
    const loginButton = await driver.findElement(By.id("login-button"))
    await loginButton.click()
    await driver.sleep(3000)
})

When("user clicks the register button", async () => {
    const regButton = await driver.findElement(By.id("register-button"))
    await regButton.click()
    await driver.sleep(3000)
})

When("user clicks the sign out button", async () => {
    const outButton = await driver.findElement(By.id("sign-out"))
    await outButton.click()
    await driver.sleep(3000)
})

Then(/user can see Sign Out button/, async () => {
    const button = await driver.findElement(By.id("sign-out"))
    expect(await button.getAttribute("innerHTML")).to.contain(removeQuotations("Sign Out"))
    await button.click()
    await driver.sleep(3000)
  })
  