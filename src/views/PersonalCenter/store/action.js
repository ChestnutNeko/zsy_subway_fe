import http from '../../../axios/http';

// 获取收藏失物列表
export const theLostCollectList = (params, cb) => async dispatch => {
    let response = await http.requestPost(http.theLostCollectList, params);
    cb && cb(response);
}

// 路线取消收藏
export const routeDelete = (params, cb) => async dispatch => {
    let response = await http.requestPost(http.routeDelete, params);
    cb && cb(response);
}

// 获取收藏路线列表
export const routeCollectList = (params, cb) => async dispatch => {
    let response = await http.requestPost(http.routeCollectList, params);
    cb && cb(response);
}

// 失物取消收藏
export const theLostListDelete = (params, cb) => async dispatch => {
    let response = await http.requestPost(http.theLostListDelete, params);
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

// 所有用户信息
export const allUserList = (params, cb) => async dispatch => {
    let response = await http.requestPost(http.allUserList, params);
    cb && cb(response);
}