<template>
	<div>
		<section>
			<div class="section-info">
				<h4>Clickable Ads</h4>
				<span>Click to earn</span>
			</div>
			<AdGroup :loading="loading" :ads="clickableAds" />
		</section>
		<section class="final-section">
			<div class="section-info">
				<h4>Video Ads</h4>
				<span>Watch ads and earn</span>
			</div>
			<AdGroup :loading="loading" :ads="videoAds" />
		</section>
	</div>
</template>

<script>
import AdGroup from './components/Ads/AdGroup';

export default {
	name: "ManageAds",
	data: function() {
		return {
			clickableAds: [],
			videoAds: [],
			loading: true
		}
	},
	mounted: function() {
		// api call to get ads
		this.$vs.loading({ text: "Loading Ads..." })
		setTimeout(() => {
			let clickableAds = [
				{ id: 1, name: "Nestle Nido Milkshake", advertiser: "Nestle", img: "https://source.unsplash.com/random/200x100", type: "clickable", reward: "0.2" },
				{ id: 2, name: "Motorolla Phones", advertiser: "Motorolla", img: "https://source.unsplash.com/random/200x99", type: "clickable", reward: "0.5" },
				{ id: 3, name: "Bitcart", advertiser: "Bitcart", img: "https://source.unsplash.com/random/200x101", type: "clickable", reward: "2" },
				{ id: 4, name: "Power Arts", advertiser: "PAarts", img: "https://source.unsplash.com/random/199x100", type: "clickable", reward: "0.1" },
			];
			let videoAds = [
				{ id: 1, name: "For bigger joyrides", advertiser: "Google Chromecast", video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", type: "video", reward: "0.2" },
				{ id: 2, name: "For bigger fun", advertiser: "Google Chromecast", video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", type: "video", reward: "0.5" },
				{ id: 3, name: "For bigger meltdowns", advertiser: "Google Chromecast", video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4", type: "video", reward: "2" },
				{ id: 4, name: "For bigger escapes", advertiser: "Google Chromecast", video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", type: "video", reward: "0.1" }
			];

			this.clickableAds = clickableAds;
			this.videoAds = videoAds;

			this.loading = false;
			this.$vs.loading.close();
		}, 3000);
	},
	components: {
		AdGroup
	}
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