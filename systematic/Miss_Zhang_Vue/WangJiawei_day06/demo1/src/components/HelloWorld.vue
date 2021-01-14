<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li v-for="item in newsList" :key="item.id">
        新闻列表标题：{{ item.title }}
      </li>
    </ul>
    <!-- <button @click="com='chou'">🤡</button>
    <button @click="com='bian'">🦇</button>
    <keep-alive>
      <p :is="com"></p>
    </keep-alive> -->

    <chou>
      <h1 slot="s">这就是匿名槽口！！！</h1>
      <h1 slot="a">
        这就是具名槽口！！
      </h1>
      <h1 slot-scope="msg">{{msg.msg}}</h1>
    </chou>
  </div>
</template>

<script>
import chou from './xiaochou'
import bian from './bianfu'
export default {
  name: 'HelloWorld',
  components: {
    chou,
    bian
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      newsList: [],
      com: 'bian'
    }
  },
  mounted () {
    // console.log('挂载启动了！！！')
    // console.log(this, 'this指向当前实例')
    // 挂载完成
    // 生命周期首次加载触发的最后一个生命周期函数
    // 组件一加载就获取新闻接口列表
    // this.$.ajax({
    //   url: 'http://jsonplaceholder.typicode.com/posts', // 你要调用的接口地址
    //   // type:''  get或者/post
    //   // data:{}  //参数
    //   // success:funtion(){
    //   // 当前this没有指向实例！！！！
    //   // }
    //   success: res => {
    //     console.log(res, '接口响应')
    //     this.newsList = res.filter((item, i) => i < 20)
    //   }
    // })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
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
</style>
