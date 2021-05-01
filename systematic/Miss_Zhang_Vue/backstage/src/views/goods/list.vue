<template>
  <div>
    <el-table :data="getGoodsList" border style="width: 100%">
      <el-table-column prop="id" label="商品编号" width="180">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="180">
      </el-table-column>
      <el-table-column prop="price" label="商品价格" width="180">
      </el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="180">
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="item">
          <div>
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
      <el-table-column label="是否新品">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.isnew == 1" type="success">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.ishot == 1" type="success">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
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
    <el-pagination
      :page-size="getGoodsSize"
      background
      layout="prev, pager, next"
      :total="getCountNum"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getGoodsDelete } from "../../tools/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getGoodsListAction();
    this.getCountAction();
  },
  computed: {
    ...mapGetters({
      getGoodsList: "goods/getGoodsList",
      getGoodsSize: "goods/getGoodsSize",
      getCountNum: "goods/getCountNum"
    })
  },
  methods: {
    ...mapActions({
      getGoodsListAction: "goods/getGoodsListAction",
      getCountAction: "goods/getCountAction",
      changePageAction: "goods/changePageAction"
    }),
    changePage(n) {
      console.log(n, "当前页码数");
      this.changePageAction(n);
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
          getGoodsDelete({
            id
          }).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.getGoodsListAction();
              this.getCountAction();
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
.el-pagination {
  float: right;
  margin: 20px 35px 0 0;
}
</style>
