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
    text: "Predefined Templates",
    link: "/predefined-templates",
  },
  {
    text: "Templates",
    link: "/templates",
  },
  {
    text: "Recipients",
    link: "/recipients",
  },
]

export const getTextByLink = (link) => routes.find((route) => route.link === link)?.text
export const getLinkByText = (text) => routes.find((route) => route.text === text)?.link

export default routes
