<template>
    <div class="forms" id="signup">
        <form>
            <div class="social-login">
                <FacebookLogin></FacebookLogin>
                <GoogleLogin></GoogleLogin>
            </div>
            <div class="or">__("or")</div>
            <p class="validation_error" v-if="(getLoginError && getLoginError.message)">
                <i class="material-icons">error</i>
                <span v-if="(getLoginError && getLoginError.message)">{{ getLoginError.message | getTranslatedLoginErrorMessage }}</span>
            </p>
            <div class="form-group">
                <p class="validation_error" v-if="nameIsInvalid || (getLoginError && getLoginError.name)">
                    <i class="material-icons">error</i>
                    <span v-if="(getLoginError && getLoginError.name)">{{ getLoginError.name }}</span>
                    <span v-else>__("name_required")</span>
                </p>
                <input type="text" v-model="name" class="form-control" :placeholder="'__("user_full_name")'">
            </div>
            <div class="form-group">
                <p class="validation_error" v-if="emailIsInvalid || (getLoginError && getLoginError.email)">
                    <i class="material-icons">error</i>
                    <span v-if="(getLoginError && getLoginError.email)">{{ getLoginError.email }}</span>
                    <span v-else>__("email_entered_incorrectly")</span>
                </p>
                <input type="email" v-model="email" class="form-control" :placeholder="'__("user_email")'">
            </div>
            <div class="form-group">
                <p class="validation_error" v-if="passwordIsInvalid || (getLoginError && getLoginError.password)">
                    <i class="material-icons">error</i>
                    <span v-if="(getLoginError && getLoginError.password)">{{ getLoginError.password }}</span>
                    <span v-else>__("password_minimum")</span>
                </p>
                <input autocomplete="new-password" v-model="password" type="password" class="form-control" :placeholder="'__("user_password")'">
            </div>
            <button type="button" @click="verifyAndSignupUser({ name, email, password, language: getCurrentLanguage().fullName.toUpperCase() })" class="btn sign-in">__("user_sign_up")</button>
            <a href="#" class="footlink" v-on:click="tabsignin" data-tab="signin">__("user_sign_in")</a>
            <span class="terms-section">__("register_part_1") <a href="/privacy-policy" target="_blank">__("footer_privacy_policy")</a> __("register_part_2") <a href="/terms-of-service" target="_blank">__("footer_terms_of_service")</a> __("register_part_3")</span>
        </form>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import GoogleLogin from '@/components/GoogleLogin';
import FacebookLogin from '@/components/FacebookLogin';
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
            name: '',
            emailIsInvalid: false,
            passwordIsInvalid: false,
            nameIsInvalid: false
        }
    },
    methods: {
        ...mapActions([
            'signupUser'
        ]),
        verifyAndSignupUser(data) {
            const { name, email, password } = data;

            this.nameIsInvalid = !this.validateUsername(name);
            this.emailIsInvalid = !this.validateEmail(email);
            this.passwordIsInvalid = !this.validatePassword(password);

            if (!this.emailIsInvalid && !this.passwordIsInvalid && !this.nameIsInvalid) {
                this.signupUser(data);
            }
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
    computed: {
        ...mapGetters([
            'getLoginError'
        ])
    },
    components: {
        GoogleLogin,
        FacebookLogin
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
.validation_error {
    margin: 5px 5px 5px 0;
    font-size: 12px;
    color: #d00b12;
    i {
        font-size: 16px;
        vertical-align: middle;
    }
    span {
        vertical-align: middle;
    }
}
.form-control.error {
    border-color: #d00b12;
}
</style>
