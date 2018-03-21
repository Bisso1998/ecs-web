<template>
    <div :class="currentLocale">
        <Header :userDetails="getUserDetails" :notificationCount="getNotificationCount" ></Header>
        <slot></slot>
        <LoginModal></LoginModal>
        <ShareModal></ShareModal>
        <InputModal></InputModal>
        <Footer></Footer>
        <Alert></Alert>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import LoginModal from '@/components/LoginModal.vue';
import ShareModal from '@/components/Share.vue';
import InputModal from '@/components/InputModal.vue';
import Footer from '@/components/Footer.vue';
import Alert from '@/components/Alert.vue';

import constants from '@/constants'

import { mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        ...mapGetters([
            'getUserDetails',
            'getNotificationCount'
        ])
    },
    data() {
        return {
            currentLocale: ''
        }
    },
    methods: {
        ...mapActions([
            'fetchUserDetails',
            'fetchInitialNotifications'
        ])
    },
    components: {
        Header,
        LoginModal,
        ShareModal,
        InputModal,
        Footer,
        Alert
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
    },
    created() {
        this.currentLocale = 'language-' + process.env.LANGUAGE;
    }
}
</script>
