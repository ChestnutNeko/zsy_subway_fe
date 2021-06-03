import React from 'react';
import { actionType } from './action';
import Home from '../../views/Home';
import SubwayRoute from '../../views/SubwayRoute';
import LostProperty from '../../views/LostProperty';
import TheLostList from '../../views/LostProperty/component/TheLostList';
import ReleaseTheLost from '../../views/LostProperty/component/ReleaseTheLost';
import SubwayTicket from '../../views/SubwayTicket';
import PersonalCenter from '../../views/PersonalCenter';
import PersonalInfo from '../../views/PersonalCenter/component/PersonalInfo';
import UserManagement from '../../views/PersonalCenter/component/UserManagement';
import Demo from '../../views/Demo';
import Demo2 from '../../views/Demo2';
import Demo3 from '../../views/Demo3';
import Demo4 from '../../views/Demo4';
import MyCheckbox from '../../views/Demo5';
import { HomeOutlined, BranchesOutlined, PayCircleOutlined, WhatsAppOutlined, UserOutlined } from '@ant-design/icons';

const initRouter = {
    appChildren: [
        {
            path: '/home',
            component: Home,
            key: 'home',
            name: '首页',
            icon: <HomeOutlined />,
            roleList: [-1, 1, 2], // -1:未登录;1:用户（已登录）;2:管理员（已登录）
            isChild: false
        }, {
            path: '/subwayRoute',
            component: SubwayRoute,
            key: 'subwayRoute',
            name: '地铁路线',
            icon: <BranchesOutlined />,
            roleList: [1, 2],
            isChild: false
        }, {
            path: '/subwayTicket',
            component: SubwayTicket,
            key: 'subwayTicket',
            name: '地铁购票',
            icon: <PayCircleOutlined />,
            roleList: [1, 2],
            isChild: false
        }, {
            path: '/lostProperty',
            component: LostProperty,
            key: 'lostProperty',
            name: '失物招领',
            icon: <WhatsAppOutlined />,
            isChild: true,
            child: [
                {
                    path: '/theLostList',
                    component: TheLostList,
                    key: 'theLostList',
                    name: '失物一览',
                    roleList: [1, 2],
                    hidden: false
                }, {
                    path: '/releaseTheLost',
                    component: ReleaseTheLost,
                    key: 'releaseTheLost',
                    name: '发布失物',
                    roleList: [1, 2],
                    hidden: false
                }
            ]
        }, {
            path:'/personalCenter',
            component: PersonalCenter,
            key: 'personalCenter',
            name: '个人中心',
            icon: <UserOutlined />,
            isChild: true,
            child: [
                {
                    path: '/personalInfo',
                    component: PersonalInfo,
                    key: 'personalInfo',
                    name: '个人信息',
                    roleList: [1, 2],
                    hidden: false
                }, {
                    path: '/userManagement',
                    component: UserManagement,
                    key: 'userManagement',
                    name: '用户管理',
                    roleList: [2],
                    hidden: false
                }
            ]
        }, {
            path: '/demo',
            component: Demo,
            key: 'demo',
            name: 'DEMO',
            icon: <HomeOutlined />,
            roleList: [-1, 1, 2], // -1:未登录;1:用户（已登录）;2:管理员（已登录）
            isChild: false
        }, {
            path: '/demo2',
            component: Demo2,
            key: 'demo2',
            name: 'DEMO2',
            icon: <HomeOutlined />,
            roleList: [-1, 1, 2], // -1:未登录;1:用户（已登录）;2:管理员（已登录）
            isChild: false
        }, {
            path: '/demo3',
            component: Demo3,
            key: 'demo3',
            name: 'DEMO3',
            icon: <HomeOutlined />,
            roleList: [-1, 1, 2],
            isChild: false
        }, {
            path: '/demo4',
            component: Demo4,
            key: 'demo4',
            name: 'DEMO4',
            icon: <HomeOutlined />,
            roleList: [-1, 1, 2],
            isChild: false
        }, {
            path: '/demo5',
            component: MyCheckbox,
            key: 'demo5',
            name: 'MyCheckbox',
            icon: <HomeOutlined />,
            roleList: [-1, 1, 2],
            isChild: false
        },
    ]
}

export default (state = initRouter, action) => {
	switch (action.type) {
		case actionType.CONTROLROUTERPERMISSION: {
			break
		}
		default: {
			return state;
		}
	}
}