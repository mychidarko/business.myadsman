import axios from "axios";
import { API_URL } from '@/common/config';

function $ads(email, password) {
	axios({
		method: "post",
		url: `${API_URL}/business/`,
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

export default { $ads };