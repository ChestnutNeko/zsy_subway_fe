/**
 * 地铁卡
 */
import React, { Component } from 'react';
import './index.css';

class CardTicket extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return(
            <div className='card-ticket'>
                <div className='card-ticket-content'>
                    城市 折扣 备注<br/>
                    上海 1-0.9 当月满70元后9折<br/>
                    北京 1-0.5 当月满100元后8折，满150后5折，满400元后不打折<br/>
                    广州 0.95<br/>
                    南京 0.95<br/>
                    重庆 0.9<br/>
                    武汉 0.9<br/>
                    深圳 0.95<br/>
                    成都 0.9<br/>
                    青岛 0.9<br/>
                    大连 0.9-0.7 当月满100元8折，满150元7折，满300元9折<br/>
                    西安 0.9<br/>
                    苏州 0.95<br/>
                    杭州 0.91<br/>
                    长春 0.95<br/>
                    郑州 0.95<br/>
                    昆明 0.9 计次卡100元28次，2年内有效<br/>
                    宁波 0.95<br/>
                    长沙 0.9<br/>
                    沈阳 0.9<br/>
                    合肥 0.9<br/>
                    无锡 0.95<br/>
                    南宁 0.9<br/>
                    南昌 0.9<br/>
                    东莞 0.9<br/>
                    温州 0.9<br/>
                    贵阳 0.9<br/>
                    石家庄 0.9<br/>
                    厦门 0.9<br/>
                    福州 0.9 计次卡50元15次，100元30次，150元45次<br/>
                    佛山 0.95-0.6 公交地铁累计满15次6折<br/>
                    乌鲁木齐 0.9<br/>
                </div>
            </div>
        )
    }
}
export default CardTicket;