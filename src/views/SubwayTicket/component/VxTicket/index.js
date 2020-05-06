/**
 * 微信
 */

import React, { Component } from 'react';
import { Steps } from 'antd';
import './index.css';
import { WechatOutlined } from '@ant-design/icons';
const { Step } = Steps;

class VxTicket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0
        }
    }

    // step切换
    onStepChange = current => {
        this.setState({ current });
    };

    render() {
        const { current } = this.state;
        return(
            <div className='vx-ticket'>
                <div className='vx-ticket-use'>
                    <span className='vx-ticket-use-title'><WechatOutlined />使用过程</span>
                    <div className='vx-ticket-use-content'>
                        <Steps current={current} onChange={this.onStepChange} direction="vertical">
                            <Step title="打开微信" description="APP商店中可下载" />
                            <Step title="点击【发现】" description="页面下方导航栏的【发现】" />
                            <Step title="点击【小程序】" description="【发现】中最下方" />
                            <Step title="搜索【乘车码】" description="根据当前城市注册登录" />
                            <Step title="乘地铁" description="扫码乘车" />
                        </Steps>
                    </div>
                </div>
            </div>
        )
    }
}

export default VxTicket;