/**
 * 失物一览
 */
import React, { Component } from 'react';
import { Breadcrumb, Input, Table, Button, message } from 'antd';
import './index.css';
import axios from "axios";
// import '../../../../mock/mock';
import { connect } from 'react-redux';
// import  * as http from '../../store/action';
import * as actions from '../../store/action';
import PaginationUi from '../../../../components/PaginationUi';
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
            pagination: {},
            loading: false,
            goodsName: '',
            page: 1,
            pageSize: 10,
            totalNum: 2, // 总条数
            pages: 1, // 总页数
        }
    }

    componentDidMount() {
        // this.getTheLostList();
        this.theLostList();
    }

    // 失物一览列表mock.js
    // getTheLostList = () => {
    //     axios.get('/\/get_the_lost_list.mock/', {dataType:'json'}).then(res => {
    //         this.setState({
    //             dataSource: res.data.data.get_the_lost_list
    //         });
    //     });
    // }
    
    // 失物一览
    theLostList = (page = 1, pageSize = 10) => {
        this.setState({
            loading: true,
        });
        const { goodsName } = this.state;
        this.props.theLostList({goodsName, page, pageSize}, res => {
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
    };

    // 收藏
    handleCollect = id => {
        message.success('收藏成功，请到个人中心查看');
    }

    // 按名称搜索
    handleSearchName = value => {
        console.log('name', value);
        this.setState({
            goodsName: value
        }, () => {
            this.theLostList();
        });
    }

    handleSearchCity = () => {
        console.log('city');
    }

    handleTableChange = () => {
        console.log('table');
    }

    render() {
        const { columns, dataSource, pagination, loading, totalNum, pages, pageSize, page } = this.state;
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
                            {/* <div className='the-lost-list-content-search-city'>
                                <Search
                                    placeholder='请选择城市'
                                    onSearch={this.handleSearchCity}
                                />
                            </div> */}
                        </div>
                    </div>
                    <div className='the-lost-list-table'>
                        <Table 
                            dataSource={dataSource} 
                            columns={columns} 
                            rowKey={record => record.goodsId} 
                            pagination={false} 
                            loading={loading}
                            onChange={this.handleTableChange}
                        />
                        <PaginationUi
                            page={page}
                            pageSize={pageSize}
                            pages={pages}
                            totalNum={totalNum}
                            onShowSizeChange={this.theLostList}
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
        theLostList(params, cb) {
            dispatch(actions.theLostList(params, cb));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TheLostList);