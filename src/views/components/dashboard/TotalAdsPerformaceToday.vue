<script>
import { Bar } from "vue-chartjs";

export default {
	extends: Bar,
	mounted() {
		setTimeout(() => {
			let adInteractions = [
				{
					ad_id: 1,
					paid_out: 30,
					interactions: 150,
					date: "26th February, 2020"
				},
				{
					ad_id: 2,
					paid_out: 31.5,
					interactions: 144,
					date: "26th February, 2020"
				},
				{
					ad_id: 5,
					paid_out: 100,
					interactions: 367,
					date: "26th February, 2020"
				},
				{
					ad_id: 8,
					paid_out: 10,
					interactions: 20,
					date: "26th February, 2020"
				}
			];

			let labels = [];
			let data = [];
			let data2 = [];

			adInteractions.forEach((ad) => {
				labels.push(`Ad #${ad.ad_id}`);
				data.push(ad.interactions);
				data2.push(ad.paid_out);
			});

			let datasets = [
				{
					label: "Interactions",
					backgroundColor: "#2962ff",
					data
				},
				{
					label: "GH¢ Spent",
					backgroundColor: "#671299",
					data: data2
				}
			];

			let graphOptions = { 
				responsive: true, 
				maintainAspectRatio: false, 
				scales: { 
					xAxes: [{ 
						barThickness: 7 
					}] 
				}
			};
			
			this.renderChart({ labels, datasets }, graphOptions);
		}, 3000);
	}
};
</script>
