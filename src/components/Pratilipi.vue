<template>
    <div>
        <router-link :to="{ name: 'Pratilipi', params: { 
            pratilipi_id: pratilipiData.slug.split('/').pop(),
            pratilipiData }}" style="text-decoration: none">
            <div class="pratilipi">
                <div 
                    class="pratilipi-image" 
                    :style="{ 'background-image': 'url(' + pratilipiData.coverImageUrl + ')' }">
                </div>
                <div class="pratilipi-details">
                    <span class="title">{{ pratilipiData.title }}</span>    
                    <br>
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
    
    .pratilipi {
        width: 300px;
        margin: 10px;
        border-radius: 10%;
        overflow: hidden;
        -webkit-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.75);
        box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.75);

        .pratilipi-image {
            height: 150px;
            background-repeat: no-repeat;
            background-size: cover;
        }

        .pratilipi-details {
            min-height: 30px;
            background-color: #d00b12;
            padding: 10px;
            text-align: left;
            color: #fff;

            .title {
                font-size: 1.3em;
                font-weight: 400;
            }

            .author {
                font-size: 0.8em;
                font-weight: 400;
            }
        }

        .stats {
            height: 35px;
            color: #fff;
            background-color: #d00b12;
            font-size: 0.8em;
            display: flex;
            border-top: 1px solid #fff;
            align-items: center;
            

            .rating{
                border-right: 1px solid #fff;
            }

            .rating,.read-count{
                display: inline-block;
                height: 35px;
                line-height: 35px;
                width: 50%;

                .icons {
                    display: inline-flex;
                    align-self: center;
                    position: relative;
                    height: 1em;
                    width: 1em;

                    svg {
                        height:1em;
                        width:1em;
                        bottom: -0.125em;
                        position: absolute;
                    }
                }

            }
        }
    }
</style>