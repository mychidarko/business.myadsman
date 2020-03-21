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
export default {
	name: "CreateProduct",
	data: function() {
		return {
			product: {
				name: "",
				description: "",
				link: "",
				support: "",
				image: ""
			}
		}
	}
}
</script>
