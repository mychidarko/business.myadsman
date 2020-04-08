<template>
	<vs-row>
		<vs-col vs-xs="12" vs-lg="9" vs-md="9" vs-sm="6">
			<vs-card>
				<h3 slot="header">Your Audience</h3>
				<div>
					<vs-tabs alignment="fixed">
						<vs-tab label="Target a set of people">
							<div class="con-tab-ejemplo">
								This is for a specific set of people
							</div>
						</vs-tab>
						<vs-tab label="Anything Goes">
							<div class="con-tab-ejemplo">
								Anything goes
							</div>
						</vs-tab>
						<vs-tab label="Smart Targeting">
							<div class="con-tab-ejemplo">
								Leave your ads management to Adsman
							</div>
						</vs-tab>
					</vs-tabs>
				</div>
			</vs-card>
			<vs-card>
				<h3 slot="header">Your Ad</h3>
				<form>
					<div class="form-row">
						<div class="form-group col-md-6 col-sm-12 col-lg-6 col-12">
							<label>Ad Name</label>
							<input class="abs-input form-control" placeholder="Myadsman" v-model="ad.name">
						</div>
						<div class="form-group col-md-6 col-sm-12 col-lg-6 col-12">
							<label>Ad Link</label>
							<input class="abs-input form-control" placeholder="https://app.myadsman.com" v-model="ad.link">
						</div>
					</div>
					<div class="form-group">
						<label>Ad Image <b>Link</b></label>
						<input class="abs-input form-control" placeholder="https://source.unsplash.com/random" v-model="ad.image">
					</div>
					<div class="form-group">
						<label>Ad Decsription</label>
						<textarea class="abs-input form-control" placeholder="Example description" v-model="ad.description"></textarea>
					</div>
					<button type="submit" class="btn btn-primary abs-btn">Save Ad Information</button>
				</form>
			</vs-card>
			<vs-card>
				<h3 slot="header">Payment Info</h3>
				<p>
					Payment for the ads
				</p>
			</vs-card>
		</vs-col>
		<vs-col vs-xs="12" vs-lg="3" vs-md="3" vs-sm="6">
			<vs-card>
				<h3 slot="header">Your Audience</h3>
				<div class="audience-body">
					Select the class(es) of people you want your ad to reach. <span>You can select <b>smart ads</b> if you're not sure or <b>random</b> if you want any/everyone to view your ad.</span>
				</div>
			</vs-card>
			<vs-card class="ad-preview">
				<h4 slot="header">Ad Preview</h4>
				<div class="image-placeholder" v-if="!(ad.image.length > 0)">Ad Image</div>
				<img :src="ad.image" :alt="`${ad.name} cover image`" v-else>
				<br>
				<h3>
					<a :href="`${ad.link}?ref=adsman`" target="_blank" rel="adsman" v-if="ad.name.length > 0">{{ ad.name }}</a>
					<a href="" v-else>Ad Name</a>
				</h3>
				<p v-if="ad.description.length > 0">{{ ad.description }}</p>
				<p v-else>Ad Description</p>
				<p>By <b>{{ advertiser.name }}</b></p>
			</vs-card>
		</vs-col>
	</vs-row>
</template>

<script>
import Business from "@/common/storage.user";

export default {
	name: "CreateAd",
	data: function() {
		return {
			loading: true,
			ad: {
				name: "",
				description: "",
				link: "",
				image: ""
			},
			advertiser: {
				name: Business.get("name")
			}
		}
	},
	methods: {
		loadProduct: function(name, description, link, support, image) {
			this.product = {
				name, description, link, support, image
			};
		}
	}
}
</script>

<style scoped>
vs-card {
	margin-bottom: 20px !important;
}

.image-placeholder {
	background: grey !important;
	width: 100% !important;
	height: 150px !important;
	color: white !important;
	display: flex !important;
	justify-content: center !important;
	align-items: center !important;
}
</style>