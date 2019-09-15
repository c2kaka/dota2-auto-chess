<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}分类</h1>
    <el-form label-width="120px"  @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select style="width:100%" v-model="model.parent" placeholder="请选择上级分类">
          <el-option
            v-for="item in parents"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称">
        <el-input v-model="model.name" placeholder="分类名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategoryEdit",
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      parents: []
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`categories/${this.id}`, this.model);
        this.routerPush();
      } else {
        await this.$http.post("categories", this.model);
        this.routerPush();
      }
    },

    async fetch() {
      const res = await this.$http.get(`categories/${this.id}`);
      this.model = res.data;
    },

    async fetchParents(){
      const res = await this.$http.get('categories');
      this.parents = res.data;
    },

    routerPush() {
      this.$router.push("/categories/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    }
  },

  created() {
    this.fetchParents();
    this.id && this.fetch();
  }
};
</script>