<template>
	<scroll-bar>
		<el-menu mode="vertical" unique-opened :default-active="$route.path" background-color="#eef1f6" text-color="#48576a" active-text-color="#20a0ff">
			<sidebar-item :routes="routes"></sidebar-item>
		</el-menu>
	</scroll-bar>
</template>

<script>
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/scrollbar'

export default {
	components: { SidebarItem, ScrollBar },
	computed: {
		routes () {
			return this.$router.options.routes
		}
	}
}
</script>
