import firebase from 'firebase'


let config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(fbUser) {
    if (fbUser) {
        var newNotificationCountNode = firebase.database().ref("NOTIFICATION").child(fbUser.uid).child("newNotificationCount");
        newNotificationCountNode.on('value', function(snapshot) {
            var newNotificationCount = snapshot.val() != null ? snapshot.val() : 0;
            console.log('-----------NEW NOTIFICATION COUNT---------');
            console.log(newNotificationCount);
        });
        var userPreferencesNode = firebase.database().ref("PREFERENCE").child(fbUser.uid);
        userPreferencesNode.on('value', function(snapshot) {
            var userPreferences = snapshot.val() != null ? snapshot.val() : {};
            console.log('-----------NEW NOTIFICATION COUNT---------');
            console.log(userPreferences);
        });
    } else {
        console.log('Im here');
        // firebase.auth().signInWithCustomToken(appViewModel.user.firebaseToken());
    }
});