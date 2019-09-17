<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}物品</h1>
    <el-form label-width="120px"  @submit.native.prevent="save">
      <el-form-item label="物品名称">
        <el-input v-model="model.name" placeholder="物品名称"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-input v-model="model.icon" placeholder="图标"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "ItemEdit",
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
      if (this.id) {
        await this.$http.put(`rest/items/${this.id}`, this.model);
        this.routerPush();
      } else {
        await this.$http.post("rest/items", this.model);
        this.routerPush();
      }
    },

    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`);
      this.model = res.data;
    },

    routerPush() {
      this.$router.push("/items/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    }
  },

  created() {
    this.id && this.fetch();
  }
};
</script>