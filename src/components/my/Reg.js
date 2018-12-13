import React,{Component} from 'react'
import '../../sass/my/log.scss'
import { library } from '@fortawesome/fontawesome-svg-core';
import { Toast } from 'antd-mobile';

import {faArrowLeft }from '@fortawesome/free-solid-svg-icons'
import { Icon } from 'antd-mobile';
import axios from 'axios';
library.add(faArrowLeft)
class Reg extends Component{
    constructor(){
        super()
        this.state={

        }
    }
    changus(e){
        // console.log(e.target.value)
        console.log(this.refs.text.value)

        
    }
    reg(){
        
        if(this.refs.checkbox1.checked&&this.refs.text.value&&this.refs.pass.value&&this.refs.email.value&&this.refs.passw.value){
        console.log(1)
        axios.get('http://localhost:1111/api/user/reg',{params:{
            username:this.refs.text.value,
            password:this.refs.pass.value,
            email:this.refs.email.value,
        }}).then((res)=>{
            console.log(res)
            if(res.data==='ok'){
                Toast.success('注册成功!', 1);
                setTimeout(()=>{
                    let {history}=this.props
                    history.push({
                        pathname:'/My'
                    })
               
                },1500)
            }else{
               if( res.data==='用户已存在'){
                Toast.fail('用户名已存在 !!!', 1);
               }
            }
        },(err)=>{
            console.log(err)
        })}else{
            Toast.fail('请填入所有内容 !!!', 1);
        }
    }
    back(){
        let {history}=this.props
        console.log(history)
       
         history.goBack()
    }
    render(){
        return (
            <div className='reg'>
            <div className='reg-top'>
            {/* <FontAwesomeIcon icon="arrow-left" fontSize='22px;' className='ic' color='#727272'  className='fnt'  /> */}
            <Icon type="left" size='lg'  onClick={this.back.bind(this)}/>
             <span>会员注册</span> 
            </div>
            <div className='reg-main'>
            <input type='text' placeholder='请输入用户名' onChange={this.changus.bind(this)} ref='text'/> 
            <input type='password' placeholder='请输入用户密码' ref='pass'  /> 
            <input type='password' placeholder='请确认用户密码' ref='passw' /> 
            <input type='email' placeholder='请输入常用邮箱' ref='email'/> 
            </div>
            <div className='checkbox'>  <input type='checkbox' ref='checkbox1' /> 同意《用户注册协议》 </div>
            <div className='reg-btn'><div  onClick={this.reg.bind(this)}>注册</div></div>
            </div>
        )
    }
}
export {Reg}