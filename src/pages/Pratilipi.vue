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
                            <div class="book-title">{{ getPratilipiData.title }} <button class="edit" v-if="getPratilipiData.hasAccessToUpdate"><i class="material-icons">mode_edit</i></button></div>
                            <router-link
                              :to="getPratilipiData.author.pageUrl"
                              class="author-name">
                              <span>{{ getPratilipiData.author.name }}</span>
                            </router-link>
                            <div class="book-stats">
                                <span class="avg-rating stars-green"><span class="rating-text">{{ getPratilipiData.averageRating | round(1) }}</span> <i class="material-icons">star_rate</i></span>
                                <span class="review-count">{{ getPratilipiData.ratingCount }} __("rating_ratings")</span>
                            </div>
                            <div class="book-stats">
                                <span class="read-time">__("pratilipi_reading_time"): {{ getPratilipiData.readingTime | showInMinutesOrHours }}</span>
                            </div>
                            <div class="book-stats">
                                <span class="read-count">__("pratilipi_count_reads"): {{ getPratilipiData.readCount }}</span>
                                <span class="date">__("pratilipi_listing_date"): {{ getPratilipiData.listingDateMillis | convertDate }}</span>
                            </div>
                            <div class="main-actions"  v-if="getUserPratilipiLoadingState === 'LOADING_SUCCESS'">
                                <div class="book-edit-actions" v-if="getPratilipiData.hasAccessToUpdate">
                                    <span v-if="getPratilipiData.state === 'PUBLISHED'">
                                        <button>__("pratilipi_move_to_drafts")</button>
                                        <button><i class="material-icons">mode_edit</i> __("pratilipi_edit_content")</button>
                                    </span>
                                    <span v-if="getPratilipiData.state === 'DRAFTED'">
                                        <button>__("pratilipi_publish_it")</button>
                                        <button><i class="material-icons">delete</i> __("pratilipi_delete_content")</button>
                                    </span>
                                </div>
                                <span v-if="!getPratilipiData.hasAccessToUpdate">
                                    <button v-if="!getUserPratilipiData.addedToLib" class="library-btn" @click="addPratilipiToLibrary(getPratilipiData.pratilipiId)">
                                        <span>+ __("library")</span>
                                    </button>

                                    <button v-if="getUserPratilipiData.addedToLib" class="library-btn" @click="removeFromLibrary(getPratilipiData.pratilipiId)">
                                        <span>- __("library")</span>
                                    </button>
                                </span>

                                <router-link
                                  v-if="getPratilipiData.hasAccessToUpdate && getPratilipiData.state === 'DRAFTED'"
                                  :to="getPratilipiData.readPageUrl"
                                  class="read-btn">
                                  <span>__("writer_preview")</span>
                                </router-link>
                                <router-link
                                  v-else
                                  :to="getPratilipiData.readPageUrl"
                                  class="read-btn">
                                  <span>__("read")</span>
                                </router-link>
                            </div>
                        </div>
                        <div class="card tags-section" v-if="getPratilipiData.hasAccessToUpdate">
                            <div class="head-title">__("tags_categories") <button class="edit"><i class="material-icons">mode_edit</i></button></div>
                            <div class="tags">
                                <span v-for="each_tag in getPratilipiData.tags" :key="each_tag.id">{{ each_tag.name}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="book-synopsis col-md-12 col-lg-7 p-0">
                        <div class="card">
                            <div v-if="getPratilipiData.summary">
                                <div class="head-title">__("pratilipi_summary") <button class="edit" v-if="getPratilipiData.hasAccessToUpdate"><i class="material-icons">mode_edit</i></button></div>
                                <p class="text show-more-height">{{ getPratilipiData.summary }}</p>
                                <button class="show_more">__("show_more")</button>
                            </div>
                            <AboutAuthor :authorId="getPratilipiData.author.authorId"></AboutAuthor>
                        </div>
                        <div class="card">
                            <div class="head-title">__("review_heading")</div>
                            <Reviews 
                                :pratilipiId="getPratilipiData.pratilipiId" 
                                :authorId="getPratilipiData.author.authorId" 
                                :userPratilipiData="getUserPratilipiData"
                                v-if="getPratilipiLoadingState === 'LOADING_SUCCESS'">
                            </Reviews>
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
import mixins from '@/mixins';
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Pratilipi',
    data() {
        return {
            pratilipi_id: null,
            pratilipiData: null,
            newReview: null
        }
    },
    mixins: [
        mixins
    ],
    computed: {
        ...mapGetters('pratilipipage', [
            'getPratilipiData',
            'getUserPratilipiData',
            'getPratilipiLoadingState',
            'getUserPratilipiLoadingState',
            'getImageUploadLoadingState'
        ]),
        ...mapGetters([
            'getUserDetails'
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
            'setShareDetails',
            'setAfterLoginAction'
        ]),
        addPratilipiToLibrary(pratilipiId) {
            if (this.getUserDetails.isGuest) {
                this.setAfterLoginAction({ action: `${this.$route.meta.store}/addToLibrary`, data: pratilipiId });
                this.openLoginModal();
            } else {
                this.addToLibrary(pratilipiId);
            }
        },
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
        },
        'getUserDetails.userId'() {
            this.fetchPratilipiDetailsAndUserPratilipiData(this.$route.params.slug_id);
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
            margin-top: 65px;
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
            button.edit {
                background: none;
                border: 0;
                i {
                    font-size: 18px;
                    vertical-align: middle;
                }
                &:focus {
                    outline: none;
                }
            }
            &.tags-section {
                .tags {
                    text-align: left;
                    span {
                        display: inline-block;
                        background: #e9e9e9;
                        border-radius: 15px;
                        color: #6c757d;
                        margin: 5px 0 10px 10px;
                        padding: 5px 12px;
                        font-size: 14px;
                    }
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
                .book-edit-actions {
                    display: block;
                    margin: 10px 0 0;
                    button {
                        background: #e9e9e9;
                        color: #212121;
                        border: 0;
                        font-size: 12px;
                        padding: 5px 10px;
                        margin: 0 5px;
                        i {
                            font-size: 16px;
                            vertical-align: middle;
                        }
                    }
                }
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
        }
    }
</style>
