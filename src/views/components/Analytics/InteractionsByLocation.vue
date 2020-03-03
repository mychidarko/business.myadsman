<script>
import { Line } from "vue-chartjs";

export default {
	extends: Line,
	data() {
		return {
			gradient: null,
			gradient2: null
		};
	},
	props: ["data"],
	mounted() {
		this.$vs.loading({ text: "Loading analytics data..." });

		this.gradient = this.$refs.canvas.getContext("2d").createLinearGradient(0, 0, 0, 450);
		this.gradient2 = this.$refs.canvas.getContext("2d").createLinearGradient(0, 0, 0, 450);

		this.gradient.addColorStop(0, "rgba(41, 98, 255, 0.5)");
		this.gradient.addColorStop(0.5, "rgba(41, 98, 255, 0.25)");
		this.gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

		this.gradient2.addColorStop(0, "rgba(0, 231, 255, 0.9)");
		this.gradient2.addColorStop(0.5, "rgba(0, 231, 255, 0.25)");
		this.gradient2.addColorStop(1, "rgba(0, 231, 255, 0)");

		// api call to get ad interactions
		setTimeout(() => {
			let adInteractions = [
				{
					ad_id: 1,
					paid_out: 60,
					interactions: 350
				},
				{
					ad_id: 2,
					paid_out: 15,
					interactions: 200
				},
				{
					ad_id: 5,
					paid_out: 122,
					interactions: 667
				},
				{
					ad_id: 8,
					paid_out: 51,
					interactions: 400
				}
			];

			let labels = [];
			let data1 = [];
			let data2 = [];

			adInteractions.forEach((ad) => {
				labels.push(`Ad #${ad.ad_id}`);
				data1.push(ad.interactions);
				data2.push(ad.paid_out);
			});

			let totalInteractions = {
				label: "Interactions",
				borderColor: "#2962ff",
				pointBackgroundColor: "white",
				borderWidth: 2,
				backgroundColor: this.gradient,
				data: data1
			};

			let expenses = {
				label: "Amount Spent",
				borderColor: "#05CBE1",
				pointBackgroundColor: "white",
				borderWidth: 2,
				backgroundColor: this.gradient2,
				data: data2
			}

			let options = { responsive: true, maintainAspectRatio: false };

			this.renderChart({ labels, datasets: [totalInteractions, expenses] }, options);

			this.$vs.loading.close();
		}, 3000);
	}
};
</script>