/* 引入Flux插件 */
import { Dispatcher } from 'flux'
const EventEmitter = require('events')
class State extends EventEmitter {
  constructor() {
    super()
    this.msg = 'Okkkkkkk'
  }
}
const state = new State()

const dispatcher = new Dispatcher()

/* 创建一个state */
// const state = {
//   msg: 'OKKKKKKKKKK',
// }

dispatcher.register((a) => {
  console.log(a)
  switch (a.type) {
    case 'changeMsg':
      state.msg = 'Nooooo'
      state.emit('change')
      break

    default:
      break
  }
})
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default { state, dispatcher }
