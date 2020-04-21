/**
 * 管理员，用户管理
 */
import React, { Component } from 'react';
import { Breadcrumb, Table, Button, Input } from 'antd';
import './index.css';
const { Search } = Input;
var echarts = require('echarts/lib/echarts');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

class UserManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            columns: [{
                title: '编号',
                dataIndex: 'id',
                key: 'id'
            }, {
                title: '用户id',
                dataIndex: 'userId',
                key: 'userId'
            }, {
                title: '用户昵称',
                dataIndex: 'userName',
                key: 'userName'
            }, {
                title: '所在地区',
                dataIndex: 'userPosition',
                key: 'userPosition'
            }, {
                title: '联系电话',
                dataIndex: 'userPhone',
                key: 'userPhone'
            }, {
                title: '邮箱',
                dataIndex: 'userEmail',
                key: 'userEmail'
            }, {
                title: '常乘地铁',
                dataIndex: 'userSubway',
                key: 'userSubway'
            }, {
                title: '失物审批',
                dataIndex: 'userLost',
                key: 'userLost'
            }, {
                title: '操作',
                dataIndex: 'opration',
                key: 'opration',
                render: () => {
                    return(
                        <div>
                            <Button type='primary'>详情</Button>
                            <Button type='primary'>审批通过</Button>
                        </div>
                    )
                }
            }]
        }
    }

    componentDidMount() {
        this.drawEcharts();
    }

    drawEcharts = () => {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: 'zsy_subway用户访问来源（前5）',
                subtext: '城市',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['北京', '上海', '沈阳', '广州', '深圳']
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        {value: 20, name: '北京'},
                        {value: 18, name: '上海'},
                        {value: 15, name: '沈阳'},
                        {value: 13, name: '广州'},
                        {value: 12, name: '深圳'}
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        });
    }

    handleUserSearch = () => {
        console.log('userSearch');
    }

    render() {
        const { dataSource, columns } = this.state;
        return(
            <div className='user-management'>
                <Breadcrumb>
                    <Breadcrumb.Item>个人中心</Breadcrumb.Item>
                    <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                </Breadcrumb>
                <div className='user-management-content'>
                    <div className='user-management-echart' id='main'></div>
                    <div className='user-management-header'>
                        <div className='user-management-search'>
                            <Search
                                placeholder='用户id'
                                onSearch={this.handleUserSearch}
                            ></Search>
                        </div>
                    </div>
                    <div className='user-management-table'>
                        <Table dataSource={dataSource} columns={columns}></Table>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserManagement;