import { request } from '../utils'
import qs from 'qs';
import moment from 'moment';

const config = require('../config');
const { api } = config

export function convertOrderForClient(order){
	return {
		...order,
		date: moment(order.date).toDate(),
		items:  JSON.parse(order.items),
		delivery: JSON.parse(order.delivery),
	}
}

export function convertOrderForServer(order){
	return {
		...order,
		date: order.date.format("YYYY-MM-DD"),
		items: JSON.stringify(order.items),
		delivery: JSON.stringify(order.delivery)
	}
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


export async function updateOrderStatus(id, status) {
	return request(
		api.updateOrderStatus,
		{
			method: "POST",
			headers: {
				/*Must have this to make Nutz backend recognize.*/
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			body: qs.stringify({id, status})
		}
	);
}


export async function getAdminOrderList(status) {
	return request(
		api.getAdminOrderList,
		{
			method: "POST",
			headers: {
				/*Must have this to make Nutz backend recognize.*/
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			body: qs.stringify({status})
		}
	);
}
