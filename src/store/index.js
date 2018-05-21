import Vuex from 'vuex'
import Vue from 'vue'

import user from './modules/user'
import alert from './modules/alert'
import homepage from './modules/homepage'
import pratilipipage from './modules/pratilipipage'
import recommendation from './modules/recommendation'
import reviews from './modules/reviews'
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
import inputmodal from './modules/inputmodal'
import readerpage from './modules/readerpage'
import pratilipimodal from './modules/pratilipimodal'
import messages from './modules/messages'
import eventparticipate from './modules/eventparticipate'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        alert,
        homepage,
        pratilipipage,
        recommendation,
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
        reviews,
        readerpage,
        inputmodal,
        pratilipimodal,
        messages,
        eventparticipate
    },
    strict: debug
})
