<template>
    <li v-if="userPratilipiData.review">
        <div class="comment-main-level">
            <div class="comment-avatar"><img :src="userPratilipiData.userImageUrl" alt="author"></div>
            <div class="comment-box">
                <div class="already-rated" style="display: none;">
                    <button class="btn more-options" type="button" id="moreOptions" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="material-icons">more_vert</i>
                    </button>
                    <div class="dropdown-menu" aria-labelledby="moreOptions">
                        <button type="button" class="btn options-btn" data-toggle="modal" data-target="#reportModal">
                            __("review_edit_review")
                        </button>
                        <button type="button" class="btn options-btn" data-toggle="modal" data-target="#reportModal">
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
                    <button class="btn btn-primary write-review-btn" @click="openReview" style="display:none;">__("review_write_a_review")</button>
                </div>
                <div class="rate-now">
                    <span class="text">__("rating_your_rating")</span>
                    <fieldset class="rating" @click="openReview">
                        <input type="radio" id="star5" name="rating" value="5" :checked="userPratilipiData.rating == 5" @change="changeRating"/><label class = "full" for="star5"></label>
                        <input type="radio" id="star4" name="rating" value="4" :checked="userPratilipiData.rating == 4" @change="changeRating"/><label class = "full" for="star4"></label>
                        <input type="radio" id="star3" name="rating" value="3" :checked="userPratilipiData.rating == 3" @change="changeRating"/><label class = "full" for="star3"></label>
                        <input type="radio" id="star2" name="rating" value="2" :checked="userPratilipiData.rating == 2" @change="changeRating"/><label class = "full" for="star2"></label>
                        <input type="radio" id="star1" name="rating" value="1" :checked="userPratilipiData.rating == 1" @change="changeRating"/><label class = "full" for="star1"></label>
                    </fieldset>
                    <button class="btn btn-primary write-review-btn" @click="openReview">__("review_write_a_review")</button>
                    <button class="btn btn-primary write-review-btn" style="display: none;">__("review_edit_review")</button>
                    <div class="review-box">
                        <form>
                            <div class="form-group">
                                <textarea class="form-control" id="writeReview" rows="2" placeholder="__('review_write_a_review')"></textarea>
                            </div>
                            <button type="button" class="btn btn-primary">__("save")</button>
                            <button type="button" class="btn btn-light">__("cancel")</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </li>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Spinner from '@/components/Spinner.vue';

export default {
    props: {
        userPratilipiData: {
            type: Object,
            required: true
        }
    },
    methods: {
        changeRating(e) {
            const newRating = e.target.value;
            this.setPratilipiRating(newRating);
        },
        openReview() {
            $(".review-box").fadeIn();
        },
        cancelReview(e) {
            $(".review-box").fadeOut();
        }
    }
}

</script>

<style lang="scss" scoped>
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
        background: #e9e9e9;
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
                    margin-left: 10px;
                    &.btn-primary {
                        background: #d0021b;
                        border: 0;
                    }
                }
            }
        }
    }
}
</style>
