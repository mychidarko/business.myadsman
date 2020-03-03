<template>
	<div class="controls-container">
		<div class="seek-bar-container">
			<div class="seek-bar" :style="`width: ${playtime}`"></div>
		</div>
		<div class="buttons">
			<button @click="playpause" class="playpause">
				<vs-icon v-if="!playing" icon="play_arrow" class="text-white playpauseicon"></vs-icon>
				<vs-icon v-else icon="pause" class="text-white playpauseicon"></vs-icon>
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "VideoPlayerControls",
	props: ["playpause", "playing", "playtime"]
}
</script>

<style scoped>
.controls-container {
	display: flex !important;
	position: absolute !important;
	bottom: 0 !important;
	width: 100% !important;
	flex-wrap: wrap !important;
	background: rgba(0, 0, 0, 0.7) !important;
	color: white !important;
	transform: translateY(100%) translateY(-5px);
	transition: all 0.3s;
}

.buttons {
	color: white !important;
}

.controls-container button {
	background: none !important;
	border: none !important;
	outline: none !important;
	padding: 8px;
}

.playpauseicon {
	font-size: 25px !important;
	border-radius: 50%;
	border: 2px solid white;
}

.seek-bar-container {
	height: 10px;
	top: 0;
	left: 0;
	width: 100%;
	background: black;
}

.seek-bar {
	height: 10px;
	background: rgb(2, 147, 214) !important;
	width: 2px;
}
</style>
