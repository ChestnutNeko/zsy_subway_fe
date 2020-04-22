/**
 * axios配置
 */
import axios from 'axios';
import { message } from 'antd';

// 终止axios的fun
let axiosToken = null;

// 请求超时时间
axios.defaults.timeout = 10000;

// 请求拦截器
axios.interceptors.request.use(config => {
    // 在发送之前请求什么
	return config;
}, error => {
    message.warn(error);
	return Promise.reject(error);
});
axios.interceptors.response.use(response => {
    // 请求完成token置空
    axiosToken = null;
    return response;
}, error => {
    // 请求完成token置空
    axiosToken = null;
    // 提示信息
    // message.warn(error);
    return Promise.reject(error); // 返回接口返回的错误信息
    }
);