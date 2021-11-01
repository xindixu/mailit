const assert = require("assert")
const { Given, When, Then } = require("@cucumber/cucumber")
const { Builder, By, until } = require("selenium-webdriver")

const { getLinkByText } = require("../routes")

Given(/user is on the (\w+) page/, async (pageName) => {
  this.driver = new Builder().forBrowser("safari").build()

  const link = getLinkByText(pageName)
  console.log(link, pageName)
  this.driver.wait(until.elementLocated(By.css("h2")))

  await this.driver.get("http://localhost:8080/templates")
})
