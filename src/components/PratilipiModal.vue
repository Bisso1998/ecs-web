<template>
    <!-- Pratilipi Modal -->
    <div class="modal fade pratilipi-modal" id="pratilipi_modal" tabindex="-1" role="dialog" aria-labelledby="pratilipi-modalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">सी - बीच पर दो पूर्व परिचित</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                    <div class="book-type STORY">
                        കഥ <span></span>
                    </div>
                    <div class="book-cover" style="background-image: url('https://4.ptlp.co/pratilipi/cover?pratilipiId=4584126513414144&version=1491204640179')"></div>
                    <div class="image-mask">
                        <span>
                            <button class="add-library">
                                <i class="material-icons">bookmark_border</i>
                                <i class="material-icons stacked grey">add</i>
                            </button>
                            <button class="add-library" style="display: none;">
                                <i class="material-icons added-to-lib">bookmark</i>
                                <i class="material-icons stacked">check</i>
                            </button>
                        </span>
                        <button type="button" data-toggle="modal"><i class="material-icons">share</i></button>
                    </div>
                    <!-- <div class="book-name">सी - बीच पर दो पूर्व परिचित</div> -->
                    <div class="author-name"><a href="#">ब्रजेंद्रनाथ मिश्रा</a></div>
                    <div class="book-stats-wrap">
                        <div class="book-stats">
                            <span class="avg-rating stars-green"><span class="rating-text">4.5</span> <i class="material-icons">star_rate</i></span>
                            <span class="review-count">100 __("rating_ratings")</span>
                        </div>
                        <div class="book-stats">
                            <span class="read-time">__("pratilipi_reading_time"): 4 मिनट</span>
                        </div>
                        <div class="book-stats">
                            <span class="read-count">__("pratilipi_count_reads"): 9876</span>
                            <span class="date">__("pratilipi_listing_date"): 06 जुलाई 2016</span>
                        </div>
                    </div>
                    <div class="book-summary">यह कहानी कॉलेज  के दिनों के दो अंतरंग  प्रेमियों  के  बिछुड़ जाने के अरसा बाद मिलने की कहानी है । ...देखिये मिलने के बाद उन दिनों के  पनपते प्रेम का  क्या होता है ...  (यह कहानी मेरे शीघ्र प्रकाशित होने वाले उपन्यास "डिवाईडर पर कॉलेज जंक्शन" से लिया गया है। )</div>
                    <a href="#" class="read-more"><span>View Summary Page</span></a>
                </div>
                <div class="modal-footer">
                    <div class="main-actions">
                        <a href="/read?id=4524562726256640" class="read-btn"><span>__("read")</span></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mixins from '@/mixins';
import PratilipiImage from '@/components/PratilipiImage';
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            
        }
    },
    computed: {

    },
    methods: {

    }
}
</script>


<style lang="scss" scoped>
.pratilipi-modal {
    &.modal.show .modal-dialog {
        top: 10%;
    }
    .modal-header, .modal-footer {
        padding: 10px;
    }
    .modal-title {
        font-size: 16px;
        width: 100%;
        text-align: left;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .modal-body {
        padding: 10px;
    }
    .book-name {
        font-size: 18px;
        font-weight: 700;
    }
    .book-type {
        font-size: 11px;
        line-height: 20px;
        font-weight: 700;
        color: #fff;
        padding: 0 20px 3px;
        background: #4CAF50;
        position: absolute;
        top: 15px;
        left: 2px;
        z-index: 1;
        height: 21px;
        &:before {
            content: '';
            position: absolute;
            border-left: 0px solid transparent;
            border-right: 10px solid transparent;
            border-top: 21px solid #4CAF50;
            bottom: -3px;
            left: 50%;
            margin-left: 0px;
            left: 100%;
            padding-bottom: 3px;
        }
        &:after {
            content: '';
            position: absolute;
            border-top: 0 solid transparent;
            border-bottom: 10px solid transparent;
            border-right: 10px solid #4CAF50;
            top: 100%;
            left: -10px;
            left: 0;
        }
        span {
            content: '';
            position: absolute;
            border-top: 0 solid transparent;
            border-bottom: 10px solid transparent;
            border-right: 10px solid rgba(0, 0, 0, 0.2);
            top: 100%;
            left: -10px;
            left: 0;
            z-index: 9;
        }
        &.ARTICLE {
            background: #42bab0;
        }
        &.ARTICLE:before {
            border-top: 21px solid #42bab0;
        }
        &.ARTICLE:after {
            border-right: 10px solid #42bab0;
        }
        &.POEM {
            background: #FF9800;
        }
        &.POEM:before {
            border-top: 21px solid #FF9800;
        }
        &.POEM:after {
            border-right: 10px solid #FF9800;
        }
    }
    .book-cover {
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        margin: 0 auto 5px;
        width: 99%;
        height: 150px;
        position: relative;
    }
    .image-mask {
        position: absolute;
        top: 5px;
        right: 5px;
        left: auto;
        margin: 5px;
        background: none;
        text-align: right;
        width: auto;
        height: auto;
        button {
            padding: 0;
            margin: 5px 5px 0 0;
            text-align: center;
            width: 40px;
            height: 40px;
            font-size: 14px;
            background: #fff;
            color: #2c3e50;
            border-radius: 50%;
            cursor: pointer;
            outline: none;
            border: 1px solid #e9e9e9;
            z-index: 2;
            position: relative;
            float: right;
            &.add-library {
                margin-right: 10px;
                i {
                    font-size: 23px;
                }
            }
            i {
                height: 40px;
                line-height: 40px;
                font-size: 18px;
                &.stacked {
                    position: absolute;
                    top: -1px;
                    left: -1px;
                    margin-left: 14px;
                    font-size: 11px;
                    color: #fff;
                    font-weight: 700;
                    &.grey {
                        color: #212121;
                        margin-left: 13.5px;
                        margin-top: -1px;
                        left: 0;
                    }
                }
            }
        }
    }
    .author-name a {
        margin: 2px 0;
        display: inline-block;
        color: #d0021b;
        font-size: 15px;
    }
    .book-summary {
        color: #212121;
        font-size: 12px;
        height: 55px;
        overflow: hidden;
        margin: 5px 0 0;
    }
    .book-stats-wrap {
        border-bottom: 1px solid #e9e9e9;
        padding-bottom: 5px;
        color: #555;
        .book-stats {
            font-size: 13px;
            margin: 2px 0;
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
    }
    .read-more {
        display: block;
        text-align: center;
        color: #d0021b;
        font-size: 12px;
        background: #fff;
        position: relative;
        padding: 2px 5px;
    }
    .main-actions {
        width: 100%;
        background: #fff;
        .read-btn {
            display: inline-block;
            width: 100%;
            height: 52px;
            line-height: 52px;
            font-size: 17px;
            text-align: center;
            background: #d0021b;
            color: #fff;
            font-weight: 700;
            border: 0;
            outline: none;
            padding: 0;
            margin: 0;
            cursor: pointer;
            &:hover {
                text-decoration: none;
                opacity: 0.8;
            }
        }
    }
    
}
</style>
