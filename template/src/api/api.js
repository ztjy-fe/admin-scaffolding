import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import Common from '@/utils/common'

const instance = axios.create({
	timeout: 15000
})

// request拦截器
instance.interceptors.request.use(config => {
	if (store.getters.token) {
		// 让每个请求携带自定义token 请根据实际情况自行修改
		config.headers['X-Token'] = Common.getToken()
	}
	return config
}, error => {
	console.log(error)
	Promise.reject(error)
})

// respone拦截器
instance.interceptors.response.use(
	response => {
		// returncode为非10000时抛错,可结合自己业务进行修改
		const res = response.data
		if (res.returncode !== 10000) {
			Message({
				message: res.data,
				type: 'error',
				duration: 5 * 1000
			})
			return Promise.reject(new Error('error'))
		} else {
			return response
		}
	},
	error => {
		console.log('err' + error)
		Message({
			message: error.message,
			type: 'error',
			duration: 5 * 1000
		})
		return Promise.reject(error)
	}
)
const API = {
	get (url, params, callback) {
		return new Promise((resolve, reject) => {
			instance.get(url, params).then((response) => {
				if (response.data.returncode === 10000) {
					callback && callback(response.data.data)
					resolve(response.data.data)
				} else {
					console.log('服务器错误:' + response.data.message)
					reject(response.data.message)
				}
			}).catch((error) => {
				console.log('服务器错误!' + error)
				reject(error)
			})
		})
	},
	post (url, params, callback) {
		return new Promise((resolve, reject) => {
			instance.post(url, params).then((response) => {
				if (response.data.returncode === 10000) {
					callback && callback(response.data.data)
					resolve(response.data.data)
				} else {
					console.log('服务器错误:' + response.data.message)
					reject(response.data.message)
				}
			}).catch((error) => {
				console.log('服务器错误!' + error)
				reject(error)
			})
		})
	}
}

export { API }
