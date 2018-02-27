// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'

import App from './App'
import router from './router'
import i18n from './i18n'
// import './firebase'
import './filters'
import './bootstrap'

Vue.config.productionTip = false
Vue.use(VueResource);

Vue.http.headers.common['accesstoken'] = '941d88ec-0805-48a9-9524-c24ed83d06ee';
Vue.url.options.root = 'https://hindi.pratilipi.com/api/';

/* eslint-disable no-new */
new Vue({
    i18n,
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
