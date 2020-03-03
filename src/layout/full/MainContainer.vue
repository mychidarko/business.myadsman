<template>
	<div class="main-wrapper">
		<Navbar :topbarColor="topbarColor" :title="logotitle" />
		<SideBar parent=".main-wrapper" :sidebarLinks="sidebarLinks"/>
		<div class="main-container-fluid">
			<router-view></router-view>
		</div>	
	</div>
</template>

<script>
import Navbar from '@/layout/full/header/Navbar';
import SideBar from '@/layout/full/sidebar/SideBar';
import sidebarLinks from '@/layout/full/sidebar/sidebarlinks.js';

export default {
	name: "MainContainer",
	components: {
		Navbar,
		SideBar
	},
	data: () => ({
		topbarColor: "#2e9efe",
		logotitle: "Adsman for Business",
		sidebarLinks: sidebarLinks,
	})
}  	
</script>