<template>
    <div>
        <router-link :to="{ name: 'Pratilipi', params: { 
            pratilipi_id: pratilipiData.slug.split('/').pop(),
            pratilipiData }}">
            <div class="pratilipi">
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
                            <icon name="star" scale="1"></icon>
                        </div>
                        <span>
                            {{ pratilipiData.averageRating | round(1) }}
                        </span>
                    </div>
                    <div class="read-count">
                        <div class="icons">
                            <icon name="eye" scale="1"></icon>
                        </div>
                        <span>
                            {{ pratilipiData.readCount | round(1) }}    
                        </span>
                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
import 'vue-awesome/icons/star'
import 'vue-awesome/icons/eye'

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
        overflow: hidden;
        .pratilipi-image {
            margin: 5px;
            height: 150px;
            background-size: cover;
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
            .rating, .read-count {
                float: left;
                width: 49%;
                padding: 10px;
                font-size: 14px;
                color: #212121;
                .icons {
                    display: inline-block;
                    vertical-align: middle;
                    padding-right: 10px;
                }
            }
            .read-count {
                border-left: 1px solid #e9e9e9;
            }
        }
    }
</style>
