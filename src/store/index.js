import Vuex from 'vuex'
import Vue from 'vue'

import user from './modules/user'
import alert from './modules/alert'
import homepage from './modules/homepage'
import pratilipipage from './modules/pratilipipage'
import recommendation from './modules/recommendation'
import reviews from './modules/reviews'
import authordetails from './modules/authordetails'
import eventspage from './modules/eventspage'
import listpage from './modules/listpage'
import librarypage from './modules/librarypage'
import staticpage from './modules/staticpage'
import writepage from './modules/writepage'
import eventpage from './modules/eventpage'
import authorpage from './modules/authorpage'
import blogspage from './modules/blogspage'
import blogpage from './modules/blogpage'
import interviewspage from './modules/interviewspage'
import interviewpage from './modules/interviewpage'
import notification from './modules/notification'
import settingspage from './modules/settingspage'
import searchpage from './modules/searchpage'
import sharemodal from './modules/sharemodal'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex);

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
        authorpage,
        librarypage,
        blogspage,
        blogpage,
        interviewspage,
        interviewpage,
        notification,
        settingspage,
        sharemodal,
        searchpage,
        reviews
    },
    strict: debug
})
