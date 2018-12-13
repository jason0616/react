const express=require('express');
const Router=express.Router();
const userModel=require('../model/userModel.js')
const cors = require('cors')
// const util=require('../utils/utils.js')



const app=express()
app.use(cors())
Router.get('/log',(req,res)=>{
    res.header("Access-Control-Allow-Origin","*")
    let {username,password}=req.query
    userModel.findOne({username})
    .then((data)=>{
        if(data.password==password){
            res.send('ok')
        }else{
            res.send('no')
        }
      
        res.send(data)
    }).catch((data)=>{
        res.send('用户名不存在')
    })
})
Router.get('/reg',(req,res)=>{
    res.header("Access-Control-Allow-Origin","*")
    console.log(req.query)
     let {username,password,email}=req.query
      let user=req.query.username
    //   console.log(desc)
    //   console.log(1)
    //   console.log(res)
      userModel.findOne({
        username
      }).then((q)=>{
          if(!q){
            userModel.insertMany({username,password,email})
            .then((data)=>{
                console.log('ok')
                res.send('ok')
            }).catch((err)=>{
                res.send('no')
            })
          }else{
            console.log('exiat')
            res.send('用户已存在')
          }
      })
  })
  
  module.exports = Router

// const util=require('../utils/utils.js')


module.exports = Router