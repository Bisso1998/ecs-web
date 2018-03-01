<template>
    <div>
        <div class="alert alert-dark pratilipi-alert" role="alert">
            <p>{{ $t(getAlertMessage) }}</p>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'alert-dialog',
    data() {
        return {
            currentAlertStatus: false
        }
    },
    computed: {
        ...mapGetters('alert', [
            'getAlertMessage',
            'getAlertDisplayStatus'
        ])
    },
    watch:{
        getAlertDisplayStatus(value) {
            if (this.currentAlertStatus === value) {
                return;
            }
            if (value) {
                this.currentAlertStatus = true;
                $(".alert.alert-dark.pratilipi-alert").slideDown();
            } else {
                this.currentAlertStatus = false;
                $(".alert.alert-dark.pratilipi-alert").slideUp();
            }
        }
    }
}
</script>

<style>
    .pratilipi-alert {
        margin: 10px 0 0;
        position: fixed;
        bottom: 0;
        z-index: 5;
        background: #323232;
        color: #fff;
        font-size: 14px;
        border-radius: 0;
        text-align: left;
        display: none;
    }
</style>
