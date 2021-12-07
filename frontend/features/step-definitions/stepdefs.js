const { Given, Then, BeforeAll, AfterAll, After } = require("@cucumber/cucumber")
const { expect } = require("chai")
const { Builder, Capabilities, By } = require("selenium-webdriver")
const { apiFetch } = require("../api-fetch")

const { getLinkByText } = require("../routes")

const BASE_URL = "http://localhost:8080"

const capabilities = Capabilities.safari()
capabilities.set("chromeOptions", { w3c: false })
const driver = new Builder().withCapabilities(capabilities).build()

let token
let user_id
BeforeAll(async () => {
  apiFetch({
    route: "/users",
    method: "post",
    params: {
      email: "testing@columbia.edu",
      name: "user2",
      password: "hello1",
    },
  }).then(({ status, data }) => {
    if (status === 200) {
      token = data.token
      user_id = data.user_id
    }
  })
})

let id

let rid

let tid

After(async () => {
  apiFetch({
    route: `/templates/${tid}`,
    token,
    method: "delete",
  })
})

After(async () => {
  apiFetch({
    route: `/campaigns/${id}`,
    token,
    method: "delete",
  })
})

After(async () => {
  apiFetch({
    route: `/recipients/${rid}`,
    token,
    method: "delete",
  })
})

AfterAll(async () => {
  apiFetch({
    route: `/users/${user_id}`,
    method: "delete",
    token,
  })
})

AfterAll(async () => {
  apiFetch({
    route: "/login",
    method: "post",
    params: {
      email: "random@columbia.edu",
      password: "hello1",
    },
  }).then(({ status, data }) => {
    if (status === 200) {
      apiFetch({
        route: `/users/${data.user_id}`,
        method: "delete",
        token: data.token,
      })
    }
  })
})

Given(/user have all data ready/, async () => {
  while (!token) {
    console.log("token", token)
  }

  apiFetch({
    route: "/templates",
    method: "post",
    token,
    params: {
      name: "Merry Christmas",
      markdown: "Wish you a Merry Christmas",
      user_id: 1,
      collaborator_ids: [1],
    },
  }).then(({ data }) => {
    tid = data.id
  })
  apiFetch({
    route: "/campaigns",
    method: "post",
    token,
    params: {
      name: "testcampaign",
      tags: ["testcampaign"],
      user_id: 1,
      template_id: 1,
    },
  }).then(({ data }) => {
    id = data.id
  })
  apiFetch({
    route: "/recipients",
    method: "post",
    token,
    params: {
      email: "qianjunc@gmail.com",
      tags: ["testcampaign"],
      user_id: 1,
    },
  }).then(({ data }) => {
    rid = data.id
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

Then(/user should sign out/, async () => {
  const button = await driver.findElement(By.id("sign-out"))
  await button.click()
  await driver.sleep(3000)
})

module.exports = {
  driver,
  token,
  user_id,
}
