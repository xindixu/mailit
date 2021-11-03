const axios = require("axios")

const apiFetch = ({ route, method = "get", params }) =>
  axios[method](`http://localhost:3000/api/v1/${route}`, params).then(({ data, status }) => ({
    data: data.data,
    status,
  }))
module.exports = {
  apiFetch,
}
