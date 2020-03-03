<template>
	<vs-row vs-justify="center" class="video-page">
		<vs-col type="flex" vs-justify="center" flex-direction="column" vs-align="center" vs-xs="12" vs-sm="8" vs-md="8" vs-lg="8" style="padding: 0px 4px 0px 0px !important;">
			<VideoPlayer :loadVideoInfo="loadVideoInfo" />
			<VideoInfoCard :info="info" />
		</vs-col>
		<vs-col type="flex" vs-justify="center" vs-align="center" vs-xs="12" vs-sm="4" vs-md="4" vs-lg="4" style="padding: 0px 0px 0px 4px !important;">
			<OtherAdsCard />
		</vs-col>
	</vs-row>
</template>

<script>
import VideoPlayer from './VideoPlayer';
import OtherAdsCard from './OtherAdsCard';
import VideoInfoCard from './VideoInfoCard';

export default {
	name: "VideoAd",
	data: function() {
		return {
			info: {},
			moreAds: []
		}
	},
	methods: {
		loadVideoInfo: function() {
			this.info = this.$store.state.videoAd.video;
		}
	},
	mounted: function() {
		// api call and all happens here
	},
	components: {
		VideoPlayer, OtherAdsCard, VideoInfoCard
	}
}
</script>

<style scoped>
.video-page {
	margin-top: -15px !important;
}
</style>
