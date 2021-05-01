<template>
  <div>
    <el-table :data="seckList" border style="width: 100%">
      <el-table-column prop="title" label="活动名称" width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态">
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
            <el-button type="info" plain @click="edit(item.row.id)"
              >编辑</el-button
            >
            <el-button @click="del(item.row.id)" type="danger" plain
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
//引入辅助性函数
import { mapActions, mapGetters } from "vuex";
//引入封装好的接口
import { getSeckDelete } from "../../tools/axios";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      seckList: "seckill/getSeckList"
    })
  },
  mounted() {
    //组件一加载触发行动
    this.getSeckListAction();
  },
  methods: {
    //获取行动
    ...mapActions({
      getSeckListAction: "seckill/getSeckListAction"
    }),
    del(id) {
      this.$confirm("确定要删除这一条数据吗？？？！！！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          getSeckDelete({ id }).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getSeckListAction();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //封装一个编辑传id事件
    edit(id) {
      this.$emit("edit", id);
    }
  }
};
</script>

<style lang="" scoped></style>
