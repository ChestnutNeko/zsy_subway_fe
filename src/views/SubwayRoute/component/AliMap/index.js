/**
 * 高德地图
 */
import React, { Component } from 'react';
import { Map, Marker } from 'react-amap';
import { Input, Button, Modal, message } from 'antd';
import './index.css';
import * as actions from '../../store/action';
import { connect } from 'react-redux';

class AliMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routesStart: '', // 起始点
            routesEnd: '', // 终点
            routesName: '', // 路线名称
            visible: false,
            // 设置坐标点，就会在地图上显示一个 标记点
            markerPosition: { longitude: 120, latitude: 35 },
        }
        // 高德地图 Marker 实例
        this.markerInstance = undefined
        // 高德地图 Map 实例
        this.mapInstance = undefined
        this.amapEvents = {
            created: mapInstance => {
                console.log('高德地图 Map 实例创建成功；如果你要亲自对实例进行操作，可以从这里开始。比如：');
                console.log('缩放级别：', mapInstance.getZoom());
                this.mapInstance = mapInstance
              
                //eslint-disable-next-line
                AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.CitySearch'], () => {
                    // 实例化Autocomplete
                    const autoOptions = {
                        // city 限定城市，默认全国
                        // city: '025',
                        // input 为绑定输入提示功能的input的DOM ID
                        input: 'amapInput',
                    }
                    //eslint-disable-next-line
                    const autoComplete = new AMap.Autocomplete(autoOptions);
                    // 无需再手动执行search方法，autoComplete会根据传入input对应的DOM动态触发search
      
                    //eslint-disable-next-line
                    const placeSearch = new AMap.PlaceSearch({
                        // city: '南京',
                        map: mapInstance,
                    });
      
                    // 监听下拉框选中事件
                    //eslint-disable-next-line
                    AMap.event.addListener(autoComplete, 'select', e => {
                        // TODO 针对选中的poi实现自己的功能
                        placeSearch.setCity(e.poi.adcode)
                        placeSearch.search(e.poi.name)
                    });
      
      
                    //eslint-disable-next-line
                    const citySearch = new AMap.CitySearch()
                    citySearch.getLocalCity((status, result) => {
                        if (status === 'complete' && result.info === 'OK') {
                            // 查询成功，result即为当前所在城市信息
                            console.log('当前所在城市：', result)
                        if (result && result.city && result.bounds) {
                            // 当前城市名称
                            // const cityinfo = result.city;
      
                            // 当前城市位置信息
                            const citybounds = result.bounds;
                            // document.getElementById('info').innerHTML = '您当前所在城市：'+cityinfo;
                            // 地图显示当前城市
                            mapInstance.setBounds(citybounds);
                            // 需要在设置坐标成功后，重新设置 缩放级别
                            // mapInstance.setZoom(15)
                        }
                    }
                });
            });
                // 实例点击事件
                    mapInstance.on('click', e => {
                    const lngLat = `${e.lnglat.getLat()},${e.lnglat.getLng()}`
                    console.log('坐标位置:', lngLat)
                    this.props.onChange(lngLat)
                });
            },
        };
        this.markerEvents = {
            created: markerInstance => {
                console.log('高德地图 Marker 实例创建成功；如果你要亲自对实例进行操作，可以从这里开始。比如：');
                console.log(markerInstance.getPosition());
      
                this.markerInstance = markerInstance
            },
        }
        // this.markerPosition = { longitude: 120, latitude: 30 };
    }

    componentDidUpdate(prevProps) {
        const { value } = this.props
        if (this.props.value !== prevProps.value) {
            if (value) {
                const temp = value.split(',')
    
                // 重新设置地图坐标点
                this.setState({ markerPosition: { longitude: temp[1], latitude: temp[0] } }, () => {
                    // 需要在设置坐标成功后，重新设置 缩放级别
                    if (this.mapInstance) {
                        this.mapInstance.setZoom(15)
                    }
                });
            }
        }
    }
    

    componentDidMount() {
        // this.aliMap();
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
            // let id = info.id;
            // let allLineList = mySubway.getLinelist();
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

    handleStartChange = e => {
        this.setState({
            routesStart: e.target.value
        });
    }

    handleEndChange = e => {
        this.setState({
            routesEnd: e.target.value
        });
    }

    collectRoutes = () => {
        this.setState({
            visible: true
        });
    }

    handleCollectOk = () => {
        const { routesStart, routesEnd, routesName } = this.state;
        this.setState({
            visible: false
        });
        this.props.routeCollect({
            userId: 22,
            userName: 'zsy',
            routesStart,
            routesEnd,
            routesName
        }, res => {
            if(res.code === 0) {
                message.success(res.msg);
            } else {
                message.warning(res.msg);
            }
        });
    }

    handleCollectCancel = () => {
        this.setState({
            visible: false
        });
    }

    handleRouteNameChange = e => {
        this.setState({
            routesName: e.target.value
        });
    }

    handleRouteStartChange = e => {
        this.setState({
            routesStart: e.target.value
        });
    }

    handleRouteEndChange = e => {
        this.setState({
            routesEnd: e.target.value
        });
    }

    render() {
        const { routesStart, routesEnd, routesName, visible } = this.state;
        return(
            // <div className='ali-map' style={{width:'100%',height:'500px'}}>
            //     <div id='mysubway' style={{width:'100%',height:'100%'}}></div>
            //     <div></div>
            // </div>
            <>
                <div className='map' style={{ width: '100%', height: '450px', position: 'relative' }}>
                    {/* zoom={15} 设置后，无效，不知道什么原因，必须手动设置 */}
                    <Map plugins={['ToolBar']} events={this.amapEvents} amapkey={'d22d7df460d244873addaddd4117ef6e'} center={this.state.markerPosition}>
                        <Marker position={this.state.markerPosition} events={this.markerEvents} />
                    </Map>
                    <div className='map-position'>
                        <div className='map-start'>
                            <div className='map-start-text'>起始点</div>
                            <Input id='amapInput' className='map-start-input' value={routesStart} onChange={this.handleStartChange}></Input>
                        </div>
                        <div className='map-end'>
                            <div className='map-end-text'>终点</div>
                            <Input id='amapInput' className='map-end-input' value={routesEnd} onChange={this.handleEndChange}></Input>
                        </div>
                        <div className='map-button'><Button type='primary' onClick={this.collectRoutes}>收藏</Button></div>
                        <Modal
                            title='收藏路线'
                            visible={visible}
                            onOk={this.handleCollectOk}
                            onCancel={this.handleCollectCancel}
                            okText={'确认'}
                            cancelText={'取消'}
                        >
                            <div className='modal-row'>
                                <div className='modal-col'>
                                    <div className='personal-info-modal'><span className='red-star'>*&nbsp;</span>路线名称</div>
                                    <Input placeholder='请输入路线名称' value={routesName} onChange={this.handleRouteNameChange}></Input>
                                </div>
                            </div>
                            <div className='modal-row'>
                                <div className='modal-col'>
                                    <div className='personal-info-modal'><span className='red-star'>*&nbsp;</span>起始点</div>
                                    <Input placeholder='请输入起始点' value={routesStart} onChange={this.handleRouteStartChange}></Input>
                                </div>
                            </div>
                            <div className='modal-row'>
                                <div className='modal-col'>
                                    <div className='personal-info-modal'><span className='red-star'>*&nbsp;</span>终点</div>
                                    <Input placeholder='请输入终点' value={routesEnd} onChange={this.handleRouteEndChange}></Input>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
            </>
        )
    }
}
const mapStateToProps = function(state) {
    return {}
}
const mapDispatchToProps = function(dispatch) {
    return {
        routeCollect(params, cb) {
            dispatch(actions.routeCollect(params, cb));
        }
    }
} 
export default connect(mapStateToProps, mapDispatchToProps)(AliMap);