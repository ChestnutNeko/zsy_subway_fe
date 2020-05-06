/**
 * 接口
 */
import axios from 'axios';
import './server';

const BASEURL = "http://localhost:8001/"

const HEADER = { "Content-Type": "application/json;charset=UTF-8" };
const FILEHEADER = { "Content-Type": "multipart/form-data" };

export default {
    // 首页
    userLogin: 'user_info', // 登录

    // 地铁路线
    routeCollect: 'collect_routes', // 路线收藏（增）

    // 地铁购票

    // 失物招领
    theLostList: 'get_goods_list', // 获取失物列表+模糊搜索（查）
    theLostListCollect: 'collect_losts', // 失物列表收藏（增）

    theLostListAdd: 'insert_losts', // 新增失物（增）

    // 个人中心
    userInfo: 'user_info', // 个人信息（查）
    userInfoUpdate: 'update_user', // 个人信息修改（改）

    theLostCollectList: 'get_routes_list', // 收藏失物列表（查）
    theLostListDelete: 'delete_losts', // 失物取消收藏（删）

    routeCollectList: 'collect_goods_list', // 收藏路线列表（查）
    routeDelete: 'delete_routes', // 路线取消收藏（删）

    allUserList: 'all_info', // 管理员查看用户信息（查）

    HEADER: HEADER,
    FILEHEADER: FILEHEADER,
    async requestGet(url, params) {
        let response = await axios.get(BASEURL + url, { params: params });
            return response.data;
    },

    async requestPost(url, param, timeout = 1000 * 60 * 5) {
        try {
        let response = await this.request(url, "post", param, timeout);
            return response.data;
        } catch (e) {
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