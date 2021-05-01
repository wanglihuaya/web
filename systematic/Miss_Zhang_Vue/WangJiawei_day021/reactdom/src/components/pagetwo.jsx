import React from 'react'
import store from '../store'

class Two extends React.Component {
  componentDidMount() {
    store.state.on('change', () => {
      this.setState({})
    })
  }
  render() {
    return (
      <div className="box">
        <h1>我是组件二</h1>
        <h2>{store.state.msg}</h2>
      </div>
    )
  }
}
export default Two
