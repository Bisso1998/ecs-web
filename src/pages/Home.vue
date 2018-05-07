<template>
    <MainLayout>
        <div class="home-page page-wrap">
            <Banners v-if="getHomePageBannersLoadingState === 'LOADING_SUCCESS'"
                :banners="getHomePageBanners"
            ></Banners>
            <Spinner v-if="getHomePageLoadingState === 'LOADING'"></Spinner>
            <div class="dummy-content-loader">
                <div class="dummy-section">
                    <div class="background-masker dummy-title"></div>
                    <div class="background-masker dummy-item">
                        <div class="background-masker dummy-image"></div>
                        <div class="background-masker dummy-name"></div>
                        <div class="background-masker dummy-author"></div>
                        <div class="background-masker dummy-stats"></div>
                    </div>
                </div>
            </div>
            <PratilipiListComponent v-if="getHomePageLoadingState === 'LOADING_SUCCESS'" v-bind:key="eachSection.listPageUrl" v-for="eachSection in getHomePageSections"
                :pratilipiList="eachSection.pratilipiList" 
                :title="eachSection.title"
                :listPageUrl="eachSection.listPageUrl"
                :screenName="'HOME'"
                :screenLocation="'COLLECTIONS'"
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
        ]),
        ...mapGetters([
            'getUserDetails'
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
        this.fetchBanners(this.getCurrentLanguage().fullName.toUpperCase());
        this.getListOfSections(this.getCurrentLanguage().fullName.toUpperCase());
        
    },
    mounted() {
        this.triggerAnanlyticsEvent('LANDED_HOMEM_HOME', 'CONTROL', {
            'USER_ID': this.getUserDetails.userId
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
    .dummy-content-loader {
        background: #fff;
        border: 1px solid;
        border-color: #e5e6e9 #dfe0e4 #d0d1d5;
        border-radius: 3px;
        padding: 12px;

        margin: 0 auto;
        max-width: 472px;
        min-height: 200px;
        @keyframes placeHolderShimmer {
            0%{
                background-position: -468px 0
            }
            100%{
                background-position: 468px 0
            }
        }
        .dummy-section {
            animation-duration: 1s;
            animation-fill-mode: forwards;
            animation-iteration-count: infinite;
            animation-name: placeHolderShimmer;
            animation-timing-function: linear;
            background: #f6f7f8;
            background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
            background-size: 800px 104px;
            height: 96px;
            position: relative;
        }
        .background-masker {
            background: #fff;
            position: absolute;
        }
        .background-masker.dummy-title {
            height: 34px;
            margin-bottom: 10px;
        }
    }
</style>
