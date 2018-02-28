<template>
    <div>
        <div class="alert alert-dark pratilipi-alert" role="alert">
          <slot></slot>
        </div>
    </div>
</template>

<script>

export default {
    method: {
        closeAlert() {
            
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
    }
</style>
