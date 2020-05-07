/**
 * 微信
 */
import React, { Component } from 'react';
import { Steps, Divider } from 'antd';
import './index.css';
import { WechatOutlined } from '@ant-design/icons';
const { Step } = Steps;

class AppTicket extends Component {
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
            <div className='app-ticket'>
                <div className='app-ticket-use'>
                    <div className='app-ticket-row'><div className='app-ticket-title'>北京地铁</div><div className='app-ticket-bar'></div><div>易通行</div></div>
                    <div className='app-ticket-row'><div className='app-ticket-title'>哈尔滨地铁</div><div className='app-ticket-bar'></div><div>哈尔滨城市通</div></div>
                    <div className='app-ticket-row'><div className='app-ticket-title'>沈阳地铁</div><div className='app-ticket-bar'></div><div>盛京通</div></div>
                    <div className='app-ticket-row'><div className='app-ticket-title'>上海地铁</div><div className='app-ticket-bar'></div><div>Metro大都会</div></div>
                    <div className='app-ticket-row'><div className='app-ticket-title'>广州地铁</div><div className='app-ticket-bar'></div><div>广州地铁</div></div>
                    <div className='app-ticket-row'><div className='app-ticket-title'>深圳地铁</div><div className='app-ticket-bar'></div><div>深圳通</div></div>
                    <div className='app-ticket-row'><div className='app-ticket-title'>苏州地铁</div><div className='app-ticket-bar'></div><div>苏e行</div></div>
                    <div className='app-ticket-row'><div className='app-ticket-title'>天津地铁</div><div className='app-ticket-bar'></div><div>天津地铁</div></div>
                    <div className='app-ticket-row'><div className='app-ticket-title'>青岛地铁</div><div className='app-ticket-bar'></div><div>青岛地铁</div></div>
                </div>
            </div>
        )
    }
}

export default AppTicket;