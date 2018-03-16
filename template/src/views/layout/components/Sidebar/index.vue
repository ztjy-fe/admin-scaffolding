<template>
	<div class="scroll-container">
		<div class="scroll-wrapper">

			<el-menu mode="vertical" unique-opened :default-active="$route.path" background-color="#eef1f6" text-color="#48576a" active-text-color="#20a0ff" :collapse="!sidebar.opened">
				<sidebar-item :routes="routes"></sidebar-item>
			</el-menu>

		</div>
	</div>
</template>

<script>
import SidebarItem from './SidebarItem'
import { mapGetters } from 'vuex'

export default {
	data () {
		return {}
	},
	components: {
		SidebarItem
	},
	computed: {
		routes () {
			return this.$router.options.routes
		},
		...mapGetters({
			sidebar: 'SideBar/getSidebar'
		})
	}
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.scroll-container {
	position: relative;
	width: 100%;
	height: 100%;
	background-color: #eff2f7;
	.scroll-wrapper {
		position: absolute;
		width: 100%!important;
	}
}
</style>
