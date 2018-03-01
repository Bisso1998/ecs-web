<template>
    <MainLayout>
        <div class="discovery-page">
            <h1>Discovery Page</h1>

            <div v-for="each_category_section in category_sections" :key="each_category_section.title">
                <h4>{{ each_category_section.title }}</h4>
                <ul>
                    <li v-for="each_category in each_category_section.categories" :key="each_category.categoryUrl" v-if="each_category.pratilipiListData.listName">
                        <a :href="each_category.categoryUrl">{{ each_category.title }}</a>
                    </li>
                </ul>
            </div>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import Constants from '@/constants';
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Pratilipi',
    data() {
        return {
            user_id: null,
            category_sections: []
        }
    },
    computed: {
        
    },
    methods: {
        
    },
    created() {
        this.category_sections = Constants.CATEGORY_DATA[this.$i18n.locale].sections;
        console.log();
    },
    components: {
        MainLayout
    }
}
</script>

<style>
.discovery-page {
    margin-top: 150px;
}
</style>