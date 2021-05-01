import axios from 'axios'
import router from '../../router'

let http = axios.create({
  baseURL: '/api'
})

/* 请求拦截 */
http.interceptors.request.use(request => {
  let token = sessionStorage.getItem('loginInfo') ? JSON.parse(sessionStorage.getItem('loginInfo')).token : ''
  request.headers.authorization = token
  return request
})
/* 响应拦截 */ 
http.interceptors.response.use(response => {
  if (response.data.code === 500) {
    router.push('/login')
  }
  else if (response.data.code === 403) {
    /* token 验证过期 */
    router.push('/login')
  }
  else {
    return response
   }
})

export default http
