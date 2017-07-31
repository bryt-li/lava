import { request } from '../utils'
import qs from 'qs';
import moment from 'moment';

const config = require('../config');
const { api } = config

export function convertOrderForClient(order){
	order.delivery = JSON.parse(order.delivery)
	order.order_items = JSON.parse(order.order_items)
	order.date = moment(order.date).toDate();
	return order
}

export function convertOrderForServer(order){
	order.date = order.date.format("YYYY-MM-DD")
	order.order_items = JSON.stringify(order.order_items)
	order.delivery = JSON.stringify(order.delivery)
	return order
}

export async function getOrderList() {
	return request(
		api.getOrderList,
		{
			method: "POST",
		}
	);
}


export async function getOrder(id) {
	return request(
		api.getOrder,
		{
			method: "POST",
			headers: {
				/*Must have this to make Nutz backend recognize.*/
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			body: qs.stringify({id})
		}
	);
}

export async function createOrder(order) {
	return request(
		api.createOrder,
		{
			method: "POST",
			headers: {
				/*Must have this to make Nutz backend recognize.*/
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			body: qs.stringify(order)
		}
	);
}


export async function wechatPay(model) {
	return request(
		api.wechatPay,
		{
			method: "POST",
			headers: {
				/*Must have this to make Nutz backend recognize.*/
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			body: qs.stringify(model)
		}
	);
}