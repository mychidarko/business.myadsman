<template>
	<vs-row>
		<vs-col vs-xs="12">
			<vs-card>
				<h3 slot="header">Your Product</h3>
				<div class="product-body">
					<p>This is the product you wish to advertise, you can select the product you wish to add or manually enter the product information</p>
					<br>
					<h5>Enter Product Details</h5>
					<form>
						<div class="form-row">
							<div class="form-group col-md-6 col-sm-12 col-lg-6 col-12">
								<label>Product Name</label>
								<input class="abs-input form-control" placeholder="Myadsman" v-model="product.name">
							</div>
							<div class="form-group col-md-6 col-sm-12 col-lg-6 col-12">
								<label>Product Link</label>
								<input class="abs-input form-control" placeholder="https://app.myadsman.com" v-model="product.link">
							</div>
						</div>
						<div class="form-row">
							<div class="form-group col-md-6 col-sm-12 col-lg-6 col-12">
								<label>Product Image Link</label>
								<input class="abs-input form-control" placeholder="https://site.com/image.jpg" v-model="product.image">
							</div>
							<div class="form-group col-md-6 col-sm-12 col-lg-6 col-12">
								<label>Product Support Link/Mail</label>
								<input class="abs-input form-control" placeholder="support@myadsman.com" v-model="product.support">
							</div>
						</div>
						<div class="form-group">
							<label>Product Decsription</label>
							<textarea class="abs-input form-control" placeholder="Example description" v-model="product.description"></textarea>
						</div>
					</form>
				</div>
			</vs-card>
		</vs-col>
	</vs-row>
</template>

<script>
import axios from "axios";
import Business from "@/common/storage.user";
import { API_URL } from "@/common/config";

export default {
	name: "CreateProduct",
	data: function() {
		return {
			product: {
				name: "",
				description: "",
				image: "",
				link: "",
				support: ""
			},
			errors: [],
			loading: false
		}
	},
	methods: {
		addProduct: function() {
			if (!this.validate()) return;

			let data = JSON.stringify({
				name: this.product.name,
				description: this.product.description,
				image: this.product.image,
				link: this.product.link,
				support: this.product.support
			});

			axios({ url: `${API_URL}/business/product/new`, method: "post", data, headers: { "Authorization": `Bearer ${Business.get("token")}`} })
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
					} else if (res.data.id) {
						this.$vs.notify({
							title: "Draft Saved",
							text: `${this.product.name} has been saved as a draft`,
							position: "top-right",
							color: "success"
						});

						this.product = { name: "", description: "", image: "", link: "", support: "" };
					}
				})
		},
		validate: function() {
			let isValid = true;

			if (this.product.name.length === 0) {
				this.errors.push("Product Name Is Required");
				isValid = false;
			}

			if (this.product.description.length === 0) {
				this.errors.push("Product Description Is Required");
				isValid = false;
			}

			return isValid;
		}
	}
}
</script>
