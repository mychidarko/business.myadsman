<template>
	<div>
		<div v-if="loading">Loading Analytics...</div>
		<div v-else>
			<vs-card>
				<div slot="header">Interactions By Location</div>
				<InteractionsByLocation :data="analytics.location" />
			</vs-card>
		</div>
	</div>
</template>

<script>
import InteractionsByLocation from './components/Analytics/InteractionsByLocation';

export default {
	name: "AdAnalytics",
	components: {
		InteractionsByLocation
	},
	data: function() {
		return {
			ad: {},
			advertiser: {},
			analytics: {},
			loading: true
		}
	},
	mounted: function() {
		let type = this.$route.params.type;
		let id = this.$route.params.id;

		this.$vs.loading({ text: "Loading Ad Analytics..." });

		setTimeout(() => {
			let ad = {
				id, type,
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
		}, 3000);
	}
}
</script>