<template>
	<vs-card class="cardx">
		<div v-if="loading">Loading Advertiser Information...</div>
		<div v-else>
			<div class="comments-and-info-container">
				Watched {{ info.watchCount }}/{{ info.watchLimit }} times
			</div>
			<br>
			<h3>Advertiser Information</h3>
			<p>Ad by <b>{{ advertiser.name }}</b></p>
			<p>{{ info.description }}</p>
		</div>
	</vs-card>
</template>

<script>
export default {
	name: "VideoInfoCard",
	props: ["info"],
	data: function() {
		return {
			advertiser: {},
			loading: false
		}
	},
	mounted: function() {
		// api call to fetch advertiser information
		this.loading = true;
		setTimeout(() => {
			this.advertiser = {
				name: this.info.advertiser,
			}
			this.loading = false;
		}, 3000);
	}
}
</script>