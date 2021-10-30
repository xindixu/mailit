<<<<<<< HEAD
=======
import React, { useEffect, useState } from "react"
import axios from "axios"
import { List, Typography } from "antd"
>>>>>>> 4dcf6327487ee2b19281685d5529fb0382c76656
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
<<<<<<< HEAD
=======

      {/* <List
        bordered
        dataSource={users}
        renderItem={({ first_name: firstName, last_name: lastName }) => (
          <List.Item>
            <Typography.Text>
              {firstName} {lastName}
            </Typography.Text>
          </List.Item>
        )}
      /> */}
>>>>>>> 4dcf6327487ee2b19281685d5529fb0382c76656
    </div>
  )
}

export default App
