import React, { Component } from 'react';
import './index.css';
import HeaderLogo from './component/HeaderLogo';
import HeaderUser from './component/HeaderUser';

class Header extends Component {
    render() {
        return(
            <div className='header'>
                <HeaderLogo />
                <HeaderUser />
            </div>
        )
    }
}
export default Header;