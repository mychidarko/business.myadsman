<template>
	<div class="abs-center-center auth-page">
		<vs-card class="auth-card" style="margin-top: 2.5% !important; min-width: 300px;">
			<h3 class="abs-fw-normal">Register Your Business</h3>
			<form class="text-left" v-on:submit.prevent="register">
				<div class="form-row" style="margin-left: 0px;">
					<div class="form-group col-md-6 col-sm-6 col-12">
						<label for="businessName">Business Name</label>
						<input type="text" id="businessName" :class="businessNameClass" placeholder="Adsman LLC" v-model="businessName">
						<div class="abs-input-error form-error">{{ businessNameError }}</div>
					</div>
					<div class="form-group col-md-6 col-sm-6 col-12">
						<label for="businessTag">Business Tag</label>
						<input type="text" id="businessTag" :class="businessTagClass" placeholder="adsman-llc" v-model="businessTag">
						<div class="abs-input-error form-error">{{ businessTagError }}</div>
					</div>
				</div>
				<div class="form-group">
					<label for="email">Your Business Email</label>
					<input type="text" id="email" :class="emailClass" placeholder="mychi@myadsman.com" v-model="email">
					<div class="abs-input-error form-error">{{ emailError }}</div>
				</div>
				<div class="form-group">
					<label for="position">{{ businessName.length >= 4 ? `Your position at ${businessName}` : "Your Position" }}</label>
					<input type="text" id="position" :class="positionClass" placeholder="C.E.O/Owner" v-model="position">
					<div class="abs-input-error form-error">{{ positionError }}</div>
				</div>
				<div class="form-group">
					<label for="password">Password</label>
					<input type="password" id="password" :class="passwordClass" placeholder="*******" v-model="password">
					<div class="abs-input-error form-error">{{ passwordError }}</div>
				</div>
				<div class="form-group">
					<label for="confirmPassword">Confirm Password</label>
					<input type="password" id="confirmPassword" class="form-control abs-input" placeholder="*******" v-model="confirmPassword">
				</div>
				<button type="submit" class="abs-btn btn btn-block abs-btn-primary" :disabled="loading">
					{{ loading ? "Creating your account..." : "Register"  }}
				</button>
			</form>
			<div class="tips">
				Already have an account? <router-link to="/auth/login" class="abs-shadow-link">Sign In</router-link>
			</div>
		</vs-card>
	</div>
</template>

<script>
import axios from "axios";
import { API_URL } from '@/common/config';
import { REGISTER } from "@/store/actions.type";

export default {
	name: "Register",
	data() {
		return {
			loading: false,
			businessName: "",
			businessNameError: "",
			businessNameClass: "form-control abs-input",
			businessTag: "",
			businessTagError: "",
			businessTagClass: "form-control abs-input",
			position: "",
			positionError: "",
			positionClass: "form-control abs-input",
			email: "",
			emailError: "",
			emailClass: "form-control abs-input",
			password: "",
			passwordError: "",
			passwordClass: "form-control abs-input",
			confirmPassword: "",
			confirmPasswordError: "",
			confirmPasswordClass: "form-control abs-input"
		}
	},
	methods: {
		register: function() {
			let email = this.email;
			let position = this.position;
			let business = this.businessName;
			let business_tag = this.businessTag;
			let password = this.password;

			if (this.validate()) {
				this.loading = true;
				this.$vs.loading({ text: "Creating your account..." });

				axios({
					method: "post",
					url: `${API_URL}/business/auth/register`,
					headers: { "Content-Type": "application/json" },
					data: JSON.stringify({
						business, business_tag, email, position, password
					})
				})
					.then((res) => {
						if (res.data.code && res.data.code == 404) {
							this.$vs.notify({
								title: "Server Error",
								text: "Login is down temporarily, please try again after a while. We're sorry for the inconvienience.",
								position: "top-right",
								color: "danger"
							});
						}

						if (res.data.error && res.data.error.auth) {
							this.passwordClass = "form-control abs-input abs-red-border";
							this.passwordError = res.data.error.auth;
						}

						if (res.data.error && res.data.error.name) {
							this.businessNameClass = "form-control abs-input abs-red-border";
							this.businessNameError = res.data.error.name;
						}

						if (res.data.error && res.data.error.business_tag) {
							this.businessTagClass = "form-control abs-input abs-red-border";
							this.businessTagError = res.data.error.business_tag;
						}

						if (res.data.error && res.data.error.employee_position) {
							this.positionClass = "form-control abs-input abs-red-border";
							this.positionError = res.data.error.employee_position;
						}

						if (res.data.error && res.data.error.employee_email) {
							this.emailClass = "form-control abs-input abs-red-border";
							this.emailError = res.data.error.employee_email;
						}
						
						if (!res.data.error) {
							this.$store
								.dispatch(REGISTER, res.data)
								.then(() => {
									this.loading = false;
									return this.$router.push({ name: "Dashboard" })
								});
						}

						this.loading = false;
						this.$vs.loading.close();
					})
					.catch((err) => {
						let errors = String(err).split(" ");
						let errs = "";

						for (let index = 0; index < errors.length; index++) {
							const error = errors[index];
							if (index > 0) {
								errs = `${errs} ${error} `;
							}
						}
						
						this.$vs.notify({
							title: "Error",
							text: errs,
							position: "top-right",
							color: "danger"
						});

						this.loading = false;
						this.$vs.loading.close();
					});
			}
		},
		validate: function() {
			let isEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			let isBusinessEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

			if (this.businessName.length == 0) {
				this.businessNameClass = "form-control abs-input abs-red-border";
				this.businessNameError = "Enter your business name";
				return false;
			} else if (this.businessName.length > 0 && this.businessName.length < 4) {
				this.businessNameClass = "form-control abs-input abs-red-border";
				this.businessNameError = "Must be at least 4 chars";
				return false;
			} else {
				this.businessNameClass = "form-control abs-input";
				this.businessNameError = "";
			}

			if (this.businessTag.length == 0) {
				this.businessTagClass = "form-control abs-input abs-red-border";
				this.businessTagError = "Enter a business tag";
				return false;
			} else if (this.businessTag.length > 0 && this.businessTag.length < 4) {
				this.businessTagClass = "form-control abs-input abs-red-border";
				this.businessTagError = "Must be at least 4 chars";
				return false;
			} else {
				this.businessTagClass = "form-control abs-input";
				this.businessTagError = "";
			}

			if (!isEmail.test(this.email) || this.email.length < 8) {
				this.emailClass = "form-control abs-input abs-red-border";
				this.emailError = "Please enter a valid email";
				return false;
			} else if (!isBusinessEmail.test(this.email)) {
				this.emailClass = "form-control abs-input abs-red-border";
				this.emailError = "Must be a business email";
				return false;
			} else {
				this.emailClass = "form-control abs-input";
				this.emailError = "";
			}

			if (this.position.length == 0) {
				this.positionClass = "form-control abs-input abs-red-border";
				this.positionError = "Enter your job title";
				return false;
			} else {
				this.positionClass = "form-control abs-input";
				this.positionError = "";
			}

			if (this.password.length < 8) {
				this.passwordClass = "form-control abs-input abs-red-border";
				this.passwordError = "Please enter a valid password";
				return false;
			} else if (this.password !== this.confirmPassword) {
				this.passwordClass = "form-control abs-input abs-red-border";
				this.passwordError = "Passwords don't match";
				return false;
			} else {
				this.passwordClass = "form-control abs-input";
				this.passwordError = "";
			}

			return true;
		}
	}
}
</script>