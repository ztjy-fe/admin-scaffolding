<template>
	<div class="app-wrapper" :class="{'hide-sidebar':!sidebar.opened}">
		<div class="app-header">
			<span>后台管理系统</span>
			<el-dropdown class="avatar-container" trigger="click">
				<div class="avatar-wrapper">
					<img class="user-avatar" src="../../assets/images/logo.png">
					<i class="el-icon-caret-bottom"></i>
				</div>
				<el-dropdown-menu class="user-dropdown" slot="dropdown">
					<router-link class="inlineBlock" to="/">
						<el-dropdown-item>首页</el-dropdown-item>
					</router-link>
					<el-dropdown-item divided>
						<span @click="logoutHandler" style="display:block;">退出</span>
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
		<div class="app-content">
			<sidebar class="sidebar-container"></sidebar>
			<div class="main-container">
				<navbar></navbar>
				<app-main></app-main>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
	},
	methods: {
		...mapActions({
			logout: 'User/logout'
		}),
		logoutHandler () {
			this.logout().then(() => {
				this.$router.push({ path: '/login' })
				// 为了重新实例化vue-router对象 避免bug
				// window.location.reload()
			})
		}
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
	.app-header{
		font-size: 24px;
		text-align: left;
		color: #fff;
		flex: 0 0 60px;
		background: #324057;
		height: 60px;
		line-height: 60px;
		padding: 0 20px;

		.avatar-container {
			height: 40px;
			display: inline-block;
			position: absolute;
			right: 35px;
			top: 10px;
			.avatar-wrapper {
				cursor: pointer;
				position: relative;
				.user-avatar {
					width: 40px;
					height: 40px;
					border-radius: 10px;
				}
				.el-icon-caret-bottom {
					position: absolute;
					right: -20px;
					top: 25px;
					font-size: 12px;
				}
			}
		}
	}
}
</style>
