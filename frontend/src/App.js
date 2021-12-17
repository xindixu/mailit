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
import ResetPassEmail from "./pages/login/reset-pass-email"
import ResetPassword from "./pages/login/reset-password"
import Analytics from "./pages/campaigns/analytics"

const { Sider, Footer, Content } = Layout
import styleSettings from "./styles"
import GuardedRoute from "./components/guarded-route"

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
            <GuardedRoute path="/campaigns/:id/analytics" component={Analytics} />
            <GuardedRoute path="/campaigns/:id" component={CampaignShow} />
            <GuardedRoute path="/campaigns" component={Campaigns} />
            <GuardedRoute path="/templates/new" component={TemplateNew} />
            <GuardedRoute path="/templates/:id" component={TemplateShow} />
            <GuardedRoute path="/templates" component={Templates} />
            <GuardedRoute path="/recipients/upload" component={RecipientsUpload} />
            <GuardedRoute path="/recipients" component={Recipients} />
            <Route path="/password-reset/:token" component={ResetPassword} />
            <Route path="/login/reset" component={ResetPassEmail} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <GuardedRoute exact path="/" component={Dashboard} />
          </Switch>
        </StyledContent>
      </Layout>
      <Footer style={{ textAlign: "center" }}>Mailit @ 2021</Footer>
    </Router>
  </Layout>
)

export default App
