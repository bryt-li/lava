import {calculateDistance} from './distance'
import moment from 'moment';
import 'moment/locale/zh-cn';


const formatMoney = (cents) => {
	return (cents/100.00).toFixed(2)
}

//当前配送范围为直径不超过100KM内
const outOfDeliveryRange = (lat,lng) => {
	if(calculateDeliveryDistance(lat,lng) > 100)
		return true
	else
		return false
}

//计算预订折扣，提前一天下单，减5元
const calculateAdvancePrice = (date) => {
	let advancePrice = -500
	const today = moment().locale('zh-cn').utcOffset(8)
	if(date.toDate().format("yyyy-MM-dd") == today.toDate().format("yyyy-MM-dd"))
		advancePrice = 0

	//todo:测试用，全部无折扣
	//return 0

	return advancePrice
}

//计算运费
//西山汇景店坐标
const xjh_lat = 28.21286
const xjh_lng = 112.94879
const calculateDeliveryDistance = (lat, lng) => {
	return calculateDistance(xjh_lat,xjh_lng,lat,lng)
}

const calculateDeliveryPrice = (items_price, lat, lng) => {
	let km = calculateDistance(xjh_lat,xjh_lng,lat,lng)
	console.log(`devliery distance: ${km}km`)

	let deliveryPrice = parseInt(km*250)

	//todo:测试用，全部免运费
	//return 0

	//免运费
	if(items_price>3600 && km < 3)
		return 0
	if(items_price>10000 && km <8)
		return 0
	if(items_price>15000)
		return 0

	//减运费
	if(items_price>6600 && km < 5)
		return (deliveryPrice -300)

	if(items_price>8800 && km < 8)
		return (deliveryPrice - 500)

	return deliveryPrice
}

//计算订单折扣价格
//第二单7折（取最贵的打折）
const calculateOrderPrice = (menu) => {
	let total = 0;
	let saving = 0;
	let items = [];
	for(var t in menu){
		for(var i in menu[t]){
			var item = menu[t][i];
			for(var i=0;i<item.quantity;i++)
				items.push({
					...item,
					order_price:item.price,
				});
		}
	}

	items.sort((a,b) =>{
		return b.price - a.price;
	});

	//how many discount，the second item have 70% discount
	let num = parseInt(items.length / 2) - 1;
	for(var i=0;i<=num;i++){
		items[i].order_price = parseInt(items[i].price*0.7);
		saving += items[i].price - items[i].order_price;
	}
	for(var i=0;i<items.length;i++){
		total += items[i].order_price;
	}
	return {total, saving, items};
}


module.exports = {
	formatMoney,
	calculateOrderPrice,
	calculateAdvancePrice,
	calculateDeliveryDistance,
	calculateDeliveryPrice,
	outOfDeliveryRange,
}
