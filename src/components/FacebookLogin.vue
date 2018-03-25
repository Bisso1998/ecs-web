<template>
    <button @click="loginToFacebook" type="button" name="button" class="fb"><icon name="facebook-f"></icon>__("user_sign_in_with_facebook")</button>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import mixins from '@/mixins';

export default {
    name: 'Facebook-Login-Button',
    mixins: [
        mixins
    ],
    methods: {
        ...mapActions([
            'loginUserWithFacebookAccessToken'
        ]),
        loginToFacebook() {
            const that = this;
            FB.login( function( fbResponse ) {
                if( fbResponse == null || fbResponse.authResponse == null ) {
                    return;
                }
                that.loginUserWithFacebookAccessToken({ facebookAccessToken: fbResponse.authResponse.accessToken, language: that.getCurrentLanguage().fullName.toUpperCase() });
            }, { scope: 'public_profile,email,user_birthday' } );
        }
    },
    components: {
        
    },
    created() {

        // const googleClientId = process.env.GOOGLE_CLIENT_ID;
        // if (document.getElementById('google-client-jssdk')) {
        //     return;
        // }
        // (function(d, s, id) {
        //     var js, fjs = d.getElementsByTagName(s)[0];
        //     if (d.getElementById(id)) { return; }
        //     js = d.createElement(s);
        //     js.id = id;
        //     js.src = "//apis.google.com/js/api.js";
        //     fjs.parentNode.insertBefore(js, fjs);
        // }(document, 'script', 'google-client-jssdk'));
        // document.getElementById('google-client-jssdk').onload = () => {
        //     gapi.load( 'auth2', function() {
        //         gapi.auth2.init({
        //             client_id: `${googleClientId}`,
        //             cookiepolicy: 'single_host_origin'
        //         }).then(() => {
        //             console.log('google api initialized')
        //         });
        //     });
        // }
    }
}
</script>

<style  lang="scss" scoped>
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
</style>
