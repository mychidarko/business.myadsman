<template>
	<div>
		<section v-if="pending.length > 0">
			<div class="section-info">
				<h4>Pending Ads</h4>
				<span>Awaiting confirmation from Adsman</span>
			</div>
			<AdGroup :loading="loading" :ads="pending" />
		</section>
		<section v-if="drafts.length > 0">
			<div class="section-info">
				<h4>Drafts</h4>
				<span>These ads haven't been submitted to Adsman</span>
			</div>
			<AdGroup :loading="loading" :ads="drafts" />
		</section>
		<section>
			<div class="section-info">
				<h4>Clickable Ads</h4>
				<span>Clickable ads approved by adsman</span>
			</div>
			<AdGroup :loading="loading" :ads="clickableAds" />
		</section>
		<section class="final-section">
			<div class="section-info">
				<h4>Video Ads</h4>
				<span>Video ads approved by adsman</span>
			</div>
			<AdGroup :loading="loading" :ads="videoAds" />
		</section>
	</div>
</template>

<script>
import axios from 'axios';
import { API_URL } from "@/common/config";
import Business from "@/common/storage.user";
import AdGroup from './components/Ads/AdGroup';

export default {
	name: "ManageAds",
	data: function() {
		return {
			clickableAds: [],
			videoAds: [],
			drafts: [],
			pending: [],
			loading: true
		}
	},
	mounted: function() {
		this.$vs.loading({ text: "Loading Ads..." });

		axios.get(`${API_URL}/ads/business/${Business.get("id")}/drafts`)
			.then((res) => {
				this.drafts = res.data;
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
		
		axios.get(`${API_URL}/ads/business/${Business.get("id")}/pending`)
			.then((res) => {
				this.pending = res.data;
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

		axios.get(`${API_URL}/ads/business/${Business.get("id")}/clickable`)
			.then((res) => {
				this.clickableAds = res.data;
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

		axios.get(`${API_URL}/ads/business/${Business.get("id")}/video`)
			.then((res) => {
				this.videoAds = res.data;

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
		
		// setTimeout(() => {
		// 	let drafts = [
		// 		{ id: 1, name: "Portal Online", advertiser: "Portal Network", img: "https://source.unsplash.com/random/200x100", type: "clickable", reward: "0.2" },
		// 		{ id: 2, name: "For bigger fun", advertiser: "Google Chromecast", video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", type: "video", reward: "0.5" },
		// 	];
		// 	let pending = [
		// 		{ id: 1, name: "Portal Online", advertiser: "Portal Network", img: "https://source.unsplash.com/random/200x100", type: "clickable", reward: "0.2" },
		// 		{ id: 2, name: "For bigger fun", advertiser: "Google Chromecast", video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", type: "video", reward: "0.5" },
		// 		{ id: 3, name: "For bigger meltdowns", advertiser: "Google Chromecast", video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4", type: "video", reward: "2" },
		// 	];
		// 	let clickableAds = [
		// 		{ id: 1, name: "Nestle Nido Milkshake", advertiser: "Nestle", img: "https://source.unsplash.com/random/200x100", type: "clickable", reward: "0.2" },
		// 		{ id: 2, name: "Motorolla Phones", advertiser: "Motorolla", img: "https://source.unsplash.com/random/200x99", type: "clickable", reward: "0.5" },
		// 		{ id: 3, name: "Bitcart", advertiser: "Bitcart", img: "https://source.unsplash.com/random/200x101", type: "clickable", reward: "2" },
		// 		{ id: 4, name: "Power Arts", advertiser: "PAarts", img: "https://source.unsplash.com/random/199x100", type: "clickable", reward: "0.1" },
		// 	];
		// 	let videoAds = [
		// 		{ id: 1, name: "For bigger joyrides", advertiser: "Google Chromecast", video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", type: "video", reward: "0.2" },
		// 		{ id: 2, name: "For bigger fun", advertiser: "Google Chromecast", video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", type: "video", reward: "0.5" },
		// 		{ id: 3, name: "For bigger meltdowns", advertiser: "Google Chromecast", video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4", type: "video", reward: "2" },
		// 		{ id: 4, name: "For bigger escapes", advertiser: "Google Chromecast", video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", type: "video", reward: "0.1" }
		// 	];

		// 	this.clickableAds = clickableAds;
		// 	this.videoAds = videoAds;
		// 	this.drafts = drafts;
		// 	this.pending = pending;

		// 	this.loading = false;
		// 	this.$vs.loading.close();
		// }, 3000);
	},
	components: { AdGroup }
}
</script>

<style scoped>
.section-info {
	padding-left: 15px !important;
	margin-bottom: 10px !important;
}

section {
	margin-bottom: 20px !important;
}

.final-section {
	margin-bottom: 0px !important;
}

@media only screen and (max-width: 550px) {
	.section-info {
		padding-left: 0px !important;
	}
}
</style>