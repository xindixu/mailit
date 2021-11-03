import axios from "axios"

const apiFetch = ({ route, method = "get", params }) =>
  axios[method](`${process.env.REACT_APP_BASE_URL}/api/v1/${route}`, params).then(
    ({ data, status }) => ({
      data: data.data,
      status,
    })
  )

export default apiFetch
