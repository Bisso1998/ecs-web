// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'

import App from './App'
import router from './router'
// import './firebase'
import './filters'
import './bootstrap'
import store from './store'

import Icon from 'vue-awesome/components/Icon'


Vue.config.productionTip = false
Vue.use(Vuex);
Vue.component('icon', Icon)

/* eslint-disable no-new */
new Vue({
    store,
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
