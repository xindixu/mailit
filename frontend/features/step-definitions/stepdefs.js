const { Given, Then, BeforeAll, AfterAll } = require("@cucumber/cucumber")
const { expect } = require("chai")
const { Builder, Capabilities } = require("selenium-webdriver")
const { apiFetch } = require("../api-fetch")

const { getLinkByText } = require("../routes")

const BASE_URL = "http://localhost:8080"

const capabilities = Capabilities.safari()
capabilities.set("chromeOptions", { w3c: false })
const driver = new Builder().withCapabilities(capabilities).build()

let token, id
BeforeAll(async () => {
  apiFetch({
    route: "users",
    method: "post",
    params: {
      email: "testing@columbia.edu",
      name: "user2",
      password: "hello1"
    },
  }).then(({ status, data }) => {
    if (status == 200) {
      token = data.token
      id = data.user_id
    }
  })
})

AfterAll(async () => {
  apiFetch({
    route: `users/${id}`,
    method: "delete",
    token: token,
  }).then(({status}) => {
    console.log(status)
  })
})

Given(/user is on the (\w+) page/, async (pageName) => {
  const link = getLinkByText(pageName)

  await driver.get(`${BASE_URL}${link}`)
})

Then(/user should be on the (\w+) page/, async (pageName) => {
  const link = getLinkByText(pageName)
  const expectLink = `${BASE_URL}${link}`

  expect(await driver.getCurrentUrl()).to.equal(expectLink)
})

Then(/user should be on (\w+) like page/, async (pageName) => {
  const regex = getLinkByText(pageName)

  expect(await driver.getCurrentUrl()).to.match(regex)
})

module.exports = {
  driver,
}
