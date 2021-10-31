import { Layout } from "antd"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import styled from "styled-components"
import Navbar from "./components/navbar"
import Dashboard from "./pages/dashboard"
import Campaigns from "./pages/campaigns"
import Templates from "./pages/templates"
import Login from "./pages/login"
import Register from "./pages/register"

<<<<<<< HEAD
const { Sider, Footer, Content } = Layout
import styleSettings from "./styles"
=======
function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Dashboard</Link>
              </li>
              <li>
                <Link to="/campaign">Campaigns</Link>
              </li>
              <li>
                <Link to="/template">Templates</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </nav>
>>>>>>> [front-end] add register page and fix login page

const { spacerMd } = styleSettings

const SIDER_WIDTH = "200px"
const StyledContent = styled(Content)`
  margin: ${spacerMd} ${spacerMd} ${spacerMd} ${SIDER_WIDTH};
  padding: ${spacerMd};
  height: 100%;
`

const StyledSider = styled(Sider)`
  width: ${SIDER_WIDTH};
  left: 0;
  overflow: auto;
  position: fixed;
  height: 100%;
`

const App = () => (
  <Layout style={{ height: "100vh" }}>
    <Router>
      <Layout>
        <StyledSider>
          <Navbar />
        </StyledSider>
        <StyledContent>
          <Switch>
            <Route path="/campaigns">
              <Campaigns />
            </Route>
            <Route path="/templates">
              <Templates />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/">
              <Dashboard />
            </Route>
          </Switch>
        </StyledContent>
      </Layout>
      <Footer style={{ textAlign: "center" }}>Mailit @ 2021</Footer>
    </Router>
  </Layout>
)

export default App
