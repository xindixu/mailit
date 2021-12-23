const { expect } = require("chai")
const { When, Then, Before, After } = require("@cucumber/cucumber")
const { By } = require("selenium-webdriver")
const { removeQuotations } = require("../support")
const { apiFetch, token } = require("../api-fetch")
const { driver } = require("./stepdefs")

// let id
// Before(async () => {
//   apiFetch({
//     route: "/campaigns",
//     method: "post",
//     token: token,
//     params: {
//       name: "testcampaign",
//       tags: ["testcampaign"],
//       user_id: 1,
//       template_id: 1,
//     },
//   }).then(({ data }) => {
//     id = data.id
//   })
// })

// let rid
// Before(async () => {
//   apiFetch({
//     route: "/recipients",
//     method: "post",
//     token: token,
//     params: {
//       "email": "qianjunc@gmail.com",
//       "tags": ["testcampaign"],
//       "user_id": 1
//     },
//   }).then(({ data }) => {
//     console.log(token)
//     rid = data.id
//   })
// })

// After(async () => {
//   apiFetch({
//     route: `/campaigns/${id}`,
//     token: token,
//     method: "delete",
//   })
// })

// After(async () => {
//   apiFetch({
//     route: `/recipients/${rid}`,
//     token: token,
//     method: "delete",
//   })
// })

Then(/user can see the Create Campaign button/, async () => {
  const button = await driver.findElement(By.id("create_campaign"))
  expect(await button.getAttribute("innerHTML")).to.contain(removeQuotations("Create Campaign"))
})

When("user updates the campaign name to {string}", async (value) => {
  const nameInput = await driver.findElement(By.id("name"))
  await nameInput.clear()
  await nameInput.sendKeys(removeQuotations(value))
})

When("user updates the campaign subject to {string}", async (value) => {
  const nameInput = await driver.findElement(By.id("subject"))
  await nameInput.clear()
  await nameInput.sendKeys(removeQuotations(value))
})

When("user add {string} tag", async (value) => {
  const addTag = await driver.findElement(By.id("add_tag"))
  await addTag.click()
  const tagInput = await driver.findElement(By.id("tag_input"))
  await tagInput.sendKeys(removeQuotations(value))
})

When(/user clicks the Create Campaign button/, async () => {
  const button = await driver.findElement(By.id("create_campaign"))
  await button.click()
  await driver.sleep(3000)
})

When(/user clicks the Save Campaign button/, async () => {
  const button = await driver.findElement(By.id("save_campaign"))
  await button.click()
  await driver.sleep(3000)
})

When("user clicks the {string} button for campaign {string}", async (buttonText, name) => {
  await driver.sleep(1000)
  const button = await driver.findElement(
    By.id(`${removeQuotations(buttonText)} email ${removeQuotations(name)}`)
  )
  await button.click()
  await driver.sleep(1000)
})

When("user clicks the {string} campaign button", async (buttonText) => {
  const button = await driver.findElement(By.id(`${removeQuotations(buttonText)}`))
  await button.click()
  await driver.sleep(1000)
})

Then("user should see {string}", async (text) => {
  expect(await driver.getPageSource()).to.contain(`${removeQuotations(text)}`)
})
