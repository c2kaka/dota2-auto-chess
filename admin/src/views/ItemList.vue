<template>
  <el-table :data="items" style="width: 100%">
    <el-table-column prop="_id" label="ID" width="240"></el-table-column>
    <el-table-column prop="name" label="分类名称"></el-table-column>
    <el-table-column prop="icon" label="图标"></el-table-column> 
    <el-table-column fixed="right" label="操作" width="200">
      <template slot-scope="scope">
        <el-button type="primary" size="small" @click="$router.push(`/items/edit/${scope.row._id}`)">编辑</el-button>
        <el-button type="primary" size="small" @click={handleDelete(scope.row)}>删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },

  methods: {
    async fetch() {
      const res = await this.$http.get("rest/items");
      this.items = res.data;
    },

    async handleDelete(row){
        this.$confirm(`是否删除此分类 "${row.name}"?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.$http.delete(`rest/items/${row._id}`);
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