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
								<h3>Total impressions</h3>
								<div>Total number of times your ad has been seen</div>
								<h5 style="margin-top: 10px;">{{ analytics.impressions }}</h5>
							</div>
							<vs-divider></vs-divider>
							<div col-lg="6" col-xs="6">
								<h3>Total Reach</h3>
								<div><b>Unique</b> number of times your ad has been seen</div>
								<h5 style="margin-top: 10px;">{{ analytics.reach }}</h5>
							</div>
							<vs-divider></vs-divider>
							<div col-lg="6" col-xs="6">
								<h3>Total Interactions</h3>
								<div>Total number of times users have watched or clicked on your ad</div>
								<h5 style="margin-top: 10px;">{{ analytics.interactions }}</h5>
							</div>
						</div>
					</vs-card>
				</vs-col>
				<vs-col vs-xs="12" vs-md="12" vs-sm="12" vs-lg="12">
					<vs-card>
						<div slot="header">Analytics Over Time</div>
						<AnalyticsOverTime :data="time" />
					</vs-card>
				</vs-col>
				<vs-col vs-xs="12" vs-md="6" vs-sm="12" vs-lg="6">
					<vs-card>
						<div slot="header">Analytics By Location</div>
						<AnalyticsByLocation :data="locations" />
					</vs-card>
				</vs-col>
				<vs-col vs-xs="12" vs-md="6" vs-sm="12" vs-lg="6">
					<vs-card>
						<div slot="header">Analytics Per Gender</div>
						<AnalyticsByGender :data="gender" />
					</vs-card>
				</vs-col>
			</vs-row>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import { API_URL } from '@/common/config';

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
			analytics: {
				interactions: 0,
				impressions: 0,
				reach: 0
			},
			time: [],
			gender: [],
			locations: [],
			loading: true
		}
	},
	mounted: function() {
		let id = this.$route.params.id;

		this.$vs.loading({ text: "Loading Ad Analytics..." });

		axios.get(`${API_URL}/ads/single/${id}`)
			.then((res) => {
				this.ad = res.data;
				this.advertiser = { name: res.data.advertiser, description: "No Description Provided" };
			})
			.catch((err) => {
				let errors = String(err).split(" ");
				let errs = "";

				for (let index = 0; index < errors.length; index++) {
					const error = errors[index];
					if (index > 0) {
						errs = `${errs} ${error} `;
					}
				}
				
				this.$vs.notify({
					title: "Error",
					text: errs,
					position: "top-right",
					color: "danger"
				});
			});

		axios.get(`${API_URL}/business/ads/analytics/single/${id}`)
			.then((res) => {
				this.analytics = res.data;
			})
			.catch((err) => {
				let errors = String(err).split(" ");
				let errs = "";

				for (let index = 0; index < errors.length; index++) {
					const error = errors[index];
					if (index > 0) {
						errs = `${errs} ${error} `;
					}
				}
				
				this.$vs.notify({
					title: "Error",
					text: errs,
					position: "top-right",
					color: "danger"
				});
			});
		
		axios.get(`${API_URL}/business/ads/analytics/single/${id}/overtime`)
			.then((res) => {
				this.time = res.data;
			})
			.catch((err) => {
				let errors = String(err).split(" ");
				let errs = "";

				for (let index = 0; index < errors.length; index++) {
					const error = errors[index];
					if (index > 0) {
						errs = `${errs} ${error} `;
					}
				}
				
				this.$vs.notify({
					title: "Error",
					text: errs,
					position: "top-right",
					color: "danger"
				});
			});

		axios.get(`${API_URL}/business/ads/analytics/single/${id}/location`)
			.then((res) => {
				this.locations = res.data;
			})
			.catch((err) => {
				let errors = String(err).split(" ");
				let errs = "";

				for (let index = 0; index < errors.length; index++) {
					const error = errors[index];
					if (index > 0) {
						errs = `${errs} ${error} `;
					}
				}
				
				this.$vs.notify({
					title: "Error",
					text: errs,
					position: "top-right",
					color: "danger"
				});
			});

		axios.get(`${API_URL}/business/ads/analytics/single/${id}/gender`)
			.then(() => {
				// this.gender = res.data;
				this.gender = [];
				this.loading = false;
				this.$vs.loading.close();
			})
			.catch((err) => {
				let errors = String(err).split(" ");
				let errs = "";

				for (let index = 0; index < errors.length; index++) {
					const error = errors[index];
					if (index > 0) {
						errs = `${errs} ${error} `;
					}
				}
				
				this.$vs.notify({
					title: "Error",
					text: errs,
					position: "top-right",
					color: "danger"
				});

				this.loading = false;
				this.$vs.loading.close();
			});
	}
}
</script>