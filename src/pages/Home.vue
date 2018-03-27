<template>
    <MainLayout>
        <div class="home-page">
            <Banners v-if="getHomePageBannersLoadingState === 'LOADING_SUCCESS'"
                :banners="getHomePageBanners"
            ></Banners>
            <Spinner v-if="getHomePageLoadingState === 'LOADING'"></Spinner>
            <PratilipiListComponent v-if="getHomePageLoadingState === 'LOADING_SUCCESS'" v-bind:key="eachSection.listPageUrl" v-for="eachSection in getHomePageSections"
                :pratilipiList="eachSection.pratilipiList" 
                :title="eachSection.title"
                :listPageUrl="eachSection.listPageUrl"
                v-bind="{ addToLibrary, removeFromLibrary }"
            ></PratilipiListComponent>
            <ServerError :action="'homepage/getListOfSections'" :data="getCurrentLanguage().fullName.toUpperCase()" v-if="getHomePageLoadingState === 'LOADING_ERROR'"></ServerError>
        </div>
    </MainLayout>
</template>

<script>
import Spinner from '@/components/Spinner.vue';
import PratilipiListComponent from '@/components/PratilipiList.vue';
import MainLayout from '@/layout/main-layout.vue';
import Banners from '@/components/Banners.vue';
import ServerError from '@/components/ServerError.vue';
import constants from '@/constants'
import mixins from '@/mixins'


import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Home',
    data() {
        return {
            sectionList: []
        }
    },
    mixins: [
        mixins
    ],
    computed: {
        ...mapGetters('homepage', [
            'getHomePageSections',
            'getHomePageLoadingState',
            'getHomePageBanners',
            'getHomePageBannersLoadingState'
        ])
    },
    methods: {
        ...mapActions('homepage', [
            'getListOfSections',
            'addToLibrary',
            'removeFromLibrary',
            'fetchBanners'
        ]),
    },
    components: {
        Spinner,
        PratilipiListComponent,
        MainLayout,
        Banners,
        ServerError
    },
    created() {
        const currentLocale = process.env.LANGUAGE;
        constants.LANGUAGES.forEach((eachLanguage) => {
            if (eachLanguage.shortName === currentLocale) {
                this.fetchBanners(eachLanguage.fullName.toUpperCase());
                this.getListOfSections(eachLanguage.fullName.toUpperCase());
            }
        });
        
    }
}
</script>

<style  lang="scss" scoped>
    .home-page {
        margin-top: 85px;
        min-height: 700px;
        @media screen and (max-width: 992px ) {
            margin-top: 65px;
        }
    }
</style>
