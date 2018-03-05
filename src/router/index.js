import Vue from 'vue'
import Router from 'vue-router'
import HomeComponent from '@/pages/Home.vue'
import PratilipiComponent from '@/pages/Pratilipi.vue'
import AuthorComponent from '@/pages/Author.vue'
import NotificationComponent from '@/pages/Notification.vue'
import ListPageComponent from '@/pages/ListPage.vue'
import DiscoverPageComponent from '@/pages/Discovery.vue'
import ReaderPageComponent from '@/pages/Reader.vue'
import CareerComponent from '@/pages/Career.vue'
import AboutComponent from '@/pages/About.vue'
import TermsComponent from '@/pages/Terms.vue'
import PrivacyComponent from '@/pages/Privacy.vue'
import EventPageComponent from '@/pages/Event.vue'

import constants from '@/constants'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'Home',
        component: HomeComponent
    }, {
        path: '/story/:slug_id',
        name: 'Pratilipi',
        component: PratilipiComponent
    }, {
        path: '/user/:user_id',
        name: 'User',
        component: AuthorComponent
    }, {
        path: '/notification',
        name: 'Notification',
        component: NotificationComponent
    }, {
        path: '/discover',
        name: 'Discovery_Page',
        component: DiscoverPageComponent
    }, {
        path: '/read',
        name: 'Reader_Page',
        component: ListPageComponent
    }, {
        path: '/work-with-us',
        name: 'Career_Page',
        component: CareerComponent
    }, {
        path: '/about/pratilipi',
        name: 'About_Page',
        component: AboutComponent
    }, {
        path: '/terms-of-service',
        name: 'Terms_Page',
        component: TermsComponent
    }, {
        path: '/privacy-policy',
        name: 'Privacy_Page',
        component: PrivacyComponent
    }, {
        path: '/event',
        name: 'Event_Page',
        component: EventPageComponent
    }, {
        path: '/:list_page_url',
        name: 'List_Page',
        component: ListPageComponent
    }]
})
