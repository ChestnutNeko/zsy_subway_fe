/**
 * 接口
 */
import { createApi } from '../configs/ajax';
import { mockURL, /* baseURL, */ path } from '../configs/config';

const prefix = 'usercenter'
const option = { baseURL: mockURL }

// export const login = createApi(`${path}/${prefix}/login`, option) // 登陆
// export const logout = createApi(`${path}/${prefix}/logout`, option) // 登出

// 首页

// 地铁路线
export const routeCollect = createApi(`${path}/${prefix}/route/collect`, option) // 路线收藏（增）

// 地铁购票

// 失物招领
export const theLostList = createApi(`${path}/${prefix}/lost/list`, option) // 获取失物列表+模糊搜索（查）
export const theLostListCollect = createApi(`${path}/${prefix}/lost/collect`, option) // 失物列表收藏（增）

export const theLostListAdd = createApi(`${path}/${prefix}/lost/add`, option) // 新增失物（增）

// 个人中心
export const personInfoList = createApi(`${path}/${prefix}/person/info`, option) // 个人信息（查）
export const personInfoUpdate = createApi(`${path}/${prefix}/person/update`, option) // 个人信息修改（改）

export const theLostCollectList = createApi(`${path}/${prefix}/person/lost`, option) // 收藏失物列表（查）
export const theLostListDelete = createApi(`${path}/${prefix}/person/lost`, option) // 失物取消收藏（删）

export const routeCollectList = createApi(`${path}/${prefix}/person/route`, option) // 收藏路线列表（查）
export const routeDelete = createApi(`${path}/${prefix}/person/routedelete`, option) // 路线取消收藏（删）