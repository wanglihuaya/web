import React from 'react'
import '../../assets/son.css'

class Son extends React.Component {
  constructor() {
    super()
    console.log(this)
  }
  render() {
    const { uInfo, getInfo, changeValue } = this.props
    return (
      <div className="son">
        <h1>我是子组件</h1>
        <h2>
          接收到的父组件的数据：{this.props.name}&nbsp;&nbsp;&nbsp; &nbsp;
          &nbsp;&nbsp;{this.props.ok}
        </h2>
        <h3>{uInfo.name}</h3>
        <div>
          <button onClick={getInfo.bind(this, '子 → 父')}>
            子级触发父级
          </button>
        </div>
        <hr />
        <div>
          {/* input子传父 */}
          子 → 父：
          <input type="text" onChange={(e) => changeValue(e)} />
        </div>
        <br />
      </div>
    )
  }
}
export default Son
