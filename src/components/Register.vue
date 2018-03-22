<template>
    <div class="forms" id="signup">
        <form>
            <div class="social-login">
                <button type="button" name="button" class="fb"><icon name="facebook-f"></icon>__("user_sign_in_with_facebook")</button>
                <button type="button" name="button" class="google"><icon name="google"></icon>__("user_sign_in_with_google")</button>
            </div>
            <div class="or">__("or")</div>
            <div class="form-group">
                <input type="text" class="form-control" :placeholder="'__("user_full_name")'">
            </div>
            <div class="form-group">
                <input type="email" class="form-control" :placeholder="'__("user_email")'">
            </div>
            <div class="form-group">
                <input autocomplete="new-password" type="password" class="form-control" :placeholder="'__("user_password")'">
            </div>
            <button type="button" @click="signupUser({ name, email, password, language: getCurrentLanguage() })" class="btn sign-in">__("user_sign_up")</button>
            <a href="#" class="footlink" v-on:click="tabsignin" data-tab="signin">__("user_sign_in")</a>
            <span class="terms-section">__("register_part_1") <a href="/privacy-policy" target="_blank">__("footer_privacy_policy")</a> __("register_part_2") <a href="/terms-of-service" target="_blank">__("footer_terms_of_service")</a> __("register_part_3")</span>
        </form>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import mixins from '@/mixins';

export default {
    name: 'Registration-Form',
    mixins: [
        mixins
    ],
    data() {
        return {
            email: '',
            password: '',
            name: ''
        }
    },
    methods: {
        ...mapActions([
            'signupUser'
        ]),
        tabsignin(event) {
            event.preventDefault();        
            var tab_id = $(event.currentTarget).attr('data-tab');
            $(".login-menu a").removeClass("active");
            $(".signin").addClass("active");
            $(".forms").hide();
            $("#" + tab_id).show();
        }
    },
    components: {
        
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
