<template>
    <div :class="currentLocale">
        <Header :userDetails="getUserDetails"></Header>
        <slot></slot>
        <LoginModal></LoginModal>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import LoginModal from '@/components/LoginModal.vue';
import Footer from '@/components/Footer.vue';

import { mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        ...mapGetters([
            'getUserDetails'
        ])
    },
    data() {
        return {
            currentLocale: ''
        }
    },
    methods: {
        ...mapActions([
            'fetchUserDetails'
        ])
    },
    components: {
        Header,
        LoginModal,
        Footer
    },
    created() {
        this.currentLocale = 'language-' + this.$i18n.locale;
        this.fetchUserDetails();
    }
}
</script>

<style>
</style>
