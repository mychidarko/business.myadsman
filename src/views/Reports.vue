<template>
	<div>
		<div v-if="!hasSmartReports">
			<vs-alert title="Try Smart Reports" color="rgb(50, 76, 99)" :active.sync="smartReportAlertActive" closable close-icon="cancel">
				<div class="smart-alert-text">
					Smart Reports prioritise information which is relevant to your business and highlights how to increase the interaction with your ads. 
					<router-link to="/reports/smart">Sign up now</router-link>
				</div>
			</vs-alert>
			<div v-if="smartReportAlertActive"><br></div>
		</div>
		<div>
			<h3>General Reports</h3>
			<GeneralReport />
		</div>
		<br>
		<div>
			<h3>Your Top Ads Reports</h3>
			<TopAds />
		</div>
		<br>
		<div>
			<h3>Users Report</h3>
			<GeneralReport />
		</div>
		<br>
		<div>
			<h3>Location Report</h3>
			<GeneralReport />
		</div>
	</div>
</template>

<script>
import GeneralReport from "./components/reports/GeneralReport";
import TopAds from "./components/reports/TopAds";

export default {
	name: "Reports",
	data() {
		return {
			reports: [],
			hasSmartReports: false,
			smartReportAlertActive: !this.hasSmartReports
		}
	},
	components: {
		GeneralReport,
		TopAds
	},
	mounted() {
		let testData = {
			hasSmartReports: false,
			reports: []
		};
		this.reports = testData.reports;
		this.hasSmartReports = testData.hasSmartReports;
	}
}
</script>

<style scoped>
.smart-alert-text {
	margin-top: 10px !important;
	margin-bottom: 10px !important;
}
</style>
