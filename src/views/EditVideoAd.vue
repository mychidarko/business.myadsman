<template>
	<div>
		Edit Video Ad
	</div>
</template>

<script>
export default {
	name: "EditVideoAd",
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
				type: "video",
				name: "The future of payments",
				advertiser: "Portal Network",
				description: "Link all your wallets together with Portal Online, send and receive cash, pay your bills and keep track of your cash.",
				reward: 0.2
			};

			this.ad = ad;
			this.loading = false;

			this.$vs.loading.close();
		}, 3000);
	}
}
</script>