<template>
	<section class="app-main">
		<tabs></tabs>
		<transition name="fade" mode="out-in">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</transition>
	</section>
</template>

<script>
import Tabs from '@/views/layout/components/Tabs.vue'
import { mapActions } from 'vuex'

export default {
	name: 'AppMain',
	components: {
		Tabs
	},
	methods: {
		...mapActions({
			update: 'Tabs/update_tabs'
		}),
		onUpdateTabs () {
			this.update({
				route: this.$route
			})
		}
	},
	mounted () {
		this.onUpdateTabs()
	},
	watch: {
		$route (to, from) {
			this.onUpdateTabs()
		}
	}
}
</script>
