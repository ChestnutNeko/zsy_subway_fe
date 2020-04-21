/**
 * 首页地图
 */
import React, { Component } from 'react';
import './index.css';
var echarts = require('echarts/lib/echarts');
// 引入中国地图
require('echarts/map/js/china.js');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

class HomeMap extends Component {

    componentDidMount() {
        this.echartsMap();
    }

    // Eachers地图
    echartsMap = () => {
        var name_title = '中国2020年各省地铁概况（不包括台湾、香港、澳门）'
        var subname = '运营里程（km）、运营线路条数'
        var nameColor = 'rgb(55, 75, 113)'
        var name_fontFamily = '等线'
        var subname_fontSize = 16
        var name_fontSize = 18
        var mapName = 'china'
        var myChart = echarts.init(document.getElementById('main'));
        window.addEventListener('resize', () => {
            myChart.resize();
        });
        var data = [
            {name:"上海",value:15},
            {name:"北京",value:20},
            {name:"广东",value:15},
            {name:"江苏",value:10},
            {name:"深圳",value:8},
            {name:"湖北",value:8},
            {name:"四川",value:6},
            {name:"重庆",value:7},
            {name:"浙江",value:5},
            {name:"南京",value:5},
            {name:"天津",value:5},
            {name:"辽宁",value:5},
            {name:"河南",value:4},
            {name:"陕西",value:4},
            {name:"云南",value:3},
            {name:"福建",value:3},
            {name:"湖南",value:3},
            {name:"广西",value:3},
            {name:"山东",value:3},
            {name:"安徽",value:2},
            {name:"黑龙江",value:2},
            {name:"江西",value:2},
            {name:"新疆",value:1},
            {name:"吉林",value:2},
            {name:"贵州",value:1},
            {name:"河北",value:2},
            {name:"山西",value:0},
            {name:"内蒙古",value:0},
            {name:"宁夏",value:0},
            {name:"西藏",value:0},
            {name:"青海",value:0},
            {name:"甘肃",value:0},
            {name:"海南",value:0},
        ];
        var geoCoordMap = {};
        var toolTipData = [ 
            {name:"上海",value:[{name:"运营里程",value:670},{name:"运营线路条数",value:15}]},
            {name:"北京",value:[{name:"运营里程",value:617},{name:"运营线路条数",value:20}]},
            {name:"广东",value:[{name:"运营里程",value:512},{name:"运营线路条数",value:15}]},
            {name:"江苏",value:[{name:"运营里程",value:353},{name:"运营线路条数",value:10}]},
            {name:"深圳",value:[{name:"运营里程",value:286},{name:"运营线路条数",value:8}]},
            {name:"湖北",value:[{name:"运营里程",value:264},{name:"运营线路条数",value:8}]},
            {name:"四川",value:[{name:"运营里程",value:222},{name:"运营线路条数",value:6}]},
            {name:"重庆",value:[{name:"运营里程",value:215},{name:"运营线路条数",value:7}]},
            {name:"浙江",value:[{name:"运营里程",value:190},{name:"运营线路条数",value:5}]},
            {name:"南京",value:[{name:"运营里程",value:176},{name:"运营线路条数",value:5}]},
            {name:"天津",value:[{name:"运营里程",value:167},{name:"运营线路条数",value:5}]},
            {name:"辽宁",value:[{name:"运营里程",value:143},{name:"运营线路条数",value:5}]},
            {name:"河南",value:[{name:"运营里程",value:134},{name:"运营线路条数",value:4}]},
            {name:"陕西",value:[{name:"运营里程",value:123},{name:"运营线路条数",value:4}]},
            {name:"云南",value:[{name:"运营里程",value:89},{name:"运营线路条数",value:3}]},
            {name:"福建",value:[{name:"运营里程",value:85},{name:"运营线路条数",value:3}]},
            {name:"湖南",value:[{name:"运营里程",value:82},{name:"运营线路条数",value:3}]},
            {name:"广西",value:[{name:"运营里程",value:81},{name:"运营线路条数",value:3}]},
            {name:"山东",value:[{name:"运营里程",value:71},{name:"运营线路条数",value:3}]},
            {name:"安徽",value:[{name:"运营里程",value:52},{name:"运营线路条数",value:2}]},
            {name:"黑龙江",value:[{name:"运营里程",value:50},{name:"运营线路条数",value:2}]},
            {name:"江西",value:[{name:"运营里程",value:49},{name:"运营线路条数",value:2}]},
            {name:"新疆",value:[{name:"运营里程",value:44},{name:"运营线路条数",value:1}]},
            {name:"吉林",value:[{name:"运营里程",value:39},{name:"运营线路条数",value:2}]},
            {name:"贵州",value:[{name:"运营里程",value:34},{name:"运营线路条数",value:1}]},
            {name:"河北",value:[{name:"运营里程",value:28},{name:"运营线路条数",value:2}]},
            {name:"山西",value:[{name:"运营里程",value:0},{name:"运营线路条数",value:0}]},
            {name:"内蒙古",value:[{name:"运营里程",value:0},{name:"运营线路条数",value:0}]},
            {name:"宁夏",value:[{name:"运营里程",value:0},{name:"运营线路条数",value:0}]},
            {name:"青海",value:[{name:"运营里程",value:0},{name:"运营线路条数",value:0}]},
            {name:"甘肃",value:[{name:"运营里程",value:0},{name:"运营线路条数",value:0}]},
            {name:"海南",value:[{name:"运营里程",value:0},{name:"运营线路条数",value:0}]},
            {name:"西藏",value:[{name:"运营里程",value:0},{name:"运营线路条数",value:0}]},
        ];
        /*获取地图数据*/
        myChart.showLoading();
        var mapFeatures = echarts.getMap(mapName).geoJson.features;
        myChart.hideLoading();
        mapFeatures.forEach(function(v) {
            // 地区名称
            var name = v.properties.name;
            // 地区经纬度
            geoCoordMap[name] = v.properties.cp;
        });

        // var max = 480,
        //     min = 9; // todo 
        // 红tip大小
        var max = 200,
            min = 10;
        // var maxSize4Pin = 100,
        //     minSize4Pin = 20;
        var maxSize4Pin = 100,
            minSize4Pin = 20;
        var convertData = function(data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value),
                    });
                }
            }
            return res;
        };
        var option = {
            title: {
                text: name_title,
                subtext: subname,
                x: 'center',
                textStyle: {
                    color: nameColor,
                    fontFamily: name_fontFamily,
                    fontSize: name_fontSize
                },
                subtextStyle:{
                    fontSize:subname_fontSize,
                    fontFamily:name_fontFamily
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: function(params) {
                    if (typeof(params.value)[2] == "undefined") {
                        var toolTiphtml = ''
                        for(var i = 0;i<toolTipData.length;i++){
                            if(params.name===toolTipData[i].name){
                                toolTiphtml += toolTipData[i].name+':<br>'
                                for(var j = 0;j<toolTipData[i].value.length;j++){
                                    toolTiphtml+=toolTipData[i].value[j].name+':'+toolTipData[i].value[j].value+"<br>"
                                }
                            }
                        }
                        // console.log(toolTiphtml)
                        // console.log(convertData(data))
                        return toolTiphtml;
                    } else {
                        // var toolTiphtml = ''
                        for(let i = 0;i<toolTipData.length;i++){
                            if(params.name===toolTipData[i].name){
                                toolTiphtml += toolTipData[i].name+':<br>'
                                for(let j = 0;j<toolTipData[i].value.length;j++){
                                    toolTiphtml+=toolTipData[i].value[j].name+':'+toolTipData[i].value[j].value+"<br>"
                                }
                            }
                        }
                        // console.log(toolTiphtml)
                        // console.log(convertData(data))
                        return toolTiphtml;
                    }
                }
            },
            // legend: {
            //     orient: 'vertical',
            //     y: 'bottom',
            //     x: 'right',
            //     data: ['credit_pm2.5'],
            //     textStyle: {
            //         color: '#fff'
            //     }
            // },
            visualMap: {
                show: true,
                min: 0,
                max: 20,
                left: 'left',
                top: 'bottom',
                text: ['高', '低'], // 文本，默认为数值文本
                calculable: true,
                seriesIndex: [1],
                inRange: {
                    // color: ['#3B5077', '#031525'] // 蓝黑
                    // color: ['#ffc0cb', '#800080'] // 红紫
                    // color: ['#3C3B3F', '#605C3C'] // 黑绿
                    // color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
                    // color: ['#23074d', '#cc5333'] // 紫红
                    color: ['#00467F', '#A5CC82'] // 蓝绿
                    // color: ['#1488CC', '#2B32B2'] // 浅蓝
                }
            },
            /*工具按钮组*/
            // toolbox: {
            //     show: true,
            //     orient: 'vertical',
            //     left: 'right',
            //     top: 'center',
            //     feature: {
            //         dataView: {
            //             readOnly: false
            //         },
            //         restore: {},
            //         saveAsImage: {}
            //     }
            // },
            geo: {
                show: true,
                map: mapName,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false,
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#031525',
                        borderColor: '#3B5077',
                    },
                    emphasis: {
                        areaColor: '#2B91B7',
                    }
                }
            },
            series: [{
                    name: '散点',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: convertData(data),
                    symbolSize: function(val) {
                        return val[2] / 10;
                    },
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#05C3F9'
                        }
                    }
                },
                {
                    type: 'map',
                    map: mapName,
                    geoIndex: 0,
                    aspectScale: 0.75, //长宽比
                    showLegendSymbol: false, // 存在legend时显示
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    roam: true,
                    itemStyle: {
                        normal: {
                            areaColor: '#031525',
                            borderColor: '#3B5077',
                        },
                        emphasis: {
                            areaColor: '#2B91B7'
                        }
                    },
                    animation: false,
                    data: data
                },
                {
                    name: '点',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    symbol: 'pin', //气泡
                    symbolSize: function(val) {
                        var a = (maxSize4Pin - minSize4Pin) / (max - min);
                        var b = minSize4Pin - a * min;
                        b = maxSize4Pin - a * max;
                        return a * val[2] + b;
                    },
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                                color: '#fff',
                                fontSize: 9,
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#F62157', //标志颜色
                        }
                    },
                    zlevel: 6,
                    data: convertData(data),
                },
                {
                    name: 'Top 5',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: convertData(data.sort(function(a, b) {
                        return b.value - a.value;
                    }).slice(0, 5)),
                    symbolSize: function(val) {
                        return val[2] / 10;
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'yellow',
                            shadowBlur: 10,
                            shadowColor: 'yellow'
                        }
                    },
                    zlevel: 1
                },
        
            ]
        };
        myChart.setOption(option);
    }
    render() {
        return(
            <div className='home-map' id='main'></div>
        )
    }
}

export default HomeMap;