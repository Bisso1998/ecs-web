<template>
    <MainLayout>
        <div class="message-page page-wrap">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2>Messages</h2>
                        <div class="chat-header individual">
                            <div class="back-btn"><i class="material-icons">arrow_back</i></div>
                            <div class="user-img"><img alt="" src="https://0.ptlp.co/author/image?width=60"></div>
                            <div class="user-name">Rahul</div>
                            <button class="options" type="button" id="chat-user-more-option" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="material-icons">more_vert</i>
                                        </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <button type="button" class="btn report-btn">View profile</button>
                                <button type="button" class="btn report-btn" data-toggle="modal" data-target="#confirmation">Delete Conversation</button>
                                <button type="button" class="btn report-btn" data-toggle="modal" data-target="#confirmation">Block User</button>
                            </div>
                        </div>

                        <div id="p2p-chat-body" class="chat-body">
                            <div id="all-messages" class="all-messages">
                                <div class="chat-date"><span>TODAY</span></div>
                                <div class="chat-msg sender">
                                    <span class="msg-text">Hello, How are you?</span>
                                    <div class="extra-info">
                                        <span class="time">16:40</span>
                                    </div>
                                </div>
                                <div class="chat-msg self">
                                    <span class="msg-text">Hey</span>
                                    <div class="extra-info">
                                        <span class="time">16:40</span>
                                        <span class="status sent"><i class="material-icons">check</i></span>
                                    </div>
                                </div>
                                <div class="chat-msg self">
                                    <span class="msg-text">I'm fine</span>
                                    <div class="extra-info">
                                        <span class="time">16:41</span>
                                        <span class="status sent error"><i class="material-icons">error</i></span>
                                    </div>
                                </div>
                                <div class="chat-msg self">
                                    <span class="msg-text">I'm fine</span>
                                    <div class="extra-info">
                                        <span class="time">16:42</span>
                                        <span class="status sending"><i class="material-icons">access_time</i></span>
                                    </div>
                                </div>
                            </div>
                            <div class="message-blocked">
                                You cannot send anymore messages to this user
                            </div>
                        </div>

                        <div class="chat-box">
                            <form action="#">
                                <div class="type-message">
                                    <textarea id="text-message" contenteditable="true" placeholder="Type a message"></textarea>
                                </div>
                                <button type="submit" name="button" class="send-message"><i class="material-icons">send</i></button>
                            </form>
                        </div>
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

export default {
    components: {
        MainLayout,
        Spinner
    }
}
</script>

<style lang="scss" scoped>
.message-page {
    margin-top: 85px;
    text-align: left;
    position: relative;
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
    .chat-header {
        background: #f8f9fa;
        height: 50px;
        padding: 5px 0;
        width: 100%;
        color: #000;
        position: relative;
        z-index: 2;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        .back-btn {
            float: left;
            color: #000;
            padding: 0 10px;
            i {
                line-height: 40px;
            }
        }
        .title {
            float: left;
            font-size: 21px;
            line-height: 40px;
            padding-left: 5px;
        }
    }
    .chat-header.individual {
        position: relative;
        .user-img {
            float: left;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .user-name {
            float: left;
            line-height: 40px;
            margin-left: 10px;
            font-size: 16px;
        }
        .options {
            float: right;
            border: 0;
            padding: 0;
            background: none;
            &:focus {
                outline: none;
                box-shadow: none;
            }
            i {
                line-height: 40px;
                padding: 0 10px;
            }
        }
        .dropdown-menu {
            text-align: right;
            button {
                display: block;
                background: none;
                text-align: right;
                width: 100%;
                font-size: 13px;
            }
        }
    }

    .chat-body {
        text-align: center;
        overflow-y: scroll;
        background: #f9f9f9;
        height: calc(100vh - 280px);
        .chat-date {
            text-align: center;
            margin: 7px 0;
            clear: both;
            display: inline-block;
            width: 100%;
            span {
                font-size: 13px;
                color: #686868;
                padding: 3px 5px;
                background: #D4EAF4;
                box-shadow: 0 1px 1px 0 rgba(164,152,135,0.32), 0 0 1px 0 #A39F98;
                border-radius: 4px;
            }
        }
        .all-messages {
            overflow: hidden;
            margin-bottom: 10px;
        }
        .message-blocked {
            display: block;
            clear: both;
            margin: 10px 5px;
            font-size: 14px;
            color: #9e9e9e;
            text-align: center;
            font-style: italic;
        }
        .chat-msg {
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 1px 1px 0 rgba(164,152,135,0.32), 0 0 1px 0 #A39F98;
            display: inline-block;
            padding: 10px 15px;
            position: relative;
            vertical-align: top;
            text-align: left;
            color: #000000;
            line-height: 16px;
            font-size: 14px;
            clear: both;
            &::before {
                background-color: #fff;
                content: "\00a0";
                display: block;
                height: 16px;
                position: absolute;
                top: -1px;
                transform: rotate(45deg) skew(-45deg);
                -moz-transform: rotate(45deg) skew(-45deg);
                -ms-transform: rotate(45deg) skew(-45deg);
                -o-transform: rotate(45deg) skew(-45deg);
                -webkit-transform: rotate(45deg) skew(-45deg);
                width: 20px;
            }
            &.sender {
                float: left;
                margin: 5px 45px 5px 20px;
            }
            &.sender::before {
                box-shadow: -1px 1px 1px 0 rgba(164,152,135,0.32);
                left: -5px;
            }
            &.self {
                background-color: #FFBAC2;
                float: right;
                margin: 5px 20px 5px 45px;
            }
            &.self::before {
                background-color: #FFBAC2;
                box-shadow: 1px -1px 1px 0 rgba(164,152,135,0.32);
                right: -5px;
                transform: rotate(1deg) skew(-45deg);
                -moz-transform: rotate(1deg) skew(-45deg);
                -ms-transform: rotate(1deg) skew(-45deg);
                -o-transform: rotate(1deg) skew(-45deg);
                -webkit-transform: rotate(1deg) skew(-45deg);
                top: 0;
            }
            .msg-text {
                position: relative;
            }
            .extra-info {
                display: inline-block;
                float: right;
                font-size: 11px;
                margin-left: 5px;
                color: rgba(0,0,0,0.5);
                position: relative;
                .status {
                    vertical-align: middle;
                    margin-left: 4px;
                    i {
                        font-size: 14px;
                    }
                    &.error {
                        color: #D0021B;
                    }
                }
            }
        }
    }

    .chat-box {
        position: relative;
        width: 100%;
        height: 45px;
        background: #f9f9f9;
        margin-bottom: 20px;
        .type-message {
            background: #fff;
            margin: 0 5px;
            width: calc(100vw - 100px);
            position: relative;
            border-radius: 4px;
            box-shadow: 0 1px 1px 0 rgba(164,152,135,0.32), 0 0 1px 0 #A39F98;
            #text-message {
                outline: none;
                padding: 5px;
                overflow-y: scroll;
                height: 40px;
                width: 92%;
                display: inline-block;
                font-size: 14px;
            }
        }
        .send-message {
            width: 45px;
            height: 45px;
            background: #D1021B;
            color: #fff;
            border-radius: 50%;
            margin-right: 5px;
            position: absolute;
            bottom: 0px;
            right: 4px;
        }
    }
}
</style>
