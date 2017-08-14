import { request } from '../utils'
import qs from 'qs';
import moment from 'moment';

const config = require('../config');
const { api } = config

export async function getWechatJsapiConfig(jsApiList) {

	return request(
		api.getWechatJsapiConfig,
		{
			method: "POST",
			headers: {
				/*Must have this to make Nutz backend recognize.*/
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			body: qs.stringify({jsApiList})
		}
	);
}
