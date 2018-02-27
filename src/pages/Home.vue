<template>
    <MainLayout>
        <div class="home-page">
            <div v-bind:key="eachSection.listPageUrl" v-for="(eachSection, index) in sectionList">
                <PratilipiListComponent :sectionData="eachSection " :index="index"></PratilipiListComponent>
            </div>
        </div>
    </MainLayout>
</template>

<script>
import PratilipiListComponent from '@/components/PratilipiList.vue';
import MainLayout from '@/layout/main-layout.vue';

import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Home',
    data() {
        return {
            sectionList: []
        }
    },
    created: function() {
        this
            .$http
            .get('init?_apiVer=2&language=MALAYALAM')
            .then(function(response) {
                this.sectionList = response.body.sections;
            }, function(error) {
                console.log(error);
            });
        
    },
    methods: {
        ...mapActions([
            'getListOfSections'
        ]),
    },
    components: {
        PratilipiListComponent,
        MainLayout
    },
    created() {
        this.getListOfSections();
    }
}
</script>

<style  lang="scss" scoped>
    .home-page {
        margin-top: 75px;
    }
</style>
