/**
 * demo
 */
import React, { Component } from 'react';
import CityCascade from '../../components/CityCascade';
import { Checkbox, } from 'antd';
import './index.css';
import { CheckCircleFilled } from '@ant-design/icons';

class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            province: null,
            city: null,
            area: null,
            checkOptions: [
                {
                    "id":1,
                    "imgPath":"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1166927975,3250256027&fm=26&gp=0.jpg",
                    "title":"蛋糕一",
                    "price":60.50,
                    "inventory":100
                },
                {
                    "id":2,
                    "imgPath":"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2716279000,803856934&fm=26&gp=0.jpg",
                    "title":"蛋糕二",
                    "price":80.00,
                    "inventory":40
                },
                {
                    "id":3,
                    "imgPath":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600929242805&di=f8d583a852d3a0647c21833e5e000737&imgtype=0&src=http%3A%2F%2Fp4.ssl.cdn.btime.com%2Ft0150e63ddb193dd5d3.jpg%3Fsize%3D1200x754",
                    "title":"蛋糕三",
                    "price":40.50,
                    "inventory":60
                },
                {
                    "id":4,
                    "imgPath":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600929221288&di=ebf38693effa07a0d38d8f358647ae55&imgtype=0&src=http%3A%2F%2Fimg0.imgtn.bdimg.com%2Fit%2Fu%3D1746995900%2C3436569116%26fm%3D214%26gp%3D0.jpg",
                    "title":"蛋糕四",
                    "price":60.50,
                    "inventory":60
                }
            ],
            indeterminate: false, // 半选
            checkAll: false, // 全选
            checkedNum: 0,
        }
    }

    componentDidMount() {}

    check = (id) => {
        const { checkOptions } = this.state;
        // 多选 选择、取消选择
        let checkOptionsArr = [];
        for (let i = 0; i < checkOptions.length; i++) {
            let tag = checkOptions[i];
            if (tag.id === id) {
                checkOptionsArr.push({
                    ...tag,
                    checked: !tag.checked,
                });
            } else {
                checkOptionsArr.push({
                    ...tag,
                });
            }
        }
        // 多选框、件数
        let num = 0;
        for (let j = 0; j < checkOptionsArr.length; j++) {
            if (checkOptionsArr[j].checked) {
                num++;
            }
        }
        if (num === 0) {
            this.setState({
                checkAll: false,
                indeterminate: false,
            });
        } else if (num === checkOptions.length) {
            this.setState({
                checkAll: true,
                indeterminate: false,
            });
        } else {
            this.setState({
                indeterminate: true,
            });
        }
        this.setState({
            checkOptions: checkOptionsArr,
            checkedNum: num,
        });
    };

    onCheckAllChange = () => {
        const { checkOptions, checkedNum } = this.state;
        // 全选
        let checkOptionsArr = [];
        for (let i = 0; i < checkOptions.length; i++) {
            let tag = checkOptions[i];
            checkOptionsArr.push({
                ...tag,
                checked: true,
            });
        }
        // 全不选
        let checkOptionsNone = [];
        for (let i = 0; i < checkOptions.length; i++) {
            let tag = checkOptions[i];
            checkOptionsNone.push({
                ...tag,
                checked: false,
            });
        }
        if (checkedNum !== checkOptionsArr.length) {
            // 全选
            this.setState({
                checkOptions: checkOptionsArr,
                indeterminate: false,
                checkAll: true,
                checkedNum: checkOptionsArr.length,
            });
        } else {
            // 全不选
            this.setState({
                checkOptions: checkOptionsNone,
                indeterminate: false,
                checkAll: false,
                checkedNum: 0,
            });
        }
    };

    render() {
        const { province, city, area, checkOptions, indeterminate, checkAll, checkedNum } = this.state;
        return(
            <div className='demo'>
                <CityCascade
                    province={province}
                    city={city}
                    area={area}
                />
                <div className="check">
                    <div className="check-row">
                        {checkOptions.map((index) => {
                        return (
                            <div
                            onClick={this.check.bind(this, index.id)}
                            key={index.id}
                            className={
                                'check-row-item' +
                                (index.checked ? ' chosen' : '')
                            }
                            >
                            <div className="check-row-item-photo">
                                <img
                                    style={{ width: '100%', height: '100%' }}
                                    src={index.imgPath}
                                    alt='img'
                                />
                            </div>
                            <div className="check-row-item-text">
                                <span style={{ marginBottom: 10 }}>{index.title}</span>
                                <div>
                                    <span className="c-red">￥{index.price}</span>
                                    <span>库存：{index.inventory}</span>
                                </div>
                            </div>
                            <span className="check-row-item-checked">
                                {index.checked && <CheckCircleFilled />}
                            </span>
                            </div>
                        );
                        })}
                    </div>
                    <Checkbox
                        indeterminate={indeterminate}
                        onChange={this.onCheckAllChange}
                        checked={checkAll}
                    >
                        全选
                    </Checkbox>
                    <span>已选择&nbsp;{checkedNum}&nbsp;件</span>
                </div>
            </div>
        )
    }
}
export default Demo;