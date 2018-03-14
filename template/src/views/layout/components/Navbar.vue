<template>
	<el-menu class="navbar" mode="horizontal">
		<hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
		<breadcrumb></breadcrumb>
	</el-menu>
</template>

<script>
import Hamburger from '@/components/hamburger'
import Breadcrumb from '@/components/breadcrumb'
import { mapActions, mapGetters } from 'vuex'

export default {
	components: {
		Breadcrumb,
		Hamburger
	},
	methods: {
		...mapActions({
			toggleSideBar: 'SideBar/toggleSideBar'
		})
	},
	computed: {
		...mapGetters({
			sidebar: 'SideBar/getSidebar'
		})
	}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
	height: 50px;
	line-height: 50px;
	border-radius: 0px !important;
	.hamburger-container {
		line-height: 58px;
		height: 50px;
		float: left;
		padding: 0 15px;
	}
	.screenfull {
		position: absolute;
		right: 90px;
		top: 16px;
		color: red;
	}
}
.el-menu--horizontal{
	border-bottom: none;
}
</style>
