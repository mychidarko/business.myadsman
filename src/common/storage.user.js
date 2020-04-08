import { USER_STORAGE_KEY } from "./config";

export function get(selector = null) {
	return selector ? JSON.parse(window.localStorage.getItem(USER_STORAGE_KEY))[selector] : JSON.parse(window.localStorage.getItem(USER_STORAGE_KEY));
}

export function save(user) {
	window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

export function remove() {
	window.localStorage.removeItem(USER_STORAGE_KEY);
}

export default { get, save, remove };