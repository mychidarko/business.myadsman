<template>
	<div class="abs-center-center auth-page">
		<vs-card class="auth-card">
			<img src="@/assets/logo.png" alt="Logo" class="logo" />
			<h3 class="abs-fw-normal">Login</h3>
			<form class="text-left" v-on:submit.prevent="login">
				<div class="form-group">
					<label for="email">Email</label>
					<input type="text" id="email" :class="emailClass" placeholder="mickdd22@gmail.com" v-model="email">
					<div class="abs-input-error form-error">{{ emailError }}</div>
				</div>
				<div class="form-group">
					<label for="password">Password</label>
					<input type="password" id="password" :class="passwordClass" placeholder="*******" v-model="password">
					<div class="abs-input-error form-error">{{ passwordError }}</div>
				</div>
				<button type="submit" class="abs-btn btn btn-block abs-btn-primary" :disabled="loading">
					{{ loading ? "Loading your account..." : "LOGIN" }}
				</button>
			</form>
			<div class="tips">
				Don't have an account? <router-link to="/auth/register" class="abs-shadow-link">Sign Up</router-link>
				<br><br>
				<router-link to="/auth/forgot-password" class="abs-shadow-link">Forgot your password?</router-link>
			</div>
		</vs-card>
	</div>
</template>

<script>
import { LOGIN } from "@/store/actions.type";
import auth from "@/common/api/auth.api";

export default {
	name: "Login",
	data() {
		return {
			loading: false,
			email: "",
			emailError: "",
			emailClass: "form-control abs-input",
			password: "",
			passwordError: "",
			passwordClass: "form-control abs-input"
		}
	},
	methods: {
		login: function() {
			let email = this.email;
			let password = this.password;

			if (this.validate()) {
				this.loading = true;
				this.$vs.loading({ text: "Loading your account..." });

				let user = auth.$login(email, password);
				
				if (user[0] == false) {
					let errors = String(user[1]).split(" ");
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
				} else {
					if (user[1].error && !user[1].error.auth) {
						this.emailClass = "form-control abs-input abs-red-border";
						this.emailError = user[1].error;
					} else if (user[1].error && user[1].error.auth) {
						this.emailClass = "form-control abs-input abs-red-border";
						this.emailError = user[1].error.auth;
					} else {
						this.$store
						.dispatch(LOGIN, user[1])
						.then(() => {
							this.loading = false;
							return this.$router.push({ name: "Dashboard" })
						});
					}

					this.loading = false;
					this.$vs.loading.close();
				}
			}
		},
		validate: function() {
			let isEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			let isBusinessEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

			if (this.password.length < 8) {
				this.passwordClass = "form-control abs-input abs-red-border";
				this.passwordError = "Please enter a valid password";
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