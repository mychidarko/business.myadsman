<template>
	<header class="gridx">
		<vs-navbar
			v-model="indexActive"
			:color="topbarColor"
			class="topnavbar" text-color="rgba(100, 100, 100, 0.7)" active-text-color="rgba(0, 0, 0, 0.6)">
			
			<div slot="title" class="themelogo">
				<span style="width: 5px !important;"></span>
				<span class="logo-text" v-if="title">{{ title }}</span>
			</div>
			<!---
			Mobile toggle
			--> 
			<div slot="title">
				<div class="hiddenDesktop cursor-pointer nav-text" @click.stop="activeSidebar"><vs-icon icon="menu"></vs-icon></div>
			</div>
			
			<vs-spacer></vs-spacer>
			
			<vs-dropdown  vs-trigger-click left class="cursor-pointer pr-2 pl-2 ml-1 mr-1">
				<a class="text-white-dark nav-text" href="#">
					<span v-if="notifications.length > 0">
						<vs-icon icon="notifications" class="not-icon"/><sup class="badge">{{ notifications.length }}</sup>
					</span>
					<span v-else>
						<vs-icon icon="notifications"></vs-icon>
					</span>
				</a>
				<vs-dropdown-menu class="topbar-dd">
					<div v-if="notifications.length === 0" class="no-notifications">
						<vs-icon icon="check"></vs-icon> You have no new notifications
					</div>
					<div v-else v-for="(notification, index) in notifications" :key="index" class="header-ddown">
						<vs-dropdown-item :to="notification.url" class="dropdown-link">
							<h5 class="dropdown-link-title">{{ notification.title }}</h5>
							<span class="dropdown-link-body">{{ notification.body }} </span>
						</vs-dropdown-item>
						<div v-if="index < notifications.length - 1">
							<hr class="mb-1 mt-1" />
						</div>
					</div>
				</vs-dropdown-menu>
			</vs-dropdown>

			<vs-dropdown  vs-trigger-click left class="cursor-pointer pr-2 pl-2 ml-1 mr-1">
				<a class="text-white-dark nav-text" href="#">
					<span v-if="reports.length > 0">
						<vs-icon icon="bar_chart" class="not-icon"/><sup class="badge">{{ reports.length }}</sup>
					</span>
					<span v-else>
						<vs-icon icon="bar_chart"></vs-icon>
					</span>
				</a>
				<vs-dropdown-menu class="topbar-dd">
					<div v-if="reports.length === 0" class="no-notifications">
						<vs-icon icon="check"></vs-icon> You have no new reports
					</div>
					<div v-else v-for="(reports, index) in reports" :key="index" class="header-ddown">
						<vs-dropdown-item :to="reports.url" class="dropdown-link">
							<h5 class="dropdown-link-title">{{ reports.title }}</h5>
							<span class="dropdown-link-body">{{ reports.body }} </span>
						</vs-dropdown-item>
						<div v-if="index < reports.length - 1">
							<hr class="mb-1 mt-1" />
						</div>
					</div>
				</vs-dropdown-menu>
			</vs-dropdown>
			
			<vs-dropdown  vs-trigger-click left class="cursor-pointer pr-2 pl-2 ml-1 mr-md-3">
				<a class="text-white-dark nav-text user-image" href="#"><img src="@/assets/images/users/me.jpg" alt="User"/></a>
				<vs-dropdown-menu class="topbar-dd">          
					<vs-dropdown-item to="/profile"><vs-icon icon="person_outline" class="mr-1"></vs-icon> My Profile</vs-dropdown-item>
					<vs-dropdown-item><vs-icon icon="sentiment_very_satisfied" class="mr-1"></vs-icon> My Balance</vs-dropdown-item>
					<vs-dropdown-item><vs-icon icon="mail_outline" class="mr-1"></vs-icon> Inbox</vs-dropdown-item>
					<hr class="mb-1" />
					<vs-dropdown-item to="/settings"><vs-icon icon="settings" class="mr-1"></vs-icon> Account Setting</vs-dropdown-item>
					<hr class="mb-1" />
					<vs-dropdown-item @click="openAlert('primary')"><vs-icon icon="lock" class="mr-1"></vs-icon> Logout</vs-dropdown-item>
				</vs-dropdown-menu>
			</vs-dropdown>
		</vs-navbar>
	</header>
</template>

<script>
import { LOGOUT } from "@/store/actions.type";

export default {
	name : 'Navbar',
	props: {
		topbarColor: {
			type: String,
			default: "#cecfdd",
		},
		title: {
			type: String,
		},
		logo: {
			type: String
		}
	},
	data: () => ({
		indexActive: 0,
		showToggle: false,
		notifications: [],
		reports: []
	}),
	mounted: function() {
		this.notifications = [
			{
				read: false,
				title: "Welcome to Adsman Business",
				body: "Grow your business and spread your reach.",
				url: "/ads/create"
			}
		];
		this.reports = [
			{
				read: false,
				title: "Clicks report",
				body: "You have received a total of 105 clicks from adsman users",
				url: "/reports"
			}
		];
	},
	methods: {
		activeSidebar() {
			this.$store.commit('IS_SIDEBAR_ACTIVE', true);
		},
		handleLogout: function() {
			this.$store
				.dispatch(LOGOUT)
				.then(() => this.$router.push({ name: "Login" }))
		},
		openAlert: function(color) {
			this.$vs.dialog({
				color,
				title: `Logout?`,
				text: 'Are you sure you want to logout?',
				accept: this.handleLogout
			})
		}
	}
}
</script>

<style scoped>
.logo-text, .nav-text {
	color: rgb(255, 255, 255) !important;
	font-size: 20px;
}

.dropdown-link-title {
	margin-bottom: 3px !important;
}

.no-notifications {
	width: 300px !important;
	padding: 20px !important;
	text-align: center !important;
}

.badge {
	background: rgb(0, 98, 255);
	border-radius: 50%;
	color: white;
	font-size: 12px;
	margin-left: -10px;
}

.header-ddown {
	max-width: 400px !important;
}
</style>
