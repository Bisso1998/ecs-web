<template>
    <MainLayout>
        <div class="static-page">
            <div class="container">
                <div class="page-content">
                    <div class="row">
                        <div class="col-lg-12 d-none d-lg-block d-xl-block"><!-- Desktop only -->
                            <div class="card">
                                <div class="card-content">
                                    <button type="button" class="btn">__("write_heading")</button>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 d-block d-md-block d-lg-none"><!-- Android only -->
                            <div class="card install-app">
                                <div class="card-content">
                                <a href="https://play.google.com/store/apps/details?id=com.pratilipi.mobile.android&utm_source=web_write&utm_campaign=app_download" target="_blank">
                                    <p>Write your stories on Pratilipi App</p>
                                    <img src="https://www.ptlp.co/resource-all/image/google-play-badge.png" alt="">
                                </a>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12" v-if="draftedContents.length > 0"><!-- LoggedIn only and has drafts -->
                            <div class="card">
                                <div class="head-title">__("author_drafts")</div>
                                <p class="left-w-p">Finish writing your stories</p>
                                <div class="card-content drafts" @scroll="updateScroll">
                                    
                                    <div class="draft" v-for="each_draft in draftedContents" :key="each_draft.pratilipiId">
                                        <a :href="each_draft.writePageUrl">
                                            <div class="draft-img" v-bind:style="{ backgroundImage: 'url(' + each_draft.coverImageUrl + ')' }"></div>
                                            <div class="draft-name">{{ each_draft.title }}</div>
                                        </a>
                                    </div>
                                    <Spinner v-if="draftedContentsLoadingState === 'LOADING'"></Spinner>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 col-lg-6">
                            <div class="card">
                                <div class="head-title">__("event_events")</div>
                                <div class="card-content">
                                    <router-link
                                    :to="{ path: 'event' }">
                                        <p>Participate and win cash prizes</p>
                                        <img src="https://0.ptlp.co/resource-all/android-category-banners/events.jpg" alt="Events">
                                    </router-link>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 col-lg-6">
                            <div class="card">
                                <div class="head-title">Live Event</div>
                                <div class="card-content">
                                    <router-link
                                    :to="{ path: eventData.categoryUrl }">
                                        <p>{{ eventData.title}}</p>
                                        <img :src="'https://0.ptlp.co/event/banner?eventId=' + eventData.pratilipiListData.eventId" alt="Events">
                                    </router-link>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 col-lg-6">
                            <div class="card">
                                <div class="head-title">Editorial</div>
                                <div class="card-content">
                                    <router-link
                                    :to="{ path: 'blog' }">
                                        <img src="https://0.ptlp.co/resource-all/android-category-banners/blog.jpg" alt="Blog">
                                    </router-link>
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
import Spinner from '@/components/Spinner.vue';
import { mapGetters, mapActions, mapState } from 'vuex'
import constants from '@/constants';

export default {
    data() {
        return {
            eventData: {},
            scrollPosition: null
        }
    },
    computed: {
        ...mapGetters([
            'writepage/getDraftedContents',
            'writepage/getDraftedContentsLoadingState',
            'writepage/getDraftedContentsTotalCount',
            'getUserDetails'
        ]),
        ...mapState({
            draftedContents: state => state.writepage.drafts.data,
            draftedContentsLoadingState: state => state.writepage.drafts.loading_state,
            draftedContentsCursor: state => state.writepage.drafts.cursor
        })
    },
    methods: {
        ...mapActions('writepage', [
            'fetchInitialDraftedContents',
            'fetchMoreDraftedContents'
        ]),
        updateScroll() {
            const width = $('.card-content.drafts').outerWidth();
            const newScrollLeft = $('.card-content.drafts').scrollLeft();
            const scrollWidth = $('.card-content.drafts').get(0).scrollWidth
            if (scrollWidth - newScrollLeft == width && 
                this.draftedContentsLoadingState !== 'LOADING' &&
                this.draftedContentsCursor) {
                this.fetchMoreDraftedContents({ 
                    authorId: this.getUserDetails.authorId,
                    resultCount: 10
                });
            }
        }
    },
    components: {
        MainLayout,
        Spinner
    },
    watch: {
        'getUserDetails.authorId'(newValue) {
            this.fetchInitialDraftedContents({ 
                authorId: newValue,
                resultCount: 10
            });
        }
    },
    created() {
        constants.CATEGORY_DATA.sections.forEach((eachSection) => {
            eachSection.categories.forEach((eachCategory) => {
                if (eachCategory && eachCategory.pratilipiListData && eachCategory.pratilipiListData.eventId) {
                    this.eventData = eachCategory;
                    console.log(this.eventData);
                }
            });
        });
        this.fetchInitialDraftedContents({ 
            authorId: this.getUserDetails.authorId,
            resultCount: 10
        });
    }
}
</script>

<style lang="scss" scoped>
.static-page {
    margin-top: 85px;
    text-align: left;
    background: #f8f8f8;
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
    .card {
        border-radius: 0;
        margin: 10px 0;
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
        p.left-w-p {
            text-align: left;
            padding-left: 10px;
            margin-bottom: 0;
        }
        .card-content {
            padding: 5px 10px 10px;
            text-align: left;
            p {
                margin: 0;
                text-align: left;
            }
            button {
                background: #d00b12;
                color: #fff;
                margin: 10px;
            }
            img {
                width: 100%;
                margin-top: 5px;
            }
            a {
                color: #2c3e50;
                &:hover {
                    text-decoration: none;
                }
            }
            &.drafts {
                overflow: auto;
                margin: 0 auto;
                white-space: nowrap;
                width: 100%;
                .spinner {
                    display: inline-block;
                    width: 100px;
                    height: 138px;
                    line-height: 138px;
                    vertical-align: middle;
                    padding: 0;
                }
            }
        }
        .draft {
            display: inline-block;
            border: 1px solid #e9e9e9;
            text-align: center;
            width: 150px;
            padding: 10px;
            margin: 10px 5px;
            vertical-align: middle;
            .draft-img {
                width: 75px;
                height: 75px;
                border-radius: 50%;
                background-size: cover;
                background-position: center;
                margin: 5px auto;
            }
            .draft-name {
                font-size: 14px;
                font-weight: bold;
                padding: 5px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        &.bg-image {
            background-position: right center;
        }
        &.install-app {
            background: url(https://0.ptlp.co/resource-all/android-category-banners/experiences.jpg) no-repeat right center;
            background-size: cover;
            color: #fff;
            text-align: center;
            .card-content, p {
                text-align: center;
            }
            .card-content {
                background: rgba(0,0,0,0.5);
            }
            img {
                width: 200px;
            }
            a {
                color: #fff;
            }
        }
    }
}
</style>