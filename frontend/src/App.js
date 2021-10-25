import { useEffect, useState } from "react"
import axios from "axios"
import { List, Typography } from "antd"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Dashboard from "./pages/dashboard"
import Campaigns from "./pages/campaigns"
import Templates from "./pages/templates"

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    // TODO: create a api-fetch module to DRY fetching
    axios
      .get("/api/v1/users")
      .then((resp) => {
        const { data } = resp
        setUsers(data.users)
      })
      .catch((error) => console.log(error))

    return () => {}
  }, [])

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

      <List
        bordered
        dataSource={users}
        renderItem={({ first_name: firstName, last_name: lastName }) => (
          <List.Item>
            <Typography.Text>
              {firstName} {lastName}
            </Typography.Text>
          </List.Item>
        )}
      />
    </div>
  )
}

export default App
