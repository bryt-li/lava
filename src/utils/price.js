import {calculateDistance} from './distance'
import moment from 'moment';
import 'moment/locale/zh-cn';

//计算预订折扣，提前一天下单，减5元
const calculateAdvancePrice = (date) => {
	let advancePrice = -5
	const today = moment().locale('zh-cn').utcOffset(8)
	if(date.toDate().format("yyyy-MM-dd") == today.toDate().format("yyyy-MM-dd"))
		advancePrice = 0

	return advancePrice
}

//计算运费
const xjh_lat = 28.21286
const xjh_lng = 112.94879
const calculateDeliveryDistance = (lat, lng) => {
	return calculateDistance(xjh_lat,xjh_lng,lat,lng)
}

const calculateDeliveryPrice = (items_price, lat, lng) => {
	let km = calculateDistance(xjh_lat,xjh_lng,lat,lng)
	console.log(`devliery distance: ${km}km`)

	let deliveryPrice = km*2.5

	//免运费
	if(items_price>36 && km < 3)
		return 0
	if(items_price>100 && km <8)
		return 0
	if(items_price>150)
		return 0

	//减运费
	if(items_price>66 && km < 5)
		return (deliveryPrice -3)

	if(items_price>88 && km < 8)
		return (deliveryPrice - 5)

	return deliveryPrice
}

//计算订单折扣价格
//第二单7折（取最贵的打折）
const calculateOrderPrice = (menu) => {
	let total = 0;
	let saving = 0;
	let order_items = [];
	for(var t in menu){
		for(var i in menu[t]){
			var item = menu[t][i];
			for(var i=0;i<item.quantity;i++)
				order_items.push({
					...item,
					order_price:item.price,
				});
		}
	}

	order_items.sort((a,b) =>{
		return b.price - a.price;
	});

	//how many discount，the second item have 70% discount
	let num = parseInt(order_items.length / 2) - 1;
	for(var i=0;i<=num;i++){
		order_items[i].order_price = order_items[i].price*0.7;
		saving += order_items[i].price - order_items[i].order_price;
	}
	for(var i=0;i<order_items.length;i++){
		total += order_items[i].order_price;
	}
	return {total:total, saving: saving, order_items: order_items};
}


module.exports = {
  calculateOrderPrice,
  calculateAdvancePrice,
  calculateDeliveryDistance,
  calculateDeliveryPrice,
}
