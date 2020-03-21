<template>
	<div>
		<div v-if="loading">Loading...</div>
		<div v-else>
			<vs-alert>Hello</vs-alert>
			<br>
			<vs-card>
				<div slot="header">Edit Ad</div>
				<div class="form-row">
					<div class="form-group col-md-6 col-lg-6 col-sm-12 col-xs-12">
						<label>Ad Name</label>
						<input type="text" class="form-control abs-input" placeholder="Click to earn" v-model="ad.name">
					</div>
					<div class="form-group col-md-6 col-lg-6 col-sm-12 col-xs-12">
						<label>Ad Link</label>
						<input type="text" class="form-control abs-input" placeholder="https://app.myadsman.com" v-model="ad.link">
					</div>
				</div>
				<div class="form-group">
					<label>Ad Description</label>
					<textarea type="text" class="form-control abs-input" placeholder="Click on ads and watch videos to earn cash" v-model="ad.description"></textarea>
				</div>
			</vs-card>
		</div>
	</div>
</template>

<script>
export default {
	name: "EditClickableAd",
	data: function() {
		return {
			ad: {},
			loading: true
		}
	},
	mounted: function() {
		this.$vs.loading({ text: "Loading Ad Information..." });

		let id = this.$route.params.id;

		setTimeout(() => {
			let ad = {
				id,
				type: "clickable",
				name: "The future of payments",
				advertiser: "Portal Network",
				description: "Link all your wallets together with Portal Online, send and receive cash, pay your bills and keep track of your cash.",
				link: "https://example.com",
				reward: 0.2
			};

			this.ad = ad;
			this.loading = false;

			this.$vs.loading.close();
		}, 3000);
	}
}
</script>