// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueCookie from 'vue-cookie'
import VueI18n from 'vue-i18n'
import Icon from 'vue-awesome/components/Icon'

import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueResource);
Vue.use(VueCookie);
Vue.use(VueI18n);

import bn from '@/i18n/bn.js'
import en from '@/i18n/en.js'
import gu from '@/i18n/gu.js'
import hi from '@/i18n/hi.js'
import kn from '@/i18n/kn.js'
import ml from '@/i18n/ml.js'
import mr from '@/i18n/mr.js'
import ta from '@/i18n/ta.js'
import te from '@/i18n/te.js'

const translations = {
    hi,
    bn,
    en,
    gu,
    hi,
    kn,
    ml,
    mr,
    ta,
    te
}

// Create VueI18n instance with options
const i18n = new VueI18n({
    locale: 'hi', // set locale
    messages: translations, // set locale messages
})

Vue.component('icon', Icon);

Vue.http.headers.common['accesstoken'] = '941d88ec-0805-48a9-9524-c24ed83d06ee';
Vue.url.options.root = 'https://hindi.pratilipi.com/api/';

Vue.filter('round', function(value, decimals) {
    if (!value) {
        value = 0;
    }

    if (!decimals) {
        decimals = 0;
    }

    value = Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
    return value;
});

/* eslint-disable no-new */
new Vue({
    i18n,
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
