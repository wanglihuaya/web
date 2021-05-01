<template>
  <div>
    <div is="elBreadCrumb"></div>
    <v-add ref="vDialog" :addInfo="addInfo"></v-add>
    <v-table @edit="edit"></v-table>
  </div>
</template>

<script>
//引入table组件
import vTable from "./list";
//引入弹框
import vAdd from "./addInfo";
export default {
  data() {
    return {
      addInfo: {
        dialogFormVisible: false, //用于控制子组件弹框的显示隐藏
        dialogEditVisible: true //是否是添加还是编辑
      }
    };
  },
  components: {
    vTable,
    vAdd
  },
  methods: {
    edit(e) {
      this.addInfo.dialogFormVisible = true;
      this.addInfo.dialogEditVisible = false;
      this.$refs.vDialog.lookInfo(e);
    }
  }
};
</script>

<style lang="" scoped></style>
