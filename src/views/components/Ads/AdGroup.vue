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
							<img :src="ad.media" :alt="`${ad.name} thumbnail`" style="width: 100%; height: 200px; cursor: pointer;">
							<br><br>
						</div>
						<div v-else style="text-align: center;">
							<video :src="ad.media" :alt="`${ad.name} thumbnail`" style="width: 100%; height: 200px; cursor: pointer; margin-bottom: 12px !important;" />
							<br>
						</div>
						<h5>{{ ad.name }}</h5>
						<br>
						<div v-if="ad.reward.length === 0" style="color: red;">Awaiting payment info</div>
						<div v-else>Earn <span class="text-primary">GH¢ {{ ad.reward }}</span> per {{ ad.type === "clickable" ? "Click" : "View" }}</div>
						<br>
						By <b>{{ ad.advertiser }}</b>
						<br>
						<br>
						<router-link :to="`/ads/edit/${ad.type}/${ad.id}`" class="btn btn-primary btn-block abs-btn">Edit Ad</router-link>
						<router-link v-if="ad.status == 'approved'" :to="`/ads/manage/${ad.type}/${ad.id}`" class="btn btn-info btn-block abs-btn">Manage Ad</router-link>
						<button class="btn btn-danger btn-block abs-btn" @click="deleteAd(ad.id, ad.name)">Delete Ad</button>
					</vs-card>
				</router-link>
			</vs-col>
		</vs-row>
	</div>
</template>

<script>
import axios from "axios";
import { API_URL } from "@/common/config";
import Business from "@/common/storage.user";

export default {
	name: "AdGroup",
	props: ["ads", "loading", "reloadAds"],
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
		},
		deleteAd: function(id, name) {
			this.$vs.dialog({
				title: "Delete?",
				text: `Are you sure you want to delete ${name}?`,
				color: "danger",
				accept: () => {
					this.$vs.loading({ text: "Deleting ad..."});
					axios({ url: `${API_URL}/business/ads/delete/${id}`, method: "get", headers: {Authorization: `Bearer ${Business.get("token")}`} })
						.then((res) => {
							if (res.data.error && res.data.error == "Expired token") {
								this.resfreshToken();
							} 
							if (!res.data.error) {
								if (this.reloadAds) {
									this.reloadAds();
								}
								this.$vs.notify({
									text: `${name} has been sucessfully deleted`,
									position: "top-right",
									color: "success",
									time: 5000
								});
								this.$vs.loading.close();
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

							this.$vs.loading.close();
						});
				}
			});
		},
		resfreshToken: function() {
			axios.get(`${API_URL}/business/${Business.get("id")}/token/refresh`)
				.then((res) => {
					let user = Business.get();
					user.token = res.data.token;
					Business.save(user);

					window.location.reload();
				});
		}
	}
}
</script>