import { message } from 'antd';

export const okCode = http.responseOkCode;

const actionType = {
	USERLOGININFO: 'userLoginInfo', // 用户登录信息
	USERPERMISSION: 'userPermission', // 用户权限
};
const action = {
	// 获取用户登录信息
	userLoginInfo(params, cb) {
		// return async dispatch => {
		return dispatch => {
			// let response = await http.requestGet(http.getUserInfoUrl, params);
			let response = {
				"code": 0,
				"msg": null,
				"data": {
					"userId": "48",
					"userName": "18612273985",
					"avatar": null,
				   	"role": 1
				}
			}
			if(response.code === okCode) {
				// response.data={
				// 	role: 1
				// }
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

export { actionType, action }