const key = "business_app_user";

export function get(selector) {
	return selector ? JSON.parse(window.localStorage.getItem(key))[selector] : JSON.parse(window.localStorage.getItem(key));
}

export function save(companyTag, email, company) {
	window.localStorage.setItem(key, JSON.stringify({ companyTag, email, company }));
}

export function remove() {
	window.localStorage.removeItem(key);
}

export default { get, save, remove };