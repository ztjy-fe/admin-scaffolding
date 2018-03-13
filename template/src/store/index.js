import Vue from 'vue'
import Vuex from 'vuex'
import User from './modules/user'
import Tabs from './modules/tabs'
import SideBar from './modules/sideBar'

Vue.use(Vuex)
export default new Vuex.Store({
	modules: {
		User,
		Tabs,
		SideBar
	}
})
