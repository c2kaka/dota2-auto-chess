<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="英雄名称">
        <el-input v-model="model.name" placeholder="英雄名称"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL+'/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.avatar" :src="model.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="英雄别名">
        <el-input v-model="model.title" placeholder="英雄别名"></el-input>
      </el-form-item>
      <el-form-item label="英雄分类">
        <el-select style="width: 100%" v-model="model.categories" multiple placeholder="请选择">
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="氪金度">
        <el-rate class="score-rate" show-score v-model="model.scores.cost"></el-rate>
      </el-form-item>
      <el-form-item label="技能评分">
        <el-rate class="score-rate" show-score v-model="model.scores.skills"></el-rate>
      </el-form-item>
      <el-form-item label="攻击评分">
        <el-rate class="score-rate" show-score v-model="model.scores.attack"></el-rate>
      </el-form-item>
      <el-form-item label="生存评分">
        <el-rate class="score-rate" show-score v-model="model.scores.survive"></el-rate>
      </el-form-item>

      <el-form-item label="推荐装备">
        <el-select style="width: 100%" v-model="model.items" multiple placeholder="请选择">
          <el-option
            v-for="item in items"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "HeroEdit",
  props: {
    id: {}
  },
  data() {
    return {
      categories: [],
      items: [],
      model: {
        name: "",
        avatar: "",
        scores: {}
      }
    };
  },
  methods: {
    afterUpload(res) {
      this.model.avatar = res.url;
    },

    async save() {
      if (this.id) {
        await this.$http.put(`rest/heroes/${this.id}`, this.model);
        this.routerPush();
      } else {
        await this.$http.post("rest/heroes", this.model);
        this.routerPush();
      }
    },

    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    },

    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    },

    async fetchItems() {
      const res = await this.$http.get(`rest/items`);
      this.items = res.data;
    },

    routerPush() {
      this.$router.push("/heroes/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    }
  },

  created() {
    this.fetchItems();
    this.fetchCategories();
    this.id && this.fetch();
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.score-rate{
  position: absolute;
  left: 1rem;
  margin-top: 0.6rem;
}
</style>