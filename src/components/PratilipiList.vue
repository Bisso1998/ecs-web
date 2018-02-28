<template>
	<div class="section">
		<div class="container-fluid">
	        <h2 class="section-title">{{sectionData.title}}</h2>
	        <div class="pratilipi-list">
	            <div v-on:click="prev" class="back">
					<i class="material-icons">keyboard_arrow_left</i>
	            </div>
	            <slick ref="slick" :options="slickOptions">
	                <PratilipiComponent 
	                v-for="eachPratilipi in sectionData.pratilipiList" 
	                v-bind:key="eachPratilipi.pratilipiId"
	                :pratilipiData="eachPratilipi"></PratilipiComponent>
					<router-link :to="sectionData.listPageUrl" class="view_more">{{ $t("view_more") }}</router-link>
	            </slick>
				
	            <div v-on:click="next" class="forward">
					<i class="material-icons">keyboard_arrow_right</i>
	            </div>
	        </div>
		</div>
	</div>
</template>

<script type="text/javascript">
import PratilipiComponent from '@/components/Pratilipi.vue'
import Slick from 'vue-slick'

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
                adaptiveHeight: false,
                variableWidth: true,
                arrows: false,
                // dots: true,
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
    components: {
        PratilipiComponent,
        Slick
    }
}
</script>
<style lang="scss" scoped>
    .section {
        background: #f8f8f8;
		margin-bottom: 10px;
		.section-title {
            margin: 0;
            padding-top: 10px;
			font-size: 26px;
			margin-bottom: 25px;
			color: #212121;
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
		a.view_more {
		    background: #d1021b;
			color: #fff;
			padding: 10px 35px;
		    display: block !important;
			width: auto !important;
			border-radius: 40px;
			position: absolute;
			top: 42%;
			margin-left: 20px;
			font-size: 14px;
			line-height: 22px;
			transition: all .3s, visibility 0s;
			-ms-transition: all .3s, visibility 0s;
			-webkit-transition: all .3s, visibility 0s;
			-moz-transition: all .3s, visibility 0s;
			&:hover {
				text-decoration: none;
				background: #212121;
			}
		}
    }
</style>
<style lang="scss">
    @import '../../node_modules/slick-carousel/slick/slick.css';
</style>
