import React from 'react'
class List extends React.Component {
  /* 生命周期挂载 */
  componentDidMount() {
    console.log('挂载完成', this)
    console.log(this.props)
  }

  render() {
    return (
      <div>
        <h1>List</h1>
        <h1>{this.props.match.params.id}</h1>
        <div>
          <button onClick={() => this.props.history.go(-1)}>返回</button>
        </div>
        <div>
          <button onClick={() => this.props.history.goBack()}>返回</button>
        </div>
      </div>
    )
  }
}
export default List
