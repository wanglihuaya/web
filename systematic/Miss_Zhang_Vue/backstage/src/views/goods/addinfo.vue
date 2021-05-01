<template>
  <div>
    <el-button
      plain
      type="primary"
      @click="
        addInfo.dialogFormVisible = true;
        addInfo.dialogEditVisible = true;
      "
    >
      添加
    </el-button>
    <el-dialog
      :title="addInfo.dialogEditVisible ? '添加商品' : '编辑商品'"
      :visible.sync="addInfo.dialogFormVisible"
      center
      :before-close="cancel"
      @opened="createEditor"
    >
      <el-form :model="goodsForm" :rules="rules" ref="ruleForm">
        <el-form-item
          label="一级分类："
          prop="first_cateid"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="goodsForm.first_cateid"
            @change="changeCate"
            placeholder="请选择"
          >
            <el-option
              v-for="item in getSortList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="二级分类："
          prop="second_cateid"
          :label-width="formLabelWidth"
        >
          <el-select v-model="goodsForm.second_cateid" placeholder="请选择">
            <el-option
              v-for="item in secondCate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="商品名称："
          prop="goodsname"
          :label-width="formLabelWidth"
        >
          <el-input v-model="goodsForm.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="商品价格："
          prop="price"
          :label-width="formLabelWidth"
        >
          <el-input v-model="goodsForm.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="市场价格："
          prop="market_price"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="goodsForm.market_price"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="图片：" :label-width="formLabelWidth">
          <el-upload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change="onChange"
            :file-list="fileList"
            :limit="1"
            :on-exceed="handleExceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item
          label="商品规格："
          prop="specsid"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="goodsForm.specsid"
            @change="changeSpecs"
            placeholder="请选择"
          >
            <el-option
              v-for="item in getSpecsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="规格属性："
          prop="specsattr"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="goodsForm.specsattr"
            :multiple="true"
            placeholder="请选择"
          >
            <el-option
              v-for="item in specsArr"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品：" :label-width="formLabelWidth">
          <el-radio v-model="goodsForm.isnew" :label="1">是</el-radio>
          <el-radio v-model="goodsForm.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖：" :label-width="formLabelWidth">
          <el-radio v-model="goodsForm.ishot" :label="1">是</el-radio>
          <el-radio v-model="goodsForm.ishot" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-switch
            v-model="goodsForm.status"
            active-color="teal"
            inactive-color="tomato"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="商品描述：" :label-width="formLabelWidth">
          <div id="editor"></div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button
          v-if="addInfo.dialogEditVisible"
          @click="add('ruleForm')"
          type="primary"
          >确 定</el-button
        >
        <el-button v-else @click="update('ruleForm')" type="primary"
          >编辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import W from "wangeditor";
import { mapGetters, mapActions } from "vuex";
import { getGoodsAdd, getGoodsEdit, getGoodsInfo } from "../../tools/axios";
export default {
  data() {
    return {
      goodsForm: {
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //市场价格
        img: "", //商品图片（文件）
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: [], //商品规格属性
        isnew: 1, //是否新品
        ishot: 1, //是否热卖推荐
        status: 1 //状态1正常2禁用
      },
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      imgUrl: "", //文件图片的配置对象
      secondCate: [], //二级分类数组
      specsArr: [], //商品规格属性数组
      editor: null,
      rules: {
        first_cateid: [
          {
            required: true,
            message: "请选择一级分类",
            trigger: "change"
          }
        ],
        second_cateid: [
          {
            required: true,
            message: "请选择二级分类",
            trigger: "change"
          }
        ],
        goodsname: [
          {
            required: true,
            message: "请输入商品名称",
            trigger: "change"
          },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur"
          }
        ],
        price: [
          {
            required: true,
            message: "请输入商品价格",
            trigger: "change"
          }
        ],
        market_price: [
          {
            required: true,
            message: "请输入市场价格",
            trigger: "change"
          }
        ],
        specsid: [
          {
            required: true,
            message: "请选择商品规格",
            trigger: "change"
          }
        ],
        specsattr: [
          {
            required: true,
            message: "请选择规格属性",
            trigger: "change"
          }
        ]
      },
      formLabelWidth: "120px",
      value: "",
      iconList: ["el-icon-s-tools", "el-icon-s-goods"]
    };
  },
  computed: {
    ...mapGetters({
      getSortList: "sort/getSortList",
      getSpecsList: "specs/getSpecsList",
      getGoodsList: "goods/getGoodsList"
    })
  },
  mounted() {
    this.getSortListAction();
    this.getSpecsListAction();
    this.getGoodsListAction();
  },
  props: ["addInfo"],
  methods: {
    createEditor() {
      this.editor = new W("#editor");
      this.editor.create();
      this.editor.txt.html("");
    },
    changeCate() {
      let index = this.getSortList.findIndex(
        item => this.goodsForm.first_cateid == item.id
      );
      this.secondCate = this.getSortList[index].children;
      this.goodsForm.second_cateid = "";
    },

    changeSpecs() {
      console.log(this.goodsForm.specsid, "商品规格编号");
      let index = this.getSpecsList.findIndex(
        item => this.goodsForm.specsid == item.id
      );
      this.specsArr = this.getSpecsList[index].attrs;
      console.log(this.specsArr, "规格属性");

      //当用户切换规格的时候，把双向数据绑定规格属性置空
      this.goodsForm.specsattr = "";
      console.log(this.goodsForm.specsattr, "商品规格属性的双向数据绑定");
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    onChange(file) {
      this.imgUrl = file.raw;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    ...mapActions({
      getSortListAction: "sort/getSortListAction",
      getSpecsListAction: "specs/getSpecsListAction",
      getGoodsListAction: "goods/getGoodsListAction",
      getCountAction: "goods/getCountAction"
    }),
    cancel() {
      console.log(this.addInfo.dialogFormVisible);
      this.addInfo.dialogFormVisible = false;
      this.addInfo.dialogEditVisible = this.addInfo.dialogEditVisible;
      this.reset();
    },
    //封装一个重置事件
    reset() {
      this.goodsForm = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1
      };
      this.$refs["ruleForm"].resetFields();
      this.editor = this.editor.txt.html("");
      this.fileList = [];
    },

    add(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.goodsForm.description = this.editor.txt.html();
          this.goodsForm.specsattr = this.goodsForm.specsattr
            ? this.goodsForm.specsattr.join(",")
            : "";
          this.goodsForm.img = this.imgUrl;
          let file = new FormData();
          console.log(this.goodsForm, "sssss");

          for (let i in this.goodsForm) {
            file.append(i, this.goodsForm[i]);
          }
          console.log(file, "fff");
          getGoodsAdd(file).then(res => {
            console.log(res, "hhh");
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getGoodsListAction();
              this.getCountAction();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    lookInfo(id) {
      getGoodsInfo({ id }).then(res => {
        console.log(res, "查询商品一条数据结果");
        if (res.data.code === 200) {
          this.goodsForm = res.data.list;
          this.goodsForm.id = id;
          this.fileList = this.goodsForm.img
            ? [{ url: this.$imgUrl + this.goodsForm.img }]
            : [];
          this.goodsForm.specsattr = this.goodsForm.specsattr.split(",");
          if (this.editor) {
            this.editor.txt.html(this.goodsForm.description);
          }
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    update(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.goodsForm.img = this.imgUrl ? this.imgUrl : this.goodsForm.img;
          this.goodsForm.specsattr = this.goodsForm.specsattr
            ? this.goodsForm.specsattr.join(",")
            : "";
          this.goodsForm.description = this.editor.txt.html();
          let file = new FormData();
          for (let i in this.goodsForm) {
            file.append(i, this.goodsForm[i]);
          }
          getGoodsEdit(file).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getGoodsListAction();
              this.getCountAction();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="" scoped>
.el-button {
  margin: 20px 0;
}
</style>
