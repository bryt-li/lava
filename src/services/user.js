import { request } from '../utils'

const config = require('../config');
const { api } = config

export async function queryMe() {
	return request(
		api.queryMe,
		{
			method: 'get',
		}
	);
}
