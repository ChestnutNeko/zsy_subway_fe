/**
 * 失物一览
 */
import React, { Component } from 'react';
import { Breadcrumb, Input, Table, Button, message } from 'antd';
import './index.css';
import axios from "axios";
import '../../../../mock/mock';
import apiRequest from '../../../../assets/js/apiManager';
const { Search } = Input;

class TheLostList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [{
                title: '失物编号',
                dataIndex: 'goodsId',
                key: 'goodsId',
            }, {
                title: '失物名称',
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
                            <Button type='primary' onClick={this.handleCollect.bind(this, record.goodsId)}>收藏</Button>
                        </div>
                    )
                }
            }],
            dataSource: [],
        }
    }

    componentDidMount() {
        this.getTheLostList();
    }

    // 失物一览列表
    getTheLostList = () => {
        axios.get('/\/get_the_lost_list.mock/', {dataType:'json'}).then(res => {
            this.setState({
                dataSource: res.data.data.get_the_lost_list
            });
        });
        // apiRequest.get('getTheLostList', {}, res =>
        //     this.setState({
        //         dataSource: res.data.getTheLostList
        //     })
        // )
    }

    // 收藏
    handleCollect = id => {
        message.success('收藏成功，请到个人中心查看');
    }

    // 按名称搜索
    handleSearchName = () => {
        console.log('name');
    }

    handleSearchCity = () => {
        console.log('city');
    }

    render() {
        const { columns, dataSource } = this.state;
        return(
            <div className='the-lost-list'>
                <Breadcrumb>
                    <Breadcrumb.Item>失物招领</Breadcrumb.Item>
                    <Breadcrumb.Item>失物一览</Breadcrumb.Item>
                </Breadcrumb>
                <div className='the-lost-list-content'>
                    <div className='the-lost-list-header'>
                        <div className='the-lost-list-content-search'>
                            <div className='the-lost-list-content-search-name'>
                                <Search
                                    placeholder='请输入失物名称'
                                    onSearch={this.handleSearchName}
                                />
                            </div>
                            <div className='the-lost-list-content-search-city'>
                                <Search
                                    placeholder='请选择城市'
                                    onSearch={this.handleSearchCity}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='the-lost-list-table'>
                        <Table dataSource={dataSource} columns={columns} rowKey={record => record.goodsId} />
                    </div>
                </div>
            </div>
        )
    }
}

export default TheLostList;