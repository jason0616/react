const express = require('express')

const router = express.Router()

const car = require('.././mongodb/car')
const detail = require('.././mongodb/detail')

const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({extended : false}))
router.use(bodyParser.json());



router.post('/car',(req,res)=>{

	// detail.insertMany({price:169.00,originalPrice:188.00,brand:'膳魔师',name:'FOOGO不锈钢吸管杯290ml/305ml 粉色',imgUrl:'https://img05.miyabaobei.com/d1/p1/item/10/1063/1063899_normal_4.jpg@base@tag=imgScale&w=500&q=90',dataId:1
	// })
	// .then(res=>{
	// 	console.log(res)
	// })
	// .catch(err=>{
	// 	console.log(err)
	// })

	let {us,method} = req.body
	
	if(method=='add'){
		console.log(req.body)
		let {count,dataId,price,originalPrice,brand,name,imgUrl} = req.body
		detail.find({dataId})
		.then(data=>{
			if (data.length==0) {
				detail.insertMany({dataId,price,originalPrice,brand,name,imgUrl})
			}
			return car.find({us,dataId})
			
		})
		
		.then(data=>{
			console.log(666)
			if (data.length==0) {
				car.insertMany({
					us,
					count,					
					dataId
				})
				.then(data2=>{
					console.log('插入购物车成功')
					res.send('ok')
				})
				.catch(err=>{
					console.log('插入购物车失败'+err)
					res.send('err')
				})
			}else {
				car.updateOne({us,dataId},{
					$set:{count}
				})
				.then(data2=>{
					console.log('更新购物车成功')
					res.send('ok')
				})
				.catch(err=>{
					console.log('更新购物车失败')
					res.send('err')
				})
			}
		})
		.catch(err=>{
			console.log(err)
		}) 
		
	}
	if(method=='find'){
		car.find({us})
		.then(data=>{
			//console.log(data)			
				//console.log(data)
				var arr = data.map(item=>{
					return item.dataId
				})
				var countArr = data.map(item=>{
					return item.count
				})
				var carIdArr = data.map(item=>{
					return item._id
				})
				//console.log(carIdArr)
				//db.inventory.find( { qty: { $in: [ 5, 15 ] } } )
				detail.find({dataId:{$in:arr}})
				//detail.find({dataId:2})

				.then(data2=>{
					
						// console.log(data2)
						// console.log(obj)
						res.send({
							data : data2,
							countArr,
							carIdArr,
							msg : '获取成功',
							err : 0
						})
										
				})
				.catch(err2=>{
					console.log('err2:'+err2)
				})
			
			//console.log('arr:'+arr)

			
		})
		.catch(err=>{
			console.log('err:' + err)
			res.send({
				data : err,
				msg : '获取失败',
				err : 1
			})
		})	
	}

	if (method === 'del') {
		let carArr = JSON.parse(req.body.carArr)
		//Goods.deleteMany({_id:{$in:idArray}})
		let carArr2 = ['5c0a3095d74e6ba6fc860e77']
		console.log(req.body)
		console.log(carArr2)
		car.deleteMany({_id:{$in:carArr}})
		
		.then(data=>{
			console.log(data)
			res.send({
				data : null,
				msg : '删除成功',
				err : 0
			})
		})
		.catch(err=>{
			console.log(err)
			res.send({
				data : null,
				msg : '删除失败',
				err : 1
			})
		}) 
	}
	if (method==='update') {
		let carId = req.body.carId
		let count = req.body.count
		car.updateOne({_id:carId},{$set:{count}})
		.then(data=>{
			console.log(data)
			res.send({
				data : null,
				msg : '更新成功',
				err : 0
			})
		})
		.catch(err=>{
			console.log(err)
			res.send({
				data : null,
				msg : '更新失败',
				err : 1
			})
		}) 
	}
	
})

module.exports = router 