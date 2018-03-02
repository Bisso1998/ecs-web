<template>
    <MainLayout>
        <div class="pratilipi-page">
            <div class="container">
                <div class="row" v-if="getPratilipiData && getPratilipiData.author && getPratilipiData.author.pageUrl">
                    <div class="book-details col-md-12 col-lg-5 p-0">
                        <div class="card">
                            <div class="book-image" v-bind:style="{ backgroundImage: 'url(' + getPratilipiData.coverImageUrl  + ')' }"></div>
                            <div class="book-title">{{ getPratilipiData.title }}</div>
                            <router-link
                              :to="getPratilipiData.author.pageUrl"
                              class="author-name">
                              <span>{{ getPratilipiData.author.name }}</span>
                            </router-link>
                            <div class="book-stats">
                                <span class="avg-rating stars-green"><span class="rating-text">{{ getPratilipiData.averageRating | round(1) }}</span> <i class="material-icons">star_rate</i></span>
                                <span class="review-count">{{ getPratilipiData.reviewCount }} {{ $t("rating_ratings") }}</span>
                            </div>
                            <div class="book-stats">
                                <span class="read-time">{{ $t("pratilipi_reading_time") }}: {{ getPratilipiData.readingTime | showInMinutesOrHours($t) }}</span>
                            </div>
                            <div class="book-stats">
                                <span class="read-count">{{ $t("pratilipi_count_reads") }}: {{ getPratilipiData.readCount }}</span>
                                <span class="date">{{ $t("pratilipi_listing_date") }}: {{ getPratilipiData.listingDateMillis | convertDate($t) }}</span>
                            </div>
                            <div class="main-actions">
                                <button class="library-btn" @click="addToLibrary(getPratilipiData.pratilipiId)">
                                    <span>+ {{ $t("library") }}</span>
                                </button>
                                <router-link
                                  :to="getPratilipiData.readPageUrl"
                                  class="read-btn">
                                  <span>{{ $t("read") }}</span>
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <div class="book-synopsis col-md-12 col-lg-7 p-0">
                        <div class="card">
                            <div v-if="getPratilipiData.summary">
                                <div class="head-title">{{ $t("pratilipi_summary") }}</div>
                                <p class="show-more-height">{{ getPratilipiData.summary }}</p>
                                <div class="show-more-button">
                                    <button class="show_more">{{ $t("show_more") }}</button>
                                </div>
                            </div>
                            <AboutAuthor :authorId="getPratilipiData.author.authorId"></AboutAuthor>
                        </div>
                    </div>
                    <div class="book-reviews col-md-12 p-0">
                        <div class="card">
                            <div class="head-title">{{ $t("pratilipi_count_reviews") }}</div>
                        </div>
                    </div>
                    <div class="book-recomendations col-md-12 p-0">
                        <div class="card">
                            <Recommendation
                                :contextId="getPratilipiData.pratilipiId"
                                :context="'summaryPage'"
                                v-if="getPratilipiData && getPratilipiData.pratilipiId">
                            </Recommendation>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import Recommendation from '@/components/Recommendation.vue';
import AboutAuthor from '@/components/AboutAuthor.vue';
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Pratilipi',
    data() {
        return {
            pratilipi_id: null,
            pratilipiData: null
        }
    },
    computed: {
        ...mapGetters('pratilipipage', [
            'getPratilipiData',
            'getUserPratilipiData',
            'getReviews',
            'getRecommendations'
        ])
    },
    methods: {
        ...mapActions('pratilipipage', [
            'fetchPratilipiDetailsAndUserPratilipiData',
            'fetchUserPratilipiData',
            'fetchUserReviews',
            'fetchPratilipiRecommendation',
            'setCachedPratilipiData',
            'addToLibrary',
            'removeFromLibrary'
        ]),
    },
    created() {
        const slug_id = this.$route.params.slug_id;
        const pratilipiData = this.$route.params.pratilipiData;

        if (pratilipiData) {
            this.setCachedPratilipiData(pratilipiData);
        }

        console.log(slug_id);
        this.fetchPratilipiDetailsAndUserPratilipiData(slug_id);
    },
    components: {
        MainLayout,
        Recommendation,
        AboutAuthor
    }
}
</script>

<style lang="scss" scoped>
    .pratilipi-page {
        background: #f8f8f8;
        margin-top: 85px;
        @media screen and (max-width: 992px ) {
            margin-top: 140px;
        }
        .card {
            margin: 10px;
            display: block;
            text-align: left;
            border-radius: 0;
            .head-title {
                text-align: left;
                font-weight: bold;
                font-size: 18px;
                border-left: 3px solid #d0021b;
                padding-left: 10px;
                margin: 10px 0;
            }
            p {
                text-align: left;
                margin: 10px;
                font-size: 14px;
            }
            .show-more-button {
                text-align: right;
                .show_more {
                    color: #d0021b;
                    background: none;
                    border: 0;
                    outline: none;
                    text-align: right;
                    font-size: 14px;
                    margin: 0 10px 10px;
                    cursor: pointer;
                }
            }
        }
        .book-details {
            .card {
                text-align: center;
            }
            .book-image {
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                margin: 10px 0;
                width: 100%;
                height: 200px;
            }
            .book-title {
                font-size: 18px;
                font-weight: bold;
            }
            .author-name {
                margin: 4px 0;
                display: inline-block;
                color: #d0021b;
                font-size: 15px;
            }
            .book-stats {
                font-size: 13px;
                margin: 4px 0;
                .avg-rating {
                    background-color: #37be5f;
                    color: #fff;
                    margin: 0 5px 5px 0;
                    padding: 3px 7px;
                    border-radius: 2px;
                    display: inline-block;
                    font-size: 12px;
                    vertical-align: middle;
                    .rating-text {
                        vertical-align: middle;
                    }
                    .material-icons {
                        font-size: 12px;
                        width: 16px;
                        padding-left: 5px;
                        vertical-align: middle;
                    }
                    &.stars-green {
                        background: #37be5f;
                    }
                    &.stars-orange {
                        background: #ffb500;
                    }
                    &.stars-red {
                        background: #ff6d13;
                    }
                }
                .review-count {
                    font-size: 12px;
                    margin-left: 5px;
                    span {
                        padding-left: 5px;
                    }
                }
                .read-count {
                    border-right: 1px solid;
                    padding-right: 5px;
                    margin: 0;
                    line-height: 12px;
                    display: inline-block;
                }
                .date {
                    display: inline-block;
                    padding-left: 5px;
                    display: inline-block;
                }
            }
            .main-actions {
                width: 100%;
                background: #fff;
                .library-btn, .read-btn {
                    display: inline-block;
                    width: 48%;
                    height: 52px;
                    line-height: 52px;
                    font-size: 17px;
                    text-align: center;
                    background: #fff;
                    color: #fff;
                    font-weight: 700;
                    border: 0;
                    outline: none;
                    padding: 0;
                    margin: 10px 0;
                    cursor: pointer;
                    &:hover {
                        text-decoration: none;
                        opacity: 0.8;
                    }
                }
                .library-btn {
                    background: #9E9E9E;
                }
                .read-btn {
                    background: #d0021b;
                }
            }
        }
    }
</style>
