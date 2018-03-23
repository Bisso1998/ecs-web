<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
import '@/static_scripts/google_analytics.js'
import '@/static_scripts/amplitude_analytics.js'
import '@/static_scripts/facebook_analytics.js'
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
            }
        }
    },
    created() {
        this.fetchUserDetails();
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
