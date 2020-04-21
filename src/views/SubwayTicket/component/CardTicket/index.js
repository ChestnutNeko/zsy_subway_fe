/**
 * 地铁卡
 */
import React, { Component } from 'react';
import './index.css';
import { Select, Button } from 'antd';

class CardTicket extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return(
            <div className='card-ticket'>
                <div className='card-ticket-search'>
                    <div className='card-ticket-search-row'>
                        <Select
                            defaultValue='城市'
                            style={{width: 120}}
                        ></Select>
                    </div>
                    <div className='card-ticket-search-row'>
                        <Select
                            defaultValue='起始站'
                            style={{width: 120}}
                        ></Select>
                    </div>
                    <div className='card-ticket-search-row'>
                        <Select
                            defaultValue='终点站'
                            style={{width: 120}}
                        ></Select>
                    </div>
                    <div className='card-ticket-search-row'>
                        <Button type='primary'>确认</Button>
                    </div>
                </div>
                <div className='card-ticket-content'>xxxxx</div>
            </div>
        )
    }
}
export default CardTicket;