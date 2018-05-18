<template>
    <div class="pratilipi-wrap">
        <div class="pratilipi">
            <div class="book-type" :class="pratilipiData.type">
                {{ pratilipiData.type | getPratilipiTypeInNativeLanguage }} <span></span>
            </div>
            <PratilipiImage :coverImageUrl="pratilipiData.coverImageUrl"></PratilipiImage>
            <div class="pratilipi-details">
                <span class="title">{{ pratilipiData.title }}</span>
                <p class="summary">__("pratilipi_listing_date"): {{ pratilipiData.createdAt | convertDate }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import mixins from '@/mixins';
import PratilipiImage from '@/components/PratilipiImage';
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'Pratilipi',
    props: {
        pratilipiData: {
            type: Object,
            required: true
        }
    },
    mixins: [
        mixins
    ],
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters([
            'getUserDetails'
        ])
    },
    methods: {
        ...mapActions([
            'setShareDetails',
            'setAfterLoginAction'
        ]),
        ...mapActions('pratilipimodal', [
            'setPratilipiModalData',
            'fetchPratilipiData'
        ]),
        
    },
    components: {
        PratilipiImage
    }
}
</script>

<style lang="scss" scoped>
    a:hover, a:focus {
        text-decoration: none;
        outline: none;
    }
    .list-page .pratilipi-wrap, .event-list .pratilipi-wrap, .event-list .pratilipi-wrap .pratilipi, .author-page .pratilipi-wrap, .search-page .pratilipi-wrap {
        display: inline-block;
    }
    .pratilipi {
        width: 300px;
        margin: 10px;
        background: #fff;
        border: 1px solid #e9e9e9;
        position: relative;
        @media screen and (max-width: 768px ) {
            width: 260px;
            margin: 10px 8px;
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
            left: -10px;
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
        .pratilipi-image {
            margin: 5px;
            height: 150px;
            background-size: cover;
            background-position: center;
            position: relative;
        }
        .image-mask {
            position: absolute;
            top: 0;
            margin: 5px;
            transition: all 0.5s, visibility 0s;
            -ms-transition: all 0.5s, visibility 0s;
            -webkit-transition: all 0.5s, visibility 0s;
            -moz-transition: all 0.5s, visibility 0s;
            opacity: 1;
            background: none;
            text-align: right;
            width: auto;
            height: auto;
            right: 0;
            left: auto;
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
                &.add-library i {
                    font-size: 23px;
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
                        font-weight: bold;
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
        &:hover .image-mask {
            opacity: 1;
        }
        
        .pratilipi-details {
            text-align: left;
            padding: 0 10px;
            position: relative;
            span {
                display: block;
                color: #212121;
                width: 100%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                &.title {
                    font-size: 17px;
                }
                &.author {
                    font-size: 13px;
                    color: #555555;
                }
            }
            .summary {
                color: #212121;
                font-size: 12px;
                overflow: hidden;
                margin: 5px 0 10px;
            }
        }
        .stats {
            border-top: 1px solid #e9e9e9;
            margin-top: 5px;
            overflow: hidden;
            text-align: center;
            .rating, .read-count, .read-time {
                float: left;
                width: 32%;
                padding: 10px 2px;
                font-size: 12px;
                color: #212121;
                .icons {
                    display: inline-block;
                    vertical-align: middle;
                    padding-right: 4px;
                    i {
                        font-size: 13px;
                    }
                }
            }
            .read-count, .read-time {
                border-left: 1px solid #e9e9e9;
                padding: 10px 0;
            }
            .read-time {
                font-size: 12px;
            }
        }
    }
    .language-ta .pratilipi .stats .read-time, .language-te .pratilipi .stats .read-time, .language-ml .pratilipi .stats .read-time, .language-kn .pratilipi .stats .read-time {
        font-size: 10px;
        @media screen and (max-width: 768px ) {
            font-size: 8.5px;
        }
    }
</style>
