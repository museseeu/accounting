import Vue from 'vue';
import Vuex from 'vuex';

import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    storeItems: [{
      name: '電影票', cost: 320,
    }, {
      name: '爆米花', cost: 80,
    }, {
      name: '飲料', cost: 120,
    }],
    storeBackupItems: [],
  },
  getters,
  mutations,
  actions,
});

export default store;
