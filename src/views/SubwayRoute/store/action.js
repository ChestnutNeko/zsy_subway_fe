import http from '../../../axios/http';

// 地铁路线
export const routeCollect = (params, cb) => async dispatch => {
    let response = await http.requestPost(http.routeCollect, params);
    cb && cb(response);
}