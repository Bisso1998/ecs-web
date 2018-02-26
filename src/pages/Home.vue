<template>
    <div class="home">
        <Header></Header>
        <div v-bind:key="eachSection.listPageUrl" v-for="(eachSection, index) in sectionList">
            <PratilipiListComponent :sectionData="eachSection" :index="index"></PratilipiListComponent>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import PratilipiListComponent from '@/components/PratilipiList.vue';

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
            .get('init?_apiVer=2&language=HINDI')
            .then(function(response) {
                this.sectionList = response.body.sections;
            }, function(error) {
                console.log(error);
            });
        
    },
    components: {
        Header,
        PratilipiListComponent
    }
}
</script>

<style>
</style>
