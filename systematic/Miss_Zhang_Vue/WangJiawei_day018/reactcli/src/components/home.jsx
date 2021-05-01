import React from 'react'
import '../assets/home.css'
class Home extends React.Component {
  /* 封装menu菜单事件 */
  menu(e) {
    console.log('我是右键菜单')
    e.preventDefault()
  }
  bigBox(e) {
    console.log('我是大盒子')
  }
  sBox(e) {
    console.log('我是小盒子')
    e.stopPropagation()
  }
  render() {
    return (
      <div className="home">
        <h1>我是HOME组件</h1>
        {/* 隐式传递事件源 */}
        <div onContextMenu={this.menu.bind(this)} className="box"></div>
        {/* 箭头函数阻止默认事件 */}
        <div className="box" onContextMenu={(event) => this.menu(event)}></div>
        {/* 阻止冒泡 */}
        <div className="box" onClick={(event) => this.bigBox(event)}>
          <div className="sBox" onClick={(event) => this.sBox(event)}></div>
        </div>
      </div>
    )
  }
}

export default Home
