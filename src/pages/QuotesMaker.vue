<template>
    <MainLayout>
        <div class="static-page page-wrap">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2>Quotes Maker</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <!-- Quotes image -->
                        <span class="help-text">Preview:</span>
                        <div class="quotes" :style="{ backgroundImage: 'url(/static/quotes_1.jpg)' }">
                            <div class="quote-text overlay font-medium color-white text-center">
                                <div class="text" style="top: 0%; left: 0%">{{ quote }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 image-options">
                        <span class="help-text">Options:</span>
                        
                        <span class="label">Enter your quote below:</span>
                        <TranslatingInput :value="quote" :oninput="updateQuoteText"></TranslatingInput>
                        
                        <span class="label">Choose an image from the below options:</span>
                        <ul class="choose-image">
                            <li><img src="https://i.ytimg.com/vi/bLFErGV93yc/maxresdefault.jpg" alt=""></li>
                            <li class="selected"><img src="https://i.ytimg.com/vi/fbpK5RPCpUg/maxresdefault.jpg" alt=""></li>
                            <li><img src="http://images5.fanpop.com/image/photos/31600000/Inspiration-true-writers-31667986-500-313.png" alt=""></li>
                        </ul>
                        
                        <span class="label">Do you need a background overlay?</span>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="background-overlay" id="overlay-yes" value="overlay-yes" checked>
                            <label class="form-check-label" for="overlay-yes">Yes</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="background-overlay" id="overlay-no" value="overlay-no">
                            <label class="form-check-label" for="overlay-no">No</label>
                        </div>
                        
                        <span class="label">Select text size:</span>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="text-size" id="text-large" value="large">
                            <label class="form-check-label" for="text-large">Large</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="text-size" id="text-medium" value="medium" checked>
                            <label class="form-check-label" for="text-medium">Medium</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="text-size" id="text-small" value="small">
                            <label class="form-check-label" for="inlineRadio2">Small</label>
                        </div>
                        
                        <span class="label">Select text color:</span>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="text-color" id="text-white" value="white" checked>
                            <label class="form-check-label" for="text-white">White</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="text-color" id="text-black" value="black">
                            <label class="form-check-label" for="text-black">Black</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="text-color" id="text-red" value="red">
                            <label class="form-check-label" for="text-red">Red</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="text-color" id="text-green" value="green">
                            <label class="form-check-label" for="text-green">Green</label>
                        </div>
                        
                        <span class="label">Select text align:</span>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="text-align" id="align-left" value="left">
                            <label class="form-check-label" for="align-left">Left</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="text-align" id="align-center" value="center" checked>
                            <label class="form-check-label" for="align-center">Center</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="text-align" id="align-right" value="right">
                            <label class="form-check-label" for="align-right">Right</label>
                        </div>
                        
                        <span class="label">Select text position.(Enter value in % or px)</span>
                        <div class="form-row">
                            <div class="form-group col-6">
                                <label for="topPosition">Top:</label>
                                <input type="text" class="form-control" id="topPosition" placeholder="Top">
                            </div>
                            <div class="form-group col-6">
                                <label for="leftPosition">Left:</label>
                                <input type="text" class="form-control" id="leftPosition" placeholder="Left">
                            </div>
                        </div>
                        
                        <button class="generate-btn" @click="takeScreenShot">Generate Quote</button>
                        <a v-if="dataImageUrl" :href="dataImageUrl" download>Download Image</a>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script>
import html2canvas from 'html2canvas';

import MainLayout from '@/layout/main-layout.vue';
import constants from '@/constants';
import Spinner from '@/components/Spinner.vue';
import TranslatingInput from '@/components/TranslatingInput.vue';
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            quote: '',
            dataImageUrl: null
        }
    },
    components: {
        MainLayout,
        Spinner,
        TranslatingInput
    },
    computed: {
    },
    methods: {
        updateQuoteText(text) {
            this.quote = text;
        },

        takeScreenShot() {
            const that = this;
            console.log(new Date);
            html2canvas($('.quotes')[0], { useCORS: true}).then(function(canvas) {
                that.dataImageUrl = canvas.toDataURL("image/png");
            }).catch((error) => {
                console.log(error);
            });
        }
    },
    watch: {
        
    },
    created() {
    }
}
</script>

<style lang="scss" scoped>
.static-page {
    margin-top: 85px;
    text-align: left;
    min-height: 600px;
    @media screen and (max-width: 992px ) {
        margin-top: 65px;
    }
    h2 {
        font-size: 22px;
        font-weight: bold;
        text-align: left;
        border-left: 3px solid #d0021b;
        padding-left: 10px;
        margin: 10px 0;
        @media screen and (max-width: 992px ) {
            font-size: 18px;
        }
    }

    .quotes {
        background-color: #e9e9e9;
        background-size: cover;
        background-repeat: no-repeat;
        height: 215px;
        position: relative;
        overflow: hidden;
        .quote-text {
            position: relative;
            height: 100%;
            &.overlay {
                background: rgba(0,0,0,0.5);
                width: 100%;
            }
            &.font-large {
                font-size: 35px;
            }
            &.font-medium {
                font-size: 25px;
            }
            &.font-small {
                font-size: 15px;
            }
            &.color-white {
                color: #fff;
            }
            &.color-black {
                color: #000;
            }
            &.color-red {
                color: #dc3545;
            }
            &.color-green {
                color: #28a745;
            }
            &.text-left {
                text-align: left;
            }
            &.text-center {
                text-align: center;
            }
            &.text-right {
                text-align: right;
            }
            .text {
                padding: 10px;
                font-weight: bold;
                position: absolute;
                width: 100%;
            }
        }
    }
    .help-text {
        font-size: 14px;
        font-weight: 700;
        margin: 5px 0;
        display: block;
    }
    span.label {
        font-size: 12px;
        margin: 15px 0 5px;
        display: block;
    }
    .image-options {
        margin: 20px 0;
        .choose-image {
            margin: 10px 0;
            padding: 0;
            li {
                display: inline-block;
                margin: 0 5px 5px 0;
                width: 100px;
                height: 70px;
                img {
                    width: 100%;
                    height: 100%;
                    
                }
                &.selected img {
                    outline: 2px solid #d0031c;
                    outline-offset: -2px;
                }
            }
        }
        .form-check-label, label {
            font-size: 14px;
        }
        .generate-btn {
            background: #d0031c;
            border: 0;
            outline: none;
            box-shadow: none;
            padding: 10px;
            color: #fff;
            border-radius: 4px;
            width: 90%;
            margin: 20px 0;
            font-size: 16px;
            font-weight: bold;
        }
    }
}
</style>
<style>
p {
    word-break: break-word !important;
}
</style>
