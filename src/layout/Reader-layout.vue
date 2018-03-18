<template>
    <div>
        <slot></slot>
        <LoginModal></LoginModal>
        <ShareModal></ShareModal>
        <Alert></Alert>
    </div>
</template>

<script>
import LoginModal from '@/components/LoginModal.vue';
import ShareModal from '@/components/Share.vue';
import Alert from '@/components/Alert.vue';

import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        LoginModal,
        ShareModal,
        Alert
    },
    computed: {
        ...mapGetters([
            'getUserDetails',
            'getNotificationCount'
        ])
    },
    methods: {
        ...mapActions([
            'fetchUserDetails',
            'fetchInitialNotifications'
        ])
    },
    watch: {
        'getUserDetails.userId'(newValue) {
            if (newValue) {
                const currentLocale = process.env.LANGUAGE;
                constants.LANGUAGES.forEach((eachLanguage) => {
                    if (eachLanguage.shortName === currentLocale) {
                        this.fetchInitialNotifications(eachLanguage.fullName.toUpperCase(), 10);
                    }
                });
            }
        }
    }
}
</script>

<style lang="scss">

</style>
