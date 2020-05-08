import { createStore, applyMiddleware, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';
import routerReducer from '../routers/store/reducer';
import loginInfo from './store/reducer';

// 加载reducer
const reducers = combineReducers({
    routerReducer, // 导航栏
    loginInfo,
});

// 加载中间件
const middleware = [reduxThunk];

export default createStore(reducers, applyMiddleware(...middleware));