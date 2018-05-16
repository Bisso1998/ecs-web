import Vue from 'vue'
import Router from 'vue-router'
import NotificationComponent from '@/pages/Notification.vue'
import ListPageComponent from '@/pages/ListPage.vue'
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
import MessagesComponent from '@/pages/Messages.vue'
import MessageUserComponent from '@/pages/MessageUser.vue'
import PratilipiPageComponent from '@/pages/Pratilipi.vue';
import DiscoveryPageComponent from '@/pages/Discovery.vue'
import AuthorPageComponent from '@/pages/Author.vue'
import HomePageComponent from '@/pages/Home.vue'

import constants from '@/constants'
import DataAccessor from '@/utils/DataAccessor'

import { getCookie } from '@/mixins/methods'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'Home',
        // component: () => {
        //     const isTrue = true;
        //     if (getCookie('bucketId') >= 2 && getCookie('bucketId') < 4) {
        //         return import('@/pages/experiments/home_v1/Home.vue');
        //     }
        //     else if (getCookie('bucketId') >= 4 && getCookie('bucketId') < 6) {
        //         return import('@/pages/experiments/home_v2/Home.vue');
        //     }
        //     else if (getCookie('bucketId') >= 6 && getCookie('bucketId') < 8) {
        //         return import('@/pages/experiments/home_v3/Home.vue');
        //     }
        //     else if (getCookie('bucketId') >= 8 && getCookie('bucketId') < 10) {
        //         return import('@/pages/experiments/home_v4/Home.vue');
        //     }
        //     else {
        //         return import('@/pages/Home.vue');
        //     }
        // },
        component: HomePageComponent,
        meta: {
            'store': 'homepage',
            'title': '__("seo_home_page") | __("pratilipi")'
        },
        beforeEnter: (to, from, next) => {
            if (to.query.email && to.query.token && to.query.passwordReset) {
                next({
                    path: '/reset-password',
                    query: {
                        email: to.query.email,
                        token: to.query.token
                    }
                });
            } else {
                next();
            }

        }
    }, {
        path: '/story/:slug_id',
        name: 'Pratilipi',
        // component: () => {
        //     const isTrue = true;
        //     // if (getCookie('bucketId') >= 2 && getCookie('bucketId') < 4) {
        //     //     return import('@/pages/experiments/rating_v1/Pratilipi.vue');
        //     // }
        //     // else if (getCookie('bucketId') >= 4 && getCookie('bucketId') < 6) {
        //     //     return import('@/pages/experiments/rating_v2/Pratilipi.vue');
        //     // }
        //     // else if (getCookie('bucketId') >= 6 && getCookie('bucketId') < 8) {
        //     //     return import('@/pages/experiments/rating_v3/Pratilipi.vue');
        //     // }
        //     // else if (getCookie('bucketId') >= 8 && getCookie('bucketId') < 10) {
        //     //     return import('@/pages/experiments/rating_v4/Pratilipi.vue');
        //     // }
        //     PratilipiPageComponent
        // },
        component: PratilipiPageComponent,
        meta: {
            'store': 'pratilipipage',
            'id_prop': 'slug_id'
        }
    }, {
        path: '/user/:user_slug',
        name: 'User',
        // component: () => {
        //     const isTrue = true;
        //     if (getCookie('bucketId') >= 2 && getCookie('bucketId') < 4) {
        //         return import('@/pages/experiments/profile_v1/Author.vue');
        //     }
        //     else if (getCookie('bucketId') >= 4 && getCookie('bucketId') < 6) {
        //         return import('@/pages/experiments/profile_v2/Author.vue');
        //     }
        //     else if (getCookie('bucketId') >= 6 && getCookie('bucketId') < 8) {
        //         return import('@/pages/experiments/profile_v3/Author.vue');
        //     }
        //     else if (getCookie('bucketId') >= 8 && getCookie('bucketId') < 10) {
        //         return import('@/pages/experiments/profile_v4/Author.vue');
        //     }
        //     else {
        //         return import('@/pages/Author.vue');
        //     }
        // },
        component: AuthorPageComponent,
        meta: {
            'store': 'authorpage',
            'title': '__("seo_home_page")',
            'id_prop': 'user_slug'
        }
    }, {
        path: '/followers',
        beforeEnter: (to, from, next) => {
            next('/login');
        }
    }, {
        path: '/notifications',
        name: 'Notification',
        component: NotificationComponent,
        meta: {
            'store': 'notification',
            'title': '__("seo_notifications_page") | __("pratilipi")'
        }
    }, {
        path: '/discover',
        name: 'Discovery_Page',
        // component: () => {
        //     const isTrue = true;
        //     if (getCookie('bucketId') >= 2 && getCookie('bucketId') < 4) {
        //         return import('@/pages/experiments/discovery_v1/Discovery.vue');
        //     }
        //     else if (getCookie('bucketId') >= 4 && getCookie('bucketId') < 6) {
        //         return import('@/pages/experiments/discovery_v2/Discovery.vue');
        //     }
        //     else if (getCookie('bucketId') >= 6 && getCookie('bucketId') < 8) {
        //         return import('@/pages/experiments/discovery_v3/Discovery.vue');
        //     }
        //     else if (getCookie('bucketId') >= 8 && getCookie('bucketId') < 10) {
        //         return import('@/pages/experiments/discovery_v4/Discovery.vue');
        //     }
        //     else {
        //         return import('@/pages/Discovery.vue');
        //     }
        // },
        component: DiscoveryPageComponent,
        meta: {
            'title': '__("seo_navigation_page") | __("pratilipi")',
            'store': 'discover'
        }
    }, {
        path: '/read',
        name: 'Reader_Page',
        component: () => {
            if (getCookie('bucketId') >= 2 && getCookie('bucketId') < 4) {
                return import('@/pages/experiments/reader_v5/Reader.vue');
            }
            else if (getCookie('bucketId') >= 4 && getCookie('bucketId') < 6) {
                return import('@/pages/experiments/reader_v6/Reader.vue');
            }
            else if (getCookie('bucketId') >= 6 && getCookie('bucketId') < 8) {
                return import('@/pages/experiments/reader_v7/Reader.vue');
            }
            else if (getCookie('bucketId') >= 8 && getCookie('bucketId') < 10) {
                return import('@/pages/experiments/reader_v8/Reader.vue');
            }
            else {
                return import('@/pages/Reader.vue');
            }
        },
        meta: {
            'store': 'readerpage',
            'title': '__("seo_home_page")'
        }
    }, {
        path: '/work-with-us',
        name: 'Career_Page',
        component: StaticComponent,
        meta: {
            'title': 'Career | __("pratilipi")'
        }
    }, {
        path: '/careers',
        name: 'Career_Page_2',
        component: StaticComponent,
        meta: {
            'title': 'Career | __("pratilipi")'
        }
    }, {
        path: '/about/pratilipi',
        name: 'About_Page',
        component: StaticComponent,
        meta: {
            'title': '__("footer_about_us") | __("pratilipi")'
        }
    }, {
        path: '/about',
        name: 'About_Page_2',
        component: StaticComponent,
        meta: {
            'title': '__("footer_about_us") | __("pratilipi")'
        }
    }, {
        path: '/terms-of-service',
        name: 'Terms_Page',
        component: StaticComponent,
        meta: {
            'title': '__("footer_terms_of_service") | __("pratilipi")'
        }
    }, {
        path: '/privacy-policy',
        name: 'Privacy_Page',
        component: StaticComponent,
        meta: {
            'title': '__("footer_privacy_policy") | __("pratilipi")'
        }
    }, {
        path: '/event',
        name: 'Events_Page',
        component: EventsPageComponent,
        meta: {
            'store': 'eventspage',
            'title': '__("seo_events_page") | __("pratilipi")'
        }
    }, {
        path: '/event/:event_slug',
        name: 'Event_Page',
        component: EventPageComponent,
        meta: {
            'store': 'eventpage',
            'title': '__("seo_home_page")',
            'id_prop': 'event_slug'
        }
    }, {
        path: '/create',
        name: 'Write_Page',
        component: WritePageComponent,
        meta: {
            'store': 'writepage',
            'title': '__("write") | __("pratilipi")'
        }
    }, {
        path: '/library',
        name: 'Library_Page',
        component: LibraryPageComponent,
        meta: {
            'store': 'librarypage',
            'title': '__("seo_library_page")'
        }
    }, {
        path: '/settings',
        name: 'Settings_Page',
        component: SettingsPageComponent,
        meta: {
            'title': '__("seo_home_page") | __("pratilipi")'
        }
    }, {
        path: '/search',
        name: 'Search_Page',
        component: SearchPageComponent,
        meta: {
            'store': 'searchpage',
            'title': '__("seo_search_page") | __("pratilipi")'
        }
    }, {
        path: '/login',
        name: 'Login_Page',
        component: LoginPageComponent,
        meta: {
            'title': '__("seo_login_page") | __("pratilipi")',
            'store': 'login'
        }
    }, {
        path: '/signup',
        name: 'Signup_Page',
        component: LoginPageComponent,
        meta: {
            'title': '__("seo_register_page") | __("pratilipi")',
            'store': 'register'
        }
    }, {
        path: '/messages',
        name: 'Messages_Page',
        component: MessagesComponent,
        meta: {
            'title': '__("chat_messages") | __("pratilipi")',
            'store': 'messages'
        }
    }, {
        path: '/messages/:channel_id',
        name: 'MessageUser_Page',
        component: MessageUserComponent,
        meta: {
            'title': 'Messages | __("pratilipi")',
            'store': 'messageuser'
        }
    }, {
        path: '/blog',
        name: 'Blogs_Page',
        component: BlogsPageComponent,
        meta: {
            'store': 'blogspage',
            'title': '__("seo_blog_page") | __("pratilipi")'
        }
    }, {
        path: '/blog/:blog_id',
        name: 'Blog_Page',
        component: BlogPageComponent,
        meta: {
            'store': 'blogpage',
            'title': '__("seo_home_page")',
            'id_prop': 'blog_id'
        }
    }, {
        path: '/blogpost/:blog_id',
        name: 'Blog_Page_2',
        component: BlogPageComponent,
        meta: {
            'store': 'blogpage',
            'title': '__("seo_home_page")',
            'id_prop': 'blog_id'
        }
    }, {
        path: '/author-interviews',
        name: 'Interviews_Page',
        component: InterviewsPageComponent,
        meta: {
            'store': 'interviewspage',
            'title': '__("seo_author_interview") | __("pratilipi")'
        }
    }, {
        path: '/author-interviews/:interview_id',
        name: 'Interview_Page',
        component: InterviewPageComponent,
        meta: {
            'store': 'interviewpage',
            'title': '__("seo_home_page")',
            'id_prop': 'interview_id'
        }
    }, {
        path: '/reset-password',
        name: 'Password_Reset',
        component: PasswordResetPageComponent,
        meta: {
            'title': '__("seo_reset_password_page") | __("pratilipi")'
        }
    }, {
        path: '/forgot-password',
        name: 'Forgot_Password',
        beforeEnter: (to, from, next) => {
            next('login#forgot-pass')
        }
    }, {
        path: '/author/:author_id',
        meta: {
            'title': '__("seo_home_page")',
            'id_prop': 'author_id'
        },
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
        meta: {
            'title': '__("seo_home_page")',
            'id_prop': 'pratilipi_id'
        },
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
        meta: {
            'store': 'listpage',
            'title': '__("seo_home_page")',
            'id_prop': 'list_page_url'
        },
        beforeEnter: (to, from, next) => {
            console.log(to);

            const pathToGo = to.path;
            DataAccessor.getPageType(pathToGo, (response) => {
                if (response.status === 200) {
                    switch (response.response.pageType) {
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
        meta: {
            'title': '__("seo_home_page") | __("pratilipi")'
        },
        beforeEnter: (to, from, next) => {
            console.log('Going to an unknown world!');
            const pathToGo = to.path;
            DataAccessor.getPageType(pathToGo, (response) => {
                if (response.status === 200) {
                    switch (response.response.pageType) {
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

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
})

router.afterEach((to, from) => {
    ga('set', 'page', to.path + window.location.search);
    // ga( 'set', 'dimension1', appViewModel.user.userId() == null ? 0 : appViewModel.user.userId() );
    ga('set', 'dimension2', process.env.GA_WEBSITE);
    ga('set', 'dimension3', process.env.GA_WEBSITE_MODE);
    ga('set', 'dimension4', process.env.GA_WEBSITE_VERSION);
    ga('send', 'pageview');
});

export default router;
