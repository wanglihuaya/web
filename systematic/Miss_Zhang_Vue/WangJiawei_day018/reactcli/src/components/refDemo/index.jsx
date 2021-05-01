import React from 'react'
class RefDemo extends React.Component {
  constructor() {
    super()
    this.hInfo = React.createRef()
  }
  getInfo(e) {
    console.log(e)
    console.log(this)
    // console.log(this.refs.hInfo)
    console.log(this.hInfo.current)
  }

  render() {
    return (
      <div>
        {/* <h1 ref="hInfo">RefDemo</h1> */}
        <h1 ref={this.hInfo}>RefDemo</h1>
        <button onClick={this.getInfo.bind(this)}>点我</button>
      </div>
    )
  }
}

export default RefDemo
