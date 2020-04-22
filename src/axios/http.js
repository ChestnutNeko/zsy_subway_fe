/**
 * 接口
 */
import axios from 'axios';
import './server';

let BASEURL = ""; // 请求接口地址
let BASEURL_DOMAIN = "";
const API_PREFIX = ""; // api前缀
// const protocol = window.location.protocol;

const DEV_DOMAIN = ""; // 开发环境域名

if (process.env.REACT_APP_SECRET_API === "development") {
  BASEURL_DOMAIN = DEV_DOMAIN;
}
BASEURL = BASEURL_DOMAIN + API_PREFIX;

const HEADER = { "Content-Type": "application/json;charset=UTF-8" };
const FILEHEADER = { "Content-Type": "multipart/form-data" };

export default {
    // 首页

    // 地铁路线
    routeCollect: '', // 路线收藏（增）

    // 地铁购票

    // 失物招领
    theLostList: 'get_goods_list', // 获取失物列表+模糊搜索（查）
    theLostListCollect: '', // 失物列表收藏（增）

    theLostListAdd: '', // 新增失物（增）

    // 个人中心
    personInfoList: '', // 个人信息（查）
    personInfoUpdate: '', // 个人信息修改（改）

    theLostCollectList: '', // 收藏失物列表（查）
    theLostListDelete: '', // 失物取消收藏（删）

    routeCollectList: '', // 收藏路线列表（查）
    routeDelete: '', // 路线取消收藏（删）

    HEADER: HEADER,
    FILEHEADER: FILEHEADER,
    async requestGet(url, params) {
        let response = await axios.get(BASEURL + url, { params: params });
        if (process.env.NODE_ENV !== "production") {
        console.log(
            "%c" + url,
            "color:red",
            ",param:",
            params,
            ",response:",
            response.data
        );
        }
        return response.data;
    },

    async requestPost(url, param, timeout = 1000 * 60 * 5) {
        try {
        let response = await this.request(url, "post", param, timeout);
        if (process.env.NODE_ENV !== "production") {
            console.log(
            "%c" + url,
            "color:red",
            ",param:",
            param,
            ",response:",
            response.data
            );
        }
        return response.data;
        } catch (e) {
        if (process.env.NODE_ENV !== "production") {
            console.log(
            "%c" + url,
            "color:red",
            ",param:",
            param,
            ",response:",
            "服务器异常，请稍后重试"
            );
        }
        return { code: "error", msg: "服务器异常，请稍后重试" };
        }
    },

    request(url, method, param, timeout, headers = HEADER) {
        return axios({
        method: method,
        url: BASEURL + url,
        headers: headers,
        data: param,
        timeout: timeout
        });
    }
}