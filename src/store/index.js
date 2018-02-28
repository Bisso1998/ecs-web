import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import homepage from './modules/homepage'
import pratilipipage from './modules/pratilipipage'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        user,
        homepage,
        pratilipipage
    },
    strict: debug
})
