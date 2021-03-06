/**
 * 发布失物
 */

import React, { Component } from 'react';
import { Breadcrumb, Tooltip, Input, DatePicker, Form, Button, message } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import './index.css';
import * as actions from '../../store/action';
import { connect } from 'react-redux';

class ReleaseTheLost extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    onDateChange = (now) => {
        console.log(now);
        // 中国区的时间格式
        let time = new Date()
        console.log(time);
        let d = new Date(time);
        // 格式转换
        let dateValue = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        console.log(dateValue);
    }

    // 确认
    handleOk = () => {
        console.log('ok');
    }

    // 取消
    handleCancel = () => {
        message.error('cancel');
    }

    render() {
        const layout = { 
            labelCol: { span: 8, },
            wrapperCol: { span: 16, },
        };
        const onFinish = values => {
            console.log(values);
            this.props.theLostListAdd({
                theLostName: values.theLostName,
                theLostCity: values.theLostCity,
                theLostValue: values.theLostValue,
                theLostPosition: values.theLostPosition,
                theLostTelephone: values.theLostTelephone
            }, res => {
                if(res.code === 0) {
                    message.success(res.msg);
                } else {
                    message.warn(res.msg);
                }
            });
        }
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
                    <Form {...layout} name='release-the-lost' onFinish={onFinish}>
                        <Form.Item name="theLostName" label={<div>失物名称</div>} rules={[{ required: true, message: '请输入失物名称' }]}>
                            <Input placeholder='请输入失物名称' style={{ width: 300 }} />
                        </Form.Item>
                        <Form.Item name="theLostCity" label={<div>城市</div>} rules={[{ required: true, message: '请输入城市' }]}>
                            <Input placeholder='请输入城市' style={{ width: 300 }} />
                        </Form.Item>
                        <Form.Item name="theLostValue" label={<div>预估金额（元）</div>} rules={[{ required: true, message: '请输入预估金额' }]}>
                            <Input placeholder='请输入预估金额（元）' style={{ width: 300 }} />
                        </Form.Item>
                        <Form.Item name="theLostDate" label={<div>拾到时间</div>} rules={[{ required: true, message: '请输入拾到时间' }]}>
                            <DatePicker onChange={this.onDateChange()} format="YYYY-MM-DD" style={{ width: 300 }} />
                        </Form.Item>
                        <Form.Item name="theLostPosition" label={<div>领取点&nbsp;<Tooltip placement='bottom' title={<div>请输入物品暂存地铁站<br/>有疑问请咨询站内工作人员</div>}><InfoCircleOutlined /></Tooltip></div>} rules={[{ required: true, message: '请输入领取点' }]}>
                            <Input placeholder='请输入领取点' style={{ width: 300 }} />
                        </Form.Item>
                        <Form.Item name="theLostTelephone" label={<div>领取点电话&nbsp;<Tooltip placement='bottom' title={<div>请输入物品暂存地铁站电话<br/>有疑问请咨询站内工作人员</div>}><InfoCircleOutlined /></Tooltip></div>} rules={[{ required: true, message: '请输入领取点电话' }]}>
                            <Input placeholder='请输入领取点电话' style={{ width: 300 }} />
                        </Form.Item>
                        <Form.Item className="release-the-lost-btn">
                            <Button type='' onClick={this.handleCancel} style={{ width: 80, marginRight: 20 }}>
                                取消
                            </Button>
                            <Button type="primary" htmlType="submit" style={{ width: 80 }} onClick={this.handleOk}>
                                确认
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return {}
}
const mapDispatchToProps = function(dispatch) {
    return {
        theLostListAdd(params, cb) {
            dispatch(actions.theLostListAdd(params, cb));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReleaseTheLost);