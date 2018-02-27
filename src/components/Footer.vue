<template>
    <div>
        <div class="top-footer">
            <div class="container">
                <div class="row">
                    <div class="col-sm-3">
                        <div class="foot-title">{{ $t("footer_mobile_app") }}</div>
                        <div class="foot-items">
                            <a href="https://play.google.com/store/apps/details?id=com.pratilipi.mobile.android&utm_source=web_footer&utm_campaign=app_download" target="_blank">
                                <img src="https://www.ptlp.co/resource-all/image/google-play-badge.png" alt="google-play" class="google-play-badge">
                            </a>
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="foot-title">{{ $t("footer_contact_us") }}</div>
                        <div class="foot-items">
                            <a :href="'tel:' + $t('footer_contact_number').replace(' ', '')"><i class="material-icons material-icons-16 vertical-middle">phone</i>{{ $t("footer_contact_number") }}</a>
                            <a :href="'mailto:' + $t('footer_contact_email')"><i class="material-icons material-icons-16 vertical-middle">mail</i>{{ $t("footer_contact_email") }}</a>
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="foot-title">{{ $t("footer_about_us") }}</div>
                        <div class="foot-items">
                            <a href="/about/pratilipi">{{ $t("footer_about_us") }}</a>
            				<a href="/work-with-us">{{ $t("footer_work_with_us") }}</a>
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="foot-title">{{ $t("footer_follow_us_on_social_media") }}</div>
                        <div class="foot-items social">
                            <a :href="$t('facebook_page')" class="fb" target="_blank"><icon name="facebook-f"></icon></a>
                            <a :href="$t('twitter_page')" class="twitter" target="_blank"><icon name="twitter"></icon></a>
                            <a :href="$t('googleplus_page')" class="google" target="_blank"><icon name="google-plus"></icon></a>
                            <a :href="$t('linkedin_page')" class="linkedin" target="_blank"><icon name="linkedin"></icon></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer>
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <p>
                            © {{ new Date().getFullYear() }} Nasadiya Tech. Pvt. Ltd. | 
                            <a href="/privacy-policy">{{ $t("footer_privacy_policy") }}</a> |
                            <a href="/terms-of-service">{{ $t("footer_terms_of_service") }}</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
import 'vue-awesome/icons/facebook-f'
import 'vue-awesome/icons/twitter'
import 'vue-awesome/icons/google-plus'
import 'vue-awesome/icons/linkedin'

export default {
    
}
</script>

<style lang="scss" scoped>
    .top-footer {
        background: #212121;
        color: #fff;
        padding: 15px 0;
        text-align: left;
        margin-top: 20px;
        .foot-title {
            font-size: 15px;
            position: relative;
            padding-bottom: 10px;
            &:before {
                position: absolute;
                left: 0;
                bottom: 0;
                height: 2px;
                background: #d00b12;
                width: 50px;
                content: "";
            }
        }
        .foot-items {
            margin: 20px 0;
            a {
                display: block;
                color: #fff;
                font-size: 14px;
                margin-top: 10px;
                i {
                    font-size: 14px;
                    vertical-align: middle;
                    padding-right: 10px;
                }
            }
            &.social a {
                display: inline-block;
                width: 40px;
                height: 40px;
                background: #3b5998;
                border-radius: 50%;
                text-align: center;
                line-height: 40px;
                margin-right: 5px;
                .fa-icon {
                    vertical-align: middle;
                }
                &:hover {
                    text-decoration: none;
                    border-bottom: 1px solid;
                }
            }
            &.social a.twitter {
                background: #00aced;
            }
            &.social a.google {
                background: #dd4b39;
            }
            &.social a.linkedin {
                background: #007bb6;
            }
            img.google-play-badge {
                width: 150px;
                margin-left: -10px;
            }
        }
    }
    footer {
        background: #191919;
        color: #fefefe;
        font-size: 13px;
        padding: 15px 0;
        p {
            margin: 0;
            a {
                color: #fefefe;
            }
        }
    }
</style>
