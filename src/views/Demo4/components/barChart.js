/**
 * 总览-柱状图
 */
import React from 'react'
import ReactEcharts from 'echarts-for-react';
import * as util from '../../../assets/js/utils.js';

class barChart extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            option: {},
            xAxis: [],
            echartsData: [],
            text: '', // 主标题
            subtext: '',
            barColor: '',
        };
    }

    componentDidMount() {
        this.setState({
            option: this.getOption()
        });
    }

    componentWillReceiveProps(props) {
        this.setState({
            // legend: props.legend,
            text: props.text,
            subtext: props.subtext,
            barColor: props.barColor,
            xAxis: props.xAxis,
            echartsData: props.echartsData,
        },()=> {
            this.setState({
                option: this.getOption()
            });
        });
    }

    getOption = ()=> {
        const { text, subtext, barColor, xAxis, echartsData } = this.state;
        let series = [];
        let seriesData = [];
		for(let i=0; i<echartsData.length; i++) {
            seriesData.push(echartsData[i].data[0]);
			series.push({name: echartsData[i].name});
        }
        // console.log('==========barseries', echartsData, series, seriesData)
        return {
            color: barColor,
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
                padding: [30, 0, 10, 30]
            },
            tooltip: {
				trigger: 'item',
				formatter: (params) => {
					let templete = '';
                    let urlName = '';
                    let url = '';
					for(let i=0; i<echartsData.length; i++) {
                        if(params.name === echartsData[i].name) {
						    urlName = echartsData[i].urlName;
                            url = echartsData[i].url;
                        }
					}
                    console.log('xxxxx', urlName);
					templete=`${params.marker}${params.name}:&nbsp;${util.formatMoney(params.data)}%<br/>
                        <a href=${url}>${urlName}</a>`;
					return templete
				},
                alwaysShowContent: true
			},
            grid: {
				left: '6%',
				right: '3%',
				bottom: '4%',
				top: '20%',
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
					rotate: 40
				}
            },
            yAxis: {
                type: 'value',
                axisLabel: {
					formatter: '{value}%'
				},
				position: 'left',
                // name: '环比：(当周-上周）/上周*100%',
                // nameTextStyle: {
                //     padding: [0, 0, 0, -10]    // 四个数字分别为上右下左与原位置距离
                // },
                axisTick: {
                    show: false
                },
				axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#8E97A3',
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
            series: {
                type: 'bar',
                barWidth: 40,
                data: seriesData,
            }
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

export default barChart;