import React from 'react'
class Son extends React.Component {
  constructor() {
    super()
    this.state = {
      msg: '子组件数据',
    }
  }
  render() {
    return (
      <div>
        <h1>我是ref的子组件</h1>
      </div>
    )
  }
}

export default Son
