import React, { useContext } from "react"
import { Menu } from "antd"
import { Link, useLocation, useHistory } from "react-router-dom"
import routes, { getTextByLink } from "../lib/routes"
import styleSettings from "../styles"
import { DEFAULT_AUTH_STATE, AuthContext } from "../global-state"

const { spacerLg } = styleSettings

const Navbar = () => {
  const location = useLocation()
  const history = useHistory()
  const [authState, setAuthState] = useContext(AuthContext)

  const handleClick = () => {
    localStorage.clear()
    setAuthState(DEFAULT_AUTH_STATE)
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
      {routes.map(({ text, link }) => (
        <Menu.Item key={text}>
          <Link to={link}>{text}</Link>
        </Menu.Item>
      ))}

      {authState.token === "" ? (
        <Menu.Item style={{ marginTop: "auto", marginBottom: spacerLg }}>
          <Link id="login" to="/login">
            Login
          </Link>
        </Menu.Item>
      ) : (
        <Menu.Item
          id="sign-out"
          style={{ marginTop: "auto", marginBottom: spacerLg }}
          onClick={handleClick}
        >
          Sign Out
        </Menu.Item>
      )}
    </Menu>
  )
}
export default Navbar
