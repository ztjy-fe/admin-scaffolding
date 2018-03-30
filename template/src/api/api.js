import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import Common from '@/utils/common'
import { USER_TOKEN } from '@/maps/constants'
const instance = axios.create({
	timeout: 15000
})
// request拦截器
instance.interceptors.request.use(config => {
	if (store.getters.token) {
		// 让每个请求携带自定义token 请根据实际情况自行修改
		config.headers['X-Token'] = Common.getCookie(USER_TOKEN)
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
		if (res.returncode !== '10000') {
			// 50008:非法的token
			if (res.returncode === '50008') {
				MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
					confirmButtonText: '重新登录',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					store.dispatch('User/fedLogOut').then(() => {
						// 为了重新实例化vue-router对象 避免bug
						location.reload()
					})
				})
			} else {
				Message({
					message: res.data,
					type: 'error',
					duration: 3 * 1000
				})
			}
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
			duration: 3 * 1000
		})
		return Promise.reject(error)
	}
)
const API = {
	get (url, params, callback) {
		return new Promise((resolve, reject) => {
			instance.get(url, {
				params: params
			}).then((response) => {
				if (response.data.returncode === '10000') {
					callback && callback(response.data.body)
					resolve(response.data.body)
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
				if (response.data.returncode === '10000') {
					callback && callback(response.data.body)
					resolve(response.data.body)
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
