<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
import '@/static_scripts/google_analytics.js'
import '@/static_scripts/amplitude_analytics.js'
import '@/static_scripts/facebook_analytics.js'
import mixins from '@/mixins';
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'App',
    methods: {
        ...mapActions([
            'fetchUserDetails',
            'fetchInitialNotifications',
            'setNotificationCount'
        ])
    },
    computed: {
        ...mapGetters([
            'getUserDetails'
        ])
    },
    mixins: [
        mixins
    ],
    watch: {
        'getUserDetails.isGuest'(isGuest) {
            if (!isGuest) {
                this.fetchInitialNotifications({ language: this.getCurrentLanguage().fullName.toUpperCase(), resultCount: 10 });
                import('firebase').then((firebase) => {
                    if (firebase.apps.length === 0) {
                        const config = {
                            apiKey: process.env.FIREBASE_API_KEY,
                            authDomain: process.env.FIREBASE_AUTH_DOMAIN,
                            databaseURL: process.env.FIREBASE_DATABASE_URL,
                            storageBucket: process.env.FIREBASE_STORAGE_BUCKET
                        };
                        firebase.initializeApp(config);
                    }
                    
                    const that = this;

                    firebase.auth().onAuthStateChanged( function( fbUser ) {
                        if( fbUser ) {
                            var newNotificationCountNode = firebase.database().ref( "NOTIFICATION" ).child( fbUser.uid ).child( "newNotificationCount" );
                            newNotificationCountNode.on( 'value', function( snapshot ) {
                                var newNotificationCount = snapshot.val() != null ? snapshot.val() : 0;
                                that.setNotificationCount(newNotificationCount);
                            });
                        } else {
                            firebase.auth().signInWithCustomToken( that.getUserDetails.firebaseToken );
                        }
                    });
                });

                this.setAnalyticsUserProperty('USER_ID', this.getUserDetails.userId || "0");
                this.setAnalyticsUserProperty('IS_LOGGED_IN', true);
                this.setAnalyticsUserProperty('AUTHOR_ID', this.getUserDetails.authorId);
            } else {
                this.setAnalyticsUserProperty('USER_ID', "0");
                this.setAnalyticsUserProperty('IS_LOGGED_IN', false);
            }

            const that = this;
            window.fbAsyncInit = function() {
                FB.init({
                    appId: process.env.FACEBOOK_APP_ID,
                    cookie: true,
                    xfbml: true,
                    autoLogAppEvents: false,
                    version: 'v2.10'
                });

                window.fbApiInit = true;
                FB.AppEvents.logPageView();
                if (!isGuest) {
                    that.setAnalyticsUserProperty('USER_ID', that.getUserDetails.userId || "0");
                    that.setAnalyticsUserProperty('IS_LOGGED_IN', true);
                    that.setAnalyticsUserProperty('AUTHOR_ID', that.getUserDetails.authorId);
                } else {
                    that.setAnalyticsUserProperty('USER_ID', "0");
                    that.setAnalyticsUserProperty('IS_LOGGED_IN', false);
                }
                that.setAnalyticsUserProperty('ENVIRONMENT', 'GROWTH');
                that.setAnalyticsUserProperty('CONTENT_LANGUAGE', that.getCurrentLanguage().fullName.toUpperCase());
            }
            
        }
    },
    created() {
        this.fetchUserDetails();

        const that = this;
        if (this.getUserDetails.isGuest !== undefined || this.getUserDetails.isGuest !== null) {
            window.fbAsyncInit = function() {
                FB.init({
                    appId: process.env.FACEBOOK_APP_ID,
                    cookie: true,
                    xfbml: true,
                    autoLogAppEvents: false,
                    version: 'v2.10'
                });

                window.fbApiInit = true;
                FB.AppEvents.logPageView();
                if (!that.getUserDetails.isGuest) {
                    that.setAnalyticsUserProperty('USER_ID', that.getUserDetails.userId || "0");
                    console.log('logging is logged in to true');
                    that.setAnalyticsUserProperty('IS_LOGGED_IN', true);
                    that.setAnalyticsUserProperty('AUTHOR_ID', that.getUserDetails.authorId);
                } else {
                    that.setAnalyticsUserProperty('USER_ID', "0");
                    console.log('logging is logged in to false');
                    that.setAnalyticsUserProperty('IS_LOGGED_IN', false);
                }
                that.setAnalyticsUserProperty('ENVIRONMENT', 'GROWTH');
                that.setAnalyticsUserProperty('CONTENT_LANGUAGE', that.getCurrentLanguage().fullName.toUpperCase());
            };
        }
    }
}
</script>

<style>
    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #212121;
    }

    html, body {
        margin: 0;
    }
</style>
