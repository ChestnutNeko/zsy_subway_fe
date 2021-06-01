// import React from 'react';
import { actionType } from './action';

const loginInfo = {
    
}

export default (state = loginInfo, action) => {
	switch (action.type) {
		case actionType.LOGININFO: {
			break
		}
		default: {
			return state;
		}
	}
}