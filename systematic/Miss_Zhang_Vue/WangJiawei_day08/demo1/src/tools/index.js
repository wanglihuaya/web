import http from './axios'
/* 这个文件用于封装所有的接口，统一管理 */

export function getvList () {
  return http.get('/posts')
}

export function getvList1 () {
  return http.get('/todos')
}
