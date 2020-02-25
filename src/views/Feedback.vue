<template>
	<div>
		<vs-card>
			<h3 slot="header">Send feedback</h3>
			<form>
				<textarea 
					name="feedback" 
					rows="10" 
					placeholder="Describe your issue or share your ideas" 
					class="form-control abs-input"
					v-model="feedback">
				</textarea>
				<div style="margin-top: 20px !important; margin-bottom: 30px !important;">
					Some account and system information may be sent to Adsman. 
					We will use the information that you give us to help address technical issues and to improve our services, subject to our Privacy Policy and Terms of Service.
				</div>
				<button class="btn btn-primary abs-btn">Send</button>
				<button class="btn btn-default abs-btn" type="reset">Cancel</button>
			</form>
		</vs-card>
	</div>
</template>

<script>
export default {
	name: "Feedback",
	data: function() {
		return {
			feedback: ""
		}
	}
}
</script>
