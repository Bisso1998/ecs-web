<template>
    <MainLayout>
        <div class="search-page">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2>__("search_results")</h2>
                        <div class="head-title" v-if="getAuthorListData.length !== 0">__("search_results_authors")</div>
                        <div class="author-section">
                            <AuthorCard v-for="eachAuthor in getAuthorListData" 
                                :key="eachAuthor.authorId" 
                                :authorData="eachAuthor"
                                :followOrUnfollowAuthor="followOrUnfollowAuthor"></AuthorCard>
                        </div>
                        <div class="books-section">
                            <div class="head-title" v-if="getPratilipiListLoadingState === 'LOADING_SUCCESS' || getPratilipiListData.length !== 0">__("search_results_contents")</div>
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
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import Spinner from '@/components/Spinner.vue';
import AuthorCard from '@/components/AuthorCard.vue';
import PratilipiComponent from '@/components/Pratilipi.vue';
import constants from '@/constants'
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        MainLayout,
        Spinner,
        AuthorCard,
        PratilipiComponent
    },
    data() {
        return {
            scrollPosition: null
        }
    },
    computed: {
        ...mapGetters('searchpage', [
            'getPratilipiListLoadingState',
            'getPratilipiListCursor',
            'getPratilipiListData',
            'getAuthorListLoadingState',
            'getAuthorListCursor',
            'getAuthorListData'
        ])
    },
    methods: {
        ...mapActions('searchpage', [
            'fetchInitialSearchResult',
            'fetchMorePratilipisForSearchPage',
            'addToLibrary',
            'removeFromLibrary',
            'followOrUnfollowAuthor'
        ]),
        updateScroll() {
            this.scrollPosition = window.scrollY
        }
    },
    watch: {
        'scrollPosition'(newScrollPosition){
            const nintyPercentOfList = ( 75 / 100 ) * $('.search-page').innerHeight();
            const { list_page_url } = this.$route.params;

            if (newScrollPosition > nintyPercentOfList && this.getPratilipiListLoadingState !== 'LOADING' && this.getPratilipiListCursor !== null) {
                
                const currentLocale = process.env.LANGUAGE;
                constants.LANGUAGES.forEach((eachLanguage) => {
                    if (eachLanguage.shortName === currentLocale) {
                        this.fetchMorePratilipisForSearchPage({ 
                            searchQuery: this.$route.query.searchText,
                            language: eachLanguage.fullName.toUpperCase(),
                            resultCount: 10
                        });
                    }
                });
            }
        },
        '$route.query.searchText'(newValue) {
            console.log(newValue)

            const currentLocale = process.env.LANGUAGE;
            constants.LANGUAGES.forEach((eachLanguage) => {
                if (eachLanguage.shortName === currentLocale) {
                    this.fetchInitialSearchResult({ 
                        searchQuery: this.$route.query.searchText,
                        language: eachLanguage.fullName.toUpperCase(),
                    });
                }
            });
        }
    },
    mounted() {
        window.addEventListener('scroll', this.updateScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.updateScroll);
    },
    created() {
        if (this.$route.query.searchText) {
            const currentLocale = process.env.LANGUAGE;
            constants.LANGUAGES.forEach((eachLanguage) => {
                if (eachLanguage.shortName === currentLocale) {
                    this.fetchInitialSearchResult({ 
                        searchQuery: this.$route.query.searchText,
                        language: eachLanguage.fullName.toUpperCase(),
                    });
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.search-page {
    margin-top: 85px;
    text-align: left;
    @media screen and (max-width: 992px ) {
        margin-top: 65px;
        text-align: center;
    }
    h2 {
        font-size: 22px;
        font-weight: bold;
        text-align: left;
        border-left: 3px solid #d0021b;
        padding-left: 10px;
        margin: 10px 0;
        @media screen and (max-width: 768px ) {
            font-size: 18px;
        }
    }
    .head-title {
        font-size: 16px;
        font-weight: bold;
        text-align: left;
        border-left: 3px solid #d0021b;
        padding-left: 10px;
        margin: 10px 0 5px;
    }
    .author-section {
        width: 100%;
        overflow: hidden;
        overflow-x: auto;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: left;
    }
}
</style>
