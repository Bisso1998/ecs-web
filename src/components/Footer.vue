<template>
    <div>
        <div class="top-footer">
            <div class="container">
                <div class="row">
                    <div class="col-md-4">
                        <div class="foot-title">__("footer_mobile_app")</div>
                        <div class="foot-items">
                            <a href="https://play.google.com/store/apps/details?id=com.pratilipi.mobile.android&utm_source=web_footer&utm_campaign=app_download" target="_blank">
                                <img src="../assets/google-play-badge.png" alt="google-play" class="google-play-badge">
                            </a>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="foot-title">__("footer_contact_us")</div>
                        <div class="foot-items">
                            <a :href="'tel:' + '__('footer_contact_number')'.replace(' ', '')"><i class="material-icons material-icons-16 vertical-middle">phone</i>__("footer_contact_number")</a>
                            <a :href="'mailto:' + '__('footer_contact_email')'"><i class="material-icons material-icons-16 vertical-middle">mail</i>__("footer_contact_email")</a>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="foot-title">__("footer_follow_us_on_social_media")</div>
                        <div class="foot-items social">
                            <a :href="'__('facebook_page')'" class="fb" target="_blank"><icon name="facebook-f"></icon></a>
                            <a :href="'__('twitter_page')'" class="twitter" target="_blank"><icon name="twitter"></icon></a>
                            <a :href="'__('googleplus_page')'" class="google" target="_blank"><icon name="google-plus"></icon></a>
                            <a :href="'__('linkedin_page')'" class="linkedin" target="_blank"><icon name="linkedin"></icon></a>
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
                            <router-link
                              :to="{ name: 'About_Page' }">__("footer_about_us")</router-link> | 
                            <router-link
                                :to="{ name: 'Career_Page' }">__("footer_work_with_us")</router-link> | 
                            <router-link
                              :to="{ name: 'Privacy_Page' }">__("footer_privacy_policy")</router-link> |
                            <router-link
                              :to="{ name: 'Terms_Page' }">__("footer_terms_of_service")</router-link>
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
        padding: 15px 0 5px;
        text-align: left;
        margin-top: 20px;
        .foot-title {
            font-size: 15px;
            position: relative;
            padding-bottom: 7px;
            @media screen and (max-width: 768px ) {
                font-size: 13px;
            }
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
            @media screen and (max-width: 768px ) {
                margin: 5px 0 20px;
            }
            a {
                display: block;
                color: #fff;
                font-size: 14px;
                margin-top: 10px;
                @media screen and (max-width: 768px ) {
                    font-size: 12px;
                }
                i {
                    font-size: 14px;
                    vertical-align: middle;
                    padding-right: 10px;
                }
            }
            &.social a {
                display: inline-block;
                width: 30px;
                height: 30px;
                background: #3b5998;
                border-radius: 50%;
                text-align: center;
                line-height: 30px;
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
                @media screen and (max-width: 768px ) {
                    width: 110px;
                }
            }
        }
    }
    footer {
        background: #191919;
        color: #fefefe;
        font-size: 13px;
        padding: 15px 0;
        @media screen and (max-width: 992px ) {
            margin-bottom: 60px;
        }
        p {
            margin: 0;
            a {
                color: #fefefe;
            }
        }
    }
</style>
