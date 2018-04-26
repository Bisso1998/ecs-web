<template>
<MainLayout>
    <div class="message-page page-wrap">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h2>Messages</h2>
                    <div class="card" v-if="getUserDetails.isGuest">
                        <div class="head-title">__("seo_login_page")</div>
                        <div class="card-content">
                            <p><i class="material-icons">check_circle</i> Send messages to your favorite authors and friends</p>
                            <p><i class="material-icons">check_circle</i> __("android_banner_notification_1")</p>
                            <p><i class="material-icons">check_circle</i> __("android_banner_notification_2")</p>
                            <button type="button" class="btn" data-toggle="modal" data-target="#login_modal">__("user_sign_in") / __("user_sign_up")</button>
                        </div>
                    </div>
                    <ul class="chat-list" v-if="!getUserDetails.isGuest">
                        <li class="chat-item">
                            <div>
                                <div class="user-img"><img src="https://0.ptlp.co/author/image?width=50" alt="profile-img"></div>
                                <div class="chat-wrap">
                                    <div class="user-info">
                                        <div class="user-name">Roshan</div>
                                        <div class="user-last-msg">Lorem ipsum</div>
                                    </div>
                                    <div class="chat-info unread">
                                        <div class="chat-time">11:30 PM</div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="chat-item">
                            <div>
                                <div class="user-img"><img src="https://0.ptlp.co/author/image?width=50" alt="profile-img"></div>
                                <div class="chat-wrap">
                                    <div class="user-info">
                                        <div class="user-name">Rahul</div>
                                        <div class="user-last-msg">Lorem ipsum</div>
                                    </div>
                                    <div class="chat-info">
                                        <div class="chat-time">11:20 PM</div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <!-- <Spinner></Spinner> -->
                </div>
            </div>
        </div>
    </div>
</MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import Spinner from '@/components/Spinner.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
    components: {
        MainLayout,
        Spinner
    },
    computed: {
        ...mapGetters([
            'getUserDetails'
        ])
    }
}
</script>

<style lang="scss" scoped>
.message-page {
    margin-top: 85px;
    text-align: left;
    min-height: 700px;
    @media screen and (max-width: 992px) {
        margin-top: 65px;
        text-align: center;
    }
    h2 {
        font-size: 22px;
        font-weight: bold;
        text-align: left;
        border-left: 3px solid #d0021b;
        padding-left: 10px;
        margin: 10px 0;
        @media screen and (max-width: 768px) {
            font-size: 18px;
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
    .chat-list {
        margin: 0;
        padding: 0;
        width: 100%;
        overflow: hidden;
        background: #fff;
        .chat-item {
            list-style: none;
            overflow: hidden;
            padding: 5px 0;
            .user-img {
                float: left;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                overflow: hidden;
                margin: 7px 0;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .chat-wrap {
                border-bottom: 1px solid #E1E1E1;
                float: left;
                width: calc(100% - 75px);
                padding: 12px 0;
                margin-left: 15px;
                text-align: left;
            }
            .user-info {
                float: left;
                width: calc(100% - 65px);
                margin-right: 5px;
                .user-name {
                    font-size: 15px;
                    color: #4A4A4A;
                    line-height: 18px;
                    font-weight: 700;
                    width: 100%;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .user-last-msg {
                    color: #757575;
                    font-size: 14px;
                    width: 100%;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
            .chat-info {
                float: right;
                width: 60px;
                text-align: right;
                color: #9B9B9B;
                font-size: 11px;
                &.unread .chat-time {
                    color: #D0021B;
                }
                &.unread::after {
                    content: "";
                    display: block;
                    color: #D0021B;
                    width: 10px;
                    height: 10px;
                    background: #D0021B;
                    float: right;
                    margin: 5px 0;
                    border-radius: 50%;
                }
            }
        }
    }
    .tab-menu {
        border-bottom: 1px solid #e9e9e9;
        padding: 8px 0 0;
        text-align: left;
        overflow: hidden;
        width: 100%;
        overflow-x: auto;
        white-space: nowrap;
        li {
            color: #555;
            font-size: 13px;
            border-bottom: 2px solid #fff;
            padding: 5px 5px 11px;
            display: inline-block;
            a {
                color: #555;
            }
            &.active {
                color: #d0021b;
                border-color: #d0021b;
            }
            &:hover {
                text-decoration: none;
                color: #d0021b;
            }
        }
    }
}
</style>
