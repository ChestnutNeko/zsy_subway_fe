import React, { Component } from 'react';
import './index.css';

class HomeText extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return(
            <div className='home-text'>
                <div className='home-text-header'>
                    <div className='home-text-header-hello'>欢迎来到，</div>
                    <div className='home-text-header-system'>基于React的城市地铁管理系统</div>
                </div>
                <div className='home-text-body'>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地铁是在城市中修建的快速、大运量、用电力牵引的轨道交通。列车在全封闭的线路上运行，位于中心城区的线路基本设在地下隧道内，中心城区以外的线路一般设在高架桥或地面上，英语为metro(underground railway、subway)。地铁是涵盖了城市地区各种地下与地上的路权专有、高密度、高运量的城市轨道交通系统（Metro），中国台湾地铁称之为“捷运”（Rapid transit）。
                    <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;除了地下铁以外，也包括高架铁路（Elevated railway）或路面上铺设的铁路。因此，地铁是路权专有的、无平交，这也是地铁区别于轻轨交通系统的根本性的标志。世界上最早的（也是第一条）地铁是英国伦敦的大都会地铁，始建于1863年。
                    <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;基于React的城市地铁管理系统是一个地铁乘坐管理系统，可看地图、收藏路线、发布失物、找回失物、查看票价及购买方式，方便用户乘坐地铁。
                </div>
            </div>
        )
    }
}

export default HomeText;