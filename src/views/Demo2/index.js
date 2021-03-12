/**
 * Table表单样式处理
 */
import React, { Component } from 'react';
import { Table } from 'antd';
import './index.css';
import * as util from '../../assets/js/utils.js';
const setRow = (value, record) => {
	const obj = {
		children: value,
		props: {},
	};
	if(record.sum === true) {
		obj.props.colSpan = 0
	}
	return obj;
}
const colorSet = (text) => {
	if(Number(text)>0) {
		return 'red'
	}
	if(Number(text)<0) {
		return 'green'
	}
}
const res = [{
    startDate: '2021-03-04',
    endDate: '2021-03-11',
    userNum: 12,
    position: '北京',
    session: 120,
    money: 20,
    status: '使用中',
},{
    startDate: '2021-03-04',
    endDate: '2021-03-11',
    userNum: 67,
    position: '杭州',
    session: 78,
    money: -27,
    status: '使用中',
},{
    startDate: '2021-03-04',
    endDate: '2021-03-11',
    userNum: 73,
    position: '沈阳',
    session: 93,
    money: 0,
    status: '使用中',
},{
    startDate: '2021-03-04',
    endDate: '2021-03-11',
    userNum: 91,
    position: '北京',
    session: 24,
    money: 48,
    status: '使用中',
},{
    startDate: '2021-03-04',
    endDate: '2021-03-11',
    userNum: '合计',
    position: '合计',
    session: '合计',
    money: 41,
    status: '',
},{
    startDate: '2021-03-11',
    endDate: '2021-03-18',
    userNum: 62,
    position: '南京',
    session: 43,
    money: -35,
    status: '即将使用',
},{
    startDate: '2021-03-11',
    endDate: '2021-03-18',
    userNum: 192,
    position: '上海',
    session: 278,
    money: 27,
    status: '即将使用',
},{
    startDate: '2021-03-11',
    endDate: '2021-03-18',
    userNum: '合计',
    position: '合计',
    session: '合计',
    money: -8,
    status: '',
}]

class TableStyle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [{
                title: '日期',
                dataIndex: 'date',
                key: 'date',
                render: (value, record, index) => {
					const obj = {
						children: value,
						props: {},
					};
					obj.props.rowSpan = util.getRowSpanCount(this.state.dataSource, 'startDate', index);
					obj.children = <div>{record.startDate}~{record.endDate}</div>
					return obj;
				}
            },{
                title: '用户数',
                dataIndex: 'userNum',
                key: 'userNum',
                render: (value, record) => {
					const obj = {
						children: value,
						props: {},
					};
					if(record.sum === true) {
						obj.props.colSpan = 3
					}
					return obj;
				}
            },{
                title: '地区',
                dataIndex: 'position',
                key: 'position',
                render: (value, record) => {
					return setRow(value, record);
				}
            },{
                title: '使用频率',
                dataIndex: 'session',
                key: 'session',
                render: (value, record) => {
					return setRow(value, record);
				}
            },{
                title: '金额(元)',
                dataIndex: 'money',
                key: 'money',
                render: (text) => {
                    return(<div style={{color: colorSet(text)}}>{text}</div>)
                }
            },{
                title: '状态',
                dataIndex: 'status',
                key: 'status',
            }],
            dataSource: [],
        }
    }

    componentDidMount() {
        for(let i in res) {
            if(res[i].userNum === res[i].position) {
                res[i].key = i;
                res[i].sum = true;
            }
        }
        this.setState({
            dataSource: res
        });
    }

    render() {
        const { columns, dataSource } = this.state;
        return(<div className='table-style'>
            <Table
                columns={columns}
                dataSource={dataSource}
                rowClassName={record => {
                    if (record.sum === true) return 'table-style-dust';
                }}
                bordered
                pagination={false}
            />
        </div>)
    }
}

export default TableStyle;