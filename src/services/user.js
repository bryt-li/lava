import { request } from '../utils'
import qs from 'qs';

const config = require('../config');
const { api } = config

export async function getMe() {
	return request(
		api.getMe,
		{
			method: 'get',
		}
	);
}

export async function logout() {
	return request(
		api.logout,
		{
			method: 'get',
		}
	);
}

export async function saveDelivery(model) {
	return request(
		api.saveDelivery,
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

