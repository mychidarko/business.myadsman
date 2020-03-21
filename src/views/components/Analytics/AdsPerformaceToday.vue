<script>
import { Bar } from "vue-chartjs";

export default {
	extends: Bar,
	props: ["data"],
	mounted() {
		let labels = [];
		let data = [];
		let data2 = [];
		let data3 = [];

		this.data.forEach((ad) => {
			labels.push(ad.ad);
			data.push(ad.impressions);
			data2.push(ad.reach);
			data3.push(ad.interactions);
		});

		let datasets = [
			{
				label: "Impressions",
				backgroundColor: "#49c26f",
				data
			},
			{
				label: "Reach",
				backgroundColor: "#c0cf09",
				data: data2
			},
			{
				label: "Interactions",
				backgroundColor: "#b03f09",
				data: data3
			}
		];

		let graphOptions = { 
			responsive: true, 
			maintainAspectRatio: false, 
			scales: { 
				xAxes: [{ 
					barThickness: 10
				}] 
			}
		};
		
		this.renderChart({ labels, datasets }, graphOptions);
	}
};
</script>
