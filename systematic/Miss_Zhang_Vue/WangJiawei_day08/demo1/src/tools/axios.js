import axios from 'axios'

let http = axios.create({
  baseURL: 'http://jsonplaceholder.typicode.com'
})

export default http
