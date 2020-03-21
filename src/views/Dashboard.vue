<template>
	<div>
		<!-- <div v-if="!isEarning" style="padding: 0px 15px !important;">
			<vs-alert title="Try Business Earns" color="rgb(50, 76, 99)" :active.sync="earnAlertActive" closable close-icon="cancel">
				<div class="smart-alert-text">
					You're currently not earning from Adsman, 
					<router-link to="/earn">click here to join the business earn program </router-link>
				</div>
			</vs-alert>
			<div v-if="earnAlertActive"><br></div>
		</div> -->
		<Stats />
		<vs-row vs-justify="center">
			<vs-col type="flex" vs-justify="center" vs-align="center" vs-lg="8" vs-sm="12" vs-xs="12" code-toggler>
				<vs-card class="cardx">
					<div slot="header">
						<h4>General Ad Analytics</h4>
					</div>
					<TotalAnalyticsOverTime :data="analytics.time" v-if="!loading" />
					<div v-else>Loading Analytics Data...</div>
				</vs-card>
			</vs-col>
			<vs-col type="flex" vs-justify="center" vs-align="center" vs-sm="12" vs-lg="4" vs-xs="12">
				<vs-card class="cardx">
					<div slot="header">
						<h4>Ads Performace Today</h4>
					</div>
					<AdsPerformaceToday :data="analytics.today" v-if="!loading" />
					<div v-else>Loading Analytics Data...</div>
				</vs-card>
			</vs-col>
			<vs-col vs-lg="12">
				<vs-card>
					<div slot="header">
						<h4>Your Top Ads</h4>
					</div>
					<TopAds />
				</vs-card>
			</vs-col>
		</vs-row>
		<!-- <Blogs/> -->
	</div>  
</template>

<script>
import TotalAnalyticsOverTime from './components/Analytics/TotalAnalyticsOverTime.vue';
import AdsPerformaceToday from './components/Analytics/AdsPerformaceToday.vue';
import TopAds from './components/reports/TopAds.vue';
import Stats from './components/dashboard/Stats.vue';
// import Blogs from './components/dashboard/Blogs.vue';

export default {
	name: 'Dashboard',
	data() {
		return {
			loading: true,
			analytics: {}
		}
	},
	mounted() {
		this.$vs.loading({ text: "Loading User Info..." });

		setTimeout(() => {
			let analytics = {
				today: [
					{
						ad: "Ad #5",
						impressions: 52, 
						reach: 35, 
						interactions: 22 
					},
					{
						ad: "Ad #6",
						impressions: 44, 
						reach: 38,
						interactions: 32 
					},
					{
						ad: "Ad #7",
						impressions: 51, 
						reach: 48, 
						interactions: 40 
					}
				],
				time: [
					{
						ad: "Ad #1",
						impressions: 720,
						reach: 590,
						interactions: 555
					},
					{
						ad: "Ad #2",
						impressions: 720, 
						reach: 563, 
						interactions: 528 
					},
					{
						ad: "Ad #3",
						impressions: 610, 
						reach: 582,
						interactions: 558 
					},
					{
						ad: "Ad #4",
						impressions: 120,
						reach: 115,
						interactions: 100
					},
					{
						ad: "Ad #5",
						impressions: 100, 
						reach: 100, 
						interactions: 100 
					},
					{
						ad: "Ad #6",
						impressions: 50, 
						reach: 50,
						interactions: 50 
					},
					{
						ad: "Ad #7",
						impressions: 100, 
						reach: 100, 
						interactions: 100 
					}
				]
			};
			
			this.analytics = analytics;
			this.loading = false;

			this.$vs.loading.close();
		}, 3000);
	},
	components: {
		TotalAnalyticsOverTime,
		AdsPerformaceToday,
		TopAds,
		Stats,
		// Blogs
	},
}
</script>
