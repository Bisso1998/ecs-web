<template>
    <div>
        <div class="pratilipi">
            <div class="book-type" :class="pratilipiData.type">
                {{ pratilipiData.type | getPratilipiTypeInNativeLanguage($t) }} <span></span>
            </div>
            <router-link :to="{ name: 'Pratilipi', params: { 
                slug_id: pratilipiData.slug.split('/').pop(),
                pratilipiData }}" :title="pratilipiData.title">
                <div 
                    class="pratilipi-image" 
                    :style="{ 'background-image': 'url(' + pratilipiData.coverImageUrl + ')' }">
                </div>
            </router-link>
            <div class="image-mask">
                <button><i class="material-icons">share</i></button>
                <button>
                    <i v-if="!pratilipiData.addedToLib" class="material-icons" @click="addPratilipiToLibrary(pratilipiData.pratilipiId)">bookmark_border</i>
                    <i v-else class="material-icons added-to-lib" @click="removeFromLibrary(pratilipiData.pratilipiId)">bookmark</i>
                </button>
            </div>
            <router-link :to="{ name: 'Pratilipi', params: { 
                slug_id: pratilipiData.slug.split('/').pop(),
                pratilipiData }}" :title="pratilipiData.title">
                <div class="pratilipi-details">
                    <span class="title">{{ pratilipiData.title }}</span>
                    <span class="author">{{ pratilipiData.author.displayName }}</span>
                </div>
                <div class="stats">
                    <div class="rating">
                        <div class="icons">
                            <i class="material-icons">star</i>
                        </div>
                        <span>
                            {{ pratilipiData.averageRating | round(1) }}
                        </span>
                    </div>
                    <div class="read-count">
                        <div class="icons">
                            <i class="material-icons">remove_red_eye</i>
                        </div>
                        <span>
                            {{ pratilipiData.readCount | round(1) }}    
                        </span>
                    </div>
                    <div class="read-time">
                        <div class="icons">
                            <i class="material-icons">access_time</i>
                        </div>
                        <span>
                            {{ pratilipiData.readingTime | showInMinutesOrHours($t) }}
                        </span>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Pratilipi',
    props: {
        pratilipiData: {
            type: Object,
            required: true
        },
        addToLibrary: {
            type: Function
        },
        removeFromLibrary: {
            type: Function
        }
    },
    data() {
        return {
        }
    },
    methods: {
        addPratilipiToLibrary(pratilipiId) {

            console.log(this);
            if (this.$store.getters.getUserDetails.isGuest) {
                // throw popup modal
                console.log('User is not logged in');
            } else {
                this.addToLibrary(pratilipiId);    
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    a:hover, a:focus {
        text-decoration: none;
        outline: none;
    }
    .pratilipi {
        width: 300px;
        margin: 10px;
        background: #fff;
        border: 1px solid #e9e9e9;
        position: relative;
        .book-type {
            font-size: 11px;
            line-height: 18px;
            font-weight: 700;
            color: #fff;
            padding: 0 20px 3px;
            background: #d1021b;
            position: absolute;
            top: 15px;
            left: -10px;
            z-index: 1;
            &:before {
                content: '';
                position: absolute;
                border-left: 0px solid transparent;
                border-right: 10px solid transparent;
                border-top: 18px solid #d1021b;
                bottom: 0;
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
                border-right: 10px solid #d1021b;
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
                border-top: 18px solid #42bab0;
            }
            &.ARTICLE:after {
                border-right: 10px solid #42bab0;
            }
            &.POEM {
                background: #FF9800;
            }
            &.POEM:before {
                border-top: 18px solid #FF9800;
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
            left: 0;
            width: 288px;
            height: 150px;
            margin: 5px;
            background: rgba(0, 0, 0, 0.6);
            opacity: 0;
            transition: all 0.5s, visibility 0s;
            -ms-transition: all 0.5s, visibility 0s;
            -webkit-transition: all 0.5s, visibility 0s;
            -moz-transition: all 0.5s, visibility 0s;
            @media screen and (max-width: 768px ) {
                opacity: 1;
                background: none;
                text-align: right;
                width: auto;
                height: auto;
                right: 0;
                left: auto;
            }
            button {
                padding: 0;
                margin: 60px 4px 0;
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
                i {
                    height: 40px;
                    line-height: 40px;
                    font-size: 18px;
                    &.added-to-lib {
                        color: #007aff;
                    }
                }
                &:hover {
                    color: #fff;
                    background: #9E9E9E;
                }
                @media screen and (max-width: 768px ) {
                    margin: 10px 10px 0 0;
                    &:hover {
                        background: #fff;
                        color: #2c3e50;
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
                }
            }
        }
        .stats {
            border-top: 1px solid #e9e9e9;
            margin-top: 5px;
            overflow: hidden;
            .rating, .read-count, .read-time {
                float: left;
                width: 32%;
                padding: 10px 4px;
                font-size: 13px;
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
            }
            .read-time {
                font-size: 12px;
            }
        }
    }
    .language-ta .pratilipi .stats .read-time {
        font-size: 10px;
    }
</style>
