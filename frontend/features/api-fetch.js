const axios = require("axios")

const apiFetch = ({ route, method = "get", token, params }) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {}
  return axios({
    url: `http://localhost:3000/api/v1/${route}`,
    headers,
    data: params,
    method,
  }).then(({ data: {data, status} }) => ({
    data,
    status,
  }))
}
module.exports = {
  apiFetch,
}
