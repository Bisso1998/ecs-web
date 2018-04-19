<template>
    <div :class="currentLocale">
        <Header :userDetails="getUserDetails" :notificationCount="getNotificationCount" ></Header>
        <AppBanner></AppBanner>
        <slot></slot>
        <PratilipiModal></PratilipiModal>
        <LoginModal></LoginModal>
        <ShareModal></ShareModal>
        <InputModal></InputModal>
        <MultiInputModal></MultiInputModal>
        <ConfirmationModal></ConfirmationModal>
        <Footer></Footer>
        <Alert></Alert>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import AppBanner from '@/components/AppBanner.vue';
import PratilipiModal from '@/components/PratilipiModal.vue';
import LoginModal from '@/components/LoginModal.vue';
import ShareModal from '@/components/Share.vue';
import InputModal from '@/components/InputModal.vue';
import MultiInputModal from '@/components/MultiInputModal.vue';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import Footer from '@/components/Footer.vue';
import Alert from '@/components/Alert.vue';

import constants from '@/constants'
import mixins from '@/mixins'

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
    mixins: [
        mixins
    ],
    methods: {
        ...mapActions([
            'fetchUserDetails',
            'fetchInitialNotifications'
        ])
    },
    components: {
        Header,
        AppBanner,
        PratilipiModal,
        LoginModal,
        ShareModal,
        InputModal,
        MultiInputModal,
        ConfirmationModal,
        Footer,
        Alert
    },
    watch: {
        'getUserDetails.userId'(newValue) {
            if (newValue) {
                this.fetchInitialNotifications({ language: this.getCurrentLanguage().fullName.toUpperCase(), resultCount: 10 });
            }
        }
    },
    created() {
        this.currentLocale = 'language-' + process.env.LANGUAGE;
    }
}
</script>

<style lang="scss">
.modal-body {
    max-height: calc(100vh - 200px);
    overflow-y: auto;
}
</style>
