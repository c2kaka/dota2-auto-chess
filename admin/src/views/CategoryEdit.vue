<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
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
      model: {}
    };
  },
  methods: {
    async save() {
      if(this.id){
        await this.$http.put(`categories/${this.id}`,this.model);
        this.routerPush();
      }else{
        await this.$http.post("categories", this.model);
        this.routerPush();
      }
    },

    async fetch(){
      const res = await this.$http.get(`categories/${this.id}`);
      this.model = res.data;
    },

    routerPush(){
      this.$router.push("/categories/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    }
  },

  created(){
    this.id && this.fetch();
  }
};
</script>