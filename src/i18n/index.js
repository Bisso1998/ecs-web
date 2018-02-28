import Vue from 'vue'
import VueI18n from 'vue-i18n'

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

Vue.use(VueI18n);

// Create VueI18n instance with options
export default new VueI18n({
    locale: 'te', // set locale
    messages: translations, // set locale messages
})
