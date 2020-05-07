/**
 * 个人信息
 */

import React, { Component } from 'react';
import './index.css';
import { Breadcrumb, Avatar, Tooltip, Button, Modal, Input, Table, message, Spin } from 'antd';
import { LoadingOutlined, UserOutlined, WomanOutlined, HomeOutlined, PhoneOutlined, BranchesOutlined, MailOutlined, InfoCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import * as actions from '../../store/action';
import PaginationUi from '../../../../components/PaginationUi';
const { Search } = Input;
const { confirm } = Modal;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

class PersonalInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinning: false,
            avatar: '',
            id: 12,
            name: '喵喵一十八',
            password: '123456',
            address: '未填写所在地区',
            telephone: '18800129921',
            subway: '未填写常乘地铁',
            email: '未填写联系邮箱',
            dataSourceSubway: [],
            columnsSubway: [{
                title: '编号',
                dataIndex: 'routes_id',
                key: 'routesId',
            }, {
                title: 
                <div>路线名&nbsp;
                    <Tooltip placement='bottom' title='自定义'>
                        <InfoCircleOutlined />
                    </Tooltip>
                </div>,
                dataIndex: 'routes_name',
                key: 'routesName'
            }, {
                title: '起始点',
                dataIndex: 'routes_start',
                key: 'routesStart'
            }, {
                title: '终点',
                dataIndex: 'routes_end',
                key: 'routesEnd'
            }, {
                title: '功能操作',
                dataIndex: 'operation',
                key: 'operation',
                render: (text, record) => {
                    return(
                        <div>
                            <Button type='primary' onClick={this.handleSubwayCancel.bind(this, record.routes_id)}>取消收藏</Button>
                        </div>
                    )
                }
            }],
            routesPage: 1,
            routesPageSize: 10, // 10, 20, 30, 50
            routesTotalNum: 0, // 总条数
            routesPages: 0, // 总页数
            columnsLost: [{
                title: '编号',
                dataIndex: 'id',
                key: 'id',
            }, {
                title: '失物编号',
                dataIndex: 'the_lost_id',
                key: 'the_lost_id'
            }, {
                title: '名称',
                dataIndex: 'the_lost_name',
                key: 'the_lost_name',
            }, {
                title: '城市',
                dataIndex: 'the_lost_city',
                key: 'the_lost_city',
            }, {
                title: '预估金额（元）',
                dataIndex: 'the_lost_value',
                key: 'the_lost_value',
            }, {
                title: '日期',
                dataIndex: 'the_lost_date',
                key: 'the_lost_date'
            }, {
                title: '领取点',
                dataIndex: 'the_lost_position',
                key: 'the_lost_position',
            }, {
                title: '领取点电话',
                dataIndex: 'the_lost_telephone',
                key: 'the_lost_telephone',
            }, {
                title: '功能操作',
                dataIndex: 'operation',
                key: 'operation',
                render: (text, record) => {
                    return(
                        <div>
                            <Button type='primary' onClick={this.handleLostCancel.bind(this, record.id)}>取消收藏</Button>
                        </div>
                    )
                }
            }],
            dataSourceLost: [],
            goodsName: '',
            goodsPage: 1,
            goodsPageSize: 10, // 10, 20, 30, 50
            goodsTotalNum: 0, // 总条数
            goodsPages: 0, // 总页数
        }
    }

    componentDidMount() {
        // this.theLostCollectList();
        this.getRoutesList();
        this.collectGoodsList();
    }

    // 个人信息
    userInfo = () => {
        this.props.userInfo({ 
            name: this.state.name,
            password: this.state.password
        }, res => {
            this.setState({
                id: res.data.id,
                name: res.data.name,
                password: res.data.password,
                telephone: res.data.telephone,
                address: res.data.address,
                subway: res.data.subway,
                email: res.data.email
            });
        });
    }

    // 收藏路线列表(yes)
    getRoutesList = () => {
        this.setState({
            loading: true,
        });
        this.props.routeCollectList({}, res => {
            this.setState({
                dataSourceSubway: res.data,
                loading: false
            });
        });
    }

    // 收藏失物列表(yes)
    collectGoodsList = () => {
        this.setState({
            loading: true,
        });
        this.props.theLostCollectList({}, res => {
            this.setState({
                dataSourceLost: res.data,
                loading: false
            });
        });
    }

    // 收藏路线列表
    theLostCollectList = (routesPage = 1, routesPageSize = 10) => {
        this.setState({
            loading: true,
        });
        const { routesName } = this.state;
        this.props.theLostCollectList({ routesName, routesPage, routesPageSize }, res => {
            if(res.body) {
                this.setState({
                    routesTotalNum: res.body.totalNum,
                    routesPages: res.body.pages,
                    routesPageSize: res.body.pageSize,
                    routesPage: res.body.page,
                    dataSourceSubway: res.body.data,
                    loading: false
                });
            } else {
                message.warn(res.msg);
                this.setState({
                    dataSourceSubway: [],
                    loading: false
                });
            }
        });
    }

    // 失物收藏列表
    routeCollectList = (goodsPage = 1, goodsPageSize = 10) => {
        this.setState({
            loading: true,
        });
        const { goodsName } = this.state;
        this.props.theLostCollectList({ goodsName, goodsPage, goodsPageSize }, res => {
            if(res.body) {
                this.setState({
                    goodsPage: res.body.goodsPage,
                    goodsPageSize: res.body.goodsPageSize,
                    goodsTotalNum: res.body.goodsTotalNum,
                    goodsPages: res.body.goodsPages,
                    dataSourceLost: res.body.data,
                    loading: false
                });
            } else {
                message.warn(res.msg);
                this.setState({
                    dataSourceSubway: [],
                    loading: false
                });
            }
        });
    }

    // 路线取消收藏
    handleSubwayCancel = id => {
        let that = this;
        confirm({
            title: '温馨提示',
            icon: <ExclamationCircleOutlined />,
            content: '是否确认取消收藏',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                // that.setState({
                //     spinning: true
                // });
                that.props.routeDelete({
                    id
                }, res => {
                    if (res.code === 0) {
                        message.success(res.msg);
                        that.theLostCollectList();
                    } else {
                        message.warn(res.msg);
                        that.setState({
                            spinning: false
                        });
                    }
                });
            },
        });
    }

    // 失物取消收藏
    handleLostCancel = id => {
        let that = this;
        confirm({
            title: '温馨提示',
            icon: <ExclamationCircleOutlined />,
            content: '是否确认取消收藏',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                that.setState({
                    spinning: true
                });
                that.props.theLostListDelete({id}, res => {
                    if(res.code === 0) {
                        message.success(res.msg);
                        that.collectGoodsList();
                    } else {
                        message.warn(res.msg);
                        that.setState({
                            spinning: false
                        });
                    }
                });
            },
        });
    }

    // 修改信息
    handleInfo = () => {
        this.setState({
            visible: true
        });
    }

    // 修改信息确认
    handleInfoOk = () => {
        const { id, name, password, address, telephone, subway, email} = this.state;
        this.props.userInfoUpdate({
            id,
            name,
            password,
            address,
            telephone,
            subway,
            email
        }, res => {
            if(res.code === 0) {
                message.success(res.msg);
                this.setState({
                    visible: false
                });
            } else {
                message.warn(res.msg);
                this.setState({
                    visible: false
                });
            }
        });
    }

    // 修改信息取消
    handleInfoCancel = () => {
        this.setState({
            visible: false
        });
    }

    handleNameChange = e => {
        this.setState({
            name: e.target.value
        });
    }
    handlePasswordChange = e => {
        this.setState({
            password: e.target.value
        });
    }
    handleAddressChange = e => {
        this.setState({
            address: e.target.value
        });
    }
    handleTelephoneChange = e => {
        this.setState({
            telephone: e.target.value
        });
    }
    handleSubwayChange = e => {
        this.setState({
            subway: e.target.value
        });
    }
    handleEmailChange = e => {
        this.setState({
            email: e.target.value
        });
    }

    render() {
        const { spinning, name, password, address, telephone, subway, email, visible, 
            dataSourceSubway, columnsSubway, routesPage, routesPageSize, routesTotalNum, routesPages,
            dataSourceLost, columnsLost, goodsPage, goodsPageSize, goodsTotalNum, goodsPages } = this.state;
        return(
            <Spin spinning={spinning} indicator={antIcon}>
                <div className='personal-info'>
                    <Breadcrumb>
                        <Breadcrumb.Item>个人中心</Breadcrumb.Item>
                        <Breadcrumb.Item>个人信息</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className='personal-info-content'>
                        <div className='personal-info-title'>
                            <div className='personal-info-title-bar'></div>
                            <div className='personal-info-title-avatar'>
                                <Avatar size={64} icon={<UserOutlined />} />
                            </div>
                            <div className='personal-info-title-user'>
                                <span className='personal-info-title-name'><Tooltip placement="bottom" title={name}>{name}</Tooltip>&nbsp;<WomanOutlined /></span>
                                <div className='personal-info-title-other'>
                                    <div className='personal-info-title-info'><HomeOutlined />&nbsp;{address}</div>
                                    <div className='personal-info-title-info'><PhoneOutlined />&nbsp;{telephone}</div>
                                    <div className='personal-info-title-info'><BranchesOutlined />&nbsp;{subway}</div>
                                    <div className='personal-info-title-info'><MailOutlined />&nbsp;{email}</div>
                                </div>
                            </div>
                            <div className='personal-info-title-button'>
                                <Button type='primary' onClick={this.handleInfo}>修改信息</Button>
                                <Modal
                                    title='修改信息'
                                    visible={visible}
                                    onOk={this.handleInfoOk}
                                    onCancel={this.handleInfoCancel}
                                    okText={'确认'}
                                    cancelText={'取消'}
                                >
                                    {/* id, name, password, city, telephone, subway, email */}
                                    <div className='modal-row'>
                                        <div className='modal-col'>
                                            <div className='personal-info-modal'><span className='red-star'>*&nbsp;</span>用户名</div>
                                            <Input placeholder='请填写用户名' value={name} onChange={this.handleNameChange}></Input>
                                        </div>
                                    </div>
                                    <div className='modal-row'>
                                        <div className='modal-col'>
                                            <div className='personal-info-modal'><span className='red-star'>*&nbsp;</span>密码</div>
                                            <Input placeholder='请填写密码' value={password} onChange={this.handlePasswordChange}></Input>
                                        </div>
                                    </div>
                                    <div className='modal-row'>
                                        <div className='modal-col'>
                                            <div className='personal-info-modal'><span className='red-star'>*&nbsp;</span>所在地</div>
                                            <Input placeholder='请填写所在地区' value={address} onChange={this.handleAddressChange}></Input>
                                        </div>
                                    </div>
                                    <div className='modal-row'>
                                        <div className='modal-col'>
                                            <div className='personal-info-modal'><span className='red-star'>*&nbsp;</span>联系电话</div>
                                            <Input placeholder='请填写联系电话' value={telephone} onChange={this.handleTelephoneChange}></Input>
                                        </div>
                                    </div>
                                    <div className='modal-row'>
                                        <div className='modal-col'>
                                            <div className='personal-info-modal'><span className='red-star'>*&nbsp;</span>常乘地铁</div>
                                            <Input placeholder='请填写常乘地铁' value={subway} onChange={this.handleSubwayChange}></Input>
                                        </div>
                                    </div>
                                    <div className='modal-row'>
                                        <div className='modal-col'>
                                            <div className='personal-info-modal'><span className='red-star'>*&nbsp;</span>邮箱</div>
                                            <Input placeholder='请填写邮箱' value={email} onChange={this.handleEmailChange}></Input>
                                        </div>
                                    </div>
                                </Modal>
                            </div>
                        </div>
                        <div className='personal-info-subway'>
                            <div className='personal-info-subway-header'>
                                <div className='personal-info-subway-search'>
                                    <Search
                                        placeholder='收藏路线名称'
                                        onSearch={this.handleSubwaySearch}
                                    />
                                </div>
                            </div>
                            <div className='personal-info-subway-table'>
                                <Table 
                                    dataSource={dataSourceSubway}
                                    columns={columnsSubway}
                                    rowKey={record => record.routes_id}
                                    // pagination={false} 
                                />
                                {/* <PaginationUi
                                    page={routesPage}
                                    pageSize={routesPageSize}
                                    totalNum={routesTotalNum}
                                    pages={routesPages}
                                    onShowSizeChange={this.theLostCollectList} /> */}
                            </div>
                        </div>
                        <div className='personal-info-lost'>
                            <div className='personal-info-lost-header'>
                                <div className='personal-info-lost-search'>
                                    <Search
                                        placeholder='收藏失物名称'
                                        onSearch={this.handleLostSearch}
                                    />
                                </div>
                            </div>
                            <div className='personal-info-lost-table'>
                                <Table 
                                    dataSource={dataSourceLost} 
                                    columns={columnsLost} 
                                    rowKey={record => record.the_lost_id} />
                                {/* <PaginationUi
                                    page={goodsPage}
                                    pageSize={goodsPageSize}
                                    totalNum={goodsTotalNum}
                                    pages={goodsPages}
                                    onShowSizeChange={this.routeCollectList} /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </Spin>
        )
    }
}

const mapStateToProps = function(state) {
    return {};
};
const mapDispatchToProps = function(dispatch) {
    return {
        theLostCollectList(params, cb) {
            dispatch(actions.theLostCollectList(params, cb));
        },
        userInfoUpdate(params, cb) {
            dispatch(actions.userInfoUpdate(params, cb));
        },
        userInfo(params, cb) {
            dispatch(actions.userInfo(params, cb));
        },
        routeDelete(params, cb) {
            dispatch(actions.routeDelete(params, cb));
        },
        routeCollectList(params, cb) {
            dispatch(actions.routeCollectList(params, cb));
        },
        theLostListDelete(params, cb) {
            dispatch(actions.theLostListDelete(params, cb));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);