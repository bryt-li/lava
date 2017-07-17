import { request } from '../utils'

const config = require('../config');
const { api } = config

export async function queryUser() {
	return request(
		api.user,
		{
			method: 'get',
		}
	);
}
