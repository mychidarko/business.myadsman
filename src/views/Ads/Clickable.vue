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
						<button v-if="!ad.clicked" @click="handleAdClick" class="btn btn-primary abs-btn pull-right">
							Click to earn GH¢ {{ ad.reward }}
						</button>
						<div class="btn btn-success abs-btn" v-else>
							<vs-icon icon="check"></vs-icon> GH¢ {{ ad.reward }} received
						</div>
						<!-- <a href="#" @click.prevent="handleAdClick" target="_blank" class="btn btn-primary abs-btn pull-right" v-else>
							Click to earn GH¢ {{ ad.reward }}
						</a> -->
					</div>
				</vs-card>
				<vs-card class="cardx">
					<div class="comments-and-info-container">
						<div v-if="loading">Loading advertiser info...</div>
						<div v-else>
							<div class="comments-and-info-container">
								Click {{ ad.clickCount }}/{{ ad.clickLimit }} times
							</div>
							<br>
							<h3>Advertiser Information</h3>
							<p>Ad by <b>{{ advertiser.name }}</b></p>
							<p>{{ ad.description }}</p>
						</div>
					</div>
				</vs-card>
			</vs-col>
			<vs-col type="flex" vs-justify="center" vs-align="center" vs-xs="12" vs-sm="4" vs-md="4" vs-lg="4" style="padding: 0px 0px 0px 4px !important;">
				<vs-card class="cardx">
					<div class="other-ads-container">
						<div v-if="loading">Loading more ads...</div>
					</div>
				</vs-card>
			</vs-col>
		</vs-row>
	</div>
</template>

<script>
export default {
	name: "ClickableAd",
	data: function() {
		return {
			ad: {},
			advertiser: {},
			loading: true
		}
	},
	mounted: function() {
		// api call to get the ad and advertiser information
		this.$vs.loading({ text: "Loading Ad Information" });

		setTimeout(() => {
			let ad = {
				name: "The future of payments",
				advertiser: "Portal Network",
				description: "Link all your wallets together with Portal Online, send and receive cash, pay your bills and keep track of your cash.",
				link: "https://example.com",
				clickCount: 1,
				clickLimit: 2,
				clicked: false,
				reward: 0.2
			};
			let advertiser = {
				name: "Portal Network",
			};

			this.ad = ad;
			this.advertiser = advertiser;

			this.loading = false;
			this.$vs.loading.close();
		}, 5000);
	},
	methods: {
		handleAdClick: function() {
			this.$vs.loading({ text: "Please wait..." });
			// re-route to ad.link
			window.open(`${this.ad.link}?ref=adsman`, "_blank");
			// api call to pay and stuff
			setTimeout(() => {
				this.ad.clicked = true;
				this.ad.clickCount = this.ad.clickCount + 1;
				this.showViewedNotification(this.ad.advertiser, this.ad.reward);
				this.$vs.loading.close();
			}, 3000);
		},
		showViewedNotification: function(advertiser, reward) {
			this.$vs.notify({
				title: 'Congratulations',
				text: `You have watched ${advertiser}'s ad, an amount of GH¢ ${reward} has been credited to your account. `,
				color: 'success',
				position: 'top-right',
				icon: 'credit_card',
				time: 8000
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
