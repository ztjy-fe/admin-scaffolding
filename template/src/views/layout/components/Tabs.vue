<template>
	<div class='tabs'>
		<el-tabs
			v-model="$store.state.Tabs.current"
			type="card"
			closable
			@tab-click="onTabClick"
			@tab-remove="onRemoveTab">
			<el-tab-pane
				v-for="route in $store.state.Tabs.list"
				:key="route.path"
				:label="route.name"
				:name="route.path">\{{route.name}}
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	name: 'Tabs',
	data () {
		return {}
	},
	methods: {
		...mapActions({
			remove: 'Tabs/remove_tabs'
		}),
		onTabClick (tab) {
			let index = this.$store.state.Tabs.pathList.indexOf(tab.name)
			if (index !== -1) {
				this.$router.push(this.$store.state.Tabs.list[index])
			}
		},
		onRemoveTab (path) {
			this.remove({
				path: path
			}).then(() => {
				if (this.$route.path === path) {
					if (this.$store.state.Tabs.list.length) {
						this.$router.push({
							path: this.$store.state.Tabs.list[0].path,
							params: this.$store.state.Tabs.list[0].params,
							query: this.$store.state.Tabs.list[0].query
						})
					} else {
						this.$router.push('/')
					}
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
	.tabs{
		padding: 0px 26px;
	}
</style>
