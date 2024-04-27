import axios from "axios";
import { message } from "ant-design-vue";

const mxios = axios.create({
  baseURL: "http://localhost:8101/api/",
  timeout: 10000,
  headers: {},
});

// 添加请求拦截器
mxios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
mxios.interceptors.response.use(
  function (response) {
    const data = response.data;
    if (data.code !== 0) {
      message.error(data.message);
    }
    return data.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default mxios;
