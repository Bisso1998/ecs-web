// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import Icon from 'vue-awesome/components/Icon'
import Vuetify from 'vuetify'

import App from './App'
import router from './router'
import i18n from './i18n'
import './firebase'
import './filters'

Vue.config.productionTip = false
Vue.use(VueResource);
Vue.use(Vuetify)

Vue.component('icon', Icon);

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
