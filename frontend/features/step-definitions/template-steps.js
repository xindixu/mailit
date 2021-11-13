const { expect } = require("chai")
const { When, Then, Before, After } = require("@cucumber/cucumber")
const { By, until } = require("selenium-webdriver")
const { removeQuotations } = require("../support")
const { apiFetch } = require("../api-fetch")
const { driver } = require("./stepdefs")

let id
Before(async () => {
  apiFetch({
    route: "/templates",
    method: "post",
    params: {
      name: "Merry Christmas",
      markdown: "Wish you a Merry Christmas",
      user_id: 1,
      collaborator_ids: [1],
    },
  }).then(({ data }) => {
    id = data.id
  })
})

After(async () => {
  apiFetch({
    route: `/templates/${id}`,
    method: "delete",
  })
})

Then(/user can see the template name and content/, async () => {
  // wait until data is fetched
  await driver.wait(until.elementLocated(By.id("name")))

  const nameInput = await driver.findElement(By.id("name"))
  const contentInput = await driver.findElement(By.css(".remirror-editor"))

  expect(await nameInput.getAttribute("value")).to.equal("Merry Christmas")
  expect(await contentInput.getText()).to.match(/^Wish you a Merry Christmas/)
})

When("user updates the template name to {string}", async (value) => {
  await driver.wait(until.elementLocated(By.id("name")))
  const nameInput = await driver.findElement(By.id("name"))
  await nameInput.clear()
  // FIXME: not sure why this won't work with yarn coverage
  // await clear(driver, nameInput)
  await nameInput.sendKeys(removeQuotations(value))
})

When("user updates the template content to {string}", async (value) => {
  await driver.wait(until.elementLocated(By.css(".remirror-editor")))

  const contentInput = await driver.findElement(By.css(".remirror-editor"))
  await contentInput.sendKeys(removeQuotations(value))
})

Then("user can see the template name to be {string}", async (value) => {
  const nameInput = await driver.findElement(By.id("name"))
  expect(await nameInput.getAttribute("value")).to.contain(removeQuotations(value))
})

When("user clicks the {string} button", async (buttonText) => {
  const button = await driver.findElement(By.xpath(`//*[text() = '${buttonText}']`))
  await button.click()
  await driver.sleep(3000)
})

When("user deletes {string}", async (text) => {
  const selector = `delete template ${removeQuotations(text)}`
  const deleteButton = await driver.findElement(By.id(selector))
  await deleteButton.click()
  await driver.sleep(1000)

  const confirmButton = await driver.findElement(By.xpath(`//*[text() = 'OK']`))
  await confirmButton.click()

  await driver.sleep(1000)
})
