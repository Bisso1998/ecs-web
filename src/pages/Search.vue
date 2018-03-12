<template>
    <MainLayout>
        <div class="search-page">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2>__("search_results")</h2>
                        <div class="head-title">__("search_results_authors")</div>
                        <div class="author-section">
                            <div class="follow">
                                <a>
                                    <div class="follow-img"></div>
                                    <div class="follow-name"><!-- {{ each_follower.author.name }} --></div>
                                </a>
                                <div class="follow-count">__("author_followers"): <span><!-- {{ each_follower.author.followCount }} --></span></div>
                                <button class="btn btn-light follow-link"><i class="material-icons">person_add</i> __("author_follow")</button>
                                <button style="display: none;" class="btn btn-light follow-link"><i class="material-icons">check</i> __("author_following")</button>
                            </div>
                        </div>
                        <div class="books-section">
                            <div class="head-title">__("search_results_contents")</div>
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
import PratilipiComponent from '@/components/Pratilipi.vue';

export default {
    components: {
        MainLayout,
        Spinner,
        PratilipiComponent
    }
}
</script>

<style lang="scss" scoped>
.search-page {
    margin-top: 85px;
    text-align: left;
    @media screen and (max-width: 992px ) {
        margin-top: 140px;
        text-align: center;
    }
    h2 {
        font-size: 20px;
        font-weight: bold;
        text-align: left;
        border-left: 3px solid #d0021b;
        padding-left: 10px;
        margin: 10px 0;
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
    .follow {
        border: 1px solid #e9e9e9;
        width: 150px;
        display: inline-block;
        margin: 10px 5px;
        position: relative;
        text-align: center;
        a {
            color: #d0021b;
        }
        .follow-img {
            display: block;
            width: 100px;
            height: 100px;
            margin: 10px auto;
            border-radius: 50%;
            background: #eee;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }
        .follow-name {
            font-size: 12px;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 100%;
            overflow: hidden;
            padding: 0 5px 5px;
        }
        .follow-link {
            background: #d0021b;
            color: #fff;
            font-size: 12px;
            margin: 10px 0;
            i {
                font-size: 16px;
                vertical-align: middle;
            }
        }
        .follow-count {
            font-size: 11px;
            margin: 0;
            span {
                font-weight: bold;
            }
        }
    }
}
</style>
