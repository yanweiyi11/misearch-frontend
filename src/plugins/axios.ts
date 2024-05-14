import axios from 'axios'

// 添加请求拦截器
axios.interceptors.request.use(
    function (config) {
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

// 添加响应拦截器
axios.interceptors.response.use(
    function (response) {
        console.log('响应：', response)
        return response
    },
    function (error) {
        return Promise.reject(error)
    }
)