import http from '../../../axios/http';

// 获取失物列表
export const theLostList = (params, cb) => async dispatch => {
    let response = await http.requestPost(http.theLostList, params);
    cb && cb(response);
}