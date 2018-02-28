<template>
    <div>
        <router-link :to="{ name: 'Pratilipi', params: { 
            pratilipi_id: pratilipiData.slug.split('/').pop(),
            pratilipiData }}" :title="pratilipiData.title">
            <div class="pratilipi">
                <div class="book-type" :class="pratilipiData.type">
                    <span>{{ pratilipiData.type }}</span>
                </div>
                <div 
                    class="pratilipi-image" 
                    :style="{ 'background-image': 'url(' + pratilipiData.coverImageUrl + ')' }">
                </div>
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
            </div>
        </router-link>
    </div>
</template>

<script>

export default {
    name: 'Pratilipi',
    props: {
        pratilipiData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
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
            padding: 0 20px;
            background: #d1021b;
            position: absolute;
            top: 15px;
            left: -10px;
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
                padding: 10px 5px;
                font-size: 13px;
                color: #212121;
                .icons {
                    display: inline-block;
                    vertical-align: middle;
                    padding-right: 5px;
                    i {
                        font-size: 13px;
                    }
                }
            }
            .read-count, .read-time {
                border-left: 1px solid #e9e9e9;
            }
        }
    }
</style>
