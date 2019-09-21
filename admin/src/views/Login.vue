<template>
  <div>
    <el-card header="登录" class="login-card">
      <el-form label-width="5rem" @submit.native.prevent="handleLogin">
        <el-form-item label="用户名">
          <el-input v-model="model.username" placeholder="请输入用户名"></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input type="password" v-model="model.password" placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item label-width="0">
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      model: {}
    };
  },

  methods: {
   async handleLogin() {
     const res = await this.$http.post('login', this.model);
     if(res.data.token){
       localStorage.setItem('token',res.data.token);
       this.$router.push('/');
       this.$message({
         type: 'success',
         message: '登录成功！'
       })
     }
    }
  }
};
</script>

<style scoped>
.login-card {
  width: 30rem;
  margin: 5rem auto;
  text-align: center;
}
</style>