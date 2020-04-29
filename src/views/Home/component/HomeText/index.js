import React, { Component } from 'react';

class HomeText extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return(
            <div className='home-text'>
                <div className='home-text-header'>
                    <div className='home-text-header-hello'>欢迎来到</div>
                    <div className='home-text-header-system'>基于React的城市地铁管理系统</div>
                </div>
                <div className='home-text-body'></div>
            </div>
        )
    }
}

export default HomeText;