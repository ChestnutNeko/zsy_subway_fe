/**
 * 登录页面
 */
import axios from 'axios';
import { base } from '../config';
// import cookie from 'react-cookies'; //引入cookie保存登录信息
import { message } from 'antd';

export default {
    // 登录
    async login(params) {
        return await axios.post(`${base}/api/demo/login`, params).then(res => {
            return res.data;
        }).catch(error => {
            message.error('服务器出错');
        });
    },
    
    // 获取用户信息
    // async getUserInfo(params) {
    //     return await axios.post(`${base}/api/demo/user_info`, {
    //         params,
    //         headers: {
    //             'token': cookie.load('usertoken')
    //         }
    //     }).then(res => {
    //         return res.data;
    //     }).catch(error => {
    //         message.error('服务器错误');
    //     });
    // }
}