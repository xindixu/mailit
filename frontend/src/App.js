import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Dashboard from "./pages/dashboard"
import Campaigns from "./pages/campaigns"
import Templates from "./pages/templates"

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
            </ul>
          </nav>

          <Switch>
            <Route path="/campaign">
              <Campaigns />
            </Route>
            <Route path="/template">
              <Templates />
            </Route>
            <Route path="/">
              <Dashboard />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App
