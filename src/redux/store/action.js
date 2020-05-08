import http from '../../axios/http';

const actionType = {
	LOGININFO: 'loginInfo', // 登陆状态
};
const action = {
	// 获取用户登录信息
	userLogin(params, cb) {
		return async dispatch => {
			let response = await http.requestGet(http.userLogin, params);
			cb && cb(response);
		}
	}
};

export { actionType, action }