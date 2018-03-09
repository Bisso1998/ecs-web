<template>
    <MainLayout>
        <div class="notification-page">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2>__("notification_notifications")</h2>
                        <ul v-if="getNotificationLoadingState === 'LOADING_SUCCESS'" class="notifications">
                            <li v-for="each_notification in getNotifications" :key="each_notification.notificationId" :class="each_notification.state.toLowerCase()">
                                <router-link
                                :to="each_notification.sourceUrl">
                                    <span class="notif-display-image"><img :src="each_notification.displayImageUrl" alt="notification"></span>
                                    <span class="message-wrap">
                                        <span class="notif-message" v-html="each_notification.message"></span>
                                        <span class="notif-date">{{ each_notification.lastUpdatedMillis | convertDate }}</span>
                                    </span>
                                    <span class="notif-source-image"><img :src="each_notification.sourceImageUrl" alt="notification"></span>
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
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Pratilipi',
    data() {
        return {
            user_id: null,
        }
    },
    computed: {
        ...mapGetters([
            'getNotifications',
            'getNotificationLoadingState'
        ])
    },
    methods: {

    },
    created() {
        
    },
    components: {
        MainLayout
    }
}
</script>

<style lang="scss" scoped>
.notification-page{
    margin-top: 85px;
    text-align: left;
    @media screen and (max-width: 992px ) {
        margin-top: 140px;
    }
    h2 {
        font-size: 24px;
        font-weight: bold;
        text-align: left;
        border-left: 3px solid #d0021b;
        padding-left: 10px;
        margin: 10px 0;
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
