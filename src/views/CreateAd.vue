<template>
	<vs-row>
		<vs-col vs-xs="12" vs-lg="9" vs-md="9" vs-sm="12">
			<vs-card>
				<h3 slot="header">Your Audience</h3>
				<div>
					<vs-tabs alignment="fixed">
						<vs-tab label="Target a set of people">
							<div class="con-tab-ejemplo">
								<br>
								With this option, your ad will target only a specific group of people, based on gender, location...

								<br>
								<br>
								<h4>Country</h4>
								Select at least one country

								<vs-select data="[label: 'Label', value: 'Value']">
									<option value="something" selected>Something</option>
								</vs-select>

								<h4>Gender</h4>
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
				<h3 slot="header">Select a product to advertise</h3>
				<vs-alert color="#fe5522">You can skip this part if you want to directly enter the ad Information</vs-alert>
				<br>
				<vs-row>
					<vs-col vs-xs="12" vs-sm="6" vs-md="4" vs-lg="3" v-for="(product, index) in products" :key="index" style="padding: 0px 10px 0px 0px;">
						<div class="product-card" v-on:click="loadProduct(product.name, product.description, product.link, product.media)">
							<img :src="product.media" alt="" class="media-placeholder">
							<article>
								<h3>{{ product.name }}</h3>
								<p>
									{{ product.description }}
								</p>
								<a :href="product.link" target="_blank" rel="noopener noreferrer">Learn More</a>
							</article>
						</div>
					</vs-col>
					<vs-col vs-xs="12" vs-sm="6" vs-md="4" vs-lg="3" style="padding: 0px 10px 0px 0px;">
						<div class="product-card" style="height: 100% !important;">
							<router-link to="/products/new" class="new-product">
								<vs-icon>add</vs-icon>
								Add New Product
							</router-link>
						</div>
					</vs-col>
				</vs-row>
			</vs-card>
			<vs-card>
				<h3 slot="header">Your Ad</h3>
				<form @submit.prevent="saveDraft">
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
						<input class="abs-input form-control" placeholder="https://source.unsplash.com/random" v-model="ad.media">
					</div>
					<div class="form-group">
						<label>Ad Decsription</label>
						<textarea class="abs-input form-control" placeholder="Example description" v-model="ad.description"></textarea>
					</div>
					<div class="form-group">
						<label>Ad Type</label>
						<select name="type" class="abs-input abs-select" v-model="ad.type" style="display: block; width: 100%; padding: 10px 15px !important;">
							<option value="clickable">Clickable Ad - An image with a link</option>
							<option value="video">Video Ad - An actual video</option>
						</select>
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
		<vs-col vs-xs="12" vs-lg="3" vs-md="3" vs-sm="12">
			<vs-card>
				<h3 slot="header">Your Audience</h3>
				<div class="audience-body">
					Select the class(es) of people you want your ad to reach. <span>You can select <b>smart ads</b> if you're not sure or <b>random</b> if you want any/everyone to view your ad.</span>
				</div>
			</vs-card>
			<vs-card class="ad-preview">
				<h4 slot="header">Ad Preview</h4>
				<div class="media-placeholder" v-if="!(ad.media.length > 0)">Ad Image</div>
				<img :src="ad.media" :alt="`${ad.name} cover`" v-else>
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
import axios from "axios";
import { API_URL } from "@/common/config";
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
				media: "",
				type: "clickable"
			},
			products: [
				{ name: "Vier Pay", description: "Link your bank, mobile and crypto wallets together", link: "vierpay.net", support: "support@vierpay.net", media: "https://source.unsplash.com/random" },
				{ name: "Spring Cart", description: "Buy, sell and rent items", link: "springcart.org", support: "support@springcart.org", media: "https://source.unsplash.com/random" },
			],
			advertiser: {
				name: Business.get("name")
			}
		}
	},
	methods: {
		loadProduct: function(name, description, link, media) {
			this.ad = {
				name, description, link, media
			}
			this.$vs.notify({
				text: `${name} details have been added successfully`,
				color: "#0ccf2f"
			});
		},
		saveDraft: function() {
			this.loading = true;
			this.$vs.loading({ text: "Saving your ad information..." });

			let data = this.ad;
			data.advertiser = Business.get("name");

			axios({ url: `${API_URL}/business/ads/new`, method: "post", data, headers: { Authorization: `Bearer ${Business.get("token")}` } })
				.then((res) => {
					if (res.data.error && res.data.error == "Expired token") {
						this.resfreshToken();
					} else {
						if (res.data.id) {
							this.$vs.notify({
								title: "Draft Saved",
								text: `${this.ad.name} saved successfully, add your payment information to go live.`,
								color: "#0ccf2f",
								time: 7000
							});
							this.loading = false;
							this.$vs.loading.close();
						}
					}
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
		},
		resfreshToken: function() {
			axios.get(`${API_URL}/business/${Business.get("id")}/token/refresh`)
				.then((res) => {
					let user = Business.get();
					user.token = res.data.token;
					Business.save(user);

					this.saveDraft();
				});
		}
	}
}
</script>

<style scoped>
vs-card {
	margin-bottom: 20px !important;
}

.media-placeholder {
	background: grey !important;
	width: 100% !important;
	height: 150px !important;
	color: white !important;
	display: flex !important;
	justify-content: center !important;
	align-items: center !important;
}

.product-card {
	border: 1px solid grey;
	cursor: pointer;
	border-radius: 2px;
	padding: 10px;
}

.product-card > article {
	margin-top: 5px;
}

.new-product {
	height: 100% !important;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
</style>