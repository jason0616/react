import '../sass/my/my.scss'
// import {Log} from './my/Log'
import React,{Component} from 'react'
// import {Route,Redirect,Switch,withRouter,NavLink} from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import { 
    faArchive,
    faStar,
    faGrinStars,
    faHome,
    faSearch,
    faListUl,
    faShoppingCart,
    faComment,
    faCoffee,
    faShoePrints,
     faCartPlus,   
    //  faCommentAltDots,
    faAssistiveListeningSystems } from '@fortawesome/free-solid-svg-icons'


    library.add( faGrinStars,faArchive,
        faShoePrints,  faStar,
        faCartPlus,
        faHome,
        faSearch,
        faListUl,
        faComment,
        faCoffee,
        // faCommentAltDots,
        faShoppingCart,
        faComment, 
        faAssistiveListeningSystems
    )

class My extends Component{
    constructor(){
        super()
        this.state={
            us:'123',
            tabs:[
                {title:'待付款',icon:'archive'},
                {title:'待发货',icon:'archive'},
                {title:'待收货',icon:'archive'},
                {title:'带自提',icon:'archive'},
                {title:'待评价',icon:'archive'}
            ],
            tab2:[
                {title:'收货地址',icon:'archive'},
                {title:'代金券',icon:'archive'},
                {title:'红包',icon:'archive'},
                {title:'积分',icon:'archive'},
                {title:'发票设置',icon:'archive'}
            ],
            ts:[  {title:'退款/退货',icon:'archive'},
            {title:'我的订单',icon:'archive'}],
            ts2:[  {title:'联系我们',icon:'archive'},
            {title:'我的钱包',icon:'archive'}]
        }
    }
    login(props){
        console.log(this.props)
        let {history} = this.props;
   history.push( {
    pathname:'/Log',
    
   })
    }
    componentWillMount(){
        console.log(this.state.us)
        let s=localStorage.getItem('user')
        this.setState({
            us:s
        })
        console.log(this.state.us)
        console.log(localStorage.getItem('user'))
    }
    logout(){
        localStorage.removeItem('user')
        console.log(this.props)
        let {history} = this.props;
   history.push( {
    pathname:'/My',
    
   })
    }
    render(){
        return <div className='my'>
            <div className='mtop'>  {localStorage.getItem('user')?<span onClick={this.logout.bind(this)}>退出</span>:'请先登录'}</div>
          <div className='my-top' >
          <img src={require('../img/my.jpg')} alt="" width='100%' height='100%'/>
            <div className='log'> 
            <img src={require('../img/log.jpg')} alt="" width='52px'/>
            {localStorage.getItem('user')?localStorage.getItem('user'):<span className='login' onClick={this.login.bind(this)}>请登录</span>}
            
            {/* <NavLink to={this.props.match.url + "/Log"} activeClassName="active">请登录</NavLink>
            <Route path={this.props.match.path + "/Log"} component={Log}/>
          */}

            </div>
          </div>
            <div className='my-bottom'>
            <div className='my-home'>
            <div className='detail'>
            <div className='detail-top'>
            <div>我的积分 0</div><span>|&nbsp;&nbsp; 个人护理,给你品质推荐</span>
            </div>
            <div className='detail-bottom'>
            <div><FontAwesomeIcon icon="star" color='#727272'  className='fnt'  />
            <span>&nbsp;&nbsp;商品收藏</span></div>
            <div className='see'>  <FontAwesomeIcon icon="shoe-prints" color='#727272'  className='fnt'  /><span className='line'>|</span><span>&nbsp;&nbsp;我的足迹</span></div>
            </div>
            </div>
            </div>
            <div className='orders'>
            <div className='orders-top'>
            { 
                this.state.tabs.map((item,i)=>
                    <a key={i}><FontAwesomeIcon icon={item.icon} color='#727272'  className='ga'  />
                        <span>{item.title}</span>
                    </a>
                 
                )
            }
            </div>
            <div className='orders-bottom'>
            { 
                this.state.ts.map((item,i)=>
                    <a   key={i}><FontAwesomeIcon icon={item.icon} color={i==1?'red':'#727272' } className='ga'  />
                        <span>{item.title}</span>
                    </a>
                
                )
            }
            </div>
            </div>
            <div className='orders ob2'>
            <div className='orders-top'>
            { 
                this.state.tab2.map((item,i)=>
                    <a key={i}><FontAwesomeIcon icon={item.icon} color='#727272'  className='ga'  />
                        <span>{item.title}</span>
                    </a>
                )
            }
            </div>
            <div className='orders-bottom  '>
            { 
                this.state.ts2.map((item,i)=>
                    <a   key={i}><FontAwesomeIcon icon={item.icon} color={i==1?'red':'#727272' } className='ga'  />
                        <span >{item.title}</span>
                    </a>
                )
            }
            </div>
            </div>
            </div>
        </div>    
    }
}
export {My}