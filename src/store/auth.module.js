import JwtService from "@/common/jwt.service";
import User from "@/common/storage.user";

import { LOGIN, LOGOUT, REGISTER, CHECK_AUTH, UPDATE_USER } from "./actions.type";
import { SET_AUTH, PURGE_AUTH, SET_ERROR } from "./mutations.type"

const state = {
  errors: null,
  user: {},
  hasAuth: !!JwtService.getToken()
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  hasAuth(state) {
    return state.hasAuth;
  }
};

const actions = {
	[LOGIN](context, user) {			
		context.commit(SET_AUTH, user);
	},
	[LOGOUT](context) {
		context.commit(PURGE_AUTH);
	},
	[REGISTER](context, user) {
		context.commit(SET_AUTH, user);
	},
	[CHECK_AUTH](context) {
		if (User.get()) {
			const user = User.get();
			context.commit(CHECK_AUTH, user);
		}
	},
	[UPDATE_USER](context, payload) {
		const { email, username, password, image, bio } = payload;
		const user = {
			email,
			username,
			bio,
			image
		};
		if (password) {
			user.password = password;
		}

		context.commit(SET_AUTH, user);
	}
};

const mutations = {
	[SET_ERROR](state, error) {
		state.errors = error;
	},
	[SET_AUTH](state, user) {
		state.hasAuth = true;
		state.user = user;
		state.errors = {};
		JwtService.saveToken(state.user.token);
		User.save(user);
	},
	[CHECK_AUTH](state, user) {
		state.hasAuth = true;
		state.user = user;
	},
	[PURGE_AUTH](state) {
		state.hasAuth = false;
		state.user = {};
		state.errors = {};
		JwtService.destroyToken();
		User.remove();
	}
};

export default {
	state,
	actions,
	mutations,
	getters
};
