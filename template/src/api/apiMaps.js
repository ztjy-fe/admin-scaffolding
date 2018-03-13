
const currentHost = window.location.host
let prefix = 'dev'
if (currentHost.indexOf('-') > -1) {
	prefix = currentHost.split('-')[0]
}
let BASE_API = ''
switch (prefix) {
case 'dev':
	BASE_API = 'http://dev-o2o-ztjy.szy.net'
	break
case 'alpha':
	BASE_API = 'http://alpha-o2o-ztjy.szy.com'
	break
case 'rc':
	BASE_API = 'http://rc-o2o-ztjy.szy.cn'
	break
default:
	BASE_API = 'http://o2o-ztjy.szy.cn'
	break
}

const path = _path => BASE_API + _path

export const SYSTEM = {
	// 用户相关
	USER: {
		// 登录
		LOGIN: path('/user/login'),

		// 用户信息
		INFO: path('/user/info'),

		// 登出
		LOGOUT: path('/user/logout')
	}
}
