<template>
    <MainLayout>
        <div class="static-page">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2>__("write")</h2>
                        <div class="page-content">
                            <div class="col-lg-12 d-none d-lg-block d-xl-block"><!-- Desktop only -->
                                <div class="card">
                                    <div class="card-content">
                                        <button type="button" class="btn">__("write_heading")</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 d-block d-md-block d-lg-none"><!-- Android only -->
                                <div class="card">
                                    <div class="card-content">
                                    <p>Write your stories on Pratilipi App</p>
                                        <button type="button" class="btn">Install the App</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12"><!-- LoggedIn only and has drafts -->
                                <div class="card">
                                    <div class="head-title">__("author_drafts")</div>
                                    <div class="card-content">
                                        <p>Finish writing your stories</p>
                                        <div class="draft" v-for="each_draft in draftedContents" :key="each_draft.pratilipiId">
                                            <div class="draft-img" v-bind:style="{ backgroundImage: 'url(' + each_draft.coverImageUrl + ')' }"></div>
                                            <div class="draft-name">{{ each_draft.title }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="card">
                                    <div class="head-title">__("event_events")</div>
                                    <div class="card-content">
                                        <p>Participate and win cash prizes</p>
                                        <img src="https://0.ptlp.co/resource-all/android-category-banners/events.jpg" alt="Events">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="card bg-image" v-bind:style="{ backgroundImage: 'url(https://0.ptlp.co/init/banner?language=MALAYALAM&name=Jan-18-ml-5.jpg)' }">
                                    <div class="head-title">Live Event</div>
                                    <div class="card-content">
                                        <p>Event Name</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="card">
                                    <div class="head-title">Editorial</div>
                                    <div class="card-content">
                                        <img src="https://0.ptlp.co/resource-all/android-category-banners/blog.jpg" alt="Blog">
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
import { mapGetters, mapActions, mapState } from 'vuex'
import constants from '@/constants';

export default {
    data() {
        return {
            eventData: {}
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
            draftedContents: state => state.writepage.drafts.data
        })
    },
    methods: {
        ...mapActions('writepage', [
            'fetchInitialDraftedContents',
            'fetchMoreDraftedContents'
        ]),
    },
    components: {
        MainLayout
    },
    watch: {
        'getUserDetails.authorId'(newValue) {
            this.fetchInitialDraftedContents({ 
                authorId: newValue,
                resultCount: 5
            });
        }
    },
    created() {
        constants.CATEGORY_DATA.sections.forEach((eachSection) => {
            eachSection.categories.forEach((eachCategory) => {
                if (eachCategory && eachCategory.pratilipiListData && eachCategory.pratilipiListData.eventId) {
                    this.eventData = eachCategory
                }
            });
        });
        this.fetchInitialDraftedContents({ 
            authorId: this.getUserDetails.authorId,
            resultCount: 5
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
        .card-content {
            padding: 10px;
            text-align: left;
            p {
                margin: 5px 0;
                text-align: left;
            }
            button {
                background: #d00b12;
                color: #fff;
                margin: 10px;
            }
            img {
                width: 100%;
            }
        }
        .draft {
            display: inline-block;
            border: 1px solid #e9e9e9;
            text-align: center;
            width: 150px;
            padding: 10px;
            margin: 10px;
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
            }
        }
    }
}
</style>
