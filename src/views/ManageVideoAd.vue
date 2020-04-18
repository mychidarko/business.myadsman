<template>
	<div style="margin-top: -15px;">
		<vs-row vs-justify="center">
			<vs-col type="flex" vs-justify="center" flex-direction="column" vs-align="center" vs-xs="12" vs-sm="8" vs-md="8" vs-lg="8" style="padding: 0px 4px 0px 0px !important;">
				<vs-card class="cardx">
					<div class="ad-image-container">
						<div v-if="loading">Loading ad...</div>
						<video controls v-else :src="ad.media"></video>
					</div>

					<div class="footer" v-if="!loading">{{ ad.name }}</div>
				</vs-card>
				<vs-card class="cardx">
					<div class="comments-and-info-container">
						<div v-if="loading">Loading ad data...</div>
						<div v-else>
							<h4>Ad Operations</h4>
							<router-link :to="`/ads/edit/video/${ad.id}`" class="btn btn-primary abs-btn btn-block">
								<vs-icon icon="edit"></vs-icon> Edit Ad
							</router-link>
							<button class="btn btn-danger abs-btn btn-block">
								<vs-icon icon="delete"></vs-icon> Remove Ad
							</button>
						</div>
					</div>
				</vs-card>
			</vs-col>
			<vs-col type="flex" vs-justify="center" vs-align="center" vs-xs="12" vs-sm="4" vs-md="4" vs-lg="4" style="padding: 0px 0px 0px 4px !important;">
				<vs-card class="cardx">
					<div class="other-ads-container">
						<div v-if="loading">Loading ad information...</div>
						<div v-else>
							<h4>Ad Description</h4>
							<p>{{ ad.description }}</p>

							<h4>Reward</h4>
							<p>GH¢ {{ ad.reward }}</p>

							<div v-if="ad.link.length > 0">
								<h4>Ad Link To</h4>
								<p><a :href="`${ad.link}?ref=adsman`" target="_blank">{{ ad.link }}</a></p>
							</div>
						</div>
						<br>
						<br>
						<section>
							<div v-if="loading">Loading Ad Analytics...</div>
							<div v-else>
								<div>
									<h4>Analytics Peek</h4>
									<br>
									<div class="abs-row">
										<vs-col col-lg="6" col-xs="6">
											<h5>Total impressions</h5>
											<div>Total number of times your ad has been seen</div>
											<b>{{ analytics.impressions }}</b>
										</vs-col>
										<vs-divider></vs-divider>
										<vs-col col-lg="6" col-xs="6">
											<h5>Total Reach</h5>
											<div><b>Unique</b> number of times your ad has been seen</div>
											{{ analytics.reach }}
										</vs-col>
										<vs-divider></vs-divider>
										<vs-col col-lg="6" col-xs="6">
											<h5>Total Interactions</h5>
											<b>{{ analytics.interactions }}</b>
										</vs-col>
									</div>
								</div>
								<router-link :to="`/analytics/ad/video/${ad.id}`" class="btn btn-dark btn-block abs-btn" style="margin-top: 76px !important;">
									<vs-icon>bar_chart</vs-icon> View Complete Analytics Data
								</router-link>
							</div>
						</section>
					</div>
				</vs-card>
			</vs-col>
		</vs-row>
	</div>
</template>

<script>
import axios from "axios";
import { API_URL } from "@/common/config";

export default {
	name: "ManageVideoAd",
	data: function() {
		return {
			ad: {},
			analytics: {},
			loading: true
		}
	},
	mounted: function() {
		this.$vs.loading({ text: "Loading Ad Information..." });

		let id = this.$route.params.id;

		axios.get(`${API_URL}/ads/single/${id}`)
			.then((res) => {
				if (!res.data.error) {
					if (res.data.status != "approved") {
						this.loading = false;
						this.$vs.loading.close();
						this.$router.push("/ads/manage");
					}

					if (res.data.type == "clickable") {
						this.loading = false;
						this.$vs.loading.close();
						this.$router.push("/ads/manage/clickable/" + id);
					}

					this.ad = res.data;
				}
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
				if (!res.data.error) {
					this.analytics = res.data;

					this.loading = false;
					this.$vs.loading.close();
				}
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

<style scoped>
.debug {
	border: 1px solid red !important;
}

.ad-image-container {
	max-height: 45vh !important;
	width: 100% !important;
	position: relative !important;
	overflow: hidden !important;
	background: rgba(92, 92, 92, 0.1);
	display: flex !important;
	justify-content: center;
	align-items: center;
}

.ad {
	max-width: 100%;
	max-height: 44vh;
}

.abs-btn {
	padding: 5px 10px !important;
	border-radius: 0px !important;
}

.other-ads-container {
	height: 74vh;
}

.footer {
	padding-top: 20px !important;
	margin-bottom: 0px !important;
	font-size: 20px;
}
</style>
