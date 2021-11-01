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

export const getTextByLink = (link) => routes.find((route) => route.link === link)?.text
export const getLinkByText = (text) => routes.find((route) => route.text === text)?.link

export default routes
