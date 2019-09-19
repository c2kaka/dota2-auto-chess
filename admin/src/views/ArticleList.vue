<template>
  <el-table :data="articles" style="width: 100%">
    <el-table-column prop="_id" label="ID" width="240"></el-table-column>
    <el-table-column prop="title" label="文章标题"></el-table-column>
    <el-table-column fixed="right" label="操作" width="200">
      <template slot-scope="scope">
        <el-button type="primary" size="small" @click="$router.push(`/articles/edit/${scope.row._id}`)">编辑</el-button>
        <el-button type="primary" size="small" @click={handleDelete(scope.row)}>删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      articles: []
    };
  },

  methods: {
    async fetch() {
      const res = await this.$http.get("rest/articles");
      this.articles = res.data;
    },

    async handleDelete(row){
        this.$confirm(`是否删除此文章 "${row.title}"?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.$http.delete(`rest/articles/${row._id}`);
          this.$message({
            type: 'success',
            message: '删除成功!'
          }); 
          this.fetch();
        });
    }
  },

  created() {
    this.fetch();
  }
};
</script>

<style scoped>
</style>