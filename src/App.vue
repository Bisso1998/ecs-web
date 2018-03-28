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
                import('firebase').then((firebase) => {
                    var config = {
                        apiKey: process.env.FIREBASE_API_KEY,
                        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
                        databaseURL: process.env.FIREBASE_DATABASE_URL,
                        storageBucket: process.env.FIREBASE_STORAGE_BUCKET
                    };
                    const firebaseApp = firebase.initializeApp(config);
                    const db = firebaseApp.database();
                    const that = this;

                    firebase.auth().onAuthStateChanged( function( fbUser ) {
                        if( fbUser ) {
                            var newNotificationCountNode = firebase.database().ref( "NOTIFICATION" ).child( fbUser.uid ).child( "newNotificationCount" );
                            newNotificationCountNode.on( 'value', function( snapshot ) {
                                var newNotificationCount = snapshot.val() != null ? snapshot.val() : 0;
                                that.setNotificationCount(newNotificationCount);
                            });
                            var userPreferencesNode = firebase.database().ref( "PREFERENCE" ).child( fbUser.uid );
                            userPreferencesNode.on( 'value', function( snapshot ) {
                                var userPreferences = snapshot.val() != null ? snapshot.val() : {};
                            });
                        } else {
                            firebase.auth().signInWithCustomToken( that.getUserDetails.firebaseToken );
                        }
                    });
                });
            } else {
                console.log('Im a guest')
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

                FB.AppEvents.logPageView();
                if (!isGuest) {
                    that.setAnalyticsUserProperty('USER_ID', that.getUserDetails.userId || "0");
                    that.setAnalyticsUserProperty('IS_LOGGED_ID', true);
                    that.setAnalyticsUserProperty('AUTHOR_ID', that.getUserDetails.authorId);
                } else {
                    that.setAnalyticsUserProperty('USER_ID', "0");
                    that.setAnalyticsUserProperty('IS_LOGGED_ID', false);
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

                FB.AppEvents.logPageView();
                if (!that.getUserDetails.isGuest) {
                    that.setAnalyticsUserProperty('USER_ID', that.getUserDetails.userId || "0");
                    that.setAnalyticsUserProperty('IS_LOGGED_ID', true);
                    that.setAnalyticsUserProperty('AUTHOR_ID', that.getUserDetails.authorId);
                } else {
                    that.setAnalyticsUserProperty('USER_ID', "0");
                    that.setAnalyticsUserProperty('IS_LOGGED_ID', false);
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
