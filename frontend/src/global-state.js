import React, { useState, createContext, useEffect } from "react"

export const AuthContext = createContext()
export const DEFAULT_AUTH_STATE = { user_id: "", token: "", name: "" }

const getLocalStorageItem = (key) => {
  const value = localStorage.getItem(key)
  if (value === "null") {
    return null
  }
  return value
}

const initAuthState = () => {
  if (getLocalStorageItem("token") && getLocalStorageItem("user_id")) {
    return {
      token: localStorage.getItem("token"),
      user_id: localStorage.getItem("user_id"),
      name: localStorage.getItem("name"),
    }
  }

  return DEFAULT_AUTH_STATE
}
export const AuthProvider = (props) => {
  const [authState, setAuthState] = useState(() => initAuthState())

  useEffect(() => {
    // check if token in localStorage is the same
    // if not, update
    if (authState.token !== "") {
      localStorage.setItem("token", authState.token)
      localStorage.setItem("user_id", authState.user_id)
      localStorage.setItem("name", authState.name)
    }
    return () => {}
  }, [authState])

  return (
    <AuthContext.Provider value={[authState, setAuthState]}>{props.children}</AuthContext.Provider>
  )
}
