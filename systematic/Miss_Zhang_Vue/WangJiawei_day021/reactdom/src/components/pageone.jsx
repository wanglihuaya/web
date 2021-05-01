import React from 'react'
import store from '../store'
class One extends React.Component {
  componentDidMount() {
    store.state.on('change', () => {
      this.setState({})
    })
  }
  changerMsg() {
    store.dispatcher.dispatch({
      type: 'changeMsg',
    })
    // this.setState({})
  }
  render() {
    console.log(store)
    return (
      <div className="box">
        <button onClick={this.changerMsg.bind(this)}>msg</button>
        <h1>{store.state.msg}</h1>
        <h1>我是组件一</h1>
      </div>
    )
  }
}
export default One
