// axios 拦截器
import axios from 'axios'

// 请求发出之前拦截
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    // 给路由带token
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`; //Bearer纸片人 建议写法
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// 请求得到响应之前拦截
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // 把JWT的值设置到localStorage中
    const { authorization } = response.headers;
    authorization && localStorage.setItem('token', authorization);
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const { status } = error.response;
    if(status === 401) {
        window.location.href = '#/login';
    }
    return Promise.reject(error);
});