<template>
    <MainLayout>
        <div class="notification-page">
            <h1>List Page</h1>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
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
            'getPratilipiListTotalCount'
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
        MainLayout
    }
}
</script>

<style>
.notification-page {
    margin-top: 150px;
}
</style>