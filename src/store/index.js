import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import alert from './modules/alert'
import homepage from './modules/homepage'
import pratilipipage from './modules/pratilipipage'
import recommendation from './modules/recommendation'
import authordetails from './modules/authordetails'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        user,
        alert,
        homepage,
        pratilipipage,
        recommendation,
        authordetails
    },
    strict: debug
})
