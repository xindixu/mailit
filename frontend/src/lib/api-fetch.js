import axios from "axios"

const apiFetch = ({ route, method = "get", params }) => {
  const token = sessionStorage.getItem("token")
  const headers = token ? { Authorization: `Bearer ${token}` } : {}
  return axios({
    url: `${process.env.REACT_APP_BASE_URL}/api/v1/${route}`,
    headers,
    data: params,
    method,
  }).then(({ data, status }) => ({
    data: data.data,
    status,
  }))
}

export default apiFetch
