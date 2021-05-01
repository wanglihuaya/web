import React from 'react'

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      userInfo: {
        username: '',
        password: '',
      },
    }
  }
  getUser(e) {
    // console.log('事件源：', e)
    console.log('User：', e.target.value)
    this.setState({
      userInfo: { username: e.target.value },
    })
  }
  getPass(e) {
    // console.log('事件源：', e)
    console.log('Pass：', e.target.value)
    this.setState({
      userInfo: { password: e.target.value },
    })
  }
  getValue(type, e) {
    // console.log(type, e)
    let userInfo = this.state.userInfo
    userInfo[type] = e.target.value
    this.setState({
      userInfo,
    })
  }
  login() {
    console.log('登录的表单项', this.state.userInfo)
  }
  render() {
    return (
      <div>
        <h1>登录</h1>
        <div>
          用户名：
          <input type="text" onChange={this.getValue.bind(this, 'username')} />
        </div>
        <div>
          密 码：
          <input type="text" onChange={this.getValue.bind(this, 'password')} />
        </div>
        <div>
          <button onClick={this.login.bind(this)}>登录</button>
        </div>
      </div>
    )
  }
}

export default Login
