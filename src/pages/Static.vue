<template>
    <MainLayout>
        <div class="static-page">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2>{{ getStaticPageData.title }}</h2>
                        <div class="page-content" v-html="getStaticPageData.content">
                        </div>
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
        ...mapGetters('staticpage', [
            'getStaticPageData',
            'getStaticPageLoadingStatus'
        ])
    },
    methods: {
        ...mapActions('staticpage', [
            'fetchStaticPageContent'
        ]),
    },
    watch: {
        '$route.path' (path) {
            let pageName = '';
            switch(path) {
                case '/about/pratilipi':
                    pageName = 'about_pratilipi';
                    break;
                case '/work-with-us':
                    pageName = 'work-with-us';
                    break;
                case '/privacy-policy':
                    pageName = 'privacy-policy';
                    break;
                case '/terms-of-service':
                    pageName = 'terms-of-service';
                    break;
            }

            const currentLocale = process.env.LANGUAGE;
            constants.LANGUAGES.forEach((eachLanguage) => {
                if (eachLanguage.shortName === currentLocale) {
                    this.fetchStaticPageContent({ pageName, language: eachLanguage.fullName.toUpperCase() })
                }
            });
        }
    },
    created() {
        console.log(this.$route)
        let pageName = '';
        switch(this.$route.path) {
            case '/about/pratilipi':
                pageName = 'about_pratilipi';
                break;
            case '/work-with-us':
                pageName = 'work-with-us';
                break;
            case '/privacy-policy':
                pageName = 'privacy-policy';
                break;
            case '/terms-of-service':
                pageName = 'terms-of-service';
                break;
        }

        const currentLocale = process.env.LANGUAGE;
        constants.LANGUAGES.forEach((eachLanguage) => {
            if (eachLanguage.shortName === currentLocale) {
                this.fetchStaticPageContent({ pageName, language: eachLanguage.fullName.toUpperCase() })
            }
        });
        
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
