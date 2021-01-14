<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <h1>Axios</h1>
    <div is="one"></div>
    <div is="two"></div>
    <!-- <ul>
      <li v-for="item in vlist" :key="item.id">
        {{ item.title }}
      </li>
    </ul>
    <br />
    <br />
    <ul>
      <li v-for="item in vlist1" :key="item.id">
        {{ item.title }}
      </li>
    </ul> -->
  </div>
</template>

<script>
// import axios from 'axios'
import { getvList, getvList1 } from '../tools/index'
import one from './one'
import two from './two'
export default {
  name: 'HelloWorld',
  components: {
    one,
    two
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      vlist: [],
      vlist1: []
    }
  },
  mounted () {
    getvList()
      .then((res) => {
        console.log('数据响应', res)
        if (res.status === 200) {
          this.vlist = res.data
        }
      })
      .catch((err) => {
        console.error('错误捕获', err)
      })
    getvList1()
      .then((res) => {
        console.log('数据响应', res)
        if (res.status === 200) {
          this.vlist1 = res.data
        }
      })
      .catch((err) => {
        console.error('错误捕获', err)
      })
    /* axios({
      url: 'http://jsonplaceholder.typicode.com/posts',
      method: 'get',
      parms: {

      }
    })
      .then((res) => {
        console.log('数据响应', res)
        if (res.status === 200) {
          this.vlist = res.data
        }
      })
      .catch((err) => {
        console.error('错误捕获', err)
      }) */
    // this.getvList1()
  },
  methods: {
    // getvList () {
    //   axios.get('http://jsonplaceholder.typicode.com/posts', {
    //     params: {}
    //   })
    //     .then((res) => {
    //       console.log('数据响应', res, axios)

    //       /* code 一般这种code码都是逻辑码并非http状态码，后端说0就是逻辑成功就用0判断，如果200是成功你就用200判断，比如用户名密码错误，后端说是1001 */

    //       if (res.status === 200) {
    //         this.vlist = res.data
    //       }
    //     })
    //     .catch((err) => {
    //       console.error('错误捕获', err)
    //     })
    // },
    /* 使用 asyns/await 将 axios 异步请求同步化： */
    // async getvList1 () {
    //   try {
    //     let res = await axios.get('http://jsonplaceholder.typicode.com/posts', { params: {} })
    //     console.log('数据响应', res, axios)

    //     if (res.status === 200) {
    //       this.vlist = res.data
    //     }
    //   } catch (error) {
    //     console.error('error')
    //   }
    // }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
