<template>
    <div class="app-banner container" v-if="isAndroid()">
        <div class="row">
            <button class="close" @click="closeBanner"><i class="material-icons">close</i></button>
            <div class="col-2 logo">
                <img src="../assets/pratilipi_logo.png" alt="logo">
            </div>
            <div class="col-10 app-info">
                <span class="name">__("pratilipi_android_application")</span>
                <span class="stars"><img class="rating-image" src="http://public.pratilipi.com/images/Stars-for-App-Install-Strip.png"></span>
            </div>
        </div>
        <div class="row">
            <div class="col-12 app-desc">__("read_stories_without_internet")</div>
        </div>
        <div class="row">
            <div class="col-12">
                <button name="button" class="download-now" @click="downloadApp">__("android_download")</button>
            </div>
        </div>
    </div>
</template>

<script>
import mixins from '@/mixins';
import inViewport from 'vue-in-viewport-mixin';
import { mapGetters } from 'vuex'

export default {
    props: {
        'in-viewport-once': {
            default: true
        },
    },
    mixins: [
        mixins,
        inViewport
    ],
    computed: {
        ...mapGetters([
            'getUserDetails'
        ])
    },
    methods: {
        closeBanner() {
            $(".app-banner").hide();
            $(".page-wrap").css("margin-top", "65px");
            
            const SCREEN_NAME = this.getAnalyticsPageSource(this.$route.meta.store);
            this.triggerAnanlyticsEvent(`DISMISS_APPBANNER_GLOBAL`, 'CONTROL', {
                'USER_ID': this.getUserDetails.userId,
                SCREEN_NAME
            });
        },
        downloadApp() {
            const SCREEN_NAME = this.getAnalyticsPageSource(this.$route.meta.store);
            this.triggerAnanlyticsEvent(`GETANDROID_APPBANNER_GLOBAL`, 'CONTROL', {
                'USER_ID': this.getUserDetails.userId,
                SCREEN_NAME
            });
            this.openInNewTab(this.getAndroidIntentUri({
                'utm_source': 'pratilipi_main_web',
                'utm_medium': 'web_bottom_strip',
                'utm_campaign': 'app_download'
            }));
        }
    },
    watch: {
        'inViewport.now': function(visible) {
            if (visible) {
                const SCREEN_NAME = this.getAnalyticsPageSource(this.$route.meta.store);
                this.triggerAnanlyticsEvent(`VIEWED_APPBANNER_GLOBAL`, 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId,
                    SCREEN_NAME
                });
            }
        }
    },
    mounted() {
        if ($('.app-banner').is(":visible") == true) {
            $("#app .page-wrap").css("margin-top", "10px");
        }
    }
}
</script>

<style lang="scss" scoped>
    .app-banner {
        margin-top: 70px;
        box-shadow: 0 1px 1px rgba(0,0,0,0.2);
        position: relative;
        button.close {
            position: absolute;
            right: 5px;
            top: 5px;
            z-index: 2;
        }
        .logo {
            padding: 0;
            img {
                width: 100%;
                max-width: 40px;
            }
        }
        .app-info {
            padding: 0;
            text-align: left;
            font-size: 16px;
            .name {
                font-weight: bold;
            }
            .stars {
                width: 90px;
                display: block;
                img {
                    max-width: 100%;
                    vertical-align: top;
                }
            }
        }
        .app-desc {
            font-size: 16px;
            text-align: center;
            line-height: 18px;
        }
        button.download-now {
            background: #4caf4f;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
            border: 0;
            outline: none;
            padding: 5px 10px;
            border-radius: 3px;
            width: 80%;
            margin: 5px 0 10px;
            box-shadow: 0 1px 2px rgba(0,0,0,0.4);
        }
    }
</style>
