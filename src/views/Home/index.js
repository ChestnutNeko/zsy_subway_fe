/**
 * 首页
 */
import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import './index.css';
import HomeMap from './component/HomeMap';

class Home extends Component {
    
    render() {
        return(
            <div className='home'>
                <div className='home-bread'>
                    <Breadcrumb>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className='home-content'>
                    <HomeMap />
                </div>
            </div>
        )
    }
}

export default Home;