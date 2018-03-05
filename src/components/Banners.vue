<template>
    <div class="banner-section container">
        <div v-on:click="prev" class="back">
            <i class="material-icons">keyboard_arrow_left</i>
        </div>
        <slick ref="slick" :options="slickOptions" class="slick-banner">
            <div class="banners" v-for="each_banner in banners" v-bind:key="each_banner.bannerId">
                <router-link
                    :to="{ path: each_banner.actionUrl }">
                    <img :src="each_banner.imageUrl" alt="">
                </router-link>
            </div>
        </slick>
        <div v-on:click="next" class="forward">
            <i class="material-icons">keyboard_arrow_right</i>
        </div>
    </div>
</template>

<script>
import Slick from 'vue-slick'
export default {
    props: {
        banners: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            slickOptions: {
                slidesToShow: 1,
                infinite: false,
                adaptiveHeight: false,
                variableWidth: false,
                arrows: false,
                dots: false,
                draggable: true,
                edgeFriction: 0.30,
                swipe: true
            }
        }
    },
    methods: {
        next() {
            this.$refs.slick.next()
        },
        prev() {
            this.$refs.slick.prev()
        },
        reInit() {
            // Helpful if you have to deal with v-for to update dynamic lists
            this.$refs.slick.reSlick()
        }
    },
    mount() {
        this.reInit();
    },
    components: {
        Slick
    }
}
</script>

<style lang="scss">
.banner-section {
    position: relative;
    width: calc(100% - 20px);
    margin: 0 auto;
    .banners {
        img {
            max-width: 100%;
        }
    }
    .slick-banner {
        display: none;
        &.slick-initialized {
            display: block;
        }
    }
    .back,.forward {
        position: absolute;
        top: 45%;
        z-index: 2;
        background-color: #fff;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        color: #000;
        border: 1px solid #e9e9e9;
        cursor: pointer;
        transition: all .3s, visibility 0s;
        -ms-transition: all .3s, visibility 0s;
        -webkit-transition: all .3s, visibility 0s;
        -moz-transition: all .3s, visibility 0s;
        i {
            height: 40px;
            line-height: 40px;
            font-size: 26px;
        }
        &:hover {
            background: #9E9E9E;
            border-color: #9E9E9E;
            box-shadow: 0 0px 2px rgba(0,0,0,0.2);
            color: #fff;
        }
    }
    .forward {
        right: 0;
    }
}
</style>
