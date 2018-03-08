<template>
    <MainLayout>
        <div class="list-page">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2>__('my_library')</h2>
                        <PratilipiComponent
                        :pratilipiData="pratilipiData"
                        :key="pratilipiData.pratilipiId"
                        v-for="pratilipiData in getPratilipiListData"
                        v-if="getPratilipiListLoadingState === 'LOADING_SUCCESS' || getPratilipiListData.length !== 0"
                        :addToLibrary="addToLibrary"
                        :removeFromLibrary="removeFromLibrary"
                        ></PratilipiComponent>
                        <Spinner v-if="getPratilipiListLoadingState === 'LOADING'"></Spinner>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import Spinner from '@/components/Spinner.vue';
import PratilipiComponent from '@/components/Pratilipi.vue';
import constants from '@/constants'
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Library-Page',
    data() {
        return {
            user_id: null,
            scrollPosition: null
        }
    },
    computed: {
        ...mapGetters('librarypage', [
            'getPratilipiListLoadingState',
            'getPratilipiListData',
            'getPratilipiListTotalCount',
            'getPratilipiListCursor'
        ])
    },
    methods: {
        ...mapActions('librarypage', [
            'fetchInitialLibraryPagePratilipis',
            'fetchMorePratilipisForLibraryPage',
            'addToLibrary',
            'removeFromLibrary'
        ]),
        updateScroll() {
            this.scrollPosition = window.scrollY
        }
    },
    created() {
        console.log(this.$route)

        this.fetchInitialLibraryPagePratilipis(20);
    },
    watch: {
        'scrollPosition'(newScrollPosition){
            const nintyPercentOfList = ( 75 / 100 ) * $('.list-page').innerHeight();
            // const { list_page_url } = this.$route.params;

            if (newScrollPosition > nintyPercentOfList && this.getPratilipiListLoadingState !== 'LOADING' && this.getPratilipiListCursor !== null) {
                
                this.fetchMorePratilipisForLibraryPage(20);
            }
        }
    },
    mounted() {
        window.addEventListener('scroll', this.updateScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.updateScroll);
    },
    components: {
        MainLayout,
        PratilipiComponent,
        Spinner
    }
}
</script>

<style lang="scss" scoped>
.list-page {
    margin-top: 85px;
    text-align: left;
    @media screen and (max-width: 992px ) {
        margin-top: 140px;
        text-align: center;
    }
    h2 {
        font-size: 24px;
        font-weight: bold;
        text-align: left;
        border-left: 3px solid #d0021b;
        padding-left: 10px;
        margin: 10px 0;
    }
}
</style>
