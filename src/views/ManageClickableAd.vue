<template>
	<div>
		<vs-row vs-justify="center">
			<vs-col type="flex" vs-justify="center" flex-direction="column" vs-align="center" vs-xs="12" vs-sm="8" vs-md="8" vs-lg="8" style="padding: 0px 4px 0px 0px !important;">
				<vs-card class="cardx">
					<div class="ad-image-container">
						<div v-if="loading">Loading ad...</div>
						<img src="@/assets/images/test/1.jpg" class="ad" alt=""  v-else>
					</div>

					<div class="footer" v-if="!loading">
						{{ ad.name }}
						<!-- <button class="btn btn-danger abs-btn pull-right">
							<vs-icon icon="delete"></vs-icon> Remove Ad
						</button> -->
						<router-link :to="`/ads/edit/clickable/${ad.id}`" class="btn btn-primary abs-btn pull-right">
							<vs-icon icon="edit"></vs-icon> Edit Ad
						</router-link>
					</div>
				</vs-card>
				<vs-card class="cardx">
					<div class="comments-and-info-container">
						<div v-if="loading">Loading advertiser info...</div>
						<div v-else>
							<h3>Advertiser Information</h3>
							<p>Ad by <b>{{ advertiser.name }}</b></p>
							<h5>Advertiser Description</h5>
							<p>{{ advertiser.description }}</p>
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

							<h4>Ad Link To</h4>
							<p><a :href="`${ad.link}?ref=adsman`" target="_blank">{{ ad.link }}</a></p>
						</div>
						<vs-divider></vs-divider>
						<section>
							<div v-if="loading">Loading Ad Analytics...</div>
							<div v-else>
								<div>
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
										<vs-divider></vs-divider>
										<vs-col col-lg="6" col-xs="6">
											<h5>Total Amount Spent GH¢</h5>
											{{ analytics.spent }}
										</vs-col>
									</div>
									
									<router-link :to="`/analytics/ad/clickable/${ad.id}`" class="btn btn-dark btn-block btn-outline abs-btn" style="margin-top: 20px !important;">
										<vs-icon icon="bar_chart"></vs-icon> View Complete Analytics Data
									</router-link>
								</div>
							</div>
						</section>
					</div>
				</vs-card>
			</vs-col>
		</vs-row>
	</div>
</template>

<script>
export default {
	name: "ManageClickableAd",
	data: function() {
		return {
			ad: {},
			advertiser: {},
			analytics: {},
			loading: true
		}
	},
	mounted: function() {
		// api call to get the ad and advertiser information
		this.$vs.loading({ text: "Loading Ad Information" });

		let id = this.$route.params.id;

		setTimeout(() => {
			let ad = {
				id,
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
				]
			};

			this.ad = ad;
			this.advertiser = advertiser;
			this.analytics = analytics;

			this.loading = false;
			this.$vs.loading.close();
		}, 5000);
	},
	methods: {
		showViewedNotification: function(title, text, color, icon) {
			this.$vs.notify({
				title, text, color, position: 'top-right', icon, time: 8000
			});
		}
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
	float: right !important;
	padding: 5px 10px !important;
	border-radius: 0px !important;
	margin-top: -5px !important;
}

.other-ads-container {
	height: 75vh;
}

.footer {
	padding-top: 20px !important;
	margin-bottom: 0px !important;
	font-size: 20px;
}
</style>
