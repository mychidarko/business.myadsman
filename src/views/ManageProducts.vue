<template>
	<div>
		<section v-if="pending.length > 0">
			<div class="section-info">
				<h4>Pending Products</h4>
				<span>Products being vetted by Adsman</span>
			</div>
			<ProductGroup :loading="loading" :products="pending" :reload="loadPending" />
		</section>
		<section v-if="drafts.length > 0">
			<div class="section-info">
				<h4>Drafts</h4>
				<span>These products haven't been submitted to Adsman</span>
			</div>
			<ProductGroup :loading="loading" :products="drafts" :reload="loadDrafts" />
		</section>
		<section class="final-section">
			<div class="section-info">
				<h4>Approved Products</h4>
				<span>Products certified by Adsman</span>
			</div>
			<ProductGroup :loading="loading" :products="approved" :reload="loadApproved" />
		</section>
	</div>
</template>

<script>
import axios from 'axios';
import { API_URL } from "@/common/config";
import Business from "@/common/storage.user";
import ProductGroup from './components/Products/ProductGroup';

export default {
	name: "ManageProducts",
	data: function() {
		return {
			approved: [],
			drafts: [],
			pending: [],
			loading: true
		}
	},
	mounted: function() {
		this.$vs.loading({ text: "Loading Products..." });

		this.loadDrafts();
		this.loadPending();
		this.loadApproved();
	},
	methods: {
		loadDrafts: function() {
			axios({ url: `${API_URL}/business/products/draft`, method: "get", headers: { "Authorization": `Bearer ${Business.get("token")}` } })
				.then((res) => {
					if (res.data.error && res.data.error == "Expired token") {
						Business.refreshToken(this.loadDrafts)
					} else if (res.data.error && res.data.error != "Expired token") {
						this.$vs.notify({
							title: "An Error Occured",
							text: res.data.error,
							position: "top-right",
							color: "danger"
						});
					} else {
						this.drafts = res.data;
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
				});
		},
		loadPending: function() {
			axios({ url: `${API_URL}/business/products/pending`, method: "get", headers: { "Authorization": `Bearer ${Business.get("token")}` } })
				.then((res) => {
					if (res.data.error && res.data.error == "Expired token") {
						Business.refreshToken(this.loadPending)
					} else if (res.data.error && res.data.error != "Expired token") {
						this.$vs.notify({
							title: "An Error Occured",
							text: res.data.error,
							position: "top-right",
							color: "danger"
						});
					} else {
						this.pending = res.data;
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
				});
		},
		loadApproved: function() {
			axios({ url: `${API_URL}/business/products/approved`, method: "get", headers: { "Authorization": `Bearer ${Business.get("token")}` } })
				.then((res) => {
					if (res.data.error && res.data.error == "Expired token") {
						Business.refreshToken(this.loadApproved)
					} else if (res.data.error && res.data.error != "Expired token") {
						this.$vs.notify({
							title: "An Error Occured",
							text: res.data.error,
							position: "top-right",
							color: "danger"
						});
					} else {
						this.approved = res.data;
					}
					this.loading = false;
					this.$vs.loading.close();
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
		}
	},
	components: { ProductGroup }
}
</script>

<style scoped>
.section-info {
	padding-left: 15px !important;
	margin-bottom: 10px !important;
}

section {
	margin-bottom: 20px !important;
}

.final-section {
	margin-bottom: 0px !important;
}

@media only screen and (max-width: 550px) {
	.section-info {
		padding-left: 0px !important;
	}
}
</style>