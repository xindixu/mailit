import axios from "axios"

const apiFetch = ({ route, method = "get" }) =>
  axios.get(`/api/v1/${route}`).then(({ data, status }) => ({ data: data.data, status }))

export default apiFetch
