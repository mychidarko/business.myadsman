import Vue from 'vue';
import Vuex from 'vuex';

import theme from './theme.module';
import auth from './auth.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    theme,
    auth
  }
});
