/**
 * 整体布局、左侧导航栏
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Menu } from 'antd';
import { Route, Switch } from 'react-router-dom';
import Header from '../../src/components/header';
import './routeView.css';
const { Sider, Content }  = Layout;
const { SubMenu } = Menu;

class RouterView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            indexPath: '/',
        }
        this.childRoute = [];
    }

    componentDidMount() {
        this.getUserInfo();
    }

    // 获取用户信息
    getUserInfo = () => {
        const { userLoginInfo } = this.props;
        console.log('======', userLoginInfo);
    }

    // 路由切换
    handleClick = e => {
        this.props.history.push(e.key);
    }

    render() {
        const { indexPath, routerView } = this.props;
        return(
            <div className='router-view'>
                <Header />
                <Layout className='router-view-content'>
                    <Sider className='router-view-sider' width={256}>
                        <Menu
                            onClick={this.handleClick}
                            defaultSelectedKeys={[indexPath]}
                            defaultOpenKeys={[indexPath]}
                            mode="inline"
                            style={{ width: 256 }}
                        >
                            {
                                routerView && routerView.map((item) => {
                                    if(item.isChild) {
                                        return <SubMenu key={item.key} title={<span>{item.icon}{item.name}</span>}>
                                        {
                                            item.child.map(item_2 => {
                                                if(item_2.hidden) {
                                                    return null
                                                } else {
                                                    return <Menu.Item key={item_2.key}>{item_2.icon}{item_2.name}</Menu.Item>
                                                }
                                            })
										}
                                        </SubMenu>
                                    } else {
                                        return <Menu.Item key={item.key}>{item.icon}{item.name}</Menu.Item>
                                    }
                                })
                            }
                        </Menu>
                    </Sider>
                    <Content>
                        <Switch>
                            {
                                routerView && routerView.map((item) => {
                                    if(item.isChild) {
                                        return item.child.map(item_2 => {
                                            return <Route exact path={item_2.path} component={item_2.component} key={item_2.key} />
                                        })
                                    } else {
                                        return <Route exact path={item.path} component={item.component} key={item.key} />
                                    }
                                })
                            }
                        </Switch>
                    </Content>
                </Layout>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        routerView: state.routerReducer.appChildren,
        userLoginInfo: state
    }
}
export default connect(mapStateToProps)(RouterView);