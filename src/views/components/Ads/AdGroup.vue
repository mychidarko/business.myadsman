<template>
	<div>
		<vs-row v-if="loading">
			<vs-col vs-lg="12">
				Loading Ads...
			</vs-col>
		</vs-row>
		<vs-row v-else>
			<vs-col v-if="ads.length === 0" style="margin: 20px 0px !important;" vs-sm="12" vs-lg="12" vs-md="12">
				There are currently no ads at the moment
			</vs-col>
			<vs-col v-else vs-lg="3" vs-sm="6" vs-xs="12" code-toggler v-for="(ad, index) in ads" :key="index">
				<router-link style="color: black !important;" :to="ad.status != 'approved' ? '#' : `/ads/manage/${ad.type}/${ad.id}`">
					<vs-card class="cardx">
						<div v-if="ad.type === 'clickable'">
							<img src="@/assets/images/test/2.jpg" :alt="`${ad.name} thumbnail`" style="width: 100%; height: 200px; cursor: pointer;">
							<br><br>
						</div>
						<div v-else style="text-align: center;">
							<video :src="ad.video" :alt="`${ad.name} thumbnail`" style="width: 100%; height: 200px; cursor: pointer; margin-bottom: 12px !important;" />
							<br>
						</div>
						<h5>{{ ad.name }}</h5>
						<br>
						Earn <span class="text-primary">GH¢ {{ ad.reward }}</span> per {{ ad.type === "clickable" ? "Click" : "View" }} <br>
						By <b>{{ ad.advertiser }}</b>
						<br>
						<br>
						<router-link :to="`/ads/edit/${ad.type}/${ad.id}`" class="btn btn-primary btn-block abs-btn">Edit Ad</router-link>
						<router-link v-if="ad.status == 'approved'" :to="`/ads/manage/${ad.type}/${ad.id}`" class="btn btn-info btn-block abs-btn">Manage Ad</router-link>
					</vs-card>
				</router-link>
			</vs-col>
		</vs-row>
	</div>
</template>

<script>
export default {
	name: "AdGroup",
	props: ["ads", "loading"],
	data() {
		return {
			// 
		}
	},
	methods: {
		reroute: function(type, id) {
			return this.$router.push(`/ads/${type}/${id}`);
		},
		handleNotificationClick: function(ad) {
			if (ad.clickCount === ad.clickLimit) {
				this.$vs.notify({
					title: 'Error',
					text: `You have reached the click limit for ${ad.name}`,
					color: 'grey',
					position: 'top-right'
				});
			} else {
				this.$router.push(`/ads/manage/${ad.type}/${ad.id}`);
			}
		}
	}
}
</script>