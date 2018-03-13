import Vue from 'vue'
import Router from 'vue-router'

import Login from './login'
const routes = [...Login]

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		...routes
	]
})
