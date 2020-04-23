/**
 * 个人信息
 */
import React, { Component } from 'react';
import './index.css';
import { Breadcrumb, Avatar, Tooltip, Button, Modal, Input, Table, message, Spin } from 'antd';
import { LoadingOutlined, UserOutlined, WomanOutlined, HomeOutlined, PhoneOutlined, BranchesOutlined, MailOutlined, InfoCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import '../../../../mock/mock';
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
            avatarTip: '',
            avatarTipShow: false,
            name: '喵喵一十八',
            nameTip: '',
            nameTipShow: false,
            password: '123456',
            passwordTip: '',
            passwordTipShow: false,
            address: '未填写所在地区',
            addressTip: '',
            addressTipShow: false,
            telephone: '18800129921',
            telephoneTip: '',
            telephoneTipShow: false,
            subway: '未填写常乘地铁',
            subwayTip: '',
            subwayTipShow: false,
            email: '未填写联系邮箱',
            emailTip: '',
            emailTipShow: false,
            visible: false,
            dataSourceSubway: [{
                id: 200409,
                userId: 123,
                userName: '莉兹Liz',
                userPosition: '魔仙堡',
                userEmail: '123456@qq.com',
                userPhone: '18899990000',
                userSubway: '经海路-荣昌东街'
            }],
            columnsSubway: [{
                title: '编号',
                dataIndex: 'routesId',
                key: 'routesId',
            }, {
                title: '用户名',
                dataIndex: 'userName',
                key: 'userName'
            }, {
                title: 
                <div>路线名&nbsp;
                    <Tooltip placement='bottom' title='111'>
                        <InfoCircleOutlined />
                    </Tooltip>
                </div>,
                dataIndex: 'routesName',
                key: 'routesName'
            }, {
                title: '起始点',
                dataIndex: 'routesStart',
                key: 'routesStart'
            }, {
                title: '终点',
                dataIndex: 'routesEnd',
                key: 'routesEnd'
            }, {
                title: '地区',
                dataIndex: 'routesPosiotion',
                key: 'routesPosiotion'
            }, {
                title: '功能操作',
                dataIndex: 'operation',
                key: 'operation',
                render: (text, record) => {
                    return(
                        <div>
                            <Button type='primary' onClick={this.handleSubwayCancel.bind(this, record.id)}>取消收藏</Button>
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
                dataIndex: 'goodsId',
                key: 'goodsId',
            }, {
                title: '名称',
                dataIndex: 'goodsName',
                key: 'goodsName',
            }, {
                title: '城市',
                dataIndex: 'goodsCity',
                key: 'goodsCity',
            }, {
                title: '预估金额（元）',
                dataIndex: 'goodsValue',
                key: 'goodsValue',
            }, {
                title: '领取点',
                dataIndex: 'goodsLocation',
                key: 'goodsLocation',
            }, {
                title: '领取点电话',
                dataIndex: 'goodsTelephone',
                key: 'goodsTelephone',
            }, {
                title: '功能操作',
                dataIndex: 'operation',
                key: 'operation',
                render: (text, record) => {
                    return(
                        <div>
                            <Button type='primary' onClick={this.handleLostCancel.bind(this, record.goodsId)}>取消收藏</Button>
                        </div>
                    )
                }
            }],
            dataSourceLost: [],
            goodsPage: 1,
            goodsPageSize: 10, // 10, 20, 30, 50
            goodsTotalNum: 0, // 总条数
            goodsPages: 0, // 总页数
        }
    }

    componentDidMount() {
        // this.getPersonalLostList();
        this.theLostCollectList();
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

    // 失物列表mockjs
    getPersonalLostList = () => {
        axios.post('/\/get_personal_lost_list.mock/', {dataType:'json'}).then(res => {
            this.setState({
                dataSourceLost: res.data.data.get_personal_lost_list
            });
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
                // this.setState({
                //     spinning: true
                // });
                // http.requestSchemeListDelete({
                //     subwayId: no,
                // }).then(res => {
                //     if (res.code === 0) {
                //         message.success('取消成功');
                //         that.subwayList();
                //     }
                // });
                console.log('ok')
                message.success('取消收藏成功');
                // this.setState({
                //     spinning: false
                // });
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
                // this.setState({
                //     spinning: true
                // });
                // http.requestSchemeListDelete({
                //     theLost: id,
                // }).then(res => {
                //     if (res.code === 0) {
                //         message.success('取消成功');
                //         that.theLostList();
                //     }
                // });
                // this.setState({
                //     spinning: false
                // });
                message.success('取消收藏成功');
            },
        });
    }

    // 修改信息
    handleInfo = () => {
        console.log('-----------修改信息');
        this.setState({
            visible: true
        });
    }

    // 修改信息确认
    handleInfoOk = () => {
        console.log('ok');
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
            if(res.body) {
                message.success('成功');
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
            dataSourceLost, columnsLost } = this.state;
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
                                <Table dataSource={dataSourceSubway}
                                    columns={columnsSubway}
                                    pagination={false}
                                />
                                <PaginationUi
                                    page={routesPage}
                                    pageSize={routesPageSize}
                                    totalNum={routesTotalNum}
                                    pages={routesPages}
                                    onShowSizeChange={this.theLostCollectList}
                                />
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
                                <Table dataSource={dataSourceLost} 
                                columns={columnsLost} 
                                rowKey={record => record.goodsId} />
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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);