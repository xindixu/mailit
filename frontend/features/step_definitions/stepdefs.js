const assert = require("assert")
const { Given, When, Then } = require("@cucumber/cucumber")
const { Builder, By, until } = require("selenium-webdriver")

Given("user is on the template page", async () => {
  this.driver = new Builder().forBrowser("safari").build()

  this.driver.wait(until.elementLocated(By.css("h2")))

  await this.driver.get("http://localhost:8080/templates")
})

When("user updates the template name and content", async () => {
  // FIXME: implement this after PR on template is merged in
  await this.driver.findElement(By.css())
})

When(
  "user clicks save",
  () =>
    // Write code here that turns the phrase above into concrete actions
    "pending"
)

Then(
  "user should be redirected to the dashboard page",
  () =>
    // Write code here that turns the phrase above into concrete actions
    "pending"
)
