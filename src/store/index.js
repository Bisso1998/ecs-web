import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import alert from './modules/alert'
import homepage from './modules/homepage'
import pratilipipage from './modules/pratilipipage'
import recommendation from './modules/recommendation'
import authordetails from './modules/authordetails'
import eventspage from './modules/eventspage'
import listpage from './modules/listpage'
import staticpage from './modules/staticpage'
import writepage from './modules/writepage'
import eventpage from './modules/eventpage'
import authorpage from './modules/authorpage'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        user,
        alert,
        homepage,
        pratilipipage,
        recommendation,
        authordetails,
        eventspage,
        eventpage,
        listpage,
        staticpage,
        writepage,
        authorpage
    },
    strict: debug
})
