<template>
    <div class="comments-container">
        <ul id="comments-list" class="comments-list">
            <li>
                <div class="comment-main-level">
                    <div class="comment-avatar"><img src="https://4.ptlp.co/author/image?width=150" alt="author"></div>
                    <div class="comment-box">
                        <div class="comment-head">
                            <div class="comment-meta">
                                <h6 class="comment-name"><a href="#">Agustin Ortiz</a></h6>
                                <span>20/12/2017</span>
                            </div>
                            <div class="rating">
                                <i class="material-icons">star</i>
                                <i class="material-icons">star</i>
                                <i class="material-icons">star</i>
                                <i class="material-icons">star</i>
                                <i class="material-icons">star_border</i>
                            </div>
                        </div>
                        <div class="comment-content">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo?
                        </div>
                        <div class="comment-footer">
                            <i class="material-icons">message</i>
                            <i class="material-icons">thumb_up</i>
                        </div>
                    </div>
                </div>
                <ul class="comments-list reply-list">
                    <li>
                        <div class="comment-avatar"><img src="https://4.ptlp.co/author/image?width=100" alt="author"></div>
                        <div class="comment-box">
                            <div class="comment-head">
                                <h6 class="comment-name by-author"><a href="#">Lorena Rojero</a></h6>
                                <span>21/12/2017</span>

                            </div>
                            <div class="comment-content">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo?
                            </div>
                            <div class="comment-footer">
                                <i class="material-icons">message</i>
                                <i class="material-icons">thumb_up</i>
                            </div>
                        </div>
                    </li>

                    <li>
                        <div class="comment-avatar"><img src="https://4.ptlp.co/author/image?width=100" alt=""></div>
                        <div class="comment-box">
                            <div class="comment-head">
                                <h6 class="comment-name"><a href="#">Agustin Ortiz</a></h6>
                                <span>21/12/2017</span>
                            </div>
                            <div class="comment-content">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo?
                            </div>
                            <div class="comment-footer">
                                <i class="material-icons">message</i>
                                <i class="material-icons">thumb_up</i>
                            </div>
                        </div>
                    </li>
                </ul>
            </li>

            <li>
                <div class="comment-main-level">
                    <div class="comment-avatar"><img src="https://4.ptlp.co/author/image?width=150" alt=""></div>
                    <div class="comment-box">
                        <div class="comment-head">
                            <div class="comment-meta">
                                <h6 class="comment-name"><a href="#">Abhishek Sharma</a></h6>
                                <span>20/12/2017</span>
                            </div>
                            <div class="rating">
                                <i class="material-icons">star</i>
                                <i class="material-icons">star</i>
                                <i class="material-icons">star</i>
                                <i class="material-icons">star</i>
                                <i class="material-icons">star_border</i>
                            </div>
                        </div>
                        <div class="comment-content">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo?
                        </div>
                        <div class="comment-footer">
                            <i class="material-icons">message</i>
                            <i class="material-icons">thumb_up</i>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {

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
    margin-top: 20px;
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
            .comment-meta {
                float: left;
                width: 100%;
            }
            .comment-name {
                color: #283035;
                font-size: 14px;
                font-weight: 700;
                float: left;
                margin: 0 10px 5px 0;
                a {
                    color: #283035;
                }
            }
            span {
                float: left;
                color: #999;
                font-size: 12px;
                position: relative;
                top: 1px;
            }
            .rating {
                float: left;
                i {
                    float: left;
                    color: #d0021b;
                    font-size: 18px;
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
        }
    }
}

.reply-list:before, .reply-list:after {display: none;}

.reply-list {
    padding-left: 60px;
    clear: both;
    margin-top: 15px;
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
    width: calc(100% - 55px);
}

.comment-box .comment-name.by-author:after {
    content: 'autor';
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

</style>
