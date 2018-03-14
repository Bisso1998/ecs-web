<template>
    <MainLayout>
        <div class="pratilipi-page">
            <div class="container">
                <div class="row" v-if="getPratilipiLoadingState === 'LOADING_SUCCESS'">
                    <div class="book-details col-md-12 col-lg-5 p-0">
                        <div class="card">
                            <button type="button" data-toggle="modal" @click="openShareModal" class="share-icon"><i class="material-icons">share</i></button>
                            <div class="book-image" v-bind:style="{ backgroundImage: 'url(' + getPratilipiData.coverImageUrl  + ')' }">
                                <button class="update-img" v-if="getPratilipiData.hasAccessToUpdate" @click="uploadImage('pratilipi-image')"><i class="material-icons">camera_alt</i></button>
                                <input type="file" hidden name="pratilipiimage" @change="triggerPratilipiImageUpload($event)" accept="image/*" id="pratilipiimage-uploader">
                                <div class="uploading" v-if="getImageUploadLoadingState === 'LOADING'">
                                    <Spinner></Spinner> 
                                </div>
                            </div>
                            <div class="book-title">{{ getPratilipiData.title }}</div>  
                            <router-link
                              :to="getPratilipiData.author.pageUrl"
                              class="author-name">
                              <span>{{ getPratilipiData.author.name }}</span>
                            </router-link>
                            <div class="book-stats">
                                <span class="avg-rating stars-green"><span class="rating-text">{{ getPratilipiData.averageRating | round(1) }}</span> <i class="material-icons">star_rate</i></span>
                                <span class="review-count">{{ getPratilipiData.reviewCount }} __("rating_ratings")</span>
                            </div>
                            <div class="book-stats">
                                <span class="read-time">__("pratilipi_reading_time"): {{ getPratilipiData.readingTime | showInMinutesOrHours }}</span>
                            </div>
                            <div class="book-stats">
                                <span class="read-count">__("pratilipi_count_reads"): {{ getPratilipiData.readCount }}</span>
                                <span class="date">__("pratilipi_listing_date"): {{ getPratilipiData.listingDateMillis | convertDate }}</span>
                            </div>
                            <div class="main-actions"  v-if="getUserPratilipiLoadingState === 'LOADING_SUCCESS'">
                                <button v-if="!getUserPratilipiData.addedToLib" class="library-btn" @click="addToLibrary(getPratilipiData.pratilipiId)">
                                    <span>+ __("library")</span>
                                </button>

                                <button v-if="getUserPratilipiData.addedToLib" class="library-btn" @click="removeFromLibrary(getPratilipiData.pratilipiId)">
                                    <span>- __("library")</span>
                                </button>

                                <router-link
                                  :to="getPratilipiData.readPageUrl"
                                  class="read-btn">
                                  <span>__("read")</span>
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <div class="book-synopsis col-md-12 col-lg-7 p-0">
                        <div class="card">
                            <div v-if="getPratilipiData.summary">
                                <div class="head-title">__("pratilipi_summary")</div>
                                <p class="text show-more-height">{{ getPratilipiData.summary }}</p>
                                <button class="show_more">__("show_more")</button>
                            </div>
                            <AboutAuthor :authorId="getPratilipiData.author.authorId"></AboutAuthor>
                        </div>
                        <div class="card">
                            <div class="head-title">__("pratilipi_count_reviews")</div>
                            <div class="add-review">
                                <div class="rating-box">
                                    <span class="text">__("rating_your_rating"):</span>
                                    <fieldset class="rating" @click="openReview">
                                        <input type="radio" id="star5" name="rating" value="5" /><label class = "full" for="star5"></label>
                                        <input type="radio" id="star4" name="rating" value="4" /><label class = "full" for="star4"></label>
                                        <input type="radio" id="star3" name="rating" value="3" /><label class = "full" for="star3"></label>
                                        <input type="radio" id="star2" name="rating" value="2" /><label class = "full" for="star2"></label>
                                        <input type="radio" id="star1" name="rating" value="1" /><label class = "full" for="star1"></label>
                                    </fieldset>
                                    <button class="btn btn-primary write-review-btn" @click="openReview">__("review_write_a_review")</button>
                                    <button class="btn btn-primary write-review-btn" style="display: none;">__("review_edit_review")</button>
                                </div>
                                <div class="review-box">
                                    <form>
                                        <div class="form-group">
                                            <label for="writeReview">__("review_write_a_review")</label>
                                            <textarea class="form-control" id="writeReview" rows="2"></textarea>
                                        </div>
                                        <button class="btn btn-primary">__("save")</button>
                                        <button type="button" class="btn btn-light" @click="cancelReview">__("cancel")</button>
                                    </form>
                                </div>
                            </div>
                            <Reviews :pratilipiId="getPratilipiData.pratilipiId" :authorId="getPratilipiData.author.authorId" v-if="getPratilipiLoadingState === 'LOADING_SUCCESS'"></Reviews>
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
import Spinner from '@/components/Spinner.vue';
import Reviews from '@/components/Reviews.vue';
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
            'getPratilipiLoadingState',
            'getUserPratilipiLoadingState',
            'getImageUploadLoadingState'
        ])
    },
    methods: {
        ...mapActions('pratilipipage', [
            'fetchPratilipiDetailsAndUserPratilipiData',
            'fetchUserPratilipiData',
            'addToLibrary',
            'removeFromLibrary',
            'uploadPratilipiImage'
        ]),
        ...mapActions([
            'setShareDetails'
        ]),
        openShareModal() {
            this.setShareDetails({ data: this.getPratilipiData, type: 'PRATILIPI' })
            $('#share_modal').modal('show');
        },
        uploadImage(imageType) {
            console.log('imageType', imageType);
            switch(imageType) {
                case 'pratilipi-image':
                    $('#pratilipiimage-uploader').click();
                    break;
            }
            
        },
        triggerPratilipiImageUpload(event) {
            const formData = new FormData();
            formData.append('ko_unique_6', event.target.files[0], event.target.files[0].name);
            this.uploadPratilipiImage(formData);
        },
        openReview() {
            $(".review-box").fadeIn();
        },
        cancelReview(e) {
            $(".review-box").fadeOut();
        }
    },
    created() {
        const slug_id = this.$route.params.slug_id;
        const pratilipiData = this.$route.params.pratilipiData;

        console.log(slug_id);
        this.fetchPratilipiDetailsAndUserPratilipiData(slug_id);
    },
    components: {
        MainLayout,
        Recommendation,
        AboutAuthor,
        Spinner,
        Reviews
    },
    watch: {
        '$route.params.slug_id' (slug_id) {
            this.fetchPratilipiDetailsAndUserPratilipiData(slug_id);
        },
        'getPratilipiData.pratilipiId'(pratilipiId) {
            if (pratilipiId) {
                
            }
        }
    },
    mounted() {
        $(".show_more").click(function () {
            if($(".text").hasClass("show-more-height")) {
                $(this).text("show_less");
            } else {
                $(this).text("show_more");
            }

            $(".text").toggleClass("show-more-height");
        });
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
            .share-icon {
                outline: none;
                border: 0;
                background: #9E9E9E;
                color: #fff;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                padding: 0;
                cursor: pointer;
                position: absolute;
                top: 10px;
                right: 10px;
                z-index: 2;
                i {
                    height: 40px;
                    width: 40px;
                    font-size: 18px;
                    line-height: 40px;
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
            p {
                text-align: left;
                margin: 10px;
                font-size: 14px;
                max-height: initial;
                &.show-more-height {
                    max-height: 105px;
                    overflow: hidden;
                }
            }
            .show_more {
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
                position: relative;
            }
            .update-img {
                position: absolute;
                bottom: 0;
                left: 45%;
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
            .uploading {
                background: rgba(0,0,0,0.7);
                height: 100%;
                z-index: 3;
                position: relative;
                .spinner {
                    padding-top: 80px;
                }
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
        .add-review {
            display: block;
            margin: 4px 10px;
            clear: both;
            overflow: hidden;
            .rating-box {
                span.text {
                    float: left;
                    margin: 6px 10px 0 0;
                    font-size: 14px;
                    font-weight: bold;
                    display: block;
                    width: 100%;
                }
                .write-review-btn {
                    background: #d0021b;
                    border: 0;
                    font-size: 14px;
                    float: right;
                    &:focus {
                        outline: none;
                        box-shadow: none;
                    }
                }
            }
            .rating {
              border: none;
              float: left;
              input {
                  display: none;
              }
              label:before { 
                margin: 2px 5px 0 0;
                font-size: 26px;
                font-family: 'Material Icons';
                display: inline-block;
                content: "\e83a";
                color: #d0021b;
              }
              label { 
                color: #9e9e9e; 
                float: right;
                margin: 0;
              }
              input:checked ~ label, &:not(:checked) > label:hover, &:not(:checked) > label:hover ~ label {
                  color: #d0021b;
              }
              input:checked ~ label:before { 
                  content: "\e838";
              }
            }
            .review-box {
                clear: both;
                margin: 4px 10px;
                display: none;
                label {
                    font-size: 14px;
                }
                button {
                    float: right;
                    font-size: 14px;
                    &.btn-primary {
                        background: #d0021b;
                        border: 0;
                        margin-left: 5px;
                    }
                }
            }
        }
    }
</style>
