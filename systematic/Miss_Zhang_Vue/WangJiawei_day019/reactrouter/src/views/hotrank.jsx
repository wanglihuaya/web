import React from 'react'
import { hotList } from '../tools/axios'
import { Link } from 'react-router-dom'
import '../assets/css/hotrank.css'

class HotRank extends React.Component {
  constructor() {
    super()
    this.state = {
      hotList: [],
      query: '',
    }
  }
  componentDidMount() {
    this.getHotList()
  }
  getHotList() {
    hotList().then((response) => {
      if (response.data.code === 200) {
        this.setState({
          hotList: response.data.playlist.tracks.filter((item, i) => i < 20),
        })
      }
      console.log(response)
    })
  }
  fix(num, length) {
    return ('' + num).length < length
      ? (new Array(length + 1).join('0') + num).slice(-length)
      : '' + num
  }
  render() {
    const { hotList } = this.state
    let hotTime = new Date()
    return (
      <div>
        <div className="hotop">
          <div className="hotopct">
            <div className="hoticon"></div>
            <div className="hotime">
              更新日期：{hotTime.getMonth() + 1}月{hotTime.getDate()}日
            </div>
          </div>
        </div>
        <ul>
          {hotList.map((item, index) => {
            return (
              <li key={item.id}>
                {/* <Link to={'/play?id=' + item.id}> */}
                <Link
                  to={{
                    pathname: '/play',
                    state: {
                      id: item.id,
                    },
                  }}
                >
                  <h3>
                    {this.fix(index + 1, 2)}&nbsp;
                    {item.name}
                  </h3>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
export default HotRank
