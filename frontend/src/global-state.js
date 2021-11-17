import React, { useState, createContext, useEffect } from "react"

export const AuthContext = createContext()
export const DEFAULT_AUTH_STATE = { user_id: "", token: "", name: "" }

export const AuthProvider = (props) => {
  const [authState, setAuthState] = useState(DEFAULT_AUTH_STATE)

  useEffect(() => {
    // check if token in sessionStorage is the same
    // if not, update
    if (authState.token !== "") {
      sessionStorage.setItem("token", authState.token)
      sessionStorage.setItem("user_id", authState.user_id)
      sessionStorage.setItem("name", authState.name)
    } else if (sessionStorage.getItem("token") && sessionStorage.getItem("user_id")) {
      setAuthState({
        token: sessionStorage.getItem("token"),
        user_id: sessionStorage.getItem("user_id"),
        name: sessionStorage.getItem("name"),
      })
    }
    return () => {}
  }, [authState])

  return (
    <AuthContext.Provider value={[authState, setAuthState]}>{props.children}</AuthContext.Provider>
  )
}
