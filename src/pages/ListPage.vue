<template>
    <MainLayout>
        <div class="list-page">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2>{{ getPratilipiListTitle }}</h2>
                        <PratilipiComponent
                        :pratilipiData="pratilipiData"
                        :key="pratilipiData.pratilipiId"
                        v-for="pratilipiData in getPratilipiListData"
                        v-if="getPratilipiListLoadingState === 'LOADING_SUCCESS' || getPratilipiListData.length !== 0"
                        :addToLibrary="addToLibrary"
                        :removeFromLibrary="removeFromLibrary"
                        ></PratilipiComponent>
                        <Spinner v-if="getPratilipiListLoadingState === 'LOADING'"></Spinner>
                    </div>
                </div>
            </div>
        </div>
        <PageNotFound v-if="(getPratilipiListLoadingState === 'LOADING_ERROR' || getPratilipiListData.length === 0 ) && getPratilipiListLoadingState !== 'LOADING'"></PageNotFound>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import Spinner from '@/components/Spinner.vue';
import PratilipiComponent from '@/components/Pratilipi.vue';
import PageNotFound from '@/components/404.vue';
import constants from '@/constants'
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'List-Page',
    data() {
        return {
            user_id: null,
            scrollPosition: null
        }
    },
    computed: {
        ...mapGetters('listpage', [
            'getPratilipiListLoadingState',
            'getPratilipiListData',
            'getPratilipiListTotalCount',
            'getPratilipiListTitle',
            'getPratilipiListCursor'
        ])
    },
    methods: {
        ...mapActions('listpage', [
            'fetchInitialListPagePratilipis',
            'fetchMorePratilipisForListPage',
            'addToLibrary',
            'removeFromLibrary'
        ]),
        updateScroll(e) {
            this.scrollPosition = window.scrollY
        }
    },
    created() {
        console.log(this.$route)

        const { list_page_url } = this.$route.params;

        const currentLocale = process.env.LANGUAGE;
        constants.LANGUAGES.forEach((eachLanguage) => {
            if (eachLanguage.shortName === currentLocale) {
                this.fetchInitialListPagePratilipis({
                    language: eachLanguage.fullName.toUpperCase(),
                    listName: list_page_url,
                    resultCount: 20
                });
            }
        });
    },
    watch: {
        'scrollPosition'(newScrollPosition){
            const sbHeight = window.innerHeight * (window.innerHeight / document.body.offsetHeight)
            const nintyPercentOfList = ( 50 / 100 ) * $('.list-page').innerHeight();
            const { list_page_url } = this.$route.params;

            if (newScrollPosition + sbHeight > nintyPercentOfList && this.getPratilipiListLoadingState !== 'LOADING' && this.getPratilipiListCursor !== null) {
                
                const currentLocale = process.env.LANGUAGE;
                constants.LANGUAGES.forEach((eachLanguage) => {
                    if (eachLanguage.shortName === currentLocale) {
                        this.fetchMorePratilipisForListPage({
                            language: eachLanguage.fullName.toUpperCase(),
                            listName: list_page_url,
                            resultCount: 20
                        });
                    }
                });
            }
        }
    },
    mounted() {
        window.addEventListener('scroll', this.updateScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.updateScroll);
    },
    components: {
        MainLayout,
        PratilipiComponent,
        Spinner,
        PageNotFound
    }
}
</script>

<style lang="scss" scoped>
.list-page {
    margin-top: 85px;
    text-align: left;
    min-height: 700px;
    @media screen and (max-width: 992px ) {
        margin-top: 65px;
        text-align: center;
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
