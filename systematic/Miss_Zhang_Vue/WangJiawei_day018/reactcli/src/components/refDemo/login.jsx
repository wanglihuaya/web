import React from 'react'
import Son from './son'

class RefDemo extends React.Component {
  constructor() {
    super()
    this.state = {
      userInfo: {
        username: '',
        password: '',
      },
    }
    this.username = React.createRef()
    this.password = React.createRef()

    this.child = React.createRef()
  }
  login(e) {
    console.log(this.username.current.value, this.password.current.value)
    this.setState(
      {
        userInfo: {
          username: this.username.current.value,
          password: this.password.current.value,
        },
      },
      () => {
        console.log(this.state.userInfo)
      }
    )
  }

  /* 生命周期之挂载 */
  componentDidMount() {
    console.log('组件挂载完成')
    console.log(this.child.current)
    console.log(this.child.current.state.msg)
  }

  render() {
    return (
      <div>
        {/* <h1 ref="hInfo">RefDemo</h1> */}
        <h1>实现登录案例</h1>
        <div>
          用户名：
          <input type="text" ref={this.username} />
        </div>
        <div>
          密码：
          <input type="text" ref={this.password} />
        </div>
        <div>
          <button onClick={this.login.bind(this)}>登录</button>
        </div>
        <Son ref={this.child}></Son>
        {/* <h1>{ this.child.current.value.state.msg}</h1> */}
      </div>
    )
  }
}

export default RefDemo
