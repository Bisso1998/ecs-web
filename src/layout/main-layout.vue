<template>
    <div :class="currentLocale">
        <Header :userDetails="getUserDetails"></Header>
        <slot></slot>
        <LoginModal></LoginModal>
        <Footer></Footer>
        <Alert></Alert>
        <a href="javascript:" id="return-to-top"><i class="material-icons">keyboard_arrow_up</i></a>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import LoginModal from '@/components/LoginModal.vue';
import Footer from '@/components/Footer.vue';
import Alert from '@/components/Alert.vue';

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
        Footer,
        Alert
    },
    created() {
        this.currentLocale = 'language-' + this.$i18n.locale;
        this.fetchUserDetails();
    },
    mounted () {
        $(window).scroll(function() {
            if ($(this).scrollTop() >= 50) {
                $('#return-to-top').fadeIn(200);
            } else {
                $('#return-to-top').fadeOut(200);
            }
        });
        $('#return-to-top').click(function() {
            $('body,html').animate({
                scrollTop : 0
            }, 500);
        });
    }
}
</script>

<style lang="scss">
#return-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: rgba(209, 2, 27, 0.7);
    width: 50px;
    height: 50px;
    display: block;
    text-decoration: none;
    border-radius: 50%;
    display: none;
    -webkit-transition: all 0.3s linear;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
    i {
        color: #fff;
        margin: 0;
        position: relative;
        top: 13px;
        font-size: 24px;
        -webkit-transition: all 0.3s ease;
        -moz-transition: all 0.3s ease;
        -ms-transition: all 0.3s ease;
        -o-transition: all 0.3s ease;
        transition: all 0.3s ease;
    }
    &:hover {
        background: rgba(209, 2, 27, 0.9);
    }
    &:hover i {
        top: 10px;
    }
}
</style>
