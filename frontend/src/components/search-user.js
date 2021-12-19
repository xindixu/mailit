import React, { useState, useRef, useMemo } from "react"
import PropTypes from "prop-types"
import { debounce } from "lodash"
import { Select, Spin } from "antd"
import apiFetch from "../lib/api-fetch"

const userToOption = (user) => {
  const { name, id, email } = user
  return { label: `${name} (${email})`, value: id }
}

const usersToOptions = (users) => users?.map(userToOption)

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

const fetchUserList = async (email, ownerId) =>
  apiFetch({ route: "users/search", method: "POST", params: { email } }).then(
    ({ data, status }) => {
      // owner can't be a collaborator
      if (status === 200 && data.id !== ownerId) {
        return [userToOption(data)]
      }
    }
  )

const SearchUser = ({ value, onChange, ownerId, disabled }) => {
  const [users, setUsers] = useState(() => usersToOptions(value))

  return (
    <DebounceSelect
      disabled={disabled}
      mode="multiple"
      value={users}
      placeholder="Search users by email"
      fetchOptions={(email) => fetchUserList(email, ownerId)}
      onChange={(newUsers) => {
        setUsers(newUsers)
        onChange(newUsers)
      }}
      style={{
        width: "100%",
      }}
    />
  )
}

SearchUser.propTypes = {
  value: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  ownerId: PropTypes.number.isRequired,
}
export default SearchUser
