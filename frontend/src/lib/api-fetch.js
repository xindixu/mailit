import axios from "axios"

const apiFetch = ({ route, method = "get", params }) =>
  sessionStorage.getItem("token")
    ? axios[method](
        `${process.env.REACT_APP_BASE_URL}/api/v1/${route}`,
        { headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` } },
        params
      ).then(({ data, status }) => ({
        data: data.data,
        status,
      }))
    : axios[method](`${process.env.REACT_APP_BASE_URL}/api/v1/${route}`, params).then(
        ({ data, status }) => ({
          data: data.data,
          status,
        })
      )

export default apiFetch
