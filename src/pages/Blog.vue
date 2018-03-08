<template>
    <MainLayout>
        <div class="blog-page">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card event-info">
                            <div class="head-title">{{ getBlogData.title }}</div>
                            <div class="desc" v-html="getBlogData.content"></div>
                            <Spinner v-if="getBlogDataLoadingStatus === 'LOADING'"></Spinner>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import PratilipiComponent from '@/components/Pratilipi.vue';
import Spinner from '@/components/Spinner.vue';
import constants from '@/constants'
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        MainLayout,
        Spinner
    },
    computed: {
        ...mapGetters('blogpage', [
            'getBlogData',
            'getBlogDataLoadingStatus'
        ])
    },
    methods: {
        ...mapActions('blogpage', [
            'fetchBlogData'
        ])
    },
    watch: {
        '$route.params.blog_id' (blog_id) {
            this.fetchBlogData(blogId);
        }
    },
    created() {
        const { blog_id } = this.$route.params;
        this.fetchBlogData(`/blog/${blog_id}`);
        
    }
}
</script>

<style lang="scss" scoped>
.blog-page {
    margin-top: 85px;
    text-align: left;
    background: #f8f8f8;
    @media screen and (max-width: 992px ) {
        margin-top: 140px;
    }
    h2 {
        font-size: 24px;
        font-weight: bold;
        text-align: left;
        border-left: 3px solid #d0021b;
        padding-left: 10px;
        margin: 10px 0;
    }
    .card {
        border-radius: 0;
        margin: 10px 0;
        padding: 0;
        text-align: center;
        .head-title {
            font-size: 18px;
            font-weight: bold;
            text-align: left;
            border-left: 3px solid #d0021b;
            padding-left: 10px;
            margin: 10px 0 0;
        }
        &.event-info img {
            max-width: 100%;
            margin: 10px;
        }
        .desc {
            text-align: left;
            padding: 10px;
            font-size: 14px;
        }
    }
    .event-list {
        text-align: left;
        display: block;
        @media screen and (max-width: 992px ) {
            text-align: center;
        }
    }
}
</style>
