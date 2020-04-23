import http from '../../../axios/http';

// 获取收藏路线列表
export const theLostCollectList = (params, cb) => async dispatch => {
    let response = await http.requestPost(http.theLostCollectList, params);
    cb && cb(response);
}

// 个人信息
export const userInfo = (params, cb) => async dispatch => {
    let response = await http.requestPost(http.userInfo, params);
    cb && cb(response);
}

// 个人信息修改
export const userInfoUpdate = (params, cb) => async dispatch => {
    let response = await http.requestPost(http.userInfoUpdate, params);
    cb && cb(response);
}