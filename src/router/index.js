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
import SettingsPageComponent from '@/pages/Settings.vue'
import SearchPageComponent from '@/pages/Search.vue'
import LoginPageComponent from '@/pages/Login.vue'
import PasswordResetPageComponent from '@/pages/PasswordReset.vue'

import constants from '@/constants'
import DataAccessor from '@/utils/DataAccessor'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'Home',
        component: HomeComponent,
        meta: { 'store': 'homepage' },
        beforeEnter: (to, from, next) => {
            if (to.query.email && to.query.token && to.query.passwordReset) {
                next({ path: '/reset-password', query: { 
                    email: to.query.email,
                    token: to.query.token
                }});    
            } else {
                next();
            }
            
        }
    }, {
        path: '/story/:slug_id',
        name: 'Pratilipi',
        component: PratilipiComponent,
        meta: { 'store': 'pratilipipage' }
    }, {
        path: '/user/:user_slug',
        name: 'User',
        component: AuthorComponent,
        meta: { 'store': 'authorpage' }
    }, {
        path: '/followers',
        beforeEnter: (to, from, next) => {
            next('/login');
        }
    }, {
        path: '/notifications',
        name: 'Notification',
        component: NotificationComponent,
        meta: { 'store': 'notification' }
    }, {
        path: '/discover',
        name: 'Discovery_Page',
        component: DiscoverPageComponent
    }, {
        path: '/read',
        name: 'Reader_Page',
        component: ReaderPageComponent,
        meta: { 'store': 'readerpage' }
    }, {
        path: '/work-with-us',
        name: 'Career_Page',
        component: StaticComponent
    }, {
        path: '/careers',
        name: 'Career_Page_2',
        component: StaticComponent
    }, {
        path: '/about/pratilipi',
        name: 'About_Page',
        component: StaticComponent
    }, {
        path: '/about',
        name: 'About_Page_2',
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
        component: EventsPageComponent,
        meta: { 'store': 'eventspage' }
    }, {
        path: '/event/:event_slug',
        name: 'Event_Page',
        component: EventPageComponent,
        meta: { 'store': 'eventpage' }
    }, {
        path: '/create',
        name: 'Write_Page',
        component: WritePageComponent,
        meta: { 'store': 'writepage' }
    }, {
        path: '/library',
        name: 'Library_Page',
        component: LibraryPageComponent,
        meta: { 'store': 'librarypage' }
    }, {
        path: '/settings',
        name: 'Settings_Page',
        component: SettingsPageComponent
    }, {
        path: '/search',
        name: 'Search_Page',
        component: SearchPageComponent,
        meta: { 'store': 'searchpage' }
    }, {
        path: '/login',
        name: 'Login_Page',
        component: LoginPageComponent
    }, {
        path: '/signup',
        name: 'Signup_Page',
        component: LoginPageComponent
    }, {
        path: '/blog',
        name: 'Blogs_Page',
        component: BlogsPageComponent,
        meta: { 'store': 'blogspage' }
    }, {
        path: '/blog/:blog_id',
        name: 'Blog_Page',
        component: BlogPageComponent,
        meta: { 'store': 'blogpage' }
    }, {
        path: '/blogpost/:blog_id',
        name: 'Blog_Page_2',
        component: BlogPageComponent,
        meta: { 'store': 'blogpage' }
    }, {
        path: '/author-interviews',
        name: 'Interviews_Page',
        component: InterviewsPageComponent,
        meta: { 'store': 'interviewspage' }
    }, {
        path: '/author-interviews/:interview_id',
        name: 'Interview_Page',
        component: InterviewPageComponent,
        meta: { 'store': 'interviewpage' }
    }, {
        path: '/reset-password',
        name: 'Password_Reset',
        component: PasswordResetPageComponent
    }, {
        path: '/author/:author_id',
        beforeEnter: (to, from, next) => {
            const author_id = to.params.author_id;
            DataAccessor.getAuthorById(author_id, false, (data) => {
                if (data) {
                    next(data.pageUrl);
                } else {
                    // redirect to page not found
                }
            });
        }
    }, {
        path: '/pratilipi/:pratilipi_id',
        beforeEnter: (to, from, next) => {
            const pratilipi_id = to.params.pratilipi_id;
            DataAccessor.getPratilipiById(pratilipi_id, false, (data) => {
                if (data) {
                    next(data.pageUrl);
                } else {
                    // redirect to page not found
                }
            });
        }
    }, {
        path: '/:list_page_url',
        name: 'List_Page',
        component: ListPageComponent,
        meta: { 'store': 'listpage' },
        beforeEnter: (to, from, next) => {
            console.log(to);

            const pathToGo = to.path;
            DataAccessor.getPageType(pathToGo, (response) => {
                if (response.status === 200) {
                    switch(response.response.pageType) {
                        case 'PRATILIPI':
                            DataAccessor.getPratilipiById(response.response.primaryContentId, false, (data) => {
                                if (data) {
                                    next(data.pageUrl);
                                } else {
                                    // redirect to page not found
                                }
                            });
                        case 'AUTHOR':
                            DataAccessor.getAuthorById(response.response.primaryContentId, false, (data) => {
                                if (data) {
                                    next(data.pageUrl);
                                } else {
                                    // redirect to page not found
                                }
                            });
                        default:
                            next();
                    }
                } else {
                    next();
                }
            });
        }
    }, {
        path: '*',
        beforeEnter: (to, from, next) => {
            console.log('Going to an unknown world!');
            const pathToGo = to.path;
            DataAccessor.getPageType(pathToGo, (response) => {
                if (response.status === 200) {
                    switch(response.response.pageType) {
                        case 'PRATILIPI':
                            DataAccessor.getPratilipiById(response.response.primaryContentId, false, (data) => {
                                if (data) {
                                    next(data.pageUrl);
                                } else {
                                    // redirect to page not found
                                }
                            });
                        case 'AUTHOR':
                            DataAccessor.getAuthorById(response.response.primaryContentId, false, (data) => {
                                if (data) {
                                    next(data.pageUrl);
                                } else {
                                    // redirect to page not found
                                }
                            });
                    }
                } else {
                    // redirect to page not found
                }
            });
        }
    }],
    scrollBehavior: () => ({ y: 0 })
});

router.afterEach((to, from) => {
    ga( 'set', 'page', to.path + window.location.search );
    // ga( 'set', 'dimension1', appViewModel.user.userId() == null ? 0 : appViewModel.user.userId() );
    ga( 'set', 'dimension2', process.env.GA_WEBSITE );
    ga( 'set', 'dimension3', process.env.GA_WEBSITE_MODE );
    ga( 'set', 'dimension4', process.env.GA_WEBSITE_VERSION );
    ga( 'send', 'pageview' );
});

export default router;
