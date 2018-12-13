const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/demo',{ useNewUrlParser: true })
let db=mongoose.connection
db.on('error',()=>{
    console.log('error')
})
db.on('open',()=>{
    console.log('数据库链接成功')
})
db.on('disconnected',function(){
    console.log('数据库链接断开')
})
