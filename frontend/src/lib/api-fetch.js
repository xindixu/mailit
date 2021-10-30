import axios from "axios"

const apiFetch = ({ route, method = "get" }) => axios.get(`/api/v1/${route}`)

export default apiFetch
