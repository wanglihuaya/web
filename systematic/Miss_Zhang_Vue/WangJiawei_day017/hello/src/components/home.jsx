/* 引入核心库 */
import React from 'react'
console.log('核心库：', React)
class Home extends React.Component {
  /* 调用生命周期函数render */
  render () {
    return (
      <div>
        <h1>I am 'Home' component</h1>
      </div>
    )
  }
}

export default Home
