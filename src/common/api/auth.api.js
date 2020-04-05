import axios from "axios";
import { API_URL } from '@/common/config';

function $login(email, password) {
	axios({
		method: "post",
		url: `${API_URL}/business/auth/login`,
		headers: { "Content-Type": "application/json" },
		data: JSON.stringify({
			email, password
		})
	})
	.then((res) => {
		return [true, res.data];
	})
	.catch((err) => {
		return [false, err];
	});
}

function $register(business_name, business_tag, email, position, password) {
	axios({
		method: "post",
		url: `${API_URL}/business/auth/register`,
		headers: { "Content-Type": "application/json" },
		data: JSON.stringify({
			business_name, business_tag, email, position, password
		})
	})
	.then((res) => {
		return [true, res.data];
	})
	.catch((err) => {
		return [false, err];
	});
}

export default { $login, $register };

// let $login = new Promise((email, password) => {
	// axios({
	// 	method: "post",
	// 	url: `${API_URL}/auth/login`,
	// 	headers: { "Content-Type": "application/json" },
	// 	data: JSON.stringify({
	// 		email, password
	// 	})
	// })
// });