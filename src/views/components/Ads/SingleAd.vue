<template>
	<div>
		<img v-if="ad.img" :src="ad.img" alt="" class="image">
		<video v-if="ad.video" :src="ad.video" class="video"></video>
		<router-link :to="`/ads/manage/${ad.type}/${ad.id}`" class="title">{{ ad.name }}</router-link>
		<p>
			{{ ad.description }}
			<br>
			<b>Ad by {{ ad.advertiser }}</b>
		</p>
	</div>
</template>

<script>
export default {
	name: "SingleAd",
	props: ["ad"]
}
</script>

<style scoped>
.title {
	font-size: 22px !important;
	font-weight: bold !important;
}
</style>