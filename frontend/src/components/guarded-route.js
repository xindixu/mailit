import React, { useContext } from "react"
import { Route, Redirect } from "react-router-dom"
import { AuthContext } from "../global-state"

const GuardedRoute = ({ component: Component, auth, ...rest }) => {
  const [authState] = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={(props) =>
        authState.token === "" ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  )
}

GuardedRoute.propTypes = {}

export default GuardedRoute
