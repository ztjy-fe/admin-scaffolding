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
	path: '/form',
	component: Layout,
	icon: 'fa fa-user',
	children: [{
		path: 'index',
		name: 'Form',
		component: _import('form/index'),
		meta: {
			title: '菜单一'
		}
	}]
}, {
	path: '/table',
	component: Layout,
	icon: 'fa fa-comment',
	children: [{
		path: 'index',
		name: 'Table',
		component: _import('form/index'),
		meta: {
			title: '菜单二'
		}
	}]
}]
