<script>
import { Line } from "vue-chartjs";

export default {
	extends: Line,
	data() {
		return {
			gradient: null,
			gradient2: null,
			gradient3: null
		};
	},
	props: ["data"],
	mounted() {
		this.gradient = this.$refs.canvas.getContext("2d").createLinearGradient(0, 0, 0, 450);
		this.gradient2 = this.$refs.canvas.getContext("2d").createLinearGradient(0, 0, 0, 450);
		this.gradient3 = this.$refs.canvas.getContext("2d").createLinearGradient(0, 0, 0, 450);

		this.gradient.addColorStop(0, "rgba(41, 98, 255, 0.5)");
		this.gradient.addColorStop(0.5, "rgba(41, 98, 255, 0.25)");
		this.gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

		this.gradient2.addColorStop(0, "rgba(33, 190, 255, 0.7)");
		this.gradient2.addColorStop(0.5, "rgba(10, 190, 255, 0.25)");
		this.gradient2.addColorStop(1, "rgba(5, 190, 255, 0)");

		this.gradient3.addColorStop(0, "rgba(200, 98, 255, 1)");
		this.gradient3.addColorStop(0.5, "rgba(99, 98, 255, 0.3)");
		this.gradient3.addColorStop(1, "rgba(255, 33, 33, 0)");

		let labels = [];
		let data1 = [];
		let data2 = [];
		let data3 = [];

		this.data.forEach((action) => {
			labels.push(action.date);
			data1.push(action.impressions);
			data2.push(action.reach);
			data3.push(action.interactions);
		});

		let impressions = {
			label: "Impressions",
			borderColor: "#2962ff",
			pointBackgroundColor: "white",
			borderWidth: 2,
			backgroundColor: this.gradient,
			data: data1
		};

		let reach = {
			label: "Reach",
			borderColor: "#05CBE1",
			pointBackgroundColor: "white",
			borderWidth: 2,
			backgroundColor: this.gradient2,
			data: data2
		}

		let interactions = {
			label: "Interactions",
			borderColor: "#925511",
			pointBackgroundColor: "white",
			borderWidth: 2,
			backgroundColor: this.gradient3,
			data: data3
		}

		let options = { responsive: true, maintainAspectRatio: false };

		this.renderChart({ labels, datasets: [impressions, reach, interactions]}, options);
	}
};
</script>