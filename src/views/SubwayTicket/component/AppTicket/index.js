/**
 * 微信
 */
import React, { Component } from 'react';
// import { Steps } from 'antd';
import './index.css';
// import { WechatOutlined } from '@ant-design/icons';
// const { Step } = Steps;
const ways = [
    {name: '北京地铁', tool: '易通行'},
    {name: '哈尔滨地铁', tool: '哈尔滨城市通'},
    {name: '沈阳地铁', tool: '盛京通'},
    {name: '上海地铁', tool: 'Metro大都会'},
    {name: '广州地铁', tool: '广州地铁'},
    {name: '深圳地铁', tool: '深圳通'},
    {name: '苏州地铁', tool: '苏e行'},
    {name: '天津地铁', tool: '天津地铁'},
    {name: '青岛地铁', tool: '青岛地铁'},
]

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
        // const { current } = this.state;
        return(
            <div className='app-ticket'>
                <div className='app-ticket-use'>
                    {ways.map((item, index) => {
                        return(<div className='app-ticket-row' key={index}>
                            <div className='app-ticket-title'>{item.name}</div>
                            <div className='app-ticket-bar'></div>
                            <div>{item.tool}</div>
                        </div>)
                    })}
                </div>
            </div>
        )
    }
}

export default AppTicket;