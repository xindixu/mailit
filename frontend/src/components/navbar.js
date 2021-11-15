import React, { useContext } from "react"
import { Avatar, Menu } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { Link, useLocation, useHistory } from "react-router-dom"
import styled from "styled-components"
import routes, { getTextByLink } from "../lib/routes"
import styleSettings from "../styles"
import { AuthContext } from "../globalState"

const SIZE = 124

const { spacerLg } = styleSettings

const AvatarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: ${spacerLg};
`

const Navbar = () => {
  const location = useLocation()
  const history = useHistory()
  const [authState, setAuthState] = useContext(AuthContext)

  const handleClick = () => {
    sessionStorage.clear()
    setAuthState({ token: "", user_id: "" })
    history.push("/login")
  }

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

      {authState.token ? (
        <Menu.Item style={{ marginTop: "auto", marginBottom: spacerLg }} onClick={handleClick}>
          Sign Out
        </Menu.Item>
      ) : (
        <Menu.Item style={{ marginTop: "auto", marginBottom: spacerLg }}>
          <Link to="/login">Login</Link>
        </Menu.Item>
      )}
    </Menu>
  )
}
export default Navbar
