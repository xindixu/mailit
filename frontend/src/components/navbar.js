import React from "react"
import { Menu } from "antd"
import { Link } from "react-router-dom"
import routes from "../lib/routes"

const Navbar = () => (
  <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["Dashboard"]}>
    {routes.map(({ text, link }) => (
      <Menu.Item key={text}>
        <Link to={link}>{text}</Link>
      </Menu.Item>
    ))}
  </Menu>
)

export default Navbar
