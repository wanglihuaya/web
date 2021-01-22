<template>
  <div>
    <el-table :data="getSpecsList" border style="width: 100%">
      <el-table-column prop="id" label="规格编号" width="180">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180">
      </el-table-column>
      <el-table-column label="规格属性" width="180">
        <template slot-scope="item">
          <div>
            <el-tag v-for="attr in item.row.attrs"  type="info" :key='attr'>{{attr}}</el-tag>
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
    <el-pagination :page-size='getSpecsSize' background layout="prev, pager, next" :total="getCountNum" @current-change='changePage'>
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getSpecsDelete } from "../../tools/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getSpecsListAction();
    this.getCountAction()
  },
  computed: {
    ...mapGetters({
      getSpecsList: "specs/getSpecsList",
      getSpecsSize:'specs/getSpecsSize',
      getCountNum:'specs/getCountNum'
    })
  },
  methods: {
    ...mapActions({
      getSpecsListAction: "specs/getSpecsListAction",
      getCountAction:'specs/getCountAction',
      changePageAction:'specs/changePageAction'
    }),
    changePage(n){
      console.log(n,'当前页码数');
      this.changePageAction(n)
    },
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      this.$confirm("你确定要删除这条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //调取删除接口
          getSpecsDelete({
            id
          }).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.getSpecsListAction();
              this.getCountAction()
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
.el-pagination{
  float: right;
  margin: 20px 35px 0 0;
}</style>
