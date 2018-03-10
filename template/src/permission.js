import router from './router'
import store from './store'
// Progress 进度条
import NProgress from 'nprogress'
// Progress 进度条样式
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import authUtils from '@/utils/auth'

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
	NProgress.start()
	if (authUtils.getToken()) {
		if (to.path === '/login') {
			next({ path: '/' })
		} else {
			// 拉取用户信息
			store.dispatch('User/getUserInfo').then(res => {
				next()
			}).catch(() => {
				store.dispatch('User/fedLogOut').then(() => {
					Message.error('验证失败,请重新登录')
					next({ path: '/login' })
				})
			})
		}
	} else {
		if (whiteList.indexOf(to.path) !== -1) {
			next()
		} else {
			next('/login')
			NProgress.done()
		}
	}
})

router.afterEach(() => {
	// 结束Progress
	NProgress.done()
})
