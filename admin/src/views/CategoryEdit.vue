<template>
  <div class="about">
    <h1>新建分类</h1>
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
  name: 'CategoryEdit',
  data(){
    return {
      model:{}
    }
  },
  methods:{
    async save(){
      console.log('save categories')
      const res = await this.$http.post('categories',this.model)
      this.$router.push('/categories/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    }
  }
}
</script>