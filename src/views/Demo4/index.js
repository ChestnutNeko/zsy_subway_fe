/**
 * Echarts
*/
import React from 'react'
import { Spin } from 'antd';
import PropTypes from "prop-types";
import './index.less';
import LineChart from './components/lineChart';
import BarChart from './components/barChart';
 
class Demo4 extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            xAxis1: [],
            legend1: [],
            echartsData1: [],
            xAxis2: [],
            echartsData2: [],
            xAxis3: [],
            echartsData3: [],
            titleThisWeek: '',
        }
    }
    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.searchData();
    }

    overviewIncome = () => {
        this.setState({
            xAxis1: [
                "03.26 - 04.01",
                "04.02 - 04.08",
                "04.09 - 04.15",
                "04.16 - 04.22",
                "04.23 - 04.29",
                "04.30 - 05.06",
                "05.07 - 05.13",
                "05.14 - 05.20",
                "05.21 - 05.27"
            ],
            legend1: [
                "2021-03-26~2021-05-27",
                "2020-03-26~2020-05-27"
            ],
            echartsData1: [
                {
                    "name": "2021-03-26~2021-05-27",
                    "data": [
                      331.00,
                      180.42,
                      207.75,
                      166.08,
                      230.14,
                      152.01,
                      109.00,
                      132.59,
                      158.53
                    ]
                },
                {
                    "name": "2020-03-26~2020-05-27",
                    "data": [
                      2102.01,
                      2053.66,
                      2059.51,
                      2058.33,
                      2007.20,
                      1950.07,
                      2028.46,
                      2037.13,
                      2094.14
                    ]
                }
            ]
        })
    }

    getSecondCategory = () => {
        this.setState({
            xAxis2: [
                "Lolita-摇篮曲Lolita",
                "Lolita-天线猫洋装",
                "Lolita-虎斑猫",
                "Lolita-ap",
                "JK-梗豆物语",
                "JK-猫萌哒的店铺"
            ],
            echartsData2: [
                {
                  "name": "Lolita-摇篮曲Lolita",
                  "data": [
                    34.18
                  ]
                },
                {
                  "name": "Lolita-天线猫洋装",
                  "data": [
                    18.23
                  ]
                },
                {
                  "name": "Lolita-虎斑猫",
                  "data": [
                    9.41
                  ]
                },
                {
                  "name": "Lolita-ap",
                  "data": [
                    30.41
                  ]
                },
                {
                  "name": "JK-梗豆物语",
                  "data": [
                    -2.04
                  ]
                },
                {
                  "name": "JK-猫萌哒的店铺",
                  "data": [
                    9.81
                  ]
                }
            ]
        })
    }

    getThirdCategory = () => {
        this.setState({
            xAxis3: [
                "摇篮曲Lolita-心跳jsk",
                "摇篮曲Lolita-摇篮曲jsk",
                "天线猫洋装-三岁半",
                "虎斑猫-三花猫",
                "ap-草莓",
                "ap-上海豆",
                "梗豆物语-烟紫",
                "梗豆物语-薄荷冰",
                "猫萌哒的店铺-温眠"
            ],
            echartsData3: [
                {
                  "name": "摇篮曲Lolita-心跳jsk",
                  "data": [
                    24.11
                  ]
                },
                {
                  "name": "摇篮曲Lolita-摇篮曲jsk",
                  "data": [
                    10.07
                  ]
                },
                {
                  "name": "天线猫洋装-三岁半",
                  "data": [
                    18.23
                  ]
                },
                {
                  "name": "虎斑猫-三花猫",
                  "data": [
                    9.41
                  ]
                },
                {
                  "name": "ap-草莓",
                  "data": [
                    20.11
                  ]
                },
                {
                  "name": "ap-上海豆",
                  "data": [
                    10.30
                  ]
                },
                {
                  "name": "梗豆物语-烟紫",
                  "data": [
                    -16.00
                  ]
                },
                {
                  "name": "梗豆物语-薄荷冰",
                  "data": [
                    14.04
                  ]
                },
                {
                  "name": "猫萌哒的店铺-温眠",
                  "data": [
                    9.81
                  ]
                }
            ]
        })
    }

    searchData = () => {
        this.overviewIncome();
        this.getSecondCategory();
        this.getThirdCategory();
    }

    render() {
        const {
            loading,
            legend1,
            xAxis1,
            echartsData1,
            xAxis2,
            echartsData2,
            xAxis3,
            echartsData3,
            titleThisWeek,
        } = this.state;
        return (<Spin spinning={loading}>
            <div className='overview-content'>
                <div className='echarts-area'>
                    <div className='echarts-area-line'>
                        <LineChart
                            text={`总收入-分周（截止周：${titleThisWeek}）`}
                            // userName={this.props.userInfoList.pin}
                            legend={legend1}
                            xAxis={xAxis1}
                            echartsData={echartsData1}/>
                    </div>
                    <div className='echarts-area-bar'>
                        <div className='echarts-area-bar1'>
                            <BarChart
                                text={`周收入环比-当周-二级业务线`}
                                // userName={this.props.userInfoList.pin}
                                barColor='#6E8FFE'
                                xAxis={xAxis2}
                                echartsData={echartsData2}/>
                        </div>
                        <div className='echarts-area-bar2'>
                            <BarChart
                                text={`周收入环比-当周-三级业务线`}
                                // userName={this.props.userInfoList.pin}
                                barColor='#7FE2CC'
                                xAxis={xAxis3}
                                echartsData={echartsData3}/>
                        </div>
                    </div>
                </div>
            </div>
        </Spin>)
    }
}
 
export default Demo4;