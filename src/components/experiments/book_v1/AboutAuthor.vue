<template>
    <div class="about-author">
        <div class="wrap" v-if="getAuthorDetails.pageUrl">
            <div class="head-title">__("author_about")</div>
            <router-link
                :to="getAuthorDetails.pageUrl"
                @click.native="triggerClickAuthorEvent"
                class="author-link">
                <img :src="getLowResolutionImage(getAuthorDetails.profileImageUrl)" alt="author" class="auth-img" >
                <div class="auth-name">{{ getAuthorDetails.name }}</div>
            </router-link>
            <div class="author-actions">
                <button class="btn btn-light follow-link" @click="checkUserAndFollowAuthor" v-if="!getAuthorDetails.following && getUserDetails.authorId !== getAuthorDetails.authorId"><i class="material-icons">person_add</i> __("author_follow") <span class="follow-count">({{getAuthorDetails.followCount | showThousandsInK(1)}})</span></button>
                <button class="btn btn-light follow-link following" @click="checkUserAndFollowAuthor" v-if="getAuthorDetails.following && getUserDetails.authorId !== getAuthorDetails.authorId">__("author_unfollow")</button>
                <div class="message-btn" v-if="getAuthorDetails.user && getAuthorDetails.user.userId && getUserDetails.userId !== getAuthorDetails.user.userId" @click="messageUser">
                    <i class="material-icons">chat</i> __("chat_message")
                </div>
            </div>
            <p class="auth-desc show-more-height">{{ getAuthorDetails.summary }}</p>
            <button type="button" v-if="showShowMoreOfSummary" class="show_more_auth_desc" name="button" data-toggle="modal" data-target="#auth_summary_modal">__("view_more")</button>
            <!-- SUMMARY MODAL -->
            <div class="modal fade summary-modal" id="auth_summary_modal" tabindex="-1" role="dialog" aria-labelledby="summary-modalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">__("pratilipi_summary")</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body social">
                     <p>{{ getAuthorDetails.summary }}</p>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import inViewport from 'vue-in-viewport-mixin';
import mixins from '@/mixins';

export default {
    name: 'About-Author',
    props: {
        authorId: {
            type: Number,
            required: true
        },
        'in-viewport-once': {
            default: true
        },
        'in-viewport-offset-top': {
            default: -56
        },
        pratilipiData: {
            type: Object,
            required: true
        }
    },
    mixins: [
        mixins,
        inViewport
    ],
    data() {
        return {
            showShowMoreOfSummary: false
        }
    },
    computed: {
        ...mapGetters([
            'getUserDetails'
        ]),
        ...mapGetters('pratilipipage', [
            'getAuthorDetails',
            'getAuthorDetailsLoadingState',
            'getRouteToMessageUserState'
        ])
    },
    methods: {
        ...mapActions('pratilipipage', [
            'fetchAuthorDetails',
            'followOrUnfollowAuthor',
            'triggerRouteToMessageUser'
        ]),
        ...mapActions([
            'setAfterLoginAction'
        ]),
        detectOverflow() {
            const element = $('.auth-desc.show-more-height');
            const offsetHeight = element.prop('offsetHeight');
            const scrollHeight = element.prop('scrollHeight');

            if (offsetHeight < scrollHeight) {
                // your element have overflow
                this.showShowMoreOfSummary = true;
            } else {
                // your element doesn't have overflow
                this.showShowMoreOfSummary = false;
            }   
        },
        checkUserAndFollowAuthor() {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.pratilipiData);
            let action = !this.getAuthorDetails.following ? 'FOLLOW' : 'UNFOLLOW';
            this.triggerAnanlyticsEvent(`${action}_AUTHORDETAIL_BOOK`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': this.getAuthorDetails.followCount,
                'AUTHOR_ID': this.getAuthorDetails.authorId
            });
            if (this.getUserDetails.isGuest) {
                this.setAfterLoginAction({ action: `${this.$route.meta.store}/followOrUnfollowAuthor`});
                this.openLoginModal(this.$route.meta.store, 'FOLLOW', 'AUTHORDETAILS');
            } else {
                this.followOrUnfollowAuthor();
            }
        },
        triggerClickAuthorEvent() {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.pratilipiData);
            this.triggerAnanlyticsEvent(`CLICKUSER_AUTHORDETAIL_BOOK`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'PARENT_ID': this.getAuthorDetails.user.userId,
                'AUTHOR_ID': this.getAuthorDetails.authorId
            });
        },
        messageUser() {
            this.triggerAnanlyticsEvent('STARTCHAT_AUTHORDETAIL_BOOK', 'WGEN021', {
                'USER_ID': this.getUserDetails.userId,
                'RECEIVER_ID': this.getAuthorDetails.authorId
            });
            
            if (this.getUserDetails.isGuest) {
                this.setAfterLoginAction({ action: `${this.$route.meta.store}/triggerRouteToMessageUser`, data: true });
                this.openLoginModal(this.$route.meta.store, 'STARTCHAT', 'USER_USERM');
            } else {
                this.$router.push({path : '/messages/' + this.getAuthorDetails.user.userId, query : {profileImageUrl:this.getAuthorDetails.profileImageUrl, displayName: this.getAuthorDetails.fullName, profileUrl: this.getAuthorDetails.pageUrl}});
            }
        }
    },
    components: {
        
    },
    watch: {
        'getRouteToMessageUserState'(state) {
            console.log(state);
            if (state) {
                this.triggerRouteToMessageUser(false);
                this.$router.push({path : '/messages/' + this.getAuthorDetails.user.userId, query : {profileImageUrl:this.getAuthorDetails.profileImageUrl, displayName: this.getAuthorDetails.fullName, profileUrl: this.getAuthorDetails.pageUrl}});
            }
        },
        
        'getAuthorDetailsLoadingState'( state ) {
            if (state === 'LOADING_SUCCESS') {
                const that = this;
                setTimeout(() => {
                    that.detectOverflow();    
                }, 0);
            }
        },
        'inViewport.now'(visible) {
            if (visible) {
                const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.pratilipiData);
                this.triggerAnanlyticsEvent(`VIEWED_AUTHORDETAIL_BOOK`, 'CONTROL', {
                    ...pratilipiAnalyticsData,
                    'USER_ID': this.getUserDetails.userId
                });
                
            }
        }
    },
    created() {
        if (this.getRouteToMessageUserState) {
            this.triggerRouteToMessageUser(false);
            this.$router.push({path : '/messages/' + this.getAuthorDetails.user.userId, query : {profileImageUrl:this.getAuthorDetails.profileImageUrl, displayName: this.getAuthorDetails.fullName, profileUrl: this.getAuthorDetails.pageUrl}});
        }
        this.fetchAuthorDetails(this.authorId);
    }
}
</script>

<style  lang="scss" scoped>
    p {
        text-align: left;
        margin: 10px 10px 5px;
        font-size: 14px;
        max-height: initial;
        &.show-more-height {
            max-height: 65px;
            overflow: hidden;
        }
    }
    .head-title {
        text-align: left;
        font-weight: bold;
        font-size: 18px;
        border-left: 3px solid #d0021b;
        padding-left: 10px;
        margin: 10px 0;
    }
    .author-link {
        color: #d0021b;
        float: left;
        .auth-img {
            border-radius: 50%;
            width: 50px;
            height: 50px;
            margin-left: 10px;
            display: inline-block;
        }
        .auth-name {
            text-align: left;
            display: inline-block;
            margin: 0 10px;
            font-size: 14px;
            vertical-align: middle;
            @media screen and (max-width: 768px ) {
                max-width: 200px;
            }
        }
        &:hover {
            text-decoration: none;
        }
    }
    .author-actions {
        float: right;
        @media screen and (max-width: 768px ) {
            float: left;
        }
        .follow-link {
            color: #d0021b;
            float: left;
            margin: 5px 0 10px 10px;
            font-size: 14px;
            border-color: #d0021b;
            i {
                vertical-align: middle;
                padding-right: 5px;
                font-size: 18px;
            }
            span.follow-count {
                font-size: 10px;
                vertical-align: text-bottom;
            }
        }
        .message-btn {
            background: #3b5998;
            color: #fff;
            display: inline-block;
            border-radius: 3px;
            vertical-align: middle;
            font-size: 14px;
            text-align: center;
            padding: 5px 10px;
            margin-left: 10px;
            border: 1px solid #3b5998;
            cursor: pointer;
            float: left;
            margin: 5px 10px 10px;
            height: 35px;
            i {
                vertical-align: middle;
                padding-right: 5px;
                font-size: 18px;
            }
        }
    }
    .auth-desc {
        text-align: left;
        margin-left: 10px;
        clear: both;
    }
    .show_more_auth_desc {
        color: #d0021b;
        width: 100%;
        background: none;
        border: 0;
        outline: none;
        text-align: right;
        font-size: 14px;
        margin: 0 0 10px;
        cursor: pointer;
    }
</style>
