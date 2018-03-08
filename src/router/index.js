import Vue from 'vue'
import Router from 'vue-router'
import HomeComponent from '@/pages/Home.vue'
import PratilipiComponent from '@/pages/Pratilipi.vue'
import AuthorComponent from '@/pages/Author.vue'
import NotificationComponent from '@/pages/Notification.vue'
import ListPageComponent from '@/pages/ListPage.vue'
import DiscoverPageComponent from '@/pages/Discovery.vue'
import ReaderPageComponent from '@/pages/Reader.vue'
import StaticComponent from '@/pages/Static.vue'
import EventsPageComponent from '@/pages/Events.vue'
import EventPageComponent from '@/pages/Event.vue'
import WritePageComponent from '@/pages/Write.vue'
import LibraryPageComponent from '@/pages/Library.vue'
import BlogsPageComponent from '@/pages/Blogs.vue'
import BlogPageComponent from '@/pages/Blog.vue'
import InterviewsPageComponent from '@/pages/Interviews.vue'
import InterviewPageComponent from '@/pages/Interview.vue'

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
        path: '/user/:user_slug',
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
        component: StaticComponent
    }, {
        path: '/about/pratilipi',
        name: 'About_Page',
        component: StaticComponent
    }, {
        path: '/terms-of-service',
        name: 'Terms_Page',
        component: StaticComponent
    }, {
        path: '/privacy-policy',
        name: 'Privacy_Page',
        component: StaticComponent
    }, {
        path: '/event',
        name: 'Events_Page',
        component: EventsPageComponent
    }, {
        path: '/event/:event_slug',
        name: 'Event_Page',
        component: EventPageComponent
    }, {
        path: '/write',
        name: 'Write_Page',
        component: WritePageComponent
    }, {
        path: '/library',
        name: 'Library_Page',
        component: LibraryPageComponent
    }, {
        path: '/blog',
        name: 'Blogs_Page',
        component: BlogsPageComponent
    }, {
        path: '/blog/:blog_id',
        name: 'Blog_Page',
        component: BlogPageComponent
    }, {
        path: '/author-interviews',
        name: 'Interviews_Page',
        component: InterviewsPageComponent
    }, {
        path: '/author-interviews/:interview_id',
        name: 'Interview_Page',
        component: InterviewPageComponent
    }, {
        path: '/:list_page_url',
        name: 'List_Page',
        component: ListPageComponent
    }],
    scrollBehavior: () => ({ y: 0 })
})
