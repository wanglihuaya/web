<template>
  <div>
    <div is="elBreadCrumb"></div>
    <div
      :addInfo="addInfo"
      ref="vDialog"
      is="roleInfo"
    ></div>
    <div @edit="edit" is="roleList"></div>
  </div>
</template>
<script>
import roleInfo from './addinfo'
import roleList from './list'

export default {
  components: {
    roleInfo,
    roleList
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