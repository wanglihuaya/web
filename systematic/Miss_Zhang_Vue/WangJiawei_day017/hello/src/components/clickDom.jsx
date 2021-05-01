import React from 'react'
class ClickDom extends React.Component {
  getInfo() {
    console.log('触发事件了', this)
  }
  getWord(m) {
    console.log('参数：：', m)
  }
  getEvent(m) {
    console.log('事件源：：', m)
  }
  render() {
    return (
      <div>
        <h1>事件</h1>
        <div>
          <button onClick={this.getInfo.bind(this)}>触发事件</button>
          <button onClick={() => this.getInfo()}>箭头函数</button>
        </div>
        <hr />
        {/* 事件传参 */}
        <button onClick={this.getWord.bind(this, 'OKKKK')}>bind传参</button>
        <button onClick={() => this.getWord('NOOOOOOO')}>箭头传参</button>
        <hr />
        {/* 传递事件源 */}
        {/* 隐式传递事件源 */}
        <button onClick={this.getEvent.bind(this)}>bind事件源</button>
        {/* 显式传递事件源 */}
        <button onClick={(event) => this.getEvent(event)}>箭头事件源</button>
      </div>
    )
  }
}

export default ClickDom
