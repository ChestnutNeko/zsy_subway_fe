import React, { Component } from 'react';
import { PoweroffOutlined } from '@ant-design/icons';
import './index.css';

class HeaderUser extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleLogin = () => {
        console.log('----------login');
        // this.props.history.push('/home');
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