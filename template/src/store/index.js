import Vue from 'vue'
import Vuex from 'vuex'
import User from './modules/user'
import SideBar from './modules/sideBar'
{{#tabs}}
import Tabs from './modules/tabs'
{{/tabs}}

Vue.use(Vuex)
export default new Vuex.Store({
	modules: {
		User,
		SideBar{{#tabs}},
		Tabs{{/tabs}}
	}
})
