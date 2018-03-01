<template>
    <MainLayout>
        <div class="pratilipi-page">
            Pratilipi ID : {{ pratilipi_id }}
            <br>
            Pratilipi Data : {{ pratilipiData }}

            <br>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Pratilipi',
    data() {
        return {
            pratilipi_id: null,
            pratilipiData: null
        }
    },
    computed: {
        ...mapGetters('pratilipipage', [
            'getPratilipiData',
            'getUserPratilipiData',
            'getReviews',
            'getRecommendations'
        ])
    },
    methods: {
        ...mapActions('pratilipipage', [
            'fetchPratilipiDetailsAndUserPratilipiData',
            'fetchUserPratilipiData',
            'fetchUserReviews',
            'fetchPratilipiRecommendation',
            'setCachedPratilipiData'
        ]),
    },
    created() {
        const slug_id = this.$route.params.slug_id;
        const pratilipiData = this.$route.params.pratilipiData;

        if (pratilipiData) {
            this.setCachedPratilipiData(pratilipiData);
        }

        this.fetchPratilipiDetailsAndUserPratilipiData(slug_id);
    },
    components: {
        MainLayout
    }
}
</script>

<style>
</style>