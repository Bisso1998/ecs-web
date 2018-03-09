<template>
    <MainLayout>
        <div class="static-page">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2>Settings page</h2>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import constants from '@/constants';
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        MainLayout
    },
    computed: {
        ...mapGetters('settingsPage', [
            'getAuthorData'
        ])
    },
    methods: {
        ...mapActions('settingsPage', [
            'fetchStaticPageContent'
        ]),
    },
    created() {
        
        
    }
}
</script>

<style lang="scss" scoped>
.static-page {
    margin-top: 85px;
    text-align: left;
    @media screen and (max-width: 992px ) {
        margin-top: 140px;
    }
    h2 {
        font-size: 24px;
        font-weight: bold;
        text-align: left;
        border-left: 3px solid #d0021b;
        padding-left: 10px;
        margin: 10px 0;
    }
}
</style>
