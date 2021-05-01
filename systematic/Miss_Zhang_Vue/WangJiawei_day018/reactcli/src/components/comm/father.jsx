import React from 'react'
import '../../assets/father.css'
import Son from './son'
import SonFun from './sonFun'

class Father extends React.Component {
  constructor() {
    super()
    this.state = {
      uInfo: {
        name: 'Commands',
        dress: 'commands.top',
      },
      msg: '这是父组件信息',
      value: '',
    }
  }
  getInfo(a) {
    console.log('这是一个事件', a, this)
    this.setState({
      msg: a,
    })
  }
  /* 封装一个修改state的value的事件 */
  changeValue(e) {
    console.log('changeValue被触发！', e.target.value)
    this.setState({
      value: e.target.value,
    })
  }
  render() {
    const { uInfo, msg } = this.state
    return (
      <div className="father">
        <SonFun name="SonFun"></SonFun>
        <h1>我是父组件</h1>
        <h1>{msg}</h1>
        <Son
          name="Father → Son"
          ok="OKKKKK"
          uInfo={uInfo}
          getInfo={this.getInfo.bind(this)}
          changeValue={(e) => this.changeValue(e)}
        ></Son>
        <p>通过子组件中的input修改的：{this.state.value}</p>
      </div>
    )
  }
}
export default Father
