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
    text: "Templates",
    link: "/templates",
  },
]

const getTextByLink = (link) => routes.find((route) => route.link === link)?.text
const getLinkByText = (text) => routes.find((route) => route.text === text)?.link

module.exports = {
  routes,
  getTextByLink,
  getLinkByText,
}
