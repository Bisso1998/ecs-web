<template>
    <MainLayout>
        <div class="home-page">
            <Spinner v-if="getHomePageLoadingState === 'LOADING'"></Spinner>
            <div v-if="getHomePageLoadingState === 'LOADING_SUCCESS'" v-bind:key="eachSection.listPageUrl" v-for="eachSection in getHomePageSections">
                <PratilipiListComponent 
                    :pratilipiList="eachSection.pratilipiList" 
                    :title="eachSection.title"
                    :listPageUrl="eachSection.listPageUrl"
                    v-bind="{ addToLibrary, removeFromLibrary }"
                ></PratilipiListComponent>
            </div>
        </div>
    </MainLayout>
</template>

<script>
import Spinner from '@/components/Spinner.vue';
import PratilipiListComponent from '@/components/PratilipiList.vue';
import MainLayout from '@/layout/main-layout.vue';
import constants from '@/constants'

import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Home',
    data() {
        return {
            sectionList: []
        }
    },
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
        MainLayout
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
        @media screen and (max-width: 992px ) {
            margin-top: 140px;
        }
    }
</style>
