/**
 * 地铁购票
 */
import React, { Component } from 'react';
import { Breadcrumb, Carousel, Tabs } from 'antd';
import './index.css';
import CardTicket from './component/CardTicket';
import AlipayTicket from './component/AlipayTicket';
import VxTicket from './component/VxTicket';
import AppTicket from './component/AppTicket';
import subway2 from '../../assets/images/subway2.jpg';
import subway4 from '../../assets/images/subway4.jpg';
const { TabPane } = Tabs;

class SubwayTicket extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    callback = (key) => {
        console.log(key)
    }
    render() {
        return(
            <div className='subway-ticket'>
                <Breadcrumb>
                    <Breadcrumb.Item>地铁购票</Breadcrumb.Item>
                </Breadcrumb>
                <div className='subway-ticket-content'>
                    <div>
                        <Carousel autoplay>
                            <div>
                                <h3><img src={subway4} alt='地铁图'></img></h3>
                            </div>
                            <div>
                                <h3>沈阳地铁：十号线4月29日开通运营</h3>
                            </div>
                            <div>
                                <h3><img src={subway2} alt='地铁图'></img></h3>
                            </div>
                            <div>
                                <h3>北京地铁：“五一”节日期间部分车站封站</h3>
                            </div>
                        </Carousel>
                    </div>
                    <div className='subway-ticket-tab'>
                        <Tabs defaultActiveKey="1" onChange={this.callback}>
                            <TabPane tab="地铁卡" key="1">
                                <CardTicket />
                            </TabPane>
                            <TabPane tab='支付宝' key="2">
                                <AlipayTicket />
                            </TabPane>
                            <TabPane tab="微信小程序" key="3">
                                <VxTicket />
                            </TabPane>
                            <TabPane tab="地铁APP" key="4">
                                <AppTicket />
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
        )
    }
}
export default SubwayTicket;