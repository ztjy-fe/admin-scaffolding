
import { API } from './api'
import { SYSTEM } from './apiMaps'

export default {
	login (params, callback) {
		return API.post(SYSTEM.USER.LOGIN, params, callback)
	},
	getUserInfo (params, callback) {
		return API.get(SYSTEM.USER.INFO, params, callback)
	},
	logout (params, callback) {
		return API.post(SYSTEM.USER.LOGOUT, params, callback)
	}
}
