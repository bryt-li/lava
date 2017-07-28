import { request } from '../utils'
import qs from 'qs';

const config = require('../config');
const { api } = config


export async function createOrder(model) {
	return request(
		api.createOrder,
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