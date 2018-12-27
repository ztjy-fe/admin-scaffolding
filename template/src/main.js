import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
{{#VueLazyload}}
import VueLazyload from 'vue-lazyload'
{{/VueLazyload}}
import ElementUI from 'element-ui'
// 全局样式
import '@/assets/scss/index.scss'
// 路由鉴权
import '@/utils/permission'

Vue.use(VueRouter)
Vue.use(Vuex)

Vue.use(ElementUI)

{{#VueLazyload}}
const loadingImg = require('./assets/images/lazyload/default.jpg')
const errorImg = require('./assets/images/lazyload/error.png')
Vue.use(VueLazyload, {
	preLoad: 1.3,
	error: errorImg,
	loading: loadingImg,
	try: 3
})
{{/VueLazyload}}

const isDebugMode = process.env.NODE_ENV !== 'production'
Vue.config.debug = isDebugMode
Vue.config.devtools = isDebugMode
Vue.config.productionTip = isDebugMode

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})
