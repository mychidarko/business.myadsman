import { USER_STORAGE_KEY } from "./config";
const key = USER_STORAGE_KEY;

export function get(selector = null) {
	return selector ? JSON.parse(window.localStorage.getItem(key))[selector] : JSON.parse(window.localStorage.getItem(key));
}

export function save(user) {
	window.localStorage.setItem(key, JSON.stringify(user));
}

export function remove() {
	window.localStorage.removeItem(key);
}

export default { get, save, remove };