<template>
    <li>
        <div class="comment-main-level">
            <div class="comment-avatar"><img :src="eachReview.userImageUrl" alt="author"></div>
            <div class="comment-box">
                <div class="comment-head">
                    <div class="comment-meta">
                        <h6 class="comment-name"><router-link :to="eachReview.userProfilePageUrl">{{ eachReview.userName }}</router-link></h6>
                        <button class="btn more-options" type="button" id="moreOptions" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="material-icons">more_vert</i>
                        </button>
                        <div class="dropdown-menu" aria-labelledby="moreOptions">
                            <button type="button" class="btn options-btn" data-toggle="modal" data-target="#reportModal">
                                __("report_button")
                            </button>
                        </div>
                    </div>
                    <div class="rating">
                        <i class="material-icons" v-for="index in eachReview.rating" :key="index + Math.random()">star</i>
                        <i class="material-icons" v-for="index in 5 - eachReview.rating" :key="index + Math.random()">star_border</i>
                    </div>
                    <span class="review-date">{{ eachReview.reviewDateMillis | convertDate }}</span>
                </div>
                <div class="comment-content">
                    {{ eachReview.review }}
                </div>
                <div class="comment-footer">
                    <button type="button" :class="{ 'active': eachReview.isLiked }" @click="likeOrDislikeReview(eachReview.userPratilipiId)" name="button"><span class="counter">{{ eachReview.likeCount }}</span><i class="material-icons">thumb_up</i></button>
                    <button type="button" name="button" @click="toggleComments({ resultCount: eachReview.commentCount, parentId: eachReview.userPratilipiId })"><span class="counter">{{ eachReview.commentCount }}</span><i class="material-icons">message</i></button>
                </div>
            </div>
        </div>
        <Spinner v-if="eachReview.comments.loading_state === 'LOADING'"></Spinner>
        <ul class="comments-list reply-list">
            <li 
                v-for="eachComment in eachReview.comments.data" :key="eachComment.commentId"
                v-if="eachReview.comments && eachReview.comments.data && eachReview.comments.data.length > 0 && eachReview.comments.loading_state === 'LOADING_SUCCESS'">
                <div class="comment-avatar"><img :src="eachComment.user.profileImageUrl" alt="author"></div>
                <div class="comment-box">
                    <div class="comment-head">
                        <h6 class="comment-name" :class="{ 'by-author': eachComment.user.author.authorId === authorId }"><a href="#">{{ eachComment.user.displayName }}</a></h6>
                        <button class="btn more-options" type="button" id="moreOptions2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="material-icons">more_vert</i>
                        </button>
                        <div class="dropdown-menu" aria-labelledby="moreOptions2">
                            <button type="button" @click="editComment(eachComment.commentId)" class="btn options-btn" data-toggle="modal" data-target="">
                                __("review_edit_review")
                            </button>
                            <button type="button" class="btn options-btn" data-toggle="modal" data-target="">
                                __("review_delete_review")
                            </button>
                            <button type="button" class="btn options-btn" data-toggle="modal" data-target="#reportModal">
                                __("report_button")
                            </button>
                        </div>
                        <span class="review-date"> {{ eachComment.creationDateMillis | convertDate }} </span>
                    </div>
                    <div class="comment-content non-editable">
                        {{ eachComment.content }}
                    </div>
                    <div style="display: none" :class="['comment-content editable', String(eachComment.commentId)]">
                        <form>
                            <div class="form-group">
                                <label for="writeReply">__("comment_reply_to_comment")</label>
                                <textarea class="form-control" :value='eachComment.content' @input="updatedComment = $event.target.value" rows="2" placeholder="__('comment_reply_comment_help')"></textarea>
                            </div>
                            <button type="button" class="btn btn-primary" @click="updateCommentAndToggle({ commentId: eachComment.commentId, content: updatedComment })">__("save")</button>
                            <button type="button" class="btn btn-light" @click="cancelReview">__("cancel")</button>
                        </form>
                    </div>
                    <div class="comment-footer">
                        <button type="button" :class="{ 'active': eachComment.isLiked}" name="button"><span class="counter"></span><i class="material-icons">thumb_up</i></button>
                        <button type="button" name="button"><span class="counter"></span><i class="material-icons">message</i></button>
                    </div>
                </div>
            </li>
            <li class="add-reply">
                <div class="comment-avatar"><img :src="userPratilipiData.userId == 0 ? defaultAuthorImage : userPratilipiData.userImageUrl" alt="author"></div>
                <div class="comment-box">
                    <div class="comment-head">
                        <h6 class="comment-name"><a href="#">{{userPratilipiData.userName}}</a></h6>
                    </div>
                    <div class="comment-content">
                        <form>
                            <div class="form-group">
                                <label for="writeReply">__("comment_reply_to_comment")</label>
                                <textarea class="form-control" :value='newComment' @input="newComment = $event.target.value" rows="2" placeholder="__('comment_reply_comment_help')"></textarea>
                            </div>
                            <button type="button" class="btn btn-primary" @click="() => {createComment({ userPratilipiId: eachReview.userPratilipiId, content: newComment }); newComment = ''; }">__("save")</button>
                            <button type="button" class="btn btn-light" @click="cancelReview">__("cancel")</button>
                        </form>
                    </div>
                </div>
            </li>
        </ul>
        <ReviewReport></ReviewReport>
    </li>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import mixins from '@/mixins'
import Spinner from '@/components/Spinner.vue';
import ReviewReport from '@/components/ReviewReport.vue';

export default {
    mixins: [
        mixins
    ],
    data() {
        return {
            newComment: '',
            x: ''
        }
    },
    props: {
        eachReview: {
            type: Object,
            required: true
        },
        likeOrDislikeReview: {
            type: Function,
            required: true
        },
        loadCommentsOfReview: {
            type: Function,
            required: true
        },
        userPratilipiData: {
            type: Object,
            required: true
        },
        createComment: {
            type: Function,
            required: true
        },
        updateComment: {
            type: Function,
            required: true
        },
        authorId: {
            type: Number,
            required: true
        }
    },
    methods: {
        cancelReview(e) {
            $(".review-box").fadeOut();
        },
        toggleComments(data) {
            $(this.$el).find(".reply-list").toggle();
            this.loadCommentsOfReview(data);
        },
        editComment(commentId) {
            $(this.$el).find(".comment-content.editable." + commentId).toggle();
        },
        updateCommentAndToggle(data) {
            $(this.$el).find(".comment-content.editable." + data.commentId).toggle();
            this.updateComment(data);
        }
    },
    computed: {
        ...mapGetters([
            'getUserDetails'
        ])
    },
    components: {
        Spinner,
        ReviewReport
    }
}

</script>

<style lang="scss" scoped>
.comments-container {
    margin: 0 0 15px;
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
.comments-list {
    margin-top: 10px;
    position: relative;
    padding-left: 5px;
    li {
        margin-bottom: 15px;
        display: block;
        position: relative;
        &:after {
            content: '';
            display: block;
            clear: both;
            height: 0;
            width: 0;
        }
    }
    .comment-avatar {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        position: relative;
        z-index: 1;
        float: left;
        border: 3px solid #FFF;
        -webkit-box-shadow: 0 1px 2px rgba(0,0,0,0.2);
        -moz-box-shadow: 0 1px 2px rgba(0,0,0,0.2);
        box-shadow: 0 1px 2px rgba(0,0,0,0.2);
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .comment-box {
        width: calc(100% - 70px);
        margin-right: 10px;
        float: right;
        position: relative;
        -webkit-box-shadow: 0 1px 1px rgba(0,0,0,0.15);
        -moz-box-shadow: 0 1px 1px rgba(0,0,0,0.15);
        box-shadow: 0 1px 1px rgba(0,0,0,0.15);
        &:before, &:after {
            content: '';
            height: 0;
            width: 0;
            position: absolute;
            display: block;
            border-width: 10px 12px 10px 0;
            border-style: solid;
            border-color: transparent #FCFCFC;
            top: 8px;
            left: -11px;
        }
        &:before {
            border-width: 11px 13px 11px 0;
            border-color: transparent rgba(0,0,0,0.05);
            left: -12px;
        }
        .comment-head {
            background: #FCFCFC;
            padding: 10px 12px;
            border-bottom: 1px solid #E5E5E5;
            overflow: hidden;
            -webkit-border-radius: 4px 4px 0 0;
            -moz-border-radius: 4px 4px 0 0;
            border-radius: 4px 4px 0 0;
            @media screen and (max-width: 768px ) {
                padding: 4px 5px 4px 10px;
            }
            .comment-meta {
                float: left;
                width: 100%;
            }
            .comment-name {
                color: #283035;
                font-size: 13px;
                font-weight: 700;
                float: left;
                margin: 0 5px 5px 0;
                width: calc(100% - 25px);
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                @media screen and (max-width: 768px ) {
                    margin: 0 5px 2px 0;
                }
                a {
                    color: #283035;
                }
            }
            span.review-date {
                float: left;
                color: #999;
                font-size: 12px;
                position: relative;
            }
            .more-options {
                float: right;
                padding: 0;
                background: none;
                i {
                    font-size: 18px;
                }
            }
            .dropdown-menu {
                padding: 0;
                .options-btn {
                    font-size: 12px;
                    display: block;
                    padding: 10px;
                    background: none;
                    width: 100%;
                    text-align: left;
                }
            }
            .rating {
                float: left;
                margin-right: 10px;
                i {
                    float: left;
                    color: #aeadae;
                    font-size: 14px;
                    margin: 0;
                }
            }
        }
        .comment-content {
            background: #FFF;
            padding: 12px;
            font-size: 14px;
            color: #595959;
            -webkit-border-radius: 0 0 4px 4px;
            -moz-border-radius: 0 0 4px 4px;
            border-radius: 0 0 4px 4px;
            @media screen and (max-width: 768px ) {
                padding: 4px 7px;
                font-size: 13px;
            }
        }
        .comment-footer {
            border-top: 0px solid #e5e5e5;
            padding: 5px;
            @media screen and (max-width: 768px ) {
                padding: 0px 5px;
            }
            button {
                background: none;
                border: 0;
                padding: 2px 0;
                &:focus {
                    outline: none;
                }
                &.active {
                    color: #d0021b;
                    i {
                        color: #d0021b;
                    }
                }
            }
            span {
                font-size: 12px;
                vertical-align: middle;
                padding: 0 4px;
            }
            i {
                font-size: 16px;
                color: #6c757d;
                margin: 0 8px 0 4px;
                vertical-align: middle;
                cursor: pointer;
            }
            .write-reply {
                font-size: 12px;
                padding: 0 5px;
            }
        }
    }
}
.reply-list:before, .reply-list:after {display: none;}
.reply-list {
    padding-left: 40px;
    clear: both;
    margin-top: 15px;
    display: none;
    .comment-avatar {
        width:35px;
        height: 35px;
    }
}
.comment-main-level:after {
    content: '';
    width: 0;
    height: 0;
    display: block;
    clear: both;
}
.reply-list .comment-box {
    width: calc(100% - 60px);
}
.comment-box .comment-name.by-author:after {
    content: '__("author_author")';
    background: #283035;
    color: #FFF;
    font-size: 12px;
    padding: 3px 5px;
    font-weight: 700;
    margin-left: 10px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
}
.comments-list li .add-reply {
    list-style: none;
    textarea, label {
        font-size: 13px;
    }
    .btn {
        font-size: 12px;
        float: right;
        padding: 4px 7px;
        margin-bottom: 5px;
        &.btn-primary {
            background: #d0021b;
            border: 0;
            margin-left: 5px;
        }
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
