<template>
    <div>
        <div class="top-footer">
            Todo: Footer columns
        </div>
        <footer>
            <p>
                © {{ new Date().getFullYear() }} Nasadiya Tech. Pvt. Ltd. | 
                <a href="/privacy-policy">{{ $t("footer_privacy_policy") }}</a> |
                <a href="/terms-of-service">{{ $t("footer_terms_of_service") }}</a>
            </p>
        </footer>
    </div>
</template>

<script>

export default {
    
}
</script>

<style lang="scss" scoped>
    .top-footer {
        background: #212121;
        color: #fff;
    }
    footer {
        background: #191919;
        color: #fff;
    }
</style>
