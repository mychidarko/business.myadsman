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
		<Stats :ads="stats.ads.count" :reach="stats.reach.count" :interactions="stats.interactions.count" :loading="loading" />
		<vs-row vs-justify="center">
			<vs-col vs-lg="12" vs-sm="12" vs-xs="12">
				<vs-alert color="danger">Ads <b>reach</b> and <b>impressions</b> are still under development.</vs-alert>
				<br>
			</vs-col>
			<vs-col type="flex" vs-justify="center" vs-align="center" vs-lg="8" vs-sm="12" vs-xs="12" code-toggler>
				<vs-card class="cardx">
					<div slot="header">
						<h4>General Ad Analytics</h4>
					</div>
					<TotalAnalyticsOverTime :data="analytics.general" v-if="!loading" />
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
		</vs-row>
	</div>  
</template>

<script>
import axios from 'axios';
import { API_URL } from '@/common/config';
import Business from '@/common/storage.user';

import TotalAnalyticsOverTime from './components/Analytics/TotalAnalyticsOverTime';
import AdsPerformaceToday from './components/Analytics/AdsPerformaceToday';
import Stats from './components/dashboard/Stats';

export default {
	name: 'Dashboard',
	data() {
		return {
			loading: true,
			analytics: {
				today: [],
				general: []
			},
			stats: {
				ads: { ads: [], count: 0 },
				reach: { reach: [], count: 0 },
				interactions: { interactions: [], count: 0 },
				// growth: { reach: [], count: 0 }
			}
		}
	},
	mounted() {
		this.$vs.loading({ text: "Loading Business Info..." });

		axios.get(`${API_URL}/ads/business/${Business.get("id")}`)
			.then((res) => {
				this.stats.ads.count = res.data.length;
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

		axios.get(`${API_URL}/ads/business/reach/${Business.get("id")}/all`)
			.then((res) => {
				this.stats.reach = res.data;
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

		axios.get(`${API_URL}/ads/business/interactions/${Business.get("id")}/all`)
			.then((res) => {
				this.stats.interactions = res.data;
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

		axios.get(`${API_URL}/business/${Business.get("id")}/ads/analytics/general/today`)
			.then((res) => {
				this.analytics.today = res.data;
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

		axios.get(`${API_URL}/business/${Business.get("id")}/ads/analytics/general`)
			.then((res) => {
				this.analytics.general = res.data;
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
	},
	components: {
		TotalAnalyticsOverTime,
		AdsPerformaceToday,
		Stats
	},
}
</script>
