<template>
	<div class="section" v-bind:style="backgroundColor">
        <h2 class="section-title">{{sectionData.title}}</h2>
        <div class="pratilipi-list">
            <div v-on:click="prev" class="back">
                <icon name="angle-left" scale="2"></icon>
            </div>
            <slick ref="slick" :options="slickOptions">
                <PratilipiComponent 
                v-for="eachPratilipi in sectionData.pratilipiList" 
                v-bind:key="eachPratilipi.pratilipiId"
                :pratilipiData="eachPratilipi"></PratilipiComponent>
            </slick>
            <div v-on:click="next" class="forward">
                <icon name="angle-right" scale="2"></icon>
            </div>
        </div>
	</div>
</template>

<script type="text/javascript">
import PratilipiComponent from '@/components/Pratilipi.vue'
import Slick from 'vue-slick'
import 'vue-awesome/icons/angle-right'
import 'vue-awesome/icons/angle-left'

export default {
    name: 'PratilipiList',
    props: {
    	sectionData: {
    		type: Object,
    		required: true
    	},
        index: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            slickOptions: {
                //options can be used from the plugin documentation
                // slidesToShow: 1,
                infinite: false,
                // accessibility: true,
                adaptiveHeight: true,
                variableWidth: true,
                arrows: false,
                // dots: true,
                draggable: true,
                edgeFriction: 0.30,
                swipe: true
            },
            backgroundColor: {
                backgroundColor: this.index % 2 !== 0 ? '#FFF' : '#373B44',
                color: this.index % 2 === 0 ? '#FFF' : '#373B44',
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
    components: {
        PratilipiComponent,
        Slick
    }
}
</script>
<style lang="scss" scoped>
    .section{
        .section-title {
            margin: 0;
            padding-top: 10px;
        }

        .view-more-section {
            background-color: #d00b12
        }
    }

    .pratilipi-list {
        position: relative;
        padding: 5px;

        .back,.forward {
            position: absolute;
            top: 45%;
            z-index: 2;
            background-color: #fff;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            color: #000;
            -webkit-box-shadow: 0px 0px 7px 0px rgba(0,0,0,0.75);
            -moz-box-shadow: 0px 0px 7px 0px rgba(0,0,0,0.75);
            box-shadow: 0px 0px 7px 0px rgba(0,0,0,0.75);

            svg {
                height: 40px;
            }
        }

        .forward {
            right: 0;
        }
    }
</style>
<style lang="scss">
    @import '../../node_modules/slick-carousel/slick/slick.css';
</style>