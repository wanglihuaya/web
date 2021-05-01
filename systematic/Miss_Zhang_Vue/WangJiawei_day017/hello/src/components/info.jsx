import React from 'react'

/* 创建组建 */
class Info extends React.Component {
  name = 'OKKKKKKKK🧘🏻'
  /* 一般情况，我们管理数据，在react中用state这个属性 */
  constructor(props) {
    super(props)
    this.state = {
      msg: 'myyyyyy',
      newsList: [
        {
          id: 1,
          title:
            '微信创始人张小龙发了一条朋友圈后，各路大神尽显毒蛇风范，个个都是段子好手。。。',
        },
        {
          id: 2,
          title:
            '我有个朋友开着奥拓去我们乡下拉了满满一车货，就是后备箱关不上的那种，路上回去，农村路小，他在前面开，后面也是个汽车，后面那车一直按喇叭，想超过去，他就是不给，等开了好远，到了大路上，人家超过去，停在他面前，说个一句话，他快吐血，人家说，哥哥，东西掉的快没了，回去捡吧，按喇叭你也不听。',
        },
        {
          id: 3,
          title:
            '新婚夜那天，老婆含情脉脉的对我说：老公呀，从现在开始，你就长大了，不能再玩小孩子游戏了，得干大人该干的事了！我红着脸，老婆又说：你过来，我给你看看你以后经常摸到的小宝贝。然后拉着我的手，让我看洗碗刷子、抹布还有洗衣机！',
        },
      ],
      num: 10,
    }
  }
  change() {
    console.log('This::', this)
    /*
     * 修改state唯一方式setState
     * setState可以触发render
     * setState是异步操作
     * setState()有两个参数，一个是state对象，一个是callback()
     */
    this.setState(
      {
        num: this.state.num + 1,
      },() => {
        console.log('回调函数：', this.state.num)
      }
    )

    console.log(this.state.num)
  }
  render() {
    console.log('render函数！', this)
    /* 对象解构 */
    const { msg, newsList } = this.state
    return (
      <div>
        <h1>我是Info组件</h1>
        <h1>{this.name}</h1>
        <h1>{msg}</h1>
        <h3>段子：</h3>
        <ul>
          {newsList.map((item) => {
            return <li key={item.id}>{item.title}</li>
          })}
        </ul>
        {/* 事件方法的调用，不加小括号，点击onclick可以触发，onclick={this.change}，加小括号，相当于调用这个方法，onclick={this.change()} */}
        <div>
          <button onClick={this.change.bind(this)}>click me</button>
        </div>
        <h1>{this.state.num}</h1>
      </div>
    )
  }
}

export default Info
