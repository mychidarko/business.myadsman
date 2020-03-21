<template>
	<div>
		<div v-if="loading">Loading Analytics...</div>
		<div v-else>
			<vs-row>
				<vs-col vs-lg="6" vs-md="6" vs-sm="12" vs-xs="12">
					<vs-card>
						<div slot="header">Basic Ad Info</div>
						<h3>{{ ad.type.toUpperCase() }} Ad #{{ ad.id }} - {{ ad.name }} <span>({{ ad.type }})</span></h3>
						<vs-divider></vs-divider>
						<p>
							{{ ad.description }}<br>
							<br>
							Links to <a :href="`${ad.link}?ref=adsman`" target="_blank" rel="adsman">{{ ad.link }}</a><br>
							<br>
							<b>Reward: GH¢ {{ ad.reward }}</b>
							<br>
							<br>
						</p>
						<vs-divider></vs-divider>
						<router-link :to="`/ads/manage/${ad.type}/${ad.id}`" class="btn btn-primary abs-btn" style="border-radius: 0 !important;">View Full Ad Information</router-link>
					</vs-card>
				</vs-col>
				<vs-col vs-lg="6" vs-md="6" vs-sm="12" vs-xs="12">
					<vs-card>
						<div slot="header">Analytics at a glance</div>
						<div>
							<div col-lg="6" col-xs="6">
								<h5>Total impressions</h5>
								<div>Total number of times your ad has been seen</div>
								<b>{{ analytics.impressions }}</b>
							</div>
							<vs-divider></vs-divider>
							<div col-lg="6" col-xs="6">
								<h5>Total Reach</h5>
								<div><b>Unique</b> number of times your ad has been seen</div>
								{{ analytics.reach }}
							</div>
							<vs-divider></vs-divider>
							<div col-lg="6" col-xs="6">
								<h5>Total Interactions</h5>
								<b>{{ analytics.interactions }}</b>
							</div>
							<vs-divider></vs-divider>
							<div col-lg="6" col-xs="6">
								<h5>Total Amount Spent GH¢</h5>
								{{ analytics.spent }}
							</div>
						</div>
					</vs-card>
				</vs-col>
				<vs-col vs-xs="12" vs-md="12" vs-sm="12" vs-lg="12">
					<vs-card>
						<div slot="header">Analytics Over Time</div>
						<AnalyticsOverTime :data="analytics.time" />
					</vs-card>
				</vs-col>
				<vs-col vs-xs="12" vs-md="6" vs-sm="12" vs-lg="6">
					<vs-card>
						<div slot="header">Analytics By Location</div>
						<AnalyticsByLocation :data="analytics.locations" />
					</vs-card>
				</vs-col>
				<vs-col vs-xs="12" vs-md="6" vs-sm="12" vs-lg="6">
					<vs-card>
						<div slot="header">Analytics Per Gender</div>
						<AnalyticsByGender :data="analytics.gender" />
					</vs-card>
				</vs-col>
			</vs-row>
		</div>
	</div>
</template>

<script>
import AnalyticsByLocation from './components/Analytics/AnalyticsByLocation';
import AnalyticsByGender from './components/Analytics/AnalyticsByGender';
import AnalyticsOverTime from './components/Analytics/AnalyticsOverTime';

export default {
	name: "AdAnalytics",
	components: {
		AnalyticsByLocation, AnalyticsByGender, AnalyticsOverTime
	},
	data: function() {
		return {
			ad: {},
			advertiser: {},
			analytics: {},
			loading: true
		}
	},
	mounted: function() {
		let type = this.$route.params.type;
		let id = this.$route.params.id;

		this.$vs.loading({ text: "Loading Ad Analytics..." });

		setTimeout(() => {
			let ad = {
				id, type,
				name: "The future of payments",
				advertiser: "Portal Network",
				description: "Link all your wallets together with Portal Online, send and receive cash, pay your bills and keep track of your cash.",
				link: "https://example.com",
				reward: 0.2
			};
			let advertiser = {
				name: "Portal Network",
				description: "A finacial organisation that deals maiinly crypto currency and using blockchain related to improve transactions"
			};
			let analytics = {
				impressions: 2410,
				reach: 2100,
				interactions: 1991,
				spent: 378.5,
				locations: [
					{ 
						name: "Ghana", 
						impressions: 2210, 
						reach: 1940, 
						interactions: 1845 
					},
					{ 
						name: "Togo", 
						impressions: 10, 
						reach: 8, 
						interactions: 8
					},
					{ 
						name: "Unknown", 
						impressions: 190, 
						reach: 152, 
						interactions: 138 
					},
				],
				gender: [
					{
						type: "Male",
						impressions: 860, 
						reach: 730, 
						interactions: 695 
					},
					{
						type: "Female",
						impressions: 860, 
						reach: 708, 
						interactions: 658 
					},
					{
						type: "Unknown",
						impressions: 690, 
						reach: 662,
						interactions: 638 
					}
				],
				time: [
					{
						date: "13th March, 2020",
						impressions: 720,
						reach: 590,
						interactions: 555
					},
					{
						date: "14th March, 2020",
						impressions: 720, 
						reach: 563, 
						interactions: 528 
					},
					{
						date: "15th March, 2020",
						impressions: 610, 
						reach: 582,
						interactions: 558 
					},
					{
						date: "16th March, 2020",
						impressions: 120,
						reach: 115,
						interactions: 100
					},
					{
						date: "17th March, 2020",
						impressions: 100, 
						reach: 100, 
						interactions: 100 
					},
					{
						date: "18th March, 2020",
						impressions: 50, 
						reach: 50,
						interactions: 50 
					},
					{
						date: "19th March, 2020",
						impressions: 100, 
						reach: 100, 
						interactions: 100 
					}
				]
			};

			this.ad = ad;
			this.advertiser = advertiser;
			this.analytics = analytics;

			this.loading = false;
			this.$vs.loading.close();
		}, 3000);
	}
}
</script>