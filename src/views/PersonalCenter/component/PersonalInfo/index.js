/**
 * 个人信息
 */
import React, { Component } from 'react';
import './index.css';
import { Breadcrumb, Avatar, Tooltip, Button, Modal, Input, Table, message, Spin } from 'antd';
import { LoadingOutlined, UserOutlined, WomanOutlined, HomeOutlined, PhoneOutlined, BranchesOutlined, MailOutlined, InfoCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import '../../../../mock/mock';
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
                dataIndex: 'id',
                key: 'id',
            }, {
                title: '用户id',
                dataIndex: 'userId',
                key: 'userId'
            }, {
                title: '用户名',
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
                title: 
                <div>常乘地铁&nbsp;
                    <Tooltip placement='bottom' title='111'>
                        <InfoCircleOutlined />
                    </Tooltip>
                </div>,
                dataIndex: 'userSubway',
                key: 'userSubway'
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
        }
    }

    componentDidMount() {
        this.getPersonalLostList();
    }

    // 失物列表
    getPersonalLostList = () => {
        axios.post('/\/get_personal_lost_list.mock/', {dataType:'json'}).then(res => {
            this.setState({
                dataSourceLost: res.data.data.get_personal_lost_list
            });
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
        this.setState({
            visible: true
        });
    }

    // 修改信息取消
    handleInfoCancel = () => {
        this.setState({
            visible: false
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

    render() {
        const { spinning, name, address, telephone, subway, email, visible, dataSourceSubway, columnsSubway, dataSourceLost, columnsLost } = this.state;
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
                                    <div className='modal-row'>
                                        <div className='modal-col'>
                                            <div className='personal-info-modal'><span className='red-star'>*&nbsp;</span>用户名</div>
                                            <Input placeholder='请填写用户名'></Input>
                                        </div>
                                    </div>
                                    <div className='modal-row'>
                                        <div className='modal-col'>
                                            <div className='personal-info-modal'><span className='red-star'>*&nbsp;</span>所在地</div>
                                            <Input placeholder='请填写所在地区'></Input>
                                        </div>
                                    </div>
                                    <div className='modal-row'>
                                        <div className='modal-col'>
                                            <div className='personal-info-modal'><span className='red-star'>*&nbsp;</span>联系电话</div>
                                            <Input placeholder='请填写联系电话'></Input>
                                        </div>
                                    </div>
                                    <div className='modal-row'>
                                        <div className='modal-col'>
                                            <div className='personal-info-modal'><span className='red-star'>*&nbsp;</span>联系电话</div>
                                            <Input placeholder='请填写联系电话'></Input>
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
                                <Table dataSource={dataSourceSubway} columns={columnsSubway} />
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
                                <Table dataSource={dataSourceLost} columns={columnsLost} rowKey={record => record.goodsId} />
                            </div>
                        </div>
                    </div>
                </div>
            </Spin>
        )
    }
}

export default PersonalInfo;