import http from '../../axios/http';

// 登录
export const userLogin = (params, cb) => async dispatch => {
    let response = await http.requestPost(http.userLogin, params);
    cb && cb(response);
}