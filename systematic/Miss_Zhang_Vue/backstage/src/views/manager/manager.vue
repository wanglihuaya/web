<template>
  <div>
    <div is="elBreadCrumb"></div>
    <div ref="vDialog" is="vDialog" :addInfo="addInfo"></div>
    <div @edit="edit" is="vList"></div>
  </div>
</template>
<script>
import vDialog from './addinfo'
import vList from './list'
export default {
  components: {
    vList,
    vDialog
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
      this.$refs.vDialog.lookInfo(e)
    }
  }
}
</script>
<style scoped>
</style>