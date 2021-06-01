/**
 * 总览-折线图
 */
import React from 'react'
import ReactEcharts from 'echarts-for-react';
import * as util from '../../../assets/js/utils.js';

class lineChart extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            option: {},
            legend: [],
            xAxis: [],
            echartsData: [],
            text: '',
            subtext: '',
            seriesData1: [], // 折线数据
            seriesData2: []
        };
    }

    componentDidMount() {
        this.setState({
            option: this.getOption()
        });
    }

    componentWillReceiveProps(props) {
        this.setState({
            text: props.text,
            subtext: props.subtext,
            legend: props.legend,
            xAxis: props.xAxis,
            echartsData: props.echartsData,
        },()=> {
            if(props.echartsData.length > 0) {
                // console.log('============props.echartsData', props.echartsData)
                this.setState({
                    seriesData1: props.echartsData[0],
                    seriesData2: props.echartsData[1],
                },()=>{
                    this.setState({
                        option: this.getOption(),
                    });
                });
            } else {
                this.setState({
                    option: this.getOption(),
                });
            }
        });
    }

    getOption = ()=> {
        const { text, subtext, legend, xAxis, echartsData, seriesData1, seriesData2 } = this.state;
        let series= [];
		for (let i=0; i<echartsData.length; i++) {
			series.push({
				name: echartsData[i].name,
				type: 'line',
				symbol: 'circle', //折线点设置为实心点
				symbolSize: 10, //折线点的大小
				smooth: true,
                data: echartsData[i].data,
			})
        }
        // console.log('==========lineseries', echartsData, series, seriesData1, seriesData2)
        return {
            color: ['#35DAD3','#4B74FF'],
            title: {
                text: text,
                textStyle: {
                    fontSize: 18,
                    fontWeight: 600,
                    color: '#002668',
                },
                subtext: subtext,
                subtextStyle: {
                    fontSize: 14,
                    fontWeight: 400,
                    color: '#002764',
                },
                padding: [30, 0, 0, 30]
            },
            tooltip: {
				trigger: 'item',
				formatter: (params) => {
					let templete = '';
                    // templete=`${params.seriesName}<br/>${params.marker}${params.name}:&nbsp;${util.formatMoney(params.data)}万元`;
                    // templete=`${params.marker}${params.name}&nbsp;:&nbsp;&nbsp;${util.formatMoney(params.data)}万元`;
                    templete=`${params.marker}${util.formatMoney(params.data)}万元`;
					return templete
				},
			},
            legend: {
				data: legend,
				padding: [60, 100],
				textStyle: {
					color: '#002959',
					fontSize: '14px',
                }
			},
            grid: {
				left: '3%',
				right: '3%',
				bottom: '4%',
				top: '25%',
				containLabel: true,
                show: false,
                borderColor: '#8CA0B3'
			},
            xAxis: {
                data: xAxis,
				type: 'category',
                // boundaryGap: false,
                axisLine: {
                    lineStyle: {
                        color: '#8CA0B3',
                    }
                },
                splitLine: {
                    show: false,
                    lineStyle:{
                       color: '#8CA0B3',
                       width: 1,
                       type: 'solid'
                  }
            　　},
				axisLabel: {
					// rotate: 40
				}
            },
            yAxis: {
                type: 'value',
				position: 'left',
                name: '单位（万元）',
                axisTick: {
                    show: false
                },
				axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#8CA0B3',
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle:{
                       color: '#E5E9EE',
                       width: 1,
                       type: 'solid'
                  }
            　　}
            },
            series: [{
                type: 'line',
                symbol: 'circle', //折线点设置为实心点
                symbolSize: 10, //折线点的大小
                smooth: true,
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: '#02D0C7' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#fff' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                },
                name: seriesData1.name,
                data: seriesData1.data
            },{
                type: 'line',
                symbol: 'circle', //折线点设置为实心点
                symbolSize: 10, //折线点的大小
                smooth: true,
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: '#4B74FF' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#fff' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                },
                name: seriesData2.name,
                data: seriesData2.data
            }]
        }
    }

    render() {
        const {
            option
        } = this.state;
        return (
            <ReactEcharts
                option={option}
                notMerge={true} // 去除历史数据残留
                style={{height: '100%', width: '100%'}}/>
        )
    }
}

export default lineChart;