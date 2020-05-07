/**
 * 失物一览
 */
import React, { Component } from 'react';
import { Breadcrumb, Input, Table, Button, message } from 'antd';
import './index.css';
import { connect } from 'react-redux';
import * as actions from '../../store/action';
import PaginationUi from '../../../../components/PaginationUi';
const { Search } = Input;

class TheLostList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [{
                title: '失物编号',
                dataIndex: 'the_lost_id',
                key: 'theLostId',
            }, {
                title: '失物名称',
                dataIndex: 'the_lost_name',
                key: 'theLostName',
            }, {
                title: '城市',
                dataIndex: 'the_lost_city',
                key: 'theLostCity',
            }, {
                title: '预估金额（元）',
                dataIndex: 'the_lost_value',
                key: 'theLostValue',
            }, {
                title: '日期',
                dataIndex: 'the_lost_date',
                key: 'theLostDate',
            }, {
                title: '领取点',
                dataIndex: 'the_lost_position',
                key: 'theLostPosition',
            }, {
                title: '领取点电话',
                dataIndex: 'the_lost_telephone',
                key: 'theLostTelephone',
            }, {
                title: '功能操作',
                dataIndex: 'operation',
                key: 'operation',
                render: (text, record) => {
                    return(
                        <div>
                            <Button type='primary' onClick={this.handleCollect.bind(this, record.the_lost_id, record.the_lost_name, record.the_lost_city, record.the_lost_value, record.the_lost_position, record.the_lost_telephone)}>收藏</Button>
                        </div>
                    )
                }
            }],
            dataSource: [],
            pagination: {},
            loading: false,
            theLostName: '',
            page: 1,
            pageSize: 10,
            totalNum: 2, // 总条数
            pages: 1, // 总页数
        }
    }

    componentDidMount() {
        // this.theLostList();
        this.getTheLostList();
    }

    getTheLostList = () => {
        this.props.theLostList({}, res => {
            this.setState({
                dataSource: res.data
            });
        });
    }
    
    // 失物一览
    theLostList = (page = 1, pageSize = 10) => {
        this.setState({
            loading: true,
        });
        const { theLostName } = this.state;
        this.props.theLostList({theLostName, page, pageSize}, res => {
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

    // 失物收藏
    handleCollect = (theLostId, theLostName, theLostCity, theLostValue, theLostPosition, theLostTelephone) => {
        this.props.theLostListCollect({
            userId: 22,
            theLostId,
            theLostName,
            theLostCity,
            theLostValue,
            theLostPosition,
            theLostTelephone
        }, res => {
            if(res.code === 0) {
                message.success(res.msg);
            } else {
                message.warning(res.msg)
            }
        })
    }

    // 按名称搜索
    handleSearchName = value => {
        console.log('name', value);
        this.setState({
            theLostName: value
        }, () => {
            this.theLostList();
        });
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
                        </div>
                    </div>
                    <div className='the-lost-list-table'>
                        <Table 
                            dataSource={dataSource} 
                            columns={columns} 
                            rowKey={record => record.the_lost_id} 
                            // pagination={false} 
                            loading={loading}
                            onChange={this.handleTableChange}
                        // />
                        // <PaginationUi
                        //     page={page}
                        //     pageSize={pageSize}
                        //     pages={pages}
                        //     totalNum={totalNum}
                        //     onShowSizeChange={this.theLostList}
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
        theLostListCollect(params, cb) {
            dispatch(actions.theLostListCollect(params, cb));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TheLostList);