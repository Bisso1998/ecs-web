<template>
    <div>
        <Header></Header>
        <slot></slot>
        <LoginModal></LoginModal>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import LoginModal from '@/components/LoginModal.vue';
import Footer from '@/components/Footer.vue';

export default {
    components: {
        Header,
        LoginModal,
        Footer
    }
}
</script>

<style>
</style>
