<template>
  <div>
    <h1>This is HOME！！！！</h1>
    <router-link activeClass="select" tag="p" to="/play">PLAY</router-link>
    <router-link activeClass="select" tag="p" to="/go">GOOO</router-link>
    <router-link activeClass="select" tag="p" to="/come">COME</router-link>
    <router-view />
    <!-- <div v-for="item in items" :key="item.id">
      <router-link :to="'/cart?id=' + item.id">{{ item.name }}</router-link>
    </div> -->
    <div @click="toCart(item.id)" v-for="item in items" :key="item.id">
      {{ item.name }}
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  props: {

  },
  components: {

  },
  data () {
    return {

      items: [
        {
          id: 1,
          name: 'aa'
        },
        {
          id: 2,
          name: 'bb'
        },
        {
          id: 3,
          name: 'cc'
        }
      ]
    }
  },
  methods: {
    toCart (id) {
      // this.$router.push('/cart?id=' + id)
      this.$router.push({
        path: '/cart',
        query: {
          id
        }
      })
    }
  },
  mounted () {
  },
  watch: {
  },
  computed: {
  },
  filters: {
  }
}
</script>
<style scoped>
p {
  width: 100px;
  margin: 0 auto;
  cursor: pointer;
}
.select {
  color: tomato;
  background-color: teal;
  font-weight: bold;
}
</style>
