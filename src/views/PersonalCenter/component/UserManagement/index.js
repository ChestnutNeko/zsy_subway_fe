/**
 * 管理员，用户管理
 */
import React, { Component } from 'react';
import { Breadcrumb, Table, Button, Input, message } from 'antd';
import './index.css';
import { connect } from 'react-redux';
import * as actions from '../../store/action';
import PaginationUi from '../../../../components/PaginationUi';
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
                title: '用户id',
                dataIndex: 'user_id',
                key: 'userId'
            }, {
                title: '用户名',
                dataIndex: 'user_name',
                key: 'userName'
            }, {
                title: '用户类型',
                dataIndex: 'user_type',
                key: 'userType'
            }, {
                title: '所在地区',
                dataIndex: 'user_city',
                key: 'userCity'
            }, {
                title: '联系电话',
                dataIndex: 'user_telephone',
                key: 'userTelephone'
            }, {
                title: '邮箱',
                dataIndex: 'user_email',
                key: 'userEmail'
            }, {
                title: '常乘地铁',
                dataIndex: 'user_subway',
                key: 'userSubway'
            }, {
                title: '操作',
                dataIndex: 'opration',
                key: 'opration',
                render: () => {
                    return(
                        <div>
                            <Button type='primary'>详情</Button>
                        </div>
                    )
                }
            }],
            loading: false,
            userName: 'afvdv',
            page: 1,
            pageSize: 10,
            totalNum: 2, // 总条数
            pages: 1, // 总页数
        }
    }

    componentDidMount() {
        this.drawEcharts();
        // this.allUserList();
        this.allUserInfo();
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

    handleUserSearch = value => {
        console.log('userSearch', value);
        this.setState({
            userName: value
        }, () => this.allUserList());
    }

    allUserInfo = () => {
        this.props.allUserList({}, res => {
            console.log('res')
            this.setState({
                dataSource: res.list
            });
        });
    }

    allUserList = (page = 1, pageSize = 10) => {
        this.props.allUserList({
            userName: this.state.userName,
            page,
            pageSize
        }, res => {
            if(res.body) {
                this.setState({
                    totalNum: res.body.totalNum,
                    pages: res.body.pages,
                    pageSize: res.body.pageSize,
                    page: res.body.page,
                    dataSource: res.body.data,
                    loading: false
                });
            } else {
                message.warn(res.msg);
                this.setState({
                    page: 0,
                    pageSize: 10,
                    pages: 0,
                    totalNum: 0,
                    dataSource: [],
                    loading: false
                });
            }
        });
    }

    render() {
        const { dataSource, columns, page, pageSize, pages, totalNum } = this.state;
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
                                placeholder='用户名'
                                onSearch={this.handleUserSearch}
                            ></Search>
                        </div>
                    </div>
                    <div className='user-management-table'>
                        <Table 
                            dataSource={dataSource} 
                            columns={columns}
                            pagination={false}
                        />
                        <PaginationUi
                            page={page}
                            pageSize={pageSize}
                            pages={pages}
                            totalNum={totalNum}
                            onShowSizeChange={this.allUserList}
                         />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return {};
};
const mapDispatchToProps = function(dispatch) {
    return {
        allUserList(params, cb) {
            dispatch(actions.allUserList(params, cb));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);