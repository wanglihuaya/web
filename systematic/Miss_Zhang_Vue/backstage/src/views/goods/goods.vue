<template>
  <div>
    <div is="elBreadCrumb"></div>
    <v-add ref="vDialog" :addInfo="addInfo" @cancel="cancel"></v-add>
    <v-table @edit="edit"></v-table>
  </div>
</template>

<script>
//引入table组件
import vTable from './list'
//引入弹框
import vAdd from './addInfo'
export default {
  data () {
    return {
      addInfo: {
        dialogFormVisible: false,//用于控制子组件弹框的显示隐藏
        dialogEditVisible: true,//是否是添加还是编辑
      }
    };
  },
  components: {
    vTable,
    vAdd
  },
  methods: {
    cancel (e) {
      this.addInfo = e
    },
    //封装一个编辑事件
    edit (e) {
      //打开编辑弹框
      this.addInfo.dialogFormVisible = true
      //你是一个编辑
      this.addInfo.dialogEditVisible = false
      //调用查询方法
      this.$refs.vDialog.lookInfo(e)
    }
  },
};
</script>

<style  lang="" scoped>

</style>
