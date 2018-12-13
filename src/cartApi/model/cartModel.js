const mongoose=require('mongoose')
let Schema=mongoose.Schema;

let goodsSchema=new Schema({
    name:{type:String
     },
     time:{type:String},
     desc:{
         type:Object
     }
})
let goodsmodel=mongoose.model('goods',goodsSchema)
module.exports=goodsmodel