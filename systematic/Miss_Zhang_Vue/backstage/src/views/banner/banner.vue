<template>
  <div>
    <div is="elBreadCrumb"></div>
    <el-button @click="add" type="primary" plain size="small">添加</el-button>
    <div is="addInfo" ref="dialog" :addInfo="addInfo" @cancel="cancel"></div>
    <v-list @edit="edit"></v-list>
  </div>
</template>

<script>
import vList from "./list";
import addInfo from "./addInfo";
export default {
  data() {
    return {
      addInfo: {
        isShow: false, //控制弹框显示隐藏
        isAdd: true //控制弹框是添加菜单还是编辑菜单，true为添加
      }
    };
  },
  components: {
    vList,
    addInfo
  },
  methods: {
    cancel(e) {
      this.addInfo = e;
    },
    add() {
      this.addInfo.isShow = true;
      this.addInfo.isAdd = true;
    },
    // 编辑
    edit(e) {
      this.addInfo.isShow = true;
      this.addInfo.isAdd = false;
      this.$refs.dialog.lookUp(e);
    }
  }
};
</script>

<style lang="" scoped>
.el-button {
  margin: 20px 0;
}
</style>
