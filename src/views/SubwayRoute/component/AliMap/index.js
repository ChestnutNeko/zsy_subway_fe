/**
 * 高德地图
 */
import React, { Component } from 'react';
import './index.css';

class AliMap extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.aliMap();
    }

    easyMap = () => {
        //eslint-disable-next-line
        let mySubway = subway('mysubway', {
            easy: 1
        });
    }

    subwayMap = () => {
        //eslint-disable-next-line
        // var map = new AMap.Map('container', {
        //     viewMode: '3D',
        //     pitch: 50,
        //     zoom: 11,
        //     center: [116.480766, 39.932931]
        // });

        //eslint-disable-next-line
        let mySubway = subway("mysubway", {
            // adcode: 3100 //上海的adcode
            adcode: 1100,
            theme: "colorful",
            client: 0,
            doubleclick: {
                switch: true
            }
        });

        //地铁加载完成，执行complete事件
        //eslint-disable-next-line
        mySubway.event.on('subway.complete', (ev, info) => {
            let id = info.id;
            let allLineList = mySubway.getLinelist();
        });

        //点击站点，显示此站点的信息窗体
        //eslint-disable-next-line
        mySubway.event.on("station.touch", (ev, info) => {
            let id = info.id;
            console.log('----------id', id);
            mySubway.stopAnimation();
            mySubway.addInfoWindow(id, {});
            let center = mySubway.getStCenter(id);
            mySubway.setCenter(center);
        });

        //点击线路名，高亮此线路
        //eslint-disable-next-line
        mySubway.event.on("lineName.touch", function(ev, info) {
            mySubway.showLine(info.id);
            // let select_obj = qs('#g-select');
            // mySubway.setFitView(select_obj);
            // let center = mySubway.getSelectedLineCenter();
            // mySubway.setCenter(center);
        });

        //设置起点
        //eslint-disable-next-line
        mySubway.event.on("startStation.touch", function(ev, info) {
            mySubway.stopAnimation();
            mySubway.clearInfoWindow();
            mySubway.setStart(info.id, {});
            startInfo = info;
            route();
        });

        //设置终点
        //eslint-disable-next-line
        mySubway.event.on("endStation.touch", function(ev, info) {
            mySubway.stopAnimation();
            mySubway.clearInfoWindow();
            mySubway.setEnd(info.id, {});
            endInfo = info;
            route();
        });

        //路线规划
        var startInfo = {},
            endInfo = {};
        function route() {
            if (startInfo.id && endInfo.id) {
                //eslint-disable-next-line
                mySubway.route(startInfo.id, endInfo.id, {});
                startInfo = {};
                endInfo = {};
            }
        }
    }

    aliMap = () => {
        // 地图
        //eslint-disable-next-line
        let mySubway = new AMap.Map('mysubway', {
            viewMode: '3D', //3D视图
            pitch: 50,
            zoom: 11, //级别
            center: [116.480766, 39.9322931] //中心点坐标
        });

        // 工具条
        //eslint-disable-next-line
        let toolbar = new AMap.ToolBar();
    }

    render() {
        return(
            <div className='ali-map' style={{width:'100%',height:'500px'}}>
                <div id='mysubway' style={{width:'100%',height:'100%'}}></div>
                <div></div>
            </div>
        )
    }
}

export default AliMap;