const routes = [
  {
    text: "Dashboard",
    link: "/",
  },
  {
    text: "Campaigns",
    link: "/campaigns",
  },
  {
    text: "TemplateIndex",
    link: "/templates",
  },
  {
    text: "TemplateShow",
    link: /\/templates\/\d+/,
  },
]

const getTextByLink = (link) => routes.find((route) => route.link === link)?.text
const getLinkByText = (text) => routes.find((route) => route.text === text)?.link

module.exports = {
  routes,
  getTextByLink,
  getLinkByText,
}
