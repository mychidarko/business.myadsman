const key = "business_app_user";

export function get(selector = null) {
	return selector ? JSON.parse(window.localStorage.getItem(key))[selector] : JSON.parse(window.localStorage.getItem(key));
}

export function save(companyTag, email, company, position) {
	window.localStorage.setItem(key, JSON.stringify({ companyTag, email, company, position }));
}

export function remove() {
	window.localStorage.removeItem(key);
}

export default { get, save, remove };