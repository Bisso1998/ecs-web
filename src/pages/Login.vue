<template>
    <MainLayout>
        <div class="login-page">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2>Join with Pratilipi</h2>
                    </div>
                    <div class="col-lg-6 col-md-12">
                        <div class="card">
                            <div class="login-menu">
                                <a href="#" class="signup active" v-on:click="tabsignup" data-tab="signup">__("user_sign_up")</a>
                                <a href="#" class="signin" v-on:click="tabsignin" data-tab="signin">__("user_sign_in")</a>
                            </div>
                            <div class="forms" id="signin">
                                <div class="social-login">
                                    <button type="button" name="button" class="fb"><icon name="facebook-f"></icon>__("user_sign_in_with_facebook")</button>
                                    <button type="button" name="button" class="google"><icon name="google"></icon>__("user_sign_in_with_google")</button>
                                </div>
                                <div class="or">__("or")</div>
                                <form>
                                    <div class="form-group">
                                        <input type="email" class="form-control" v-model="email" id="signinEmail" :placeholder="'__("user_email")'">
                                    </div>
                                    <div class="form-group">
                                        <input type="password" class="form-control" v-model="password" id="signinPassword" :placeholder="'__("user_password")'">
                                    </div>
                                    <button type="button" @click="loginUser({email, password})" class="btn sign-in">__("user_sign_in")</button>
                                    <a href="#" class="forgot-pass" data-toggle="modal" data-target="#forgotPassModal">__("user_forgot_password")</a>
                                    <a href="#" class="footlink" v-on:click="tabsignup" data-tab="signup">__("user_sign_up")</a>
                                </form>
                            </div>
                            
                            <div class="forms" id="signup">
                                <form>
                                    <div class="social-login">
                                        <button type="button" name="button" class="fb"><icon name="facebook-f"></icon>__("user_sign_in_with_facebook")</button>
                                        <button type="button" name="button" class="google"><icon name="google"></icon>__("user_sign_in_with_google")</button>
                                    </div>
                                    <div class="or">__("or")</div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="signupName" :placeholder="'__("user_full_name")'">
                                    </div>
                                    <div class="form-group">
                                        <input type="email" class="form-control" id="signupEmail" :placeholder="'__("user_email")'">
                                    </div>
                                    <div class="form-group">
                                        <input autocomplete="new-password" type="password" class="form-control" id="signupPassword" :placeholder="'__("user_password")'">
                                    </div>
                                    <button type="button" @click="signupUser({name, email, password})" class="btn sign-in">__("user_sign_up")</button>
                                    <a href="#" class="footlink" v-on:click="tabsignin" data-tab="signin">__("user_sign_in")</a>
                                    <span class="terms-section">__("register_part_1") <a href="/privacy-policy" target="_blank">__("footer_privacy_policy")</a> __("register_part_2") <a href="/terms-of-service" target="_blank">__("footer_terms_of_service")</a> __("register_part_3")</span>
                                </form>
                            </div>
                            
                            <!-- Modal -->
                            <div class="modal fade" id="forgotPassModal" tabindex="-1" role="dialog" aria-labelledby="forgotPassModalLabel" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="forgotPassModalLabel">__("user_forgot_password")</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div id="password_reset">
                                                <form>
                                                    <div class="form-group">
                                                        <input type="email" @input="forgotten_password_email = $event.target.value" class="form-control" id="forgotEmail" :placeholder="'__("user_email")'">
                                                    </div>
                                                    <button type="button" @click="sendPasswordResetEmail(forgotten_password_email)" class="btn sign-in">__("user_reset_password")</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    
                    <div class="col-lg-6 col-md-12">
                        <div class="card">
                            <div class="head-title">Logged In user Features</div>
                            <p>__("user_login_to_view_library")</p>
                            <p>__("user_login_to_view_notifications")</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>
    
<script>
import MainLayout from '@/layout/main-layout.vue';
import Spinner from '@/components/Spinner.vue';
import 'vue-awesome/icons/facebook-f'
import 'vue-awesome/icons/google'

import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        MainLayout,
        Spinner
    },
    data() {
        return {
            email: '',
            password: ''
        }
    },
    computed: {
        ...mapGetters([
            'getUserDetails'
        ])
    },
    watch:{
        'getUserDetails.isGuest'(isGuest) {
            if (!isGuest) {
                this.$router.push(this.getUserDetails.profilePageUrl);
            }
        }
    },
    methods: {
        ...mapActions([
            'loginUser',
            'sendPasswordResetEmail'
        ]),
        tabsignup(event) {
            event.preventDefault();        
            var tab_id = $(event.currentTarget).attr('data-tab');
            $(".login-menu a").removeClass("active");
            $(".signup").addClass("active");
            $(".forms").hide();
            $("#" + tab_id).show();
        },
        tabsignin(event) {
            event.preventDefault();        
            var tab_id = $(event.currentTarget).attr('data-tab');
            $(".login-menu a").removeClass("active");
            $(".signin").addClass("active");
            $(".forms").hide();
            $("#" + tab_id).show();
        }
    },
    created() {
        if ( this.getUserDetails && this.getUserDetails.isGuest !== undefined && this.getUserDetails.isGuest !== true) {
            this.$router.push(this.getUserDetails.profilePageUrl)
        }
    }
}
</script>

<style lang="scss" scoped>
.login-page {
    margin-top: 85px;
    text-align: left;
    background: #f8f8f8;
    @media screen and (max-width: 992px ) {
        margin-top: 140px;
        text-align: center;
    }
    h2 {
        font-size: 20px;
        font-weight: bold;
        text-align: left;
        border-left: 3px solid #d0021b;
        padding-left: 10px;
        margin: 10px 0;
    }
    .head-title {
        font-size: 16px;
        font-weight: bold;
        text-align: left;
        border-left: 3px solid #d0021b;
        padding-left: 10px;
        margin: 10px 0 5px;
    }
    .col-md-12 {
        padding: 0;
    }
    .card {
        border-radius: 0;
        margin: 10px;
        p {
            text-align: left;
            margin: 5px 10px;
            font-size: 14px;
        }
    }
    .login-menu {
        border-bottom: 1px solid #e9e9e9;
        padding: 8px 0 10px;
        text-align: left;
        overflow: hidden;
        width: 100%;
        overflow-x: auto;
        white-space: nowrap;
        a {
            color: #555;
            font-size: 13px;
            border-bottom: 2px solid #fff;
            padding: 5px 5px 11px;
            span {
                font-size: 12px;
                font-weight: bold;
                padding: 0 2px;
                margin-right: 5px;
                display: inline-block;
                text-align: center;
            }
            &.active {
                color: #d0021b;
                border-color: #d0021b;
                span {
                    color: #d0021b;
                }
            }
            &:hover {
                text-decoration: none;
                color: #d0021b;
            }
        }
    }
    .forms {
        margin: 15px 10px;
        text-align: left;
        display: none;
        &#signup {
            display: block;
        }
        .or {
            display: flex;
            flex: 1;
            width: 100%;
            margin: 20px auto;
            line-height: 1em;
            font-size: 12px;
        }
        .or::before, .or::after {
            content: '';
            flex-grow: 1;
            margin: 0px 10px;
            background: linear-gradient(to right, #e9e9e9, #e9e9e9);
            background-size: 100% 1px;
            background-position: 0% 50%;
            background-repeat: repeat-x;
        }
        .or::before {
            margin-left: 0;
        }
        .or::after {
            margin-right: 0;
        }
        .forgot-pass, .footlink {
            font-size: 12px;
            margin-right: 10px;
            color: #212529;
        }
        .footlink {
            display: inline-block;
            margin: 10px 0;
        }
        .terms-section {
            font-size: 12px;
            display: block;
            margin: 10px 0;
            color: #212529;
        }
    }
    .sign-in {
        background: #d00b12;
        color: #fff;
        margin-right: 10px;
        &:hover {
            opacity: 0.9;
        }
    }
    #forgotPassModal {
        text-align: left;
        margin-top: 150px;
    }
    .social-login {
        button.fb, button.google {
            background: #3b5998;
            color: #fff;
            display: block;
            width: 100%;
            height: 45px;
            max-width: 400px;
            margin: 10px auto;
            border-radius: 3px;
            border: 0;
            outline: none;
            text-align: left;
            font-size: 14px;
            cursor: pointer;
            &:hover {
                opacity: 0.9;
            }
            .fa-icon {
                vertical-align: middle;
                margin: 0 15px;
            }
        }
        button.google {
            background: #DD4B39;
        }
    }
}
</style>
