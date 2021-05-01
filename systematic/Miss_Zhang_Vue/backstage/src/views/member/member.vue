<template>
  <div>
    <div is="elBreadCrumb"></div>
    <v-list class="v-list" @edit="edit"></v-list>
    <div is="addInfo" ref="dialog" @cancel="cancel" :addInfo="addInfo"></div>
  </div>
</template>

<script>
import vList from "./list";
import addInfo from "./addInfo";
export default {
  data() {
    return {
      addInfo: {
        isShow: false, //弹框打开关闭
        isAdd: true //添加还是编辑
      }
    };
  },
  components: {
    vList,
    addInfo
  },
  methods: {
    cancel() {
      this.addInfo.isShow = false;
    },
    edit(e) {
      this.addInfo.isShow = true;
      this.addInfo.isAdd = false;
      this.$refs.dialog.look(e);
    }
  }
};
</script>

<style lang="" scoped>
.v-list {
  margin: 20px 0;
}
</style>
