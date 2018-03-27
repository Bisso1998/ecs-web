<template>
    <MainLayout>
        <div class="notification-page">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2>
                            __("notification_notifications")
                            <router-link
                            class="notification-settings"
                            :to="{ name: 'Settings_Page'}"
                            v-if="!getUserDetails.isGuest">
                                <i class="material-icons">settings</i>
                            </router-link>
                        </h2>
                        <div class="card" v-if="getUserDetails.isGuest">
                            <div class="head-title">__("seo_login_page")</div>
                            <div class="card-content">
                                <p><i class="material-icons">check_circle</i> __("user_login_to_view_notifications")</p>
                                <p><i class="material-icons">check_circle</i> __("android_banner_notification_1")</p>
                                <p><i class="material-icons">check_circle</i> __("android_banner_notification_2")</p>
                                <button type="button" class="btn" data-toggle="modal" data-target="#login_modal">__("user_sign_in") / __("user_sign_up")</button>
                            </div>
                        </div>
                        <ul v-if="getNotificationLoadingState === 'LOADING_SUCCESS' || getNotifications.length > 0" class="notifications">
                            <li v-for="each_notification in getNotifications" :key="each_notification.notificationId" :class="each_notification.state.toLowerCase()">
                                <router-link
                                :to="each_notification.sourceUrl"
                                @click.native="changeNotificationStatusToRead(each_notification.notificationId)">
                                    <span class="notif-display-image"><img :src="each_notification.displayImageUrl" alt="notification"></span>
                                    <span class="message-wrap">
                                        <span class="notif-message" v-html="each_notification.message"></span>
                                        <span class="notif-date">{{ each_notification.lastUpdatedMillis | convertDate }}</span>
                                    </span>
                                    <span class="notif-source-image" v-if="each_notification.sourceImageUrl"><img :src="each_notification.sourceImageUrl" alt="notification"></span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import { mapGetters, mapActions } from 'vuex';
import constants from '@/constants';

export default {
    name: 'Pratilipi',
    data() {
        return {
            user_id: null,
            scrollPosition: null
        }
    },
    computed: {
        ...mapGetters([
            'getNotifications',
            'getNotificationLoadingState',
            'getNotificationCursor',
            'getUserDetails'
        ])
    },
    methods: {
        ...mapActions([
            'changeNotificationStatusToRead',
            'fetchMoreNotifications'
        ]),
        updateScroll() {
            this.scrollPosition = window.scrollY
        }
    },
    created() {
        
    },
    watch: {
        'scrollPosition'(newScrollPosition){
            const nintyPercentOfList = ( 40 / 100 ) * $('.notification-page').innerHeight();
            // const { list_page_url } = this.$route.params;

            if (newScrollPosition > nintyPercentOfList && this.getNotificationLoadingState !== 'LOADING' && this.getNotificationCursor !== null) {
                
                const currentLocale = process.env.LANGUAGE;
                constants.LANGUAGES.forEach((eachLanguage) => {
                    if (eachLanguage.shortName === currentLocale) {
                        this.fetchMoreNotifications({
                            language: eachLanguage.fullName.toUpperCase(),
                            resultCount: 20
                        });
                    }
                });
                
            }
        }
    },
    mounted() {
        window.addEventListener('scroll', this.updateScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.updateScroll);
    },
    components: {
        MainLayout
    }
}
</script>

<style lang="scss" scoped>
.notification-page {
    margin-top: 85px;
    text-align: left;
    min-height: 700px;
    @media screen and (max-width: 992px ) {
        margin-top: 65px;
    }
    h2 {
        font-size: 24px;
        font-weight: bold;
        text-align: left;
        border-left: 3px solid #d0021b;
        padding-left: 10px;
        margin: 10px 0;
        position: relative;
        .notification-settings {
            position: absolute;
            right: 10px;
            top: 0;
            color: #2c3e50;
            i {
                vertical-align: middle;
            }
        }
    }
    .card {
        border-radius: 0;
        margin: 20px 0;
        padding: 0;
        text-align: center;
        .head-title {
            font-size: 18px;
            font-weight: bold;
            text-align: left;
            border-left: 3px solid #d0021b;
            padding-left: 10px;
            margin: 10px 0 0;
        }
        .card-content {
            padding: 5px 10px 10px;
            text-align: left;
            p {
                text-align: left;
                font-size: 14px;
                margin: 10px 0;
                i {
                    font-size: 16px;
                    vertical-align: middle;
                    color: #9E9E9E;
                    padding-right: 5px;
                }
            }
            button {
                background: #d00b12;
                color: #fff;
                margin: 10px 0;
            }
        }
    }
    .notifications {
        padding: 0;
        margin: 20px 0;
        li {
            list-style: none;
            margin: 10px 0;
            padding: 10px 0;
            border-bottom: 1px solid #e9e9e9;
            &.unread {
                background: rgba(208, 2, 27, 0.1);
            }
            a {
                text-decoration: none;
                color: #212121;
                display: flex;
                font-size: 14px;
                .notif-display-image {
                    width: 60px;
                    height: 60px;
                    overflow: hidden;
                    position: relative;
                    border-radius: 50%;
                    align-self: center;
                    margin: 0 10px;
                    img {
                        max-width: 100%;
                    }
                }
                .message-wrap {
                    flex-grow: 1;
                }
                .notif-date {
                    display: block;
                    font-size: 12px;
                    margin-top: 5px;
                }
                .notif-source-image {
                    width: 60px;
                    height: 60px;
                    overflow: hidden;
                    position: relative;
                    align-self: center;
                    margin: 0 10px;
                    img {
                        max-width: 100%;
                    }
                }
            }
        }
    }
}
</style>
