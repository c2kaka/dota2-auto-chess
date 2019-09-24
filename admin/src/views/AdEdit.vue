<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}广告位</h1>

    <el-form label-width="120px" @submit.native.prevent="save">

      <el-form-item label="广告位名称">
        <el-input v-model="model.name" placeholder="广告位名称"></el-input>
      </el-form-item>

      <el-form-item label="添加广告">
        <el-button type="primary" @click="model.items.push({})">
          <i class="el-icon-plus">添加广告</i>
        </el-button>
        <el-row type="flex" style="flex-wrap:wrap;margin-top:1rem">
          <el-col style="margin-left:1rem" :md="11" v-for="(item,i) in model.items" :key="i">
            <el-form-item label="广告标题">
              <el-input v-model="item.title" placeholder="广告标题"></el-input>
            </el-form-item>

            <el-form-item style="margin-top:0.5em" label="广告海报">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :headers="getAuthorization()"
                :show-file-list="false"
                :on-success="res => $set(item, 'image', res.url)"
              >
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>

            <el-form-item label="广告链接">
              <el-input v-model="item.url" placeholder="广告链接"></el-input>
            </el-form-item>

            <el-form-item style='text-align:center'>
              <el-button type="danger" size="small" @click="model.items.splice(i,1)">删除</el-button>
            </el-form-item>

          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item style='text-align:center'>
        <el-button type="primary" native-type="submit">提交</el-button>
        <el-button type="primary" @click="$router.push('/ads/list')">返回</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  name: "AdEdit",
  props: {
    id: {}
  },
  data() {
    return {
      model: {
        items: []
      }
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`rest/ads/${this.id}`, this.model);
        this.routerPush();
      } else {
        await this.$http.post("rest/ads", this.model);
        this.routerPush();
      }
    },

    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`);
      this.model = res.data;
    },

    routerPush() {
      this.$router.push("/ads/list");
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