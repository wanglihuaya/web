<template>
  <div>
    <el-table :data="getManagerList" border stripe style="width: 100%">
      <el-table-column prop="uid" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名称" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色" width="180">
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <div>
            <el-tag v-if="scope.row.status == 1" type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" @click="edit(scope.row.uid)" size="mini"
              >编辑</el-button
            >
            <el-button type="danger" @click="del(scope.row.uid)" size="mini"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="getManageSize"
      layout="prev, pager, next"
      :total="getCountNum"
      @current-change="changePage"
      right
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { deleteManager } from "../../tools/axios";
export default {
  data () {
    return {};
  },
  mounted () {
    this.getManagerListAction();
    this.getCountAction();
  },
  computed: {
    ...mapGetters({
      getManagerList: "manager/getManagerList",
      getManageSize: "manager/getManageSize",
      getCountNum: "manager/getCountNum"
    })
  },
  methods: {
    ...mapActions({
      getManagerListAction: "manager/getManagerListAction",
      getCountAction: "manager/getCountAction",
      changePageAction: "manager/changePageAction"
    }),
    changePage (n) {
      this.changePageAction(n);
    },
    edit (id) {
      this.$emit("edit", id);
    },
    del (id) {
      this.$confirm("Are you Sure to Delete this???", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteManager({
            uid: id
          }).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.getManagerListAction();
              this.getCountAction();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "删除已取消"
          });
        });
    }
  }
};
</script>

<style lang="" scoped>
  .el-pagination {
    text-align: right;
  }
</style>
