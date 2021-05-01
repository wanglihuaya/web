import React from 'react'
import { songUrl, songLyric } from '../tools/axios'
// import qString from 'querystring'

class Play extends React.Component {
  constructor() {
    super()
    this.state = {
      // query: '',
      songUrl: '',
      songLyric: '',
    }
  }
  // componentDidMount() {
  //   let query = this.props.location.search.slice(1)
  //   let qsObj = qString.parse(query)
  //   this.setState({ query: qsObj })
  //   console.log(query)
  // }
  componentDidMount() {
    this.getSongUrl()
    this.getSongLyric()
  }
  getSongUrl() {
    songUrl({
      id: this.props.location.state.id,
    }).then((res) => {
      if (res.data.code === 200) {
        this.setState({
          songUrl: res.data.data[0].url,
        })
      }
    })
  }
  getSongLyric() {
    songLyric({
      id: this.props.location.state.id,
    }).then((res) => {
      console.log(res.data.lrc.lyric)
      if (res.data.code === 200) {
        this.setState({
          songLyric: res.data.lrc.lyric,
        })
      }
    })
  }
  render() {
    const { songUrl, songLyric } = this.state
    // const {query} = this.state
    return (
      <div>
        <h1>PLAY</h1>
        {/* <h1>{query.id}</h1> */}
        <h1>{this.props.location.state.id}</h1>
        <audio src={songUrl} controls></audio>
        <p>{songLyric}</p>
      </div>
    )
  }
}
export default Play
