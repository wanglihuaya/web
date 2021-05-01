<template>
  <div>
    <el-table
      stripe
      border
      default-expand-all
      :data="bannerList"
      style="width: 100%"
    >
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="title" label="轮播图标题"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="item">
          <div v-if="item.row.pid != 0">
            <img
              class="img"
              :src="
                item.row.img
                  ? $imgUrl + item.row.img
                  : 'http://qmczoap40.hb-bkt.clouddn.com/uPic/MsT3r2/2021/01/20/22:30:46'
              "
              alt=""
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.status == 1" type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <div>
            <el-button type="primary" @click="edit(item.row.id)" size="small"
              >编辑</el-button
            >
            <el-button type="danger" @click="del(item.row.id)" size="small"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 引入获取菜单列表
import { mapActions, mapGetters } from "vuex";
import { getBannerDelete } from "../../tools/axios";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      bannerList: "banner/getBannerList"
    })
  },
  mounted() {
    this.getBannerListAction();
  },
  methods: {
    ...mapActions({
      getBannerListAction: "banner/getBannerListAction"
    }),
    // 打开编辑弹框
    edit(id) {
      this.$emit("edit", id);
    },
    // 删除数据
    del(id) {
      this.$confirm("确定删除这条信息吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          getBannerDelete({ id }).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getBannerListAction();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style lang="" scoped>
.img {
  width: 120px;
  height: 120px;
}
</style>
