/**
 * 支付宝
 */
import React, { Component } from 'react';
import { Steps } from 'antd';
import './index.css';
import { AlipayOutlined } from '@ant-design/icons';
const { Step } = Steps;

class AlipayTicket extends Component {
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
            <div className='alipay-ticket'>
                <div className='alipay-ticket-use'>
                    <span className='alipay-ticket-use-title'><AlipayOutlined />使用过程</span>
                    <div className='alipay-ticket-use-content'>
                        <Steps current={current} onChange={this.onStepChange} direction="vertical">
                            <Step title="打开支付宝" description="APP商店中可下载" />
                            <Step title="城市服务" description="支付宝首页点击“更多”图标进入" />
                            <Step title="交通出行" description="在“城市服务”中找到“服务分类”，分类中点击进入“交通出行”" />
                            <Step title="地铁购票" description="“公共交通”中选择“地铁购票”" />
                            <Step title="乘车" description="扫码乘车" />
                        </Steps>
                    </div>
                </div>
            </div>
        )
    }
}

export default AlipayTicket;