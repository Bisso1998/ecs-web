<template>
    <MainLayout>
        <div class="list-page">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2>{{ getPratilipiListTitle }}</h2>
                        <PratilipiComponent
                        :pratilipiList="getPratilipiListData"
                        v-bind="{ addToLibrary, removeFromLibrary }"
                        v-if="getPratilipiListLoadingState === 'LOADING_SUCCESS'"
                        ></PratilipiComponent>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import PratilipiComponent from '@/components/Pratilipi.vue';
import constants from '@/constants'
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'List-Page',
    data() {
        return {
            user_id: null,
        }
    },
    computed: {
        ...mapGetters('listpage', [
            'getPratilipiListLoadingState',
            'getPratilipiListData',
            'getPratilipiListTotalCount',
            'getPratilipiListTitle'
        ])
    },
    methods: {
        ...mapActions('listpage', [
            'fetchInitialListPagePratilipis',
            'fetchMorePratilipisForListPage'
        ]),
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
    components: {
        MainLayout,
        PratilipiComponent
    }
}
</script>

<style>
.notification-page {
    margin-top: 150px;
}
</style>
