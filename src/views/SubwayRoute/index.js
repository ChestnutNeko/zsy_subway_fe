/**
 * 地铁路线
 */
import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import './index.scss';
import AliMap from './component/AliMap';

class SubwayRoute extends Component {
    render() {
        return(
            <div className='subway-route'>
                <Breadcrumb>
                    <Breadcrumb.Item>地铁路线</Breadcrumb.Item>
                </Breadcrumb>
                <div className='subway-route-content'>
                    <AliMap />
                </div>
            </div>
        )
    }
}
export default SubwayRoute;