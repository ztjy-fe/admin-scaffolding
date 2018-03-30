import Mock from 'mockjs'
import * as ApiMaps from '@/api/apiMaps'

// 用户登录
export const loginMock = () => {
	Mock.mock(ApiMaps.SYSTEM.USER.LOGIN, {
		'returncode': 10000,
		'message': 'success',
		'body': {
			'token|2': 'admin'
		}
	})
}

// 获取用户信息
export const getUserInfoMock = () => {
	Mock.mock(ApiMaps.SYSTEM.USER.INFO, {
		'returncode': 10000,
		'message': 'success',
		'body': {
			'token|2': 'admin'
		}
	})
}

// 登出
export const logoutMock = () => {
	Mock.mock(ApiMaps.SYSTEM.USER.LOGOUT, {
		'returncode': 10000,
		'message': 'success',
		'body': {}
	})
}
