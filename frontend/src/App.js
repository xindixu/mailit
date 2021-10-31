import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Dashboard from "./pages/dashboard"
import Campaigns from "./pages/campaigns"
import Templates from "./pages/templates"
import Login from "./pages/login"
import Register from "./pages/register"

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

          <Switch>
            <Route path="/campaign">
              <Campaigns />
            </Route>
            <Route path="/template">
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
        </div>
      </Router>
    </div>
  )
}

export default App
