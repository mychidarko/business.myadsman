<template>
	<div>
		<vs-row v-if="loading">
			<vs-col vs-lg="12">
				Loading Products...
			</vs-col>
		</vs-row>
		<vs-row v-else>
			<vs-col v-if="products.length === 0" style="margin: 20px 0px !important;" vs-sm="12" vs-lg="12" vs-md="12">
				There are currently no products at the moment
			</vs-col>
			<vs-col v-else vs-lg="3" vs-sm="6" vs-xs="12" code-toggler v-for="(product, index) in products" :key="index">
				<h2>{{ product.name }}</h2>
				<p>{{ product.description }}</p>
			</vs-col>
		</vs-row>
	</div>
</template>

<script>
export default {
	name: "ProductGroup",
	props: ["loading", "reload", "products"]
}
</script>