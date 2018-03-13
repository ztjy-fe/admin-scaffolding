// 引入szyutils公用工具库
const getCookie = require('szyutils/modules/getCookie')
const setCookie = require('szyutils/modules/setCookie')
const removeCookie = require('szyutils/modules/removeCookie')

export default {
	getCookie (name) {
		return getCookie(name)
	},

	setCookie (name, value) {
		return setCookie(name, value, 10)
	},

	removeCookie (name) {
		return removeCookie(name)
	}
}
