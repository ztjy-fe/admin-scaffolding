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
import 'element-ui/lib/theme-chalk/index.css'
// 全局样式
import '@/assets/scss/index.scss'
// 路由鉴权
import '@/utils/permission'

Vue.use(VueRouter)
Vue.use(Vuex)

Vue.use(ElementUI)

{{#fundebug}}
// apikey 可根据实际情况填写
const fundebug = require('fundebug-javascript')
fundebug.apikey = '1d6ad910c71b779a7a695fb9b4c71b1d094a3440c0068446ef94ac0aebfb1baa'
{{/fundebug}}
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
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})
