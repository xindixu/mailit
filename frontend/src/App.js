import { Layout } from "antd"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import styled from "styled-components"
import Navbar from "./components/navbar"
import Dashboard from "./pages/dashboard"
import Campaigns from "./pages/campaigns"
import Templates from "./pages/templates"
import TemplateShow from "./pages/templates/show"
import TemplateNew from "./pages/templates/new"
import Login from "./pages/login"
import Register from "./pages/register"
import CampaignShow from "./pages/campaigns/show"
import Recipients from "./pages/recipients"
import RecipientsUpload from "./pages/recipients/upload"

const { Sider, Footer, Content } = Layout
import styleSettings from "./styles"

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
            <Route path="/campaigns/:id">
              <CampaignShow />
            </Route>
            <Route path="/campaigns">
              <Campaigns />
            </Route>
            <Route path="/templates/new">
              <TemplateNew />
            </Route>
            <Route path="/templates/:id">
              <TemplateShow />
            </Route>
            <Route path="/templates">
              <Templates />
            </Route>
            <Route path="/recipients/upload">
              <RecipientsUpload />
            </Route>
            <Route path="/recipients">
              <Recipients />
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
