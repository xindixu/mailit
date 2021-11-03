import axios from "axios"

const apiFetch = ({ route, method = "get", params }) =>
  axios[method](`/api/v1/${route}`, params).then(({ data, status }) => ({
    data: data.data,
    status,
  }))

export default apiFetch
