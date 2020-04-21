import React, { Component } from 'react';
import { PoweroffOutlined } from '@ant-design/icons';
import './index.css';

class HeaderUser extends Component {

    handleLogin = () => {
        console.log('----------login');
    }

    render() {
        return(
            <div className='header-user'>
                user 
                <span className='header-user-click' onClick={this.handleLogin}>
                    <PoweroffOutlined />
                </span>
            </div>
        )
    }
}

export default HeaderUser;