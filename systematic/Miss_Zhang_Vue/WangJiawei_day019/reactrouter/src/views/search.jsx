import React from 'react'
import '../assets/css/search.css'
// import { Link } from 'react-router-dom'
import {
  hotSearch,
  getSearch,
  getMultimatch,
  getSearchSug,
} from '../tools/axios'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      val: '',
      hotSearch: [],
      searchRes: [],
      searchSug: [],
      albumInfo: [],
      albumId: '',
      albumImg: '',
      albumName: '',
      albumAuthor: '',
    }
    this.search = React.createRef()
  }
  componentDidMount() {
    this.getHotSearch()
    window.addEventListener(
      'scroll',
      function (e) {
        e.preventDefault()
      },
      { passive: false }
    )
  }

  componentWillUnmount() {
    window.removeEventListener(
      'scroll',
      function (e) {
        e.preventDefault()
      },
      { passive: false }
    )
  }

  /* 热门搜索 */
  getHotSearch() {
    hotSearch().then((response) => {
      // console.log(response)
      if (response.data.code === 200) {
        this.setState({
          hotSearch: response.data.result.hots,
        })
      }
    })
  }
  /* 重置 */
  reset() {
    this.setState({
      // val: '',
      searchRes: [],
      searchSug: [],
      albumInfo: [],
      albumId: '',
      albumImg: '',
      albumName: '',
      albumAuthor: '',
    })
  }
  /* input删除 */
  del() {
    this.setState({
      val: '',
      searchRes: [],
      searchSug: [],
      albumInfo: [],
      albumId: '',
      albumImg: '',
      albumName: '',
      albumAuthor: '',
    })
    this.search.current.value = ''
  }
  /* input触发 */
  keyUp(e) {
    // eslint-disable-next-line no-unused-expressions

    this.setState({ val: e.target.value })
    if (e.keyCode === 13) {
      if (e.target.value && e.target.value !== '') {
        this.goSearchInfo(e.target.value)
        // this.goSearchSug(e.target.value)
        return
      } else if (e.target.value === '') {
        this.reset()
        return
      }
    }
  }
  /* input触发 */
  onChange(e) {
    // console.log('onChange.searchSug::', this.state.searchSug)
    this.setState({ val: e.target.value })
    if (e.target.value) {
      console.log('666')
      this.goSearchSug(e.target.value)
      return
    } else {
      this.setState({
        searchSug: [],
      })
      return
    }
  }
  /* 点击搜索 */
  goSearchInfo(keywords) {
    // eslint-disable-next-line no-unused-expressions
    this.reset()
    this.search.current.value = keywords
    getSearch({
      keywords,
    })
      .then((response) => {
        console.log('SearchInfo:::', response)
        if (response.data.code === 200) {
          this.setState({
            searchRes: response.data.result.songs,
            val: keywords,
            albumId: response.data.result.songs[0].album.id,
          })
        }
      })
      /* 获取专辑信息 */
      .then(() => {
        getMultimatch(keywords).then((response) => {
          console.log('Multimatch:::', response)
          if (response.data.code === 200) {
            console.log(response)
            this.setState({
              albumImg: response.data.result.artist[0].picUrl,
              albumName: response.data.result.artist[0].occupation,
              albumAuthor: response.data.result.artist[0].name,
            })
          }
        })
      })
  }
  /* 搜索建议 */
  goSearchSug(keywords) {
    // this.search.current.value = keywords
    getSearchSug(keywords).then((response) => {
      console.log('SearchSug:::', response)
      if (response.data.code === 200) {
        this.setState({
          searchSug: response.data.result.allMatch,
          val: keywords,
        })
        console.log('IF::::', this.state.searchSug)
      }
    })
  }

  render() {
    const {
      hotSearch,
      searchRes,
      val,
      albumImg,
      albumName,
      albumAuthor,
      searchSug,
    } = this.state
    return (
      <div className="box">
        <div className="search">
          <div className="icon">
            <span className="searchIcon"></span>
          </div>
          <input
            type="text"
            ref={this.search}
            onKeyUp={(e) => {
              this.keyUp(e)
              this.onChange(e)
            }}
            placeholder="搜索歌曲、歌手、专辑"
          />
          <div className="icon">
            {val ? (
              <span className="del" onClick={this.del.bind(this)}></span>
            ) : (
              ''
            )}
          </div>
        </div>
        {!val ? (
          <div className="hotSearch">
            <p>热门搜索</p>
            <ul>
              {hotSearch.map((item) => {
                return (
                  <li
                    onClick={() => {
                      this.goSearchInfo(item.first)
                      // this.getAlbumInfo()
                    }}
                    key={item.first}
                  >
                    {item.first}
                  </li>
                )
              })}
            </ul>
          </div>
        ) : (
          ''
        )}
        {searchRes.length >= 1 && val ? (
          <div className="searchRes">
            <p>最佳匹配</p>
            <div className="niceTop">
              <div className="img">
                <img src={albumImg} alt="" />
              </div>
              <div className="word">
                <p>
                  专辑：
                  <span>{albumName}</span>
                </p>
                <i>{albumAuthor}</i>
              </div>
              <div className="right"></div>
            </div>
            <ul>
              {searchRes.map((item) => {
                return (
                  <li key={item.id}>
                    <div className="word">
                      <div className="name">{item.name}</div>
                      <div className="auth">
                        <i className="sq"></i>
                        <p>{item.auth}</p>
                        "-"
                        <p className="sName">{item.name}</p>
                      </div>
                    </div>
                    <span className="icon"></span>
                  </li>
                )
              })}
            </ul>
          </div>
        ) : (
          ''
        )}
        {searchSug.length >= 1 && searchRes.length < 1 ? (
          <ul className="sug">
            <p>搜索"{val}"</p>
            {searchSug.map((item) => {
              return (
                <li key={item.keyword}>
                  <span className="icon"></span>
                  <span className="word">{item.keyword}</span>
                </li>
              )
            })}
          </ul>
        ) : (
          ''
        )}
      </div>
    )
  }
}
export default Search
