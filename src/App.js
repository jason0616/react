import React, { Component } from 'react';
import {connect} from 'react-redux';

import {Route,NavLink,Redirect,Switch,withRouter} from 'react-router-dom';

import { TabBar } from 'antd-mobile';

//引入ant-design-mobile的样式
import 'antd-mobile/dist/antd-mobile.css';

import './sass/page.scss';
import axios from 'axios'

import {  Reg} from './components/my/Reg'
import {Log} from './components/my/Log'
import {Home} from './components/Home';
import {List} from './components/List';
import {Goods} from './components/Goods';
import {My} from './components/My';
import {NotFound} from './components/Page';
// fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome'

import { 
    faHome,
    faSearch,
    faListUl,
    faShoppingCart,
    faComment,
    faAssistiveListeningSystems } from '@fortawesome/free-solid-svg-icons'

library.add(
    faHome,
    faSearch,
    faListUl,
    faShoppingCart,
    faComment, 
    faAssistiveListeningSystems
)
// axios.defaults.baseURL='http://localhost:1234';
class App extends Component {
  constructor(){
    super();
    this.state = {
        tabs:[
            {
                title:'首页',
                path:'/home',
                icon:'home'
            },
            {
                title:'分类',
                path:'/classify',
                icon:'search'
            },
            // {
            //     title:'定制',
            //     path:'/config',
            //     icon:'assistive-listening-systems'
            // },
            {
                title:'恣在说',
                path:'/zest',
                icon:'shopping-cart'
            },
            {
              title:'我的',
              path:'/my',
              icon:'comment'
          }
        ],
        currentTab:0
    }
  }
  handlerClick(idx,path){
      this.setState({
          currentTab:idx
      });
      //编程式导航
      //获取history的方式
      // * 通过Route渲染App
      // * 利用withRouter高阶组件实现
      this.props.history.push(path);
  }
  componentWillMount(){
      //获取hash值
      let hash = window.location.hash.slice(1);//#list
      //找出对应索引值
      let currentTab = 0
      this.state.tabs.some((item,idx)=>{
          currentTab = idx;
          return item.path === hash
      });
      this.setState({
          currentTab
      });
      console.log('app props:',this.props)
  }
  render() {
    return (
      <div className="container">
            <div className="content">
                <Switch>
                    <Route path="/home" component={Home} />
        
                    <Route path="/Reg" component={Reg} />
                    <Route path="/Log" component={Log} />
                    <Route path="/classify" component={List} />
                    <Route path="/goods/:id" component={Goods} />
                    <Route path="/zest" component={My} />
                    <Route path="/404" component={My} />
                    <Redirect from="/" to="/home" exact/>
                    <Redirect to="/404"/>
                </Switch>
            </div>
            <TabBar
                tintColor="#54d49b"
                noRenderContent={true}
                hidden={!this.props.tabbarStatus}
            >
                {
                    this.state.tabs.map((tab,idx)=>{
                        return <TabBar.Item
                            title={tab.title}
                            key={tab.path}
                            icon={idx==5?
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    position:"fixed",
                                    zIndex:999,
                                    bottom:'42px',
                                    borderRadius:'50%',
                                    transform:'scale(1.5)',
                                    background: 'url(https://image.zeststore.com/tmp/20171208/tmp_1512700909532057_4.jpg) center center /  21px 21px no-repeat' }}
                                  />
                            :<FontAwesomeIcon icon={tab.icon}/>}
                            selectedIcon={idx==5?
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    position:"fixed",
                                    zIndex:999,
                                    bottom:'42px',
                                    borderRadius:'50%',
                                    transform:'scale(1.5)',
                                    background: 'url(https://image.zeststore.com/tmp/20171208/tmp_1512700909532057_4.jpg) center center /  21px 21px no-repeat' }}
                                  />
                                  
                            :<FontAwesomeIcon icon={tab.icon}/>}
                            selected={this.state.currentTab === idx}
                            onPress={this.handlerClick.bind(this,idx,tab.path)}
                            badge={tab.path === '/cart' ? this.props.cartQty : null}
                            >
                            {tab.title}
                            </TabBar.Item>
                    })
                } 

            
            </TabBar>
        </div>
    );
  }
}
// let mapStateToProps = state=>{
//     // 此处必须返回一个对象
//     console.log(state);
//     return {
//         //把state.commonReducer.tabbarStatus映射到props
//         tabbarStatus:state.commonReducer.tabbarStatus,
//         cartQty:state.cartReducer.goodslist.length
//     }
// }
// App = connect(mapStateToProps)(App);
App = withRouter(App);
export default App;

