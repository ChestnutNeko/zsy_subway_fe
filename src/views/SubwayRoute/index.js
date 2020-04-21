/**
 * 地铁路线
 */
import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import './index.css';
import AliMap from './component/AliMap';

class SubwayRoute extends Component {
    constructor(props) {
        super(props);
    }
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