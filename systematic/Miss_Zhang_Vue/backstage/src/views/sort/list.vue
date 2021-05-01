<template>
  <div>
    <el-table
      border
      default-expand-all
      :data="sortList"
      stripe
      row-key="id"
      style="width: 100%"
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="分类编号"></el-table-column>
      <el-table-column prop="catename" label="分类名称"></el-table-column>
      <el-table-column label="图片预览">
        <template slot-scope="item">
          <div v-if="item.row.pid != 0">
            <img
              class="img"
              :src="item.row.img ? $imgUrl + item.row.img : 'http://qmczoap40.hb-bkt.clouddn.com/uPic/MsT3r2/2021/01/20/22:30:46'"
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
import { getSortDelete } from '../../tools/axios'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      sortList: 'sort/getSortList'
    })
  },
  mounted () {
    this.getSortList()
  },

  methods: {
    ...mapActions({
      getSortList: 'sort/getSortListAction'
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
        getSortDelete({
          id
        })
          .then(res => {
            console.log(res);
            if (res.data.code === 200) {
              this.$message.success(res.data.msg)
              /* 删除之后要重新调取列表 */
              this.getSortList()
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
.img {
  width: 120px;
  height: 120px;
}
</style>