<template>
    <div>
        <div class="top-footer">
            <div class="container">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="foot-title">{{ $t("footer_contact_us") }}</div>
                        <div class="foot-items">
                            <a :href="'tel:' + $t('footer_contact_number').replace(' ', '')"><i class="material-icons material-icons-16 vertical-middle">phone</i> {{ $t("footer_contact_number") }}</a>
                            <a :href="'mailto:' + $t('footer_contact_email')"><i class="material-icons material-icons-16 vertical-middle">mail</i> {{ $t("footer_contact_email") }}</a>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        
                    </div>
                    <div class="col-sm-4">
                        
                    </div>
                </div>
            </div>
        </div>
        <footer>
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <p>
                            © {{ new Date().getFullYear() }} Nasadiya Tech. Pvt. Ltd. | 
                            <a href="/privacy-policy">{{ $t("footer_privacy_policy") }}</a> |
                            <a href="/terms-of-service">{{ $t("footer_terms_of_service") }}</a>
                        </p>
                    </div>
                </div>
            </div>
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
        color: #fefefe;
        font-size: 13px;
        padding: 15px 0;
        p {
            margin: 0;
            a {
                color: #fefefe;
            }
        }
    }
</style>
