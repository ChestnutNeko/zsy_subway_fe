/**
 * 发布失物
 */
import React, { Component } from 'react';
import { Breadcrumb, Table, Tooltip, Input, DatePicker, Form, Select, Button } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import './index.css';

class ReleaseTheLost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    onDateChange = () => {
        console.log('date')
    }

    render() {
        const layout = { 
            labelCol: { span: 8, },
            wrapperCol: { span: 16, },
        };
        return(
            <div className='release-the-lost'>
                <div className='release-the-lost-header'>
                    <Breadcrumb>
                        <Breadcrumb.Item>失物招领</Breadcrumb.Item>
                        <Breadcrumb.Item>发布失物</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className='release-the-lost-content'>
                    {/* <div className='release-the-lost-text'>请将您拾到的失物信息填写完整，方便失主快速找回，感谢。</div> */}
                    <Form {...layout} name='release-the-lost'>
                        <Form.Item label={<div><span className='red-star'>*&nbsp;</span>失物名称</div>} rules={[{ required: true, message: '请输入失物名称' }]}>
                            <Input placeholder='请输入失物名称' style={{ width: 300 }} />
                        </Form.Item>
                        <Form.Item label={<div><span className='red-star'>*&nbsp;</span>城市</div>} rules={[{ required: true, message: '请输入城市' }]}>
                            <Input placeholder='请输入城市' style={{ width: 300 }} />
                        </Form.Item>
                        <Form.Item label={<div><span className='red-star'>*&nbsp;</span>预估金额（元）</div>} rules={[{ required: true, message: '请输入预估金额' }]}>
                            <Input placeholder='请输入预估金额（元）' style={{ width: 300 }} />
                        </Form.Item>
                        {/* <Form.Item label={<div><span className='red-star'>*&nbsp;</span>预估金额(元)</div>}>
                            <Select style={{ width: 300 }}>
                                <Select.Option value="1">0-99</Select.Option>
                                <Select.Option value="2">100-999</Select.Option>
                                <Select.Option value="3">1,000-9,999</Select.Option>
                                <Select.Option value="4">10,000-99,999</Select.Option>
                                <Select.Option value="5">大于100,000</Select.Option>
                            </Select>
                        </Form.Item> */}
                        <Form.Item label={<div><span className='red-star'>*&nbsp;</span>拾到时间</div>} rules={[{ required: true, message: '请输入拾到时间' }]}>
                            <DatePicker onChange={this.onDateChange()} />
                        </Form.Item>
                        <Form.Item label={<div><span className='red-star'>*&nbsp;</span>领取点&nbsp;<Tooltip placement='bottom' title={<div>请输入物品暂存地铁站<br/>有疑问请咨询站内工作人员</div>}><InfoCircleOutlined /></Tooltip></div>} rules={[{ required: true, message: '请输入领取点' }]}>
                            <Input placeholder='请输入领取点' style={{ width: 300 }} />
                        </Form.Item>
                        <Form.Item label={<div><span className='red-star'>*&nbsp;</span>领取点电话&nbsp;<Tooltip placement='bottom' title={<div>请输入物品暂存地铁站电话<br/>有疑问请咨询站内工作人员</div>}><InfoCircleOutlined /></Tooltip></div>} rules={[{ required: true, message: '请输入领取点电话' }]}>
                            <Input placeholder='请输入领取点电话' style={{ width: 300 }} />
                        </Form.Item>
                        <Form.Item className="release-the-lost-btn">
                            <Button type='' onClick={this.handleCancel} style={{ width: 80, marginRight: 20 }}>
                                取消
                            </Button>
                            <Button type="primary" htmlType="submit" style={{ width: 80 }}>
                                确认
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

export default ReleaseTheLost;