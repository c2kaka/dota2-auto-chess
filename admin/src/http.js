import axios from 'axios';
import Vue from 'vue';
import router from './router';

const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api',
    timeout: 1000
});

http.interceptors.request.use(function (config) {
    if(localStorage.getItem('token')){
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

http.interceptors.response.use(res => {
    return res;
}, err => {
    if(err.response.data.message){
        Vue.prototype.$message({
            type: 'error',
            message: err.response.data.message
        })
    }
    console.log(err.response);
    if(err.response.status === 401){
        router.push('/login');
    }
    return Promise.reject(err);
})

export default http;