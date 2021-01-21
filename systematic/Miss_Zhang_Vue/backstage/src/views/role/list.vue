<template>
  <div>
    <el-table border :data="getRoleList" stripe style="width: 100%">
      <el-table-column prop="id" label="角色编号"> </el-table-column>
      <el-table-column prop="rolename" label="角色名称"> </el-table-column>
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
            <el-button type="primary" @click="edit(item.row.id)" size="mini"
              >编辑</el-button
            >
            <el-button type="danger" @click="del(item.row.id)" size="mini"
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
import { deleteRole } from '../../tools/axios'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      getRoleList: 'role/getRoleList'
    })
  },
  mounted () {
    this.getRoleListAction()
  },

  methods: {
    ...mapActions({
      getRoleListAction: 'role/getRoleListAction'
    }),
    /* 编辑 传id给父组件*/
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
        deleteRole({
          id
        })
          .then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg)
              /* 删除之后要重新调取列表 */
              this.getRoleListAction()
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