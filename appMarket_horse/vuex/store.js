import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions.js';
import * as mutations from './mutations.js';

Vue.use(Vuex);

const state = {
    count: 0
};



export default new Vuex.Store({
    state,
    actions,
    mutations
});
