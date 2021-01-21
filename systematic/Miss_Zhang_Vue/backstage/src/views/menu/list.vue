<template>
  <div>
    <el-table
      border
      :data="menuList"
      stripe
      style="width: 100%"
      row-key="id"
      :tree-props="{ children: 'children' }"
      default-expand-all
    >
      <el-table-column prop="id" label="菜单编号"> </el-table-column>
      <el-table-column prop="title" label="菜单名称"> </el-table-column>
      <el-table-column prop="pid" label="上级菜单"> </el-table-column>
      <el-table-column prop="icon" label="菜单图标"> </el-table-column>
      <el-table-column prop="url" label="菜单地址"> </el-table-column>
      <el-table-column prop="status" label="状态"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" size="mini" @click="edit(scope.row.id)">编辑</el-button>
            <el-button type="danger" @click="del(scope.row.id)" size="mini"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { deleteMenu } from '../../tools/axios'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      menuList: 'menu/getMenuList'
    })
  },
  mounted () {
    this.getMenuList()
  },
  methods: {
    ...mapActions({
      getMenuList: 'menu/getMenuListAction'
    }),
    edit (id) {
      this.$emit('edit', id)
    },
    /* 删除 */
    del (id) {
      this.$confirm('Are you sure???', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMenu({
          id
        })
          .then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg)
              this.getMenuList()
            } else {
              this.$message.error(res.data.msg)
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>
 <style scoped>
</style>