<template>
    <li class="ownReview v4">
        <div  v-if="authorId !== getUserDetails.authorId" class="comment-main-level">
            <div class="comment-avatar"><img :src="userPratilipiData.userId == 0 ? defaultAuthorImage : userPratilipiData.userImageUrl" alt="author"></div>
            <div class="comment-box">
                <div class="already-rated"  v-if="userPratilipiData.reviewDateMillis != null && !editRatingMode">
                    <button class="btn more-options" type="button" id="moreOptions" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="material-icons">more_vert</i>
                    </button>
                    <div class="dropdown-menu" aria-labelledby="moreOptions">
                        <button type="button" class="btn options-btn" data-toggle="modal" @click="openReviewAndEditRating">
                            __("review_edit_review")
                        </button>
                        <button type="button" class="btn options-btn" data-toggle="modal" @click="checkAndDeleteReview" >
                            __("review_delete_review")
                        </button>
                    </div>
                    <div class="comment-meta">
                        <h6 class="comment-name"><router-link :to="userPratilipiData.userProfilePageUrl">{{ userPratilipiData.userName }}</router-link></h6>
                        <span>{{ userPratilipiData.reviewDateMillis | convertDate }}</span>
                    </div>
                    <div class="rating">
                        <i class="material-icons" v-for="index in Number(userPratilipiData.rating)" :key="index + Math.random()">star</i>
                        <i class="material-icons" v-for="index in 5 - Number(userPratilipiData.rating)" :key="index + Math.random()">star_border</i>
                    </div>
                    <div class="comment-content">
                        {{ userPratilipiData.review }}
                    </div>
                    <button class="btn btn-primary write-review-btn" v-if="(userPratilipiData.review === '' || !userPratilipiData.review) && !editRatingMode" @click="openReview" >__("review_write_a_review")</button>
                    <div class="review-box">
                        <form>
                            <div class="form-group">
                                <textarea :value="newReview" @input="newReview = $event.target.value" class="form-control" rows="2" placeholder="__('review_write_a_review')"></textarea>
                            </div>
                            <button type="button" class="btn btn-primary" :disabled="newReview === '' || !newReview" @click="checkAndUpdateReview({ review: newReview, pratilipiId: userPratilipiData.pratilipiId })">__("save")</button>
                            <button type="button" @click="cancelReview" class="btn btn-light">__("cancel")</button>
                        </form>
                    </div>
                </div>
                <div class="rate-now" v-if="!userPratilipiData.reviewDateMillis || editRatingMode">
                    <span class="text">__("rating_your_rating")</span>
                    <fieldset class="rating" @click="openReview">
                        <input type="radio" id="star5" name="rating" value="5" :checked="userPratilipiData.rating == 5" @change="changeRating"/><label class = "full" for="star5"></label>
                        <input type="radio" id="star4" name="rating" value="4" :checked="userPratilipiData.rating == 4" @change="changeRating"/><label class = "full" for="star4"></label>
                        <input type="radio" id="star3" name="rating" value="3" :checked="userPratilipiData.rating == 3" @change="changeRating"/><label class = "full" for="star3"></label>
                        <input type="radio" id="star2" name="rating" value="2" :checked="userPratilipiData.rating == 2" @change="changeRating"/><label class = "full" for="star2"></label>
                        <input type="radio" id="star1" name="rating" value="1" :checked="userPratilipiData.rating == 1" @change="changeRating"/><label class = "full" for="star1"></label>
                    </fieldset>
                    <button class="btn btn-primary write-review-btn" v-if="!userPratilipiData.review || userPratilipiData.review === ''" @click="openReview">__("review_write_a_review")</button>
                    <button class="btn btn-primary write-review-btn" @click="openReview" v-else>__("review_edit_review")</button>
                    <div class="review-box">
                        <form>
                            <div class="form-group">
                                <textarea :value="newReview" @input="newReview = $event.target.value" class="form-control" rows="2" placeholder="__('review_write_a_review')"></textarea>
                            </div>
                            <button type="button" :disabled="newReview === '' || !newReview" class="btn btn-primary" @click="checkAndUpdateReview({ review: newReview, pratilipiId: userPratilipiData.pratilipiId })">__("save")</button>
                            <button type="button" @click="cancelReview" class="btn btn-light">__("cancel")</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </li>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import inViewport from 'vue-in-viewport-mixin';
import mixins from '@/mixins'
import Spinner from '@/components/Spinner.vue';

export default {
    mixins: [
        mixins,
        inViewport
    ],
    props: {
        userPratilipiData: {
            type: Object,
            required: true
        },
        authorId: {
            type: Number,
            required: true
        },
        'in-viewport-once': {
            default: true
        },
        screenName: {
            type: String,
            required: true
        },
        screenLocation: {
            type: String,
            required: true
        },
        pratilipiData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            newReview: '',
            editRatingMode: false
        }
    },
    computed: {
        ...mapGetters([
            'getUserDetails'
        ])
    },
    methods: {
        ...mapActions('reviews', [
            'setPratilipiRating',
            'saveOrUpdateReview',
            'deleteReview'
        ]),
        ...mapActions([
            'setAfterLoginAction'
        ]),
        changeRating(e) {
            let action = this.userPratilipiData.rating ? 'EDITRATE' : 'RATE';
            this.triggerAnanlyticsEvent(`${action}_${this.screenLocation}_${this.screenName}`, 'WGEN004', {
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': e.target.value
            });
            if (this.getUserDetails.isGuest) {
                const newRating = e.target.value;
                $('#star1').prop('checked', false);
                $('#star2').prop('checked', false);
                $('#star3').prop('checked', false);
                $('#star4').prop('checked', false);
                $('#star5').prop('checked', false);
                this.setAfterLoginAction({ action: `reviews/setPratilipiRating`, data: { 
                    rating: newRating, 
                    pratilipiId: this.userPratilipiData.pratilipiId,
                    pageName: this.$route.meta.store
                } });
                this.openLoginModal(this.$route.meta.store, 'RATE', this.screenLocation);
            } else {
                const newRating = e.target.value;
                this.setPratilipiRating({ 
                    rating: newRating, 
                    pratilipiId: this.userPratilipiData.pratilipiId,
                    pageName: this.$route.meta.store
                });
            }
        },
        checkAndUpdateReview(data) {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.pratilipiData);
            let action = this.userPratilipiData.review ? 'EDITREVIEW' : 'REVIEW';
            if (action === 'EDITREVIEW') {
                pratilipiAnalyticsData['ENTITY_STATE'] = 'UPDATE';
            }
            this.triggerAnanlyticsEvent(`${action}_${this.screenLocation}_${this.screenName}`, 'WGEN004', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': this.userPratilipiData.rating
            });
            this.editRatingMode = false;
            if (this.getUserDetails.isGuest) {
                data.pageName = this.$route.meta.store;
                this.saveOrUpdateReview(data)
                this.openLoginModal(this.$route.meta.store, 'REVIEW', this.screenLocation);
                this.cancelReview();
            } else {
                data.pageName = this.$route.meta.store;
                this.saveOrUpdateReview(data)
                this.cancelReview();
            }
        },
        checkAndDeleteReview(e) {
            this.deleteReview({ pratilipiId: this.userPratilipiData.pratilipiId, pageName: this.$route.meta.store });
        },
        openReviewAndEditRating() {
            this.openReview();
            setTimeout(() => {
                $(".write-review-btn").hide()
            }, 0);
            this.editRatingMode = true;
        },
        openReview() {
            $(".review-box").fadeIn();
            $(".write-review-btn").hide();
        },
        cancelReview(e) {
            $(".review-box").hide();
            $(".write-review-btn").fadeIn();
            this.editRatingMode = false;
        }
    },
    created() {
        this.newReview = this.userPratilipiData.review;
    },
    watch: {
        'inViewport.now': function(visible) {
            if (visible) {

                if (this.screenLocation === 'BOOKEND' && this.screenName === 'READER') {
                    this.triggerAnanlyticsEvent(`LANDED_${this.screenLocation}_${this.screenName}`, 'CONTROL', {
                        'USER_ID': this.getUserDetails.userId,
                    });    
                } else {
                    this.triggerAnanlyticsEvent(`VIEWED_${this.screenLocation}_${this.screenName}`, 'CONTROL', {
                        'USER_ID': this.getUserDetails.userId
                    });
                }
                
            }
        }
    }
}

</script>

<style lang="scss" scoped>
li {
    list-style: none;
}
.comment-main-level {
    margin: 0 5px 10px;
    text-align: center;
    position: relative;
    font-size: 14px;
    .comment-avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        position: relative;
        z-index: 1;
        border: 3px solid #FFF;
        box-shadow: 0 1px 2px rgba(0,0,0,0.2);
        overflow: hidden;
        margin: 0 auto 20px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .comment-box {
        background: #f8f8f8;
        margin-top: -50px;
        padding: 40px 5px 10px;
        overflow: hidden;
        .write-review-btn {
            background: #d0021b;
            border: 0;
            font-size: 14px;
            margin: 10px 0;
            &:focus {
                outline: none;
                box-shadow: none;
            }
            &:focus, &:active {
                background: #d0021b;
                outline: none;
                box-shadow: none !important;
            }
        }
        .already-rated {
            text-align: center;
            .more-options {
                position: absolute;
                right: 0;
                top: 30px;
                background: none;
                i {
                    font-size: 18px;
                }
            }
            .dropdown-menu .options-btn {
                font-size: 12px;
                display: block;
                padding: 5px 10px;
                background: none;
                display: block;
                width: 100%;
                text-align: left;
            }
            .comment-meta {
                .comment-name {
                    margin: 0;
                    a {
                        font-size: 14px;
                        color: #2c3e50;
                    }
                }
                span {
                    font-size: 12px;
                    margin: 5px 0;
                    display: block;
                }
            }
            .rating {
                i {
                    font-size: 18px;
                    color: #6c757d
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
                    margin-left: 5px;
                    &.btn-primary {
                        background: #d0021b;
                        border: 0;
                    }
                }
            }
        }
        .rate-now {
            text-align: center;
            span.text {
                display: block;
                margin: 0;
                font-size: 14px;
            }
            .rating {
                border: none;
                width: 160px;
                margin: 0 auto;
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
                    margin-left: 5px;
                    &.btn-primary {
                        background: #d0021b;
                        border: 0;
                    }
                }
            }
        }
    }
}
.v4 .comment-main-level .comment-box {
    background: rgba(40, 167, 69,0.2);
    .already-rated .rating i {
        color: #28a745;
    }
    .rate-now .rating input:checked ~ label:before, .rate-now .rating label:before {
        color: #28a745;
    }
    .rate-now .rating {
        width: 230px;
    }
    .rate-now .rating label:before {
        font-size: 40px;
    }
    .write-review-btn {
        margin: 5px 0;
    }
}
</style>
