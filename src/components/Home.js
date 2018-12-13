import React,{Component} from 'react'
import { List,Carousel,Grid } from 'antd-mobile';
import axios from 'axios'
import '../sass/page.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import { 

    faHome,
    faSearch,
    faListUl,
    faShoppingCart,
    faComment,
    faCoffee,

     faCartPlus,   
    //  faCommentAltDots,
    faAssistiveListeningSystems } from '@fortawesome/free-solid-svg-icons'

const Item = List.Item;



library.add(

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
axios.defaults.baseURL='http://localhost:1234';
class Home extends Component{
    constructor(){
        super()
        this.state={
            ad:[],
            goodlist:[],
            img:[
                {img:'http://image.zeststore.com/tmp%2F20181129%2Ftmp_1543505286246365_750x450.jpg'},
                {img:'http://image.zeststore.com/tmp%2F20181129%2Ftmp_1543505286246365_750x450.jpg'},
                {img: 'http://image.zeststore.com/tmp%2F20181122%2Ftmp_1542881788461204_banner+750x450.jpg'},
                {img: 'http://image.zeststore.com/tmp%2F20181110%2Ftmp_1541837755752810_banner+750x450.jpg'},
                {img:'http://image.zeststore.com/tmp%2F20181116%2Ftmp_1542352408006022_banner+750x450%281%29.jpg'},
                {img:'http://image.zeststore.com/tmp%2F20181110%2Ftmp_1541838124221316_750x450-1030.jpg'},
                {img:'http://image.zeststore.com/tmp%2F20181110%2Ftmp_1541837994216557_3.jpg'}
              
            ]
        }
    }

    componentWillMount(){
        axios.get('/proxy/v1/adConf/getAdvertInfo?cate_code=public_data_header&is_full=1',{params:{}})
        // http://m.zeststore.com/v1/adConf/getAdvertInfo?cate_code=public_data_header&is_full=1
        .then((res)=>{
            console.log(res)
            let data=res.data.data
            let dat=[]
            for(var i in data){
                console.log(this.state.img[i].img)
               
                data[i][0].img=this.state.img[i].img
                
                dat.push(([data[i]]))
            }
            console.log(dat)
            //console.log(data)
            this.setState({
                ad:dat
                
            })
          
        },(err)=>{
            console.log(err)
        })
    }
    render(){
        console.log(this.state.ad)
        return <div className='home'>
            <div className='home-item'>
            <div className='home-search'>
        <FontAwesomeIcon icon="search" color="white" className='fnt'  />
        </div>
            <div className='item-right'>
            <div className='home-search right-l ' >
            <FontAwesomeIcon className='' icon="cart-plus" color="white" ></FontAwesomeIcon></div>
            <div className='right-r home-search'><FontAwesomeIcon className='right-r' color="rgba(255,255,255,.9)"   icon="comment"></FontAwesomeIcon></div>
            </div>
            </div>
               <Carousel
          autoplay={true}
          infinite
        
          dotActiveStyle={{background:'#54d49b'}}
        >
          {this.state.ad.map(val => (
              console.log(val),
            <a
              key={val}
              href="#"//后面在这里补上跳转详情页
              style={{ display: 'inline-block', width: '100%', height:'6.67rem' }}
            >
              <img
                src={val[0][0].img}
                alt=""
                style={{ width: '100%', height:'250px',verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                 
                }}
              />
            </a>
          ))}
        </Carousel>
     <main className='main'>
                <nav>
                    {/* <div className='nav-left'>
                    <img src="" alt="" />
                   
                    </div>
                    <div className='nav-right'>
                    <div className='nav-right-top'></div>
                    <div className='nav-right-top'></div>
                    </div> */}
                </nav>
        </main>
   {/* 
            <div className='zlife'>
            <div>
                <p className='life'> Z-Life
                <img src={require('../img/folder.svg')} width='25%'/>>
                </p>
                <p className='zstyle'>恣在风格，由你做主</p>
            </div>
            </div> */}
        </div>
        
    }
}
export {Home}