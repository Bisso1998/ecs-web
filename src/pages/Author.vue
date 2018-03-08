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
                            <div class="follow-btn-w-count">
                                <button class=""><i class="material-icons">person_add</i> __("author_follow")</button><span><b>{{ getAuthorData.followCount }}</b></span>
                            </div>
                        </div>
                        <div class="col-md-12 profile-bottom" v-if="getAuthorDataLoadingState === 'LOADING_SUCCESS'">
                            <div class="profile-menu">
                                <a href="#" v-on:click="tabchange" class="active" data-tab="published"><span>{{ getAuthorData.contentPublished }}</span>__("author_published_contents")</a>
                                <a href="#" v-if="getUserDetails.userId === getAuthorData.user.userId" v-on:click="tabchange" data-tab="library">__("library")</a>
                                <a href="#" v-on:click="tabchange" data-tab="followers"><span>{{ getAuthorData.followCount }}</span>__("author_followers")</a>
                                <a href="#" v-on:click="tabchange" data-tab="following"><span>{{ getAuthorData.user.followCount }}</span>__("author_following")</a>
                            </div>
                            <div class="bottom-contents">
                                <div class="list published-contents" id="published">
                                    <PratilipiComponent
                                    :pratilipiData="pratilipiData"
                                    :key="pratilipiData.pratilipiId"
                                    v-for="pratilipiData in getPublishedContents"
                                    v-if="publishedContentsLoadingState === 'LOADING_SUCCESS' || getPublishedContents.length !== 0"
                                    :hideAddToLibrary="true"
                                    :hideAuthorName="true"
                                    ></PratilipiComponent>
                                </div>
                                <div class="list library" id="library">
                                    <PratilipiComponent
                                    :pratilipiData="pratilipiData"
                                    :key="pratilipiData.pratilipiId"
                                    v-for="pratilipiData in getLibraryList"
                                    v-if="getLibraryListLoadingState === 'LOADING_SUCCESS' || getLibraryList.length !== 0"
                                    :hideAuthorName="true"
                                    ></PratilipiComponent>
                                    <router-link
                                    :to="{ name: 'Library_Page' }"
                                    class="view_more">
                                        <div class="view_more_card">
                                            <i class="material-icons">keyboard_arrow_right</i>
                                            <span>__("view_more")</span>
                                        </div>
                                    </router-link>
                                </div>
                                <div class="list followers" id="followers">
                                    <div class="follow" v-for="each_follower in getAuthorFollowers" :key="each_follower.userId">
                                        <a :href="each_follower.profilePageUrl">
                                            <div class="follow-img" v-bind:style="{ backgroundImage: 'url(' + each_follower.profileImageUrl + (each_follower.profileImageUrl.endsWith('/author/image') ? '?' : '&')  + 'width=100)' }"></div>
                                            <div class="follow-name">{{ each_follower.author.name }}</div>
                                        </a>
                                        <div class="follow-count">__("author_followers"): <span>{{ each_follower.author.followCount }}</span></div>
                                        <button class="btn btn-light follow-link"><i class="material-icons">person_add</i> __("author_follow")</button>
                                    </div>
                                </div>
                                <div class="list following" id="following">
                                    <div class="follow" v-for="each_following in getAuthorFollowing" :key="each_following.userId">
                                        <a :href="each_following.pageUrl">
                                            <div class="follow-img" v-bind:style="{ backgroundImage: 'url(' + each_following.profileImageUrl + (each_following.profileImageUrl.endsWith('/author/image') ? '?' : '&')  + 'width=100)' }"></div>
                                            <div class="follow-name">{{ each_following.name }}</div>
                                        </a>
                                        <div class="follow-count">__("author_followers"): <span>{{ each_following.followCount }}</span></div>
                                        <button class="btn btn-light follow-link"><i class="material-icons">person_add</i> __("author_follow")</button>
                                    </div>
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
import PratilipiComponent from '@/components/Pratilipi.vue';
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
            'getAuthorFollowingCount',
            'getPublishedContents',
            'getAuthorFollowingLoadingState',
            'getAuthorFollowersLoadingState',
            'getLibraryList',
            'getLibraryListLoadingState'
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
            'fetchMoreAuthorFollowerUsers',
            'fetchInitialLibraryList',
            'removeFromLibrary'
        ]),
        tabchange(event) {
            event.preventDefault();        
            var tab_id = $(event.currentTarget).attr('data-tab');
            $(".profile-menu a").removeClass("active");
            $(event.currentTarget).addClass("active");
            $(".bottom-contents .list").hide();
            $("#" + tab_id).show();
        }
    },
    watch: {
        'getAuthorData.authorId'(newValue) {

            if (newValue) {
                this.fetchInitialPublishedContents({ 
                    authorId: newValue,
                    resultCount: 10
                });

                this.fetchInitialAuthorFollowingUsers({ 
                    userId: this.getAuthorData.user.userId, 
                    resultCount: 20
                });

                this.fetchInitialAuthorFollowerUsers({ 
                    authorId: newValue, 
                    resultCount: 20 
                });

                this.fetchInitialLibraryList(10);
            }
        },
        '$route.params.user_slug' (user_slug) {
            this.fetchAuthorDetails(user_slug);
        }
    },
    created() {
        const { user_slug } = this.$route.params;
        this.fetchAuthorDetails(user_slug);
    },
    components: {
        MainLayout,
        PratilipiComponent
    }
}
</script>

<style lang="scss" scoped>
.author-page {
    background: #fff;
    margin-top: 85px;
    text-align: left;
    @media screen and (max-width: 992px ) {
        margin-top: 135px;
        text-align: center;
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
        .follow-btn-w-count {
            color: #fff;
            margin: 10px auto;
            font-size: 14px;
            position: relative;
            text-align: center;
            display: block;
            clear: both;
            overflow: hidden;
            cursor: pointer;
            button {
                background: #d0021b;
                border: 1px solid #d0021b;
                border: 1px solid #d0021b;
                border-top-left-radius: 3px;
                border-bottom-left-radius: 3px;
                outline: none;
                color: #fff;
                margin: 0;
                padding: 5px 10px;
                display: inline-block;
                clear: both;
                cursor: pointer;
            }
            i {
                vertical-align: middle;
                padding-right: 5px;
                font-size: 18px;
            }
            span {
                background: #fff;
                color: #d0021b;
                display: inline-block;
                border: 1px solid #d0021b;
                padding: 5px 10px;
                border-top-right-radius: 3px;
                border-bottom-right-radius: 3px;
                b {
                    font-size: 12px;
                }
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
            display: none;
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
        position: relative;
        .profile-menu {
            border-bottom: 1px solid #e9e9e9;
            padding: 8px 0 10px;
            text-align: left;
            overflow: hidden;
            width: 100%;
            overflow-x: auto;
            white-space: nowrap;
            a {
                color: #555;
                font-size: 13px;
                border-bottom: 2px solid #fff;
                padding: 5px 5px 11px;
                span {
                    font-size: 12px;
                    font-weight: bold;
                    padding: 0 2px;
                    margin-right: 5px;
                    display: inline-block;
                    text-align: center;
                }
                &.active {
                    color: #d0021b;
                    border-color: #d0021b;
                    span {
                        color: #d0021b;
                    }
                }
                &:hover {
                    text-decoration: none;
                    color: #d0021b;
                }
            }
        }
        .list {
            display: none;
            margin: 20px 0;
            &.published-contents {
                display: block;
            }
            .follow {
                border: 1px solid #e9e9e9;
                width: 150px;
                display: inline-block;
                margin: 10px 5px;
                position: relative;
                text-align: center;
                a {
                    color: #d0021b;
                }
                .follow-img {
                    display: block;
                    width: 100px;
                    height: 100px;
                    margin: 10px auto;
                    border-radius: 50%;
                    background: #eee;
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                }
                .follow-name {
                    font-size: 12px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    max-width: 100%;
                    overflow: hidden;
                    padding: 0 5px 5px;
                }
                .follow-link {
                    background: #d0021b;
                    color: #fff;
                    font-size: 12px;
                    margin: 10px 0;
                    i {
                        font-size: 16px;
                        vertical-align: middle;
                    }
                }
                .follow-count {
                    font-size: 11px;
                    margin: 0;
                    span {
                        font-weight: bold;
                    }
                }
            }
        }
        a.view_more {
			position: relative;
            display: inline-block;
            vertical-align: text-bottom;
			.view_more_card {
				width: 300px;
				background: #fff;
				border: 1px solid #e9e9e9;
				height: 233px;
				margin: 0 10px;
				color: #d0021b;
                text-align: center;
                display: inline-block;
				i {
					height: 190px;
					line-height: 190px;
					width: 100%;
					font-size: 50px;
					border-bottom: 1px solid #e9e9e9;
				}
				span {
					height: 41px;
					line-height: 37px; 
					display: block;
				}
			}
			&:hover {
				text-decoration: none;
			}
		}
    }
}
</style>
