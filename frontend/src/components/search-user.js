import React, { useState, useRef, useMemo } from "react"
import PropTypes from "prop-types"
import { debounce } from "lodash"
import { Select, Spin } from "antd"
import apiFetch from "../lib/api-fetch"

const DebounceSelect = ({ fetchOptions, debounceTimeout = 1000, ...props }) => {
  const [fetching, setFetching] = useState(false)
  const [options, setOptions] = useState([])
  const fetchRef = useRef(0)

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      fetchRef.current += 1
      const fetchId = fetchRef.current
      setOptions([])
      setFetching(true)
      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return
        }

        setOptions(newOptions)
        setFetching(false)
      })
    }

    return debounce(loadOptions, debounceTimeout)
  }, [fetchOptions, debounceTimeout])

  return (
    <Select
      {...props}
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : "User not found"}
      options={options}
    />
  )
}

const fetchUserList = async (email) =>
  apiFetch({ route: "users/search", method: "POST", params: { email } }).then(
    ({ data, status }) => {
      if (status === 200) {
        const { name, id, email } = data
        return [{ label: `${name} (${email})`, value: id }]
      }
    }
  )

const SearchUser = ({ value, onChange }) => {
  const [users, setUsers] = useState(value)
  return (
    <DebounceSelect
      mode="multiple"
      value={users}
      placeholder="Search users by email"
      fetchOptions={fetchUserList}
      onChange={(newUsers) => {
        setUsers(newUsers)
        onChange(newUsers.map(({ value }) => value))
      }}
      style={{
        width: "100%",
      }}
    />
  )
}

SearchUser.propTypes = {}
export default SearchUser
