import { message } from 'antd';

export const okCode = http.responseOkCode;

const actionType = {
	USERLOGININFO: 'userLoginInfo', // 用户登录信息
	USERPERMISSION: 'userPermission', // 用户权限
};
const action = {
	// 获取用户登录信息
	userLogin(params, cb) {
		return async dispatch => {
		// return dispatch => {
			let response = await http.requestGet(http.userLogin, params);
			// let response = {
			// 	"code": 0,
			// 	"msg": null,
			// 	"data": {
			// 		"userId": "48",
			// 		"userName": "root",
			// 		"userPassword": "123456",
			// 		"avatar": null,
			// 		"role": 1, // -1:未登录; 1:用户（已登录）; 2:管理员（已登录）
			// 		"permissions": {
			// 			"homePermission": 1,
			// 			"subwayRoutePermission": 1,
			// 		}
			// 	}
			// }
			if(response.code === okCode) {
				cb&&cb(response.data);
			} else {
				message.error('获取用户数据错误，请刷新后再试');
			}
		}
	}
};
// 头部请求接口后,修改用户登录信息的方法
// export const switchUserInfo = (userInfo) => {
// 	return {
// 		type: actionType.REQUESTUSEMESSAGE,
// 		userInfoList: userInfo
// 	}
// }

// export default (state = userLoginInfo, action) => {
// 	switch (action.type) {
// 		case actionType.USERLOGININFO: {
// 			break
// 		}
// 		default: {
// 			return state;
// 		}
// 	}
// }

export { actionType, action }