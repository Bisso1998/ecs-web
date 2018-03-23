<template>
    <div class="forms" id="signin">
        <div class="social-login">
            <button type="button" name="button" class="fb"><icon name="facebook-f"></icon>__("user_sign_in_with_facebook")</button>
            <GoogleLogin></GoogleLogin>
        </div>
        <div class="or">__("or")</div>
        <form>
            <div class="form-group">
                <input type="email" class="form-control" v-model="email" :placeholder="'__("user_email")'">
            </div>
            <div class="form-group">
                <input type="password" class="form-control" v-model="password" :placeholder="'__("user_password")'">
            </div>
            <button type="button" @click="loginUser({email, password})" class="btn sign-in">__("user_sign_in")</button>
            <a v-if="!openForgotPasswordInTab" @click="openForgotPasswordModal" href="#" class="forgot-pass">__("user_forgot_password")</a>
            <router-link v-else :to="'/login#forgot-pass'" target="_blank" class="forgot-pass">__("user_forgot_password")</router-link>
            <a href="#" class="footlink" v-on:click="tabsignup" data-tab="signup">__("user_sign_up")</a>
        </form>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import mixins from '@/mixins';
import GoogleLogin from '@/components/GoogleLogin';

export default {
    name: 'Login-Form',
    mixins: [
        mixins
    ],
    props: {
        openForgotPasswordInTab: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        ...mapActions([
            'loginUser'
        ]),
        tabsignup(event) {
            event.preventDefault();        
            var tab_id = $(event.currentTarget).attr('data-tab');
            $(".login-menu a").removeClass("active");
            $(".signup").addClass("active");
            $(".forms").hide();
            $("#" + tab_id).show();
        }
    },
    components: {
        GoogleLogin
    },
    created() {
    }
}
</script>

<style  lang="scss" scoped>
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
</style>
