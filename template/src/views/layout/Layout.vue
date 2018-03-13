<template>
	<div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
		<sidebar class="sidebar-container"></sidebar>
		<div class="main-container">
			<navbar></navbar>
			<app-main></app-main>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '@/views/layout/components/Navbar.vue'
import Sidebar from '@/views/layout/components/Sidebar/index.vue'
import AppMain from '@/views/layout/components/AppMain.vue'

export default {
	name: 'layout',
	components: {
		Navbar,
		Sidebar,
		AppMain
	},
	computed: {
		...mapGetters({
			sidebar: 'SideBar/getSidebar'
		})
	}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-wrapper {
	position: relative;
	height: 100%;
	width: 100%;
	&:after {
		content: "";
		display: table;
		clear: both;
	}
}
</style>
