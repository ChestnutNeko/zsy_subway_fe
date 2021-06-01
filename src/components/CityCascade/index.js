/**
 * 城市级联组件
 */
import React, { Component } from 'react';
// import httpServer from '../../axios/http';
import './index.css';
import { Select } from 'antd';
const { Option } = Select;

class CityCascade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            provinceOptions: [{provinceId: 1, provinceName: '北京'}, {provinceId: 2, provinceName: '上海'}],
            cityOptions: [{cityId: 1, cityName: '北京'}],
            areaOptions: [],
        }
    }

    // componentDidMount() {
    //     this.getProvince();
    // }

    // getProvince = async () => {
    //     const result = await httpServer.requestGet(httpServer.getProvince);
    //     if (result.code === httpServer.responseOkCode) {
    //         this.setState({
    //             provinceOptions: result.result,
    //         });
    //     } else {
    //         message.error(result.msg);
    //     }
    // }

    // getCity = async () => {
    //     const { province } = this.props;
    //     if(!province || province === null) {
    //         return; 
    //     } else {
    //         const result = await httpServer.requestGet(httpServer.getCity, { province });
    //         if (result.code === httpServer.responseOkCode) {
    //             this.setState({
    //                 cityOptions: result.result,
    //             });
    //         } else {
    //             message.error(result.msg);
    //         }
    //     }
    // }

    // getArea = async () => {
    //     const { area } = this.props;
    //     if(!area || area === null) {
    //         return; 
    //     } else {
    //         const result = await httpServer.requestGet(httpServer.getArea, { area });
    //         if (result.code === httpServer.responseOkCode) {
    //             this.setState({
    //                 areaOptions: result.result,
    //             });
    //         } else {
    //             message.error(result.msg);
    //         }
    //     }
    // }

    render() {
        const { provinceOptions, cityOptions, areaOptions } = this.state;
        const { province, city, area } = this.props;
        return(
            <div className='city-cascade'>
                <Select
                    allowClear
                    placeholder='省'
                    className='city-cascade-select'
                    value={province}
                    onChange={val=>{
                        this.setState({
                            province: val,
                            city: null,
                            area: null
                        }, () => {
                            console.log('-------pp', this.state.province, this.state.city)
                        });
                    }}
                >
                    {provinceOptions.map(item=>{
                        return(<Option key={item.provinceId} value={item.provinceId}>{item.provinceName}</Option>)
                    })}
                </Select>
                <Select
                    allowClear
                    placeholder='市'
                    className='city-cascade-select'
                    value={city}
                    onChange={val=>{
                        this.setState({
                            city: val,
                            area: null
                        }, () => {
                            console.log('-------pp', this.state.province, this.state.city)
                        });
                    }}
                >
                    {cityOptions.map(item=>{
                        return(<Option key={item.cityId} value={item.cityId}>{item.cityName}</Option>)
                    })}
                </Select>
                <Select
                    allowClear
                    placeholder='区'
                    className='city-cascade-select'
                    value={area}
                    onChange={val=>{
                        this.setState({
                            area: val,
                        });
                    }}
                >
                    {areaOptions.map(item=>{
                        return(<Option key={item.areaId} value={item.areaId}>{item.areaName}</Option>)
                    })}
                </Select>
            </div>
        )
    }
}

export default CityCascade;