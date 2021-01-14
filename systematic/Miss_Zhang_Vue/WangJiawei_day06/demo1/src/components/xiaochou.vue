<template>
  <div>
    <slot name="s"></slot>
    <p>
      笑话 近年来网络直播越来越火，不少主播变着花样直播，有直播玩游戏的、直播探险的、甚至还有直播吃饭睡觉的……最近，有人就公开在平台上直播“造娃”了！ 我以为是直播造（布/气）娃娃。哎，我还是太年轻了…… 最讨厌那种自己撸完反手就是一个举报的了。 让警察叔叔好好治治你们！谁让你们不分享给我，我都没看着。 *********@***.c
    </p>
    <slot name="a"></slot>
    <slot :msg='msg'></slot>
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
      msg: '获取具名槽口的数据'
    }
  },
  methods: {

  },
  mounted () {
    console.log('小丑上线')
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
  *{
    color: rgb(19, 223, 111);
  }
</style>
