const _import = require('./_import_' + process.env.NODE_ENV)

const Layout = _import('layout/Layout')

export default [{
	path: '/login',
	component: _import('login/index'),
	hidden: true
}, {
	path: '/',
	component: Layout,
	redirect: '/dashboard',
	name: 'Dashboard',
	hidden: true,
	children: [{
		path: 'dashboard',
		component: _import('dashboard/index')
	}]
}, {
	path: '/system',
	component: Layout,
	icon: 'el-icon-menu',
	meta: {
		title: '系统管理'
	},
	children: [{
		path: 'auth',
		name: 'Auth',
		component: _import('test/index'),
		meta: {
			title: '权限管理'
		}
	}, {
		path: 'role',
		name: 'Role',
		component: _import('test/index'),
		meta: {
			title: '角色管理'
		}
	}]
}, {
	path: '/user',
	component: Layout,
	icon: 'el-icon-menu',
	meta: {
		title: '用户管理'
	},
	children: [{
		path: 'baseinfo',
		name: 'UserInfo',
		component: _import('test/index'),
		meta: {
			title: '基本信息'
		}
	}, {
		path: 'role',
		name: 'UserRole',
		component: _import('test/index'),
		meta: {
			title: '角色权限'
		}
	}]
}]
