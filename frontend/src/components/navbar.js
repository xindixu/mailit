import React from "react"
import { Avatar, Menu, Space } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import styled from "styled-components"
import routes from "../lib/routes"
import styleSettings from "../styles"

const SIZE = 124

const { spacerMd, spacerLg } = styleSettings

const StyledMenu = styled(Menu)`
  padding: ${spacerLg} 0;
`
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: ${spacerLg};
`
const Navbar = () => (
  <StyledMenu
    theme="dark"
    mode="vertical"
    defaultSelectedKeys={["Dashboard"]}
    style={{
      height: "100%",
    }}
  >
    <Container>
      <Avatar size={SIZE} icon={<UserOutlined />} />
    </Container>

    {routes.map(({ text, link }) => (
      <Menu.Item key={text}>
        <Link to={link}>{text}</Link>
      </Menu.Item>
    ))}

    <Menu.Item>Sign Out</Menu.Item>
  </StyledMenu>
)

export default Navbar
