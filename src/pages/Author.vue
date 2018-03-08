<template>
    <MainLayout>
        <div class="author-page">
            <div class="container">
                <div class="page-content">
                    <div class="row">
                        <div class="col-md-12 profile-top" v-if="getAuthorDataLoadingState === 'LOADING_SUCCESS'">
                            <div class="profile-cover" :style="{ backgroundImage: 'url(' + getAuthorData.coverImageUrl + ')' }">
                                <div class="cover-options">
                                    <button type="button" name="button"><i class="material-icons">settings</i></button>
                                    <button type="button" name="button"><i class="material-icons">share</i></button>
                                </div>
                                <button class="update-img"><i class="material-icons">camera_alt</i></button>
                            </div>
                            <div class="profile-image">
                                <img :src="getAuthorData.imageUrl + '?width=150'" alt="profile">
                                <button class="update-img"><i class="material-icons">camera_alt</i></button>
                            </div>
                            <div class="profile-user-name">{{ getAuthorData.name }}</div>
                            <div class="profile-read-by">__("author_readby_count")</div>
                            <div class="profile-summary">
                                <p>{{ getAuthorData.summary }}</p>
                                <button type="button" class="view-more" name="button" data-toggle="modal" data-target="#summary_modal">__("view_more")</button>
                            </div>
                            <div class="modal fade summary-modal" id="summary_modal" tabindex="-1" role="dialog" aria-labelledby="summary-modalLabel" aria-hidden="true">
                              <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5 class="modal-title">__("pratilipi_summary")</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div class="modal-body social">
                                     <p>{{ getAuthorData.summary }}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button class="btn btn-light follow-link"><i class="material-icons">person_add</i> __("author_follow")</button>
                            <div class="stats-section">
                                <div><span>{{ getAuthorData.contentPublished }}</span> __("author_published_contents")</div>
                                <div><span>{{ getAuthorData.followCount }}</span> __("author_followers")</div>
                                <div><span>{{ getAuthorData.user.followCount }}</span> __("author_following")</div>
                            </div>
                        </div>
                        <div class="col-md-12 profile-bottom">
                            <div class="profile-menu">
                                <a href="#" class="active">__("author_published_contents")</a>
                                <a href="#">__("library")</a>
                                <a href="#">__("author_followers")</a>
                                <a href="#">__("author_following")</a>
                            </div>
                            <div class="bottom-contents">
                                <div class="list published-contents">
                                    
                                </div>
                                <div class="list library">
                                    
                                </div>
                                <div class="list followers">
                                    
                                </div>
                                <div class="list following">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
    name: 'Pratilipi',
    data() {
        return {
            user_id: null,
        }
    },
    computed: {
        ...mapGetters([
            'getUserDetails'
        ]),
        ...mapGetters('authorpage', [
            'getAuthorData',
            'getAuthorDataLoadingState',
            'getAuthorFollowing',
            'getAuthorFollowers',
            'getAuthorFollowingCount'
        ]),
        ...mapState({
            publishedContents: state => state.authorpage.published_contents.data,
            publishedContentsLoadingState: state => state.authorpage.published_contents.loading_state,
            publishedContentsCursor: state => state.authorpage.published_contents.cursor
        })
    },
    methods: {
        ...mapActions('authorpage', [
            'fetchInitialPublishedContents',
            'fetchMorePublishedContents',
            'fetchAuthorDetails',
            'fetchInitialAuthorFollowingUsers',
            'fetchMoreAuthorFollowingUsers',
            'fetchInitialAuthorFollowerUsers',
            'fetchMoreAuthorFollowerUsers'
        ])
    },
    watch: {
        'getAuthorData.authorId'(newValue) {

            if (newValue) {
                this.fetchInitialPublishedContents({ 
                    authorId: newValue,
                    resultCount: 10
                });

                this.fetchInitialAuthorFollowingUsers({ 
                    userId: this.getUserDetails.userId, 
                    resultCount: 20 
                });

                this.fetchInitialAuthorFollowerUsers({ 
                    authorId: newValue, 
                    resultCount: 20 
                });
            }
        }
    },
    created() {
        const { user_slug } = this.$route.params;
        this.fetchAuthorDetails(user_slug);
    },
    components: {
        MainLayout
    }
}
</script>

<style lang="scss" scoped>
.author-page {
    background: #fff;
    margin-top: 85px;
    @media screen and (max-width: 992px ) {
        margin-top: 135px;
    }
    .profile-top {
        padding: 0;
        text-align: center;
        .profile-cover {
            width: 100%;
            height: 150px;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            position: relative;
            .cover-options {
                position: absolute;
                top: 10px;
                right: 10px;
                button {
                    background: rgba(255,255,255,0.4);
                    border: 0;
                    outline: none;
                    cursor: pointer;
                    padding: 5px 10px;
                    text-align: center;
                    i {
                        vertical-align: middle;
                        font-size: 18px;
                        height: 24px;
                        line-height: 23px;
                    }
                }
            }
        }
        .profile-image {
            width: 130px;
            height: 130px;
            background: #fff;
            border: 1px solid #e9e9e9;
            padding: 4px;
            margin: -80px auto 0;
            border-radius: 50%;
            position: relative;
            img {
                width: 120px;
                height: 120px;
                border-radius: 50%;
            }
            .update-img { 
                bottom: 5px;
                left: 45px;
            }
        }
        .update-img {
            position: absolute;
            bottom: 0;
            right: 0;
            background: rgba(255,255,255,0.4);
            border: 0;
            outline: none;
            cursor: pointer;
            padding: 5px 10px;
            text-align: center;
            i {
                vertical-align: middle;
                font-size: 18px;
            }
        }
        .follow-link {
            color: #fff;
            background: #d0021b;
            margin: 10px auto;
            display: block;
            font-size: 14px;
            clear: both;
            i {
                vertical-align: middle;
                padding-right: 5px;
                font-size: 18px;
            }
        }
        .profile-user-name {
            font-weight: bold;
            margin: 5px 0 0;
        }
        .profile-read-by {
            font-size: 12px;
            margin: 5px 0;
            color: #555;
        }
        .profile-summary {    
            p {
                margin: 5px;
                font-size: 14px;
                color: #555;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            .view-more {
                text-align: center;
                background: #fff;
                color: #d00b12;
                border: 0;
                outline: none;
                cursor: pointer;
                font-size: 12px;
                float: right;
                margin: 0 10px 5px;
            }
        }
        .stats-section {
            margin: 20px 0;
            text-align: center;
            border-top: 1px solid #e9e9e9;
            border-bottom: 1px solid #e9e9e9;
            font-size: 12px;
            color: #555;
            div {
                display: inline-block;
                width: 32%;
                border-right: 1px solid #e9e9e9;
                padding: 5px;
                &:last-child {
                    border-right: 0;
                }
                span {
                    display: block;
                    font-size: 14px;
                    font-weight: bold;
                }
            }
        }
        .summary-modal {
            text-align: left;
            font-size: 14px;
            margin: 50px 0 0;
            .modal-title {
                font-size: 14px;
            }
        }
    }
    .profile-bottom {
        margin: 10px 0;
        .profile-menu {
            a {
                color: #555;
                font-size: 13px;
                border-bottom: 2px solid #fff;
                padding: 5px 0;
                margin: 0 5px;
                &.active {
                    color: #d0021b;
                    border-color: #d0021b;
                }
            }
        }
        .list {
            display: none;
            .published-contents {
                display: block;
            }
        }
    }
}
</style>
