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

import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

Raven
    .config('https://04a769a856594059abd7e06da9a203e7@sentry.io/305909')
    .addPlugin(RavenVue, Vue)
    .install();


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
