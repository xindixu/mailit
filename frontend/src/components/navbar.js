import React from "react"
import { Avatar, Menu } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { Link, useLocation } from "react-router-dom"
import styled from "styled-components"
import routes from "../lib/routes"
import styleSettings from "../styles"

const SIZE = 124

const { spacerLg } = styleSettings

const AvatarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: ${spacerLg};
`

const getTextByLink = (link) => routes.find((route) => route.link === link)?.text

const Navbar = () => {
  const location = useLocation()

  return (
    <Menu
      theme="dark"
      mode="vertical"
      defaultSelectedKeys={[getTextByLink(location.pathname)]}
      style={{
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <AvatarWrapper>
        <Avatar size={SIZE} icon={<UserOutlined />} />
      </AvatarWrapper>

      {routes.map(({ text, link }) => (
        <Menu.Item key={text}>
          <Link to={link}>{text}</Link>
        </Menu.Item>
      ))}

      <Menu.Item style={{ marginTop: "auto", marginBottom: spacerLg }} disabled>
        Sign Out
      </Menu.Item>
    </Menu>
  )
}
export default Navbar
