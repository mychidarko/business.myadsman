const state = {
	isSidebarActive: false,
	themeColor: "#2962ff"
};

const mutations = {
	IS_SIDEBAR_ACTIVE(state, value) {
		state.isSidebarActive = value;
	}
}

export default {
	state,
	mutations
};