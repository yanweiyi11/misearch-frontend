import axios from "axios";

// 全局请求拦截器
axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 全局响应拦截器
axios.interceptors.response.use(
  function (response) {
    console.log(`response：${response}`);
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
