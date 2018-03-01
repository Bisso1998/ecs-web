import Vue from 'vue'
import Router from 'vue-router'
import HomeComponent from '@/pages/Home.vue'
import PratilipiComponent from '@/pages/Pratilipi.vue'
import AuthorComponent from '@/pages/Author.vue'
import NotificationComponent from '@/pages/Notification.vue'
import ListPageComponent from '@/pages/ListPage.vue'
import DiscoverPageComponent from '@/pages/Discovery.vue'

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
        path: '/:list_page_url',
        name: 'List_Page',
        component: ListPageComponent
    } ]
})
