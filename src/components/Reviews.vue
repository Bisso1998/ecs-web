<template>
    <div class="comments-container">
        <ul id="comments-list" class="comments-list" v-if="getReviewsLoadingState === 'LOADING_SUCCESS' || getReviewsData.length > 0">
            <OwnReview :userPratilipiData="userPratilipiData" :authorId="authorId"></OwnReview>
            <li class="all-reviews" v-if="getReviewsData.length > 0">__("pratilipi_count_reviews")</li>
            <li class="no-results" v-if="getReviewsData.length === 0">__("pratilipi_no_reviews")</li>
            <Review 
                v-for="eachReview in getReviewsData" 
                :loadCommentsOfReview="loadCommentsOfReview"
                :likeOrDislikeReview="likeOrDislikeReview" 
                :userPratilipiData="userPratilipiData"
                :eachReview="eachReview" :key="eachReview.userPratilipiId"
                :authorId="authorId"
                :createComment="verifyAndCreateComment"
                :deleteComment="deleteComment"
                :likeOrDislikeComment="verifyAndLikeComment"
                :updateComment="updateComment"></Review>
        </ul>
        <Spinner v-if="getReviewsLoadingState === 'LOADING'"></Spinner>
        <button v-if="getReviewsCursor !== null" @click="loadMoreReviews({ resultCount: 3, pratilipiId })" class="show-more">__("show_more")</button>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Spinner from '@/components/Spinner.vue';
import Review from '@/components/Review.vue';
import mixins from '@/mixins';
import OwnReview from '@/components/OwnReview.vue';

export default {
    props: {
        pratilipiId: {
            type: Number,
            required: true
        },
        authorId: {
            type: Number,
            required: true
        },
        userPratilipiData: {
            type: Object
        }
    },
    mixins: [
        mixins
    ],
    computed: {
        ...mapGetters('reviews', [
            'getReviewsLoadingState',
            'getReviewsData',
            'getReviewsCursor'
        ]),
        ...mapGetters([
            'getUserDetails'
        ])
    },
    methods: {
        ...mapActions('reviews', [
            'fetchPratilipiReviews',
            'loadMoreReviews',
            'loadCommentsOfReview',
            'likeOrDislikeReview',
            'createComment',
            'updateComment',
            'deleteComment',
            'likeOrDislikeComment'
        ]),
        ...mapActions([
            'setAfterLoginAction'
        ]),
        verifyAndCreateComment(data) {
            if (this.getUserDetails.isGuest) {
                // throw popup modal
                this.setAfterLoginAction({ action: `reviews/createComment`, data });
                this.openLoginModal();
            } else {
                this.createComment(data);
            }
        },
        verifyAndLikeComment(data) {
            if (this.getUserDetails.isGuest) {
                // throw popup modal
                this.setAfterLoginAction({ action: `reviews/likeOrDislikeComment`, data });
                this.openLoginModal();
            } else {
                this.likeOrDislikeComment(data);
            }
        }
    },
    created() {
        this.fetchPratilipiReviews({ pratilipiId: this.pratilipiId, resultCount: 2 });
    },
    components: {
        Spinner,
        Review,
        OwnReview
    }
}

</script>

<style lang="scss" scoped>
.comments-container {
    margin: 0 auto 15px;
    width: 100%;
    max-width: 700px;
    h1 {
        font-size: 36px;
        color: #283035;
        font-weight: 400;
    }
    h1 a {
        font-size: 18px;
        font-weight: 700;
    }
}
.read-page .comments-container {
    max-height: none;
    overflow: visible;
}
.comments-list {
    margin-top: 10px;
    position: relative;
    padding-left: 5px;
    li.all-reviews, li.no-results {
        font-size: 12px;
        font-weight: bold;
        color: #6c757d;
        margin: 0 0 10px 5px;
        list-style: none;
    }
    li.no-results {
        text-align: center;
        font-size: 13px;
    }
}
.show-more {
    text-align: center;
    font-size: 14px;
    width: 100%;
    display: block;
    color: #d0021b;
    background: none;
    border: 0;
    &:focus {
        outline: none;
    }
}
</style>
