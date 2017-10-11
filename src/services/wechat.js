import { request } from '../utils'
import qs from 'qs';
import moment from 'moment';

const config = require('../config');
const { api } = config


export async function getWechatJsapiArgs(url) {
	
	return request(
		api.getWechatJsapiArgs,
		{
			method: "POST",
			headers: {
				/*Must have this to make Nutz backend recognize.*/
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			body: qs.stringify({url})
		}
	)
}

export async function getWechatPayJsapiArgs(id) {
	
	return request(
		api.getWechatPayJsapiArgs,
		{
			method: "POST",
			headers: {
				/*Must have this to make Nutz backend recognize.*/
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			body: qs.stringify({id})
		}
	)
}