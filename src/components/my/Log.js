import React,{Component} from 'react'
import '../../sass/my/log.scss'
import { Toast } from 'antd-mobile';
import axios from 'axios'
class Log extends Component{
    constructor(){
        super()
        this.state={

        }
       
    }
    back(){
        let {history}=this.props
        console.log(history)
       
         history.goBack()
    }
    toreg(){
        let {history}=this.props
        history.push({
            pathname:'/Reg'
        })
    }
    login(){
        console.log('login')
        let user=this.refs.user.value
        let pass=this.refs.pass.value
        if(user&&pass){
            axios.get('http://localhost:1111/api/user/log',{params:{
                username:user,
                password:pass
            }})
            .then((res)=>{
                console.log(res)
                if(res.data==='ok'){
                    Toast.success('登录成功!', 1);
                    localStorage.setItem('user',user)
                    setTimeout(()=>{
                        let {history}=this.props
                        history.push({
                            pathname:'/My'
                        })
                    },1500)
                }else if(res.data==='no'){
                    Toast.fail('用户名或密码不正确!', 1);
                }else{
                    Toast.fail('用户不存在,请重新输入', 1);
                }
            })
        }else{
            Toast.fail('用户名或密码不能为空!', 1);
        }
    }
    render(){
        return (
            <div className='logg'>
                <div className='logg-top'>
                <span className='backmy' onClick={this.back.bind(this)}>X</span>
                </div>
                <div className='logg-main'>
                <img src={require('../../img/login.jpg')} alt=""/>
                    <div className='login-input'>
                        <span>帐号:</span>
                        <input type="text" placeholder='用户名/邮箱/手机号' ref='user'/>
                    </div>
                    <div className='login-input'>
                        <span>密码:</span>
                        <input type="password" placeholder='请输入密码' ref='pass'/>
                    </div>
                    <div className='login-btn' onClick={this.login.bind(this)}><span>登 录</span></div>
                    <div className='to-reg'><span onClick={this.toreg.bind(this)}>立即注册</span><span>找回密码</span></div>
                    <div className='bot'><div>使用以下帐号也可直接登录</div>
                    <img src={require('../../img/-2.jpg')} alt=""/>
                    </div>
                </div>
            </div>
        )
    }
}
export {Log}