import React from 'react'
import '../assets/css/recommend.css'
import { personalized } from '../tools/axios'

class Recommend extends React.Component {
  constructor(props) {
    console.log()
    super()
    this.state = {
      recList: [],
    }
  }
  componentDidMount() {
    this.getPersonalized()
  }
  getPersonalized() {
    personalized({
      limit: 6,
    }).then((res) => {
      if (res.data.code === 200) {
        this.setState({
          recList: res.data.result,
        })
      }
    })
  }
  goList(id) {
    console.log(this)
    /* 编程式导航 */
    this.props.history.push('/list/' + id)
  }
  render() {
    const { recList } = this.state
    return (
      <div className="rec">
        <div className="songList">
          <p className="top">推荐歌单</p>
          <ul className="listBox">
            {recList.map((item) => {
              return (
                <li key={item.id} onClick={this.goList.bind(this, item.id)}>
                  <img src={item.picUrl} alt="" />
                  <p>{item.name}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}
export default Recommend
