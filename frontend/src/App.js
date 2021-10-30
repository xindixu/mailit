import { Layout } from "antd"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import styled from "styled-components"
import Navbar from "./components/navbar"
import Dashboard from "./pages/dashboard"
import Campaigns from "./pages/campaigns"
import Templates from "./pages/templates"

const { Header, Footer, Content } = Layout
import styleSettings from "./styles"

const { spacerMd } = styleSettings

const StyledContent = styled(Content)`
  margin: ${spacerMd};
  padding: ${spacerMd};
  height: 100%;
`
const App = () => (
  <Layout style={{ height: "100vh" }}>
    <Router>
      <Layout>
        <Header>
          <Navbar />
        </Header>
        <StyledContent>
          <Switch>
            <Route path="/campaigns">
              <Campaigns />
            </Route>
            <Route path="/templates">
              <Templates />
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
