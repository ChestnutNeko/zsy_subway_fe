import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import './index.css';
import bgPicture from '../../assets/images/login_bg_2.png';
import * as actions from '../store/action';
import { connect } from 'react-redux';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: 0,
            userName: '',
            userPassword: '',
            userType: -1,
            userCity: '',
            userTelephone: '',
            userSubway: '',
            userEmail: ''
        }
    }

    componentDidMount() {
        this.getLoginInfo()
    }

    getLoginInfo = () => {
        console.log('112312423', this.state.userName)
    }
    
    render() {
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        const tailLayout = {
            wrapperCol: { offset: 8, span: 16 },
        };
        const onFinish = values => {
            console.log('Success:', values);
            this.props.userLogin({
                username: values.username,
                password: values.password
            }, res => {
                if(res.code === 0) {
                    message.success(res.msg);
                    this.props.history.push('/home');
                    this.setState({
                        userId: res.user_id,
                        userName: res.user_name,
                        userPassword: res.user_password,
                        userType: res.user_type,
                        userCity: res.user_city,
                        userTelephone: res.user_telephone,
                        userSubway: res.user_subway,
                        userEmail: res.user_email
                    }, () => {
                        this.getLoginInfo()
                        console.log('11111')
                        const { userInfo } = {
                            userId: this.state.userId,
                            userName: this.state.userName
                        }
                        console.log('aaa11111', this.state.userId, userInfo)
                    });
                } else {
                    message.warn(res.msg);
                }
            });

        };
        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };
        return(
            <div className='login'>
                <img
                    src={bgPicture}
                    alt="背景图片"
                />
                <div className='login-content'>
                    <div className='login-content-form'>
                        <Form
                            {...layout}
                            name="basic"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="用户名"
                                name="username"
                                className='login-content-username'
                                rules={[{ required: true, message: '请输入用户名!' }]}
                            >
                                <Input placeholder='请输入用户名' style={{ width: 300 }} />
                            </Form.Item>

                            <Form.Item
                                label="密码"
                                name="password"
                                rules={[{ required: true, message: '请输入密码!' }]}
                            >
                                <Input.Password placeholder='请输入密码' style={{ width: 300 }} />
                            </Form.Item>

                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">
                                    登录
                                </Button>
                                <br/><br/>
                                或 <a href="http://localhost:3000/#/home">立即注册!</a>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
export const xuserLogin = ({userName, userPassword}) => ({
    userPassword
});
const mapStateToProps = function(state) {
    return {}
}
const mapDispatchToProps = function(dispatch) {
    return {
        userLogin(params, cb) {
            dispatch(actions.userLogin(params, cb));
        }
    }
} 
export default connect(mapStateToProps, mapDispatchToProps)(Login);