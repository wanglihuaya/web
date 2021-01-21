<template>
  <div>
    <div is="elBreadCrumb"></div>
    <div ref="vDialog" is="addInfo" :addInfo="addInfo"></div>
    <div @edit="edit" is="vList"></div>
  </div>
</template>
<script>
import vList from './list'
import addInfo from './addinfo'
export default {
  components: {
    vList,
    addInfo
  },
  data () {
    return {
      addInfo: {
        dialogFormVisible: false,
        dialogEditVisible: true,
      }
    }
  },
  methods: {
    edit (e) {
      this.addInfo.dialogFormVisible = true
      this.addInfo.dialogEditVisible = false
      this.$refs.vDialog.lookUp(e)
    }
  }
}
</script>
<style scoped>
.el-button {
  margin: 20px 0;
}
</style>