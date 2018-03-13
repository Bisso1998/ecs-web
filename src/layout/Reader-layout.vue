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

export default {
    components: {
        LoginModal,
        ShareModal,
        Alert
    }
}
</script>

<style lang="scss">

</style>
