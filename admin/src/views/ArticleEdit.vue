<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}文章</h1>
    <el-form label-width="120px"  @submit.native.prevent="save">
      <el-form-item label="文章分类">
        <el-select style="width:100%" v-model="model.categories" multiple placeholder="请选择文章分类">
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章标题">
        <el-input v-model="model.title" placeholder="文章标题"></el-input>
      </el-form-item>
      <el-form-item label="文章内容">
        <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">提交</el-button>
        <el-button type="primary" @click="$router.push('/articles/list')">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor';
export default {
  name: "ArticleEdit",
  props: {
    id: {}
  },
  components: {
    VueEditor
  },
  data() {
    return {
      model: {},
      categories: []
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`rest/articles/${this.id}`, this.model);
        this.routerPush();
      } else {
        await this.$http.post("rest/articles", this.model);
        this.routerPush();
      }
    },

    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await this.$http.post('upload',formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },

    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = res.data;
    },

    async fetchCategories(){
      const res = await this.$http.get('rest/categories');
      this.categories = res.data;
    },

    routerPush() {
      this.$router.push("/articles/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    }
  },

  created() {
    this.fetchCategories();
    this.id && this.fetch();
  }
};
</script>