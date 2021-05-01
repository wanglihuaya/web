import axios from 'axios'
let http = axios.create({
  baseURL: 'http://localhost:3002',
})

http.interceptors.request.use((req) => {
  return req
})

http.interceptors.request.use((res) => {
  return res
})

export default http
