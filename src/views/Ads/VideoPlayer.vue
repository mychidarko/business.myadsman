<template>
	<vs-card class="cardx">
		<div class="video-player-container">
			<!-- @/assets/images/test/1.mp4 -->
			<video :src="video.video" ref="video" class="video"></video>
			<PlayerControls :playpause="playpause" :playing="playing" v-if="!loading" :playtime="playTime" />
		</div>

		<div class="footer" v-if="!loading">
			{{ video.name }}
			<div v-if="video.watched" class="btn btn-success abs-btn">
				<vs-icon icon="check"></vs-icon> GH¢ {{ video.reward }} received
			</div>
		</div>
	</vs-card>
</template>

<script>
import { SET_CURRENT_VIDEO } from "@/store/actions.type";
import PlayerControls from './VideoPlayerControls';

export default {
	name: "VideoPlayer",
	data: function() {
		return {
			loading: true,
			video: {},
			videoPlayerOptions: {},
			playing: false,
			clickedPlay: false,
			playTime: "",
			ended: false
		}
	},
	components: {
		PlayerControls
	},
	mounted: function() {
		this.$vs.loading({ text: "Loading Video" });
		// api call and all

		setTimeout(() => {
			let video = {
				name: "For Bigger Meltdowns",
				advertiser: "Google Chromecast",
				video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
				description: "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when you want to make Buster's big meltdowns even bigger. For $35. Learn how to use Chromecast with Netflix and more at google.com/chromecast.",
				watched: false,
				watchCount: 1,
				watchLimit: 2,
				length: this.$refs.video.duration,
				reward: 0.5,
			};
			this.$store
				.dispatch(SET_CURRENT_VIDEO, video)
				.then(() => {
					this.video = video;
					this.loading = false;
					this.loadVideoInfo();
					this.$vs.loading.close();
				})
		}, 3000);
	},
	methods: {
		playpause: function() {
			if (this.$refs.video.paused) {
				this.$refs.video.play();
				this.playing = true;
				if (this.clickedPlay === false) {
					this.$refs.video.addEventListener("timeupdate", () => {
						let seekbarPosition =  this.$refs.video.currentTime / this.$refs.video.duration;
						let playTime = seekbarPosition * 100 + "%";
						this.playTime = playTime;

						if (this.$refs.video.currentTime >= (this.$refs.video.duration/3)) {
							this.markViewed();
						}
					});
				}
			} else {
				this.$refs.video.pause();
				this.playing = false;
			}
		},
		markViewed: function() {
			// api call
			setTimeout(() => {
				let video = {
					name: "For Bigger Meltdowns",
					advertiser: "Google Chromecast",
					video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
					description: "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when you want to make Buster's big meltdowns even bigger. For $35. Learn how to use Chromecast with Netflix and more at google.com/chromecast.",
					watched: true,
					watchCount: 2,
					watchLimit: 2,
					length: this.$refs.video.duration,
					reward: 0.5,
				};
				this.$store
					.dispatch(SET_CURRENT_VIDEO, video)
					.then(() => {
						if (this.clickedPlay === false) {
							this.video.watchCount = 2;
							this.video.watched = true;
							this.loadVideoInfo();
							this.showViewedNotification(video.advertiser, video.reward);
							this.clickedPlay = true;
						}
					})
			}, 5000);
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
	},
	props: ["loadVideoInfo"]
}
</script>

<style scoped>
/* *{
	border: 1px solid red !important;
} */

.video-player-container {
	height: 45vh !important;
}

.abs-btn {
	float: right !important;
	padding: 5px 10px !important;
	border-radius: 0px !important;
	margin-top: -5px !important;
}

.btn-success {
	background: #12c966 !important;
}

.video-player-container:hover .controls-container {
	transform: translateY(0);
}

.video-player-container {
	width: 100% !important;
	position: relative !important;
	overflow: hidden !important;
	border: 1px solid rgb(246, 246, 246);
}

.video {
	width: 100% !important;
	height: 45vh !important;
}

.footer {
	padding-top: 20px !important;
	margin-bottom: 0px !important;
	font-size: 20px;
}
</style>
