<template>
<MainLayout>
    <div class="message-page page-wrap">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h2>__("chat_messages")</h2>
                    <div class="card" v-if="getUserDetails.isGuest">
                        <div class="head-title">__("seo_login_page")</div>
                        <div class="card-content">
                            <p><i class="material-icons">check_circle</i> __("chat_guest_msg")</p>
                            <button type="button" class="btn" data-toggle="modal" data-target="#login_modal">__("user_sign_in") / __("user_sign_up")</button>
                        </div>
                    </div>
                    <ul class="chat-list" v-if="!getUserDetails.isGuest">
                        <li class="chat-item" v-for="conversation in conversations"  v-bind:key="conversation.channelId">
                            <div v-on:click="loadMessagesForConversation(conversation.userId)">
                                <div class="user-img"><img  v-bind:src="conversation.profileImageUrl"  alt="profile-img"></div>
                                <div class="chat-wrap">
                                    <div class="user-info">
                                        <div class="user-name" v-text="conversation.channelName"></div>
                                        <div class="user-last-msg" v-text="conversation.lastMessage"></div>
                                    </div>
                                    <div class="chat-info" v-bind:class="{unread : conversation.isUnread}">
                                        <div class="chat-time" v-text="conversation.lastMessageTimeDisplay"></div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="no-messages" v-if="loadingConversations != true && conversations.length == 0">__("chat_no_msgs")</li>
                    </ul>
                    <Spinner  v-if="loadingConversations == true && !getUserDetails.isGuest && conversations.length == 0"></Spinner>
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
import $ from 'jquery'

export default {

    data(){
        return {
            conversations: [],
            channelLastMessage: {},
            channelLastReadMessage: {},
            fetchedChannelMetadataData: {},
            loadingConversations: true
        }
    },

    methods: {
        loadChannelMetadata(channelId){
            const self = this;
            self.firebaseGrowthDB.ref('/CHATS').child('channel_metadata').child(channelId).once('value').then(function(snapshot){
                if(snapshot.val() == undefined){
                /* TODO Something wrong */
                }
                var userInChannel = false;
                var otherUserId = 0;
                var conversationDisplayName = "";
                var conversationImageUrl = "";
                $.each(snapshot.val().users, function(user, userDetails){
                    if(user == self.getUserDetails.userId){
                        userInChannel = true;
                    } else {
                        otherUserId = user;
                        conversationDisplayName = userDetails.displayName;
                        conversationImageUrl = userDetails.profileImageUrl;
                    }
                    console.log(user, userDetails);
                });
                if(userInChannel != true){
                /* TODO Something wrong */
                    return;
                }
                self.firebaseGrowthDB.ref('/CHATS').child('user_profile').child(otherUserId).once('value').then(function(snapshot){
                    if(snapshot.val() != undefined){
                        conversationDisplayName = snapshot.val().displayName;
                        conversationImageUrl = snapshot.val().profileImageUrl;
                    }
                    var conversationImageUrlScaled = self.getImageUrl(conversationImageUrl,100);
                    self.fetchedChannelMetadataData[channelId] = {'otherUserId' : otherUserId, conversationDisplayName : conversationDisplayName, conversationImageUrl : conversationImageUrlScaled};
                    self.attachLastReadListener(channelId);
                    self.attachLastMessageListener(channelId);
                });
            });
        },


        attachLastReadListener(channelId){
            const self = this;
            self.firebaseGrowthDB.ref('/CHATS').child('user_channels').child(self.getUserDetails.userId).child(channelId).child('lastReadMessage').on('value', function(snapshot){
                if(self.channelLastMessage[channelId] != undefined){
                    if(snapshot.val() == self.channelLastMessage[channelId].messageId){
                        self.channelLastMessage[channelId].isUnread = false;
                    }
                }
                self.channelLastReadMessage[channelId] = snapshot.val();
                // for(var i=0; i < self.conversations.length; i++) {
                //     if(self.conversations[i].channelId == channelId) {
                //         if(self.conversations[i].messageId == snapshot.val()) {
                //             self.conversations[i].isUnread = false;
                //         }
                //     }
                // }
            });
        },


        attachLastMessageListener(channelId){
            const self = this;
            self.firebaseGrowthDB.ref('/CHATS').child('messages').child(channelId).limitToLast(1).on('child_added', function(snapshot){
                var message = snapshot.val();
                console.log("Last message added : ",message, " for channel : ", channelId);
                debugger;
                self.removeConversationForChannel(channelId);
                var isMessageUnread = true;
                if((message.senderId == self.getUserDetails.userId) || (self.channelLastReadMessage[channelId] == snapshot.key)){
                    isMessageUnread = false;
                }
                var messageTimeDisplay = self.parseDateDisplay(message.sendTime);
                var messageReceived = {channelId : channelId, messageId : snapshot.key, userId : self.fetchedChannelMetadataData[channelId].otherUserId, channelName : self.fetchedChannelMetadataData[channelId].conversationDisplayName, profileImageUrl : self.fetchedChannelMetadataData[channelId].conversationImageUrl, senderId : message.senderId, lastMessage : message.messageText, lastMessageTime : message.sendTime, lastMessageTimeDisplay : messageTimeDisplay, isUnread : isMessageUnread};
                self.channelLastMessage[channelId] = messageReceived;
                self.conversations.unshift(messageReceived);
                self.conversations.sort(function (l, r) { return l.lastMessageTime > r.lastMessageTime ? -1 : 1 })
            }, function(){}, self);
        },

        removeConversationForChannel(channelId) {
            const self = this;
            for(var i = 0; i< self.conversations.length; i++) {
                if(self.conversations[i].channelId == channelId) {
                    self.conversations.splice(i, 1);
                    break;
                }
            }
        },


        parseDateDisplay(sentTime){
            const self = this;
            var currentDate = new Date();
            var currentDateStart = currentDate.setHours(0,0,0,0);
            var timeToDisplay = "";
            var messageDate = new Date(sentTime);
            var messageDateKey = messageDate.toLocaleDateString();
            if(+messageDate >= +currentDateStart){
                timeToDisplay = new Date(sentTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            }
            else {
                let yesterdayDate = new Date();
                yesterdayDate.setTime(currentDate.getTime() - (24*3600000));
                let yesterdayDateStart = yesterdayDate.setHours(0,0,0,0);
                if(+messageDate >= +yesterdayDateStart){
                    timeToDisplay = "YESTERDAY";
                }
                else {
                    timeToDisplay = messageDateKey;
                }
            }
            return timeToDisplay;
        },


        loadWatchedChannels(){
            const self = this;
            setTimeout(() => {
                self.loadingConversations = false;
            }, 2000);
            self.firebaseGrowthDB.ref('/CHATS').child('user_watched_channels').child(self.getUserDetails.userId).on('child_added', function(snapshot){
                let channelId = snapshot.key;
                self.loadChannelMetadata(channelId);
            }, function(){}, self);

            self.firebaseGrowthDB.ref('/CHATS').child('user_watched_channels').child(self.getUserDetails.userId).on('child_removed', function(snapshot){
                //console.log("Watching channel removed : ", snapshot.key);
                self.conversations.remove(function(item){
                    return item.channelId == snapshot.key;
                });
                self.firebaseGrowthDB.ref('/CHATS').child('messages').child(snapshot.key).off();
            }, function(){}, self);

        },


        clearConversationsFromCache(){
            const self = this;
            ko.utils.arrayForEach(self.conversations(), function (conversation){
                if(conversation.isLoadedFromCache != undefined && conversation.isLoadedFromCache == true){
                    self.conversations.remove(function(item){
                        return item.channelId == conversation.channelId;
                    });
                }
            });
        },


        loadConversationsFromCache(){
            const self = this;
            if((appViewModel.p2pChat != undefined) && (appViewModel.p2pChat.convesationCache != undefined)){
                if(typeof appViewModel.p2pChat.convesationCache.conversations != undefined){
                    ko.utils.arrayForEach(appViewModel.p2pChat.convesationCache.conversations, function (conversation){
                        conversation.isLoadedFromCache = true;
                        self.conversations.push(conversation);
                    });
                }
                self.channelLastMessage = appViewModel.p2pChat.convesationCache.channelLastMessage;
                self.channelLastReadMessage = appViewModel.p2pChat.convesationCache.channelLastReadMessage;
                self.fetchedChannelMetadataData = appViewModel.p2pChat.convesationCache.fetchedChannelMetadataData;
            }
            setTimeout(self.clearConversationsFromCache, 4000);
        },


        updateUserProfile(){
            const self = this;
            //TODO FIGURE OUT TO DO THIS ONCE PER SESSION
            // if((appViewModel.p2pChat != undefined) && (appViewModel.p2pChat.updatedUserProfile == true)){
            //     console.log("User profile already updated for this session. Skipping update");
            //     return;
            // }
            self.firebaseGrowthDB.ref('/CHATS').child('user_profile').child(self.getUserDetails.userId).once('value').then(function(snapshot){
                if(snapshot.val() == undefined || snapshot.val.displayName != self.getUserDetails.displayName() || snapshot.val.profileImageUrl != self.getUserDetails.profileImageUrl()){
                    var userProfile = {displayName : self.getUserDetails.displayName, profileImageUrl : self.getUserDetails.profileImageUrl, profileUrl: self.getUserDetails.profilePageUrl};
                    self.firebaseGrowthDB.ref('/CHATS').child('user_profile').child(self.getUserDetails.userId).set(userProfile, function(error){
                        //TODO Figure out error handling
                        // if(error == undefined){
                        //     if(appViewModel.p2pChat == undefined){
                        //         appViewModel.p2pChat = {};
                        //     }
                        //     appViewModel.p2pChat.updatedUserProfile = true;
                        // }
                    });
                }
            });
        },

        loadMessagesForConversation(userId){
            this.$router.push('/messages/' + userId );
        },

        redirectToSourcePage(){
            var sourcePath = "/";
            if((appViewModel.p2pChat != undefined) && (appViewModel.p2pChat.sourcePagePath != undefined )){
                sourcePath = appViewModel.p2pChat.sourcePagePath;
            }
            redirect(sourcePath);
        },

        getImageUrl( imageUrl, width, compressed ) {
            const self = this;
            if( imageUrl == null ) return null;
            if( imageUrl.startsWith( "http://" ) && imageUrl.indexOf( "ptlp.co" ) !== -1 )
                imageUrl = "https://" + imageUrl.substr(7);

            if( width != null ) imageUrl = imageUrl + ( imageUrl.indexOf( "?" ) > -1 ? "&" : "?" ) + "width=" + width;
            if( compressed != null ) imageUrl = imageUrl + ( imageUrl.indexOf( "?" ) > -1 ? "&" : "?" ) + "quality=" + ( compressed ? "low" : "high" );
            imageUrl = imageUrl + ( imageUrl.indexOf( "?" ) > -1 ? "&" : "?" ) + "type=" + self.getSupportedImageType();
            return imageUrl;
        },

        getSupportedImageType() {
            function canUseWebP() {
                var elem = document.createElement( 'canvas' );
                if( !!(elem.getContext && elem.getContext('2d')) ) {
                    return elem.toDataURL( 'image/webp' ).indexOf( 'data:image/webp' ) == 0;
                }
                return false;
            }
            if( window.canUseWebp == null )
                window.canUseWebp = canUseWebP();

            return window.canUseWebp ? "webp" : "jpg";

        },
    },

    created() {
        if (this.getUserDetails.isGuest) {
            this.$router.go('/login');
        }
    },

    mounted() {
        const self = this;
        import('firebase').then((firebase) => {
            setTimeout(function() {
                self.firebaseGrowthDB = firebase.app("FirebaseGrowth").database();
                console.log("Firebase growth initialized for page");
                //self.loadConversationsFromCache();
                self.loadWatchedChannels();
                self.updateUserProfile();
            }, 3000);
        });
    },

    beforeDestroy: function() {
        const self = this;
        if(self.firebaseGrowthDB) {
            return;
        }
        var chatRef = self.firebaseGrowthDB.ref('/CHATS');
        chatRef.child('user_watched_channels').child(self.getUserDetails.userId).off();
        for (var i = 0, len = self.conversations.length; i < len; i++) {
            var conversation = self.conversations[i];
            var conversationChannel = conversation.channelId;
            chatRef.child('user_channels').child(self.getUserDetails.userId).child(conversationChannel).child('lastReadMessage').off();
            chatRef.child('messages').child(conversationChannel).off();
        }
    },

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
    @media screen and (max-width: 992px){
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
        @media screen and (max-width: 768px){
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
    .no-messages {
        margin: 10px 0;
        color: #555;
    }
}
</style>
