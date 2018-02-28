<template>
    <MainLayout>
        <div class="home-page">
            <div v-bind:key="eachSection.listPageUrl" v-for="(eachSection, index) in getHomePageSections">
                <PratilipiListComponent 
                    :sectionData="eachSection" 
                    :index="index"
                    v-bind="{ addToLibrary, removeFromLibrary }"
                ></PratilipiListComponent>
            </div>
        </div>
    </MainLayout>
</template>

<script>
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
            'getHomePageSections'
        ])
    },
    methods: {
        ...mapActions('homepage', [
            'getListOfSections',
            'addToLibrary',
            'removeFromLibrary'
        ]),
    },
    components: {
        PratilipiListComponent,
        MainLayout
    },
    created() {
        const currentLocale = this._i18n.locale;
        constants.LANGUAGES.forEach((eachLanguage) => {
            if (eachLanguage.shortName === currentLocale) {
                this.getListOfSections(eachLanguage.fullName.toUpperCase());
            }
        });
        
    }
}
</script>

<style  lang="scss" scoped>
    .home-page {
        margin-top: 75px;
    }
</style>
