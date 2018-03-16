<template>
	<div class="section">
		<div class="container-fluid">
	        <h2 class="section-title">{{title}}</h2>
	        <div class="pratilipi-list" v-if="pratilipiList.length > 0">
	            <div v-on:click="prev" class="back">
					<i class="material-icons">keyboard_arrow_left</i>
	            </div>
	            <slick ref="slick" :options="slickOptions">
	                <PratilipiComponent 
	                v-for="(eachPratilipi, index) in pratilipiList" 
	                v-bind:key="eachPratilipi.pratilipiId + index"
	                :pratilipiData="eachPratilipi"
                    :addToLibrary="addToLibrary"
                    :removeFromLibrary="removeFromLibrary"
                    ></PratilipiComponent>
					<router-link :to="listPageUrl" v-if="listPageUrl" class="view_more">
						<div class="view_more_card">
							<i class="material-icons">keyboard_arrow_right</i>
							<span>__("view_more")</span>
						</div>
					</router-link>
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
    	pratilipiList: {
    		type: Array,
    		required: true
    	},
        title: {
            type: String,
            require: true
        },
        listPageUrl: {
            type: String
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
    mount(){
        this.reInit();
    },
    components: {
        PratilipiComponent,
        Slick
    }
}
</script>
<style lang="scss" scoped>
    .section {
        background: #fff;
		border-top: 6px solid #e9e9e9;
		margin-left: -10px;
		.section-title {
            margin: 0;
            padding: 0 0 0 10px;
			font-size: 22px;
			margin: 10px 0 5px 15px;
			color: #212121;
			text-align: left;
			border-left: 3px solid #d0021b;
			line-height: 24px;
			@media screen and (max-width: 576px ) {
                font-size: 18px;
				margin-bottom: 0;
            }
        }
    }
	.recommendation .section {
		.container-fluid {
			padding: 0;
			text-align: center;
			.section-title {
				text-align: left;
				font-weight: bold;
				font-size: 18px;
				border-left: 3px solid #d0021b;
				padding-left: 10px;
				margin: 10px 0;
			}
			.pratilipi-list {
				padding: 5px 10px;
			}
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
			-moz-user-select: none;
			-webkit-user-select: none;
			-ms-user-select: none;
			user-select: none;
			-o-user-select: none;
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
			position: relative;
			.view_more_card {
				width: 300px;
				background: #fff;
				border: 1px solid #e9e9e9;
				height: 252px;
				margin: 10px;
				color: #d0021b;
				i {
					height: 210px;
					line-height: 210px;
					width: 100%;
					font-size: 50px;
					border-bottom: 1px solid #e9e9e9;
				}
				span {
					height: 41px;
					line-height: 37px; 
					display: block;
				}
			}
			&:hover {
				text-decoration: none;
			}
		}
    }
</style>
<style lang="scss">
    @import '../../node_modules/slick-carousel/slick/slick.css';
</style>
