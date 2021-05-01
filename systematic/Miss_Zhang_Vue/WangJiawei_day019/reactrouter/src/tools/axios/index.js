import http from './axios'

/* 封装推荐歌单接口 */
export function personalized(params) {
  return http.get('/personalized', {
    params,
  })
}

/* 封装热门榜单接口 */
export function hotList() {
  return http.get('/playlist/detail?id=3778678')
}

/* 获取音乐url的接口 */
export function songUrl(params) {
  return http.get('/song/url', {
    params,
  })
}

/* 获取音乐歌词的接口 */
export function songLyric(params) {
  return http.get('/lyric', {
    params,
  })
}

/* 获取热门搜索的接口 */
export function hotSearch() {
  return http.get('/search/hot')
}

/* 获取搜索列表 */
export function getSearch(params) {
  return http.get('/search', {
    params,
  })
}

/* 多重匹配最佳匹配 */
export function getMultimatch(params) {
  return http.get('/search/multimatch', {
    params: {
      keywords: params,
    },
  })
}

/* 获取搜索建议 */
export function getSearchSug(params) {
  return http.get(
    '/search/suggest',
    {
      params: {
        keywords: params,
        type: 'mobile',
      },
    }
    // qs.stringify({ keywords, type: 'mobile' })
  )
}
