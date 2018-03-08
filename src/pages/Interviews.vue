<template>
    <MainLayout>
        <div class="static-page">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="page-title">__("seo_author_interview")</div>
                        <div class="page-content blog-section">
                            <ul>
                                <li v-for="eachBlog in getBlogsData" :key="eachBlog.eventId" class="card">
                                    <router-link :to="{ name: 'Blog_Page', params: { blog_id: eachBlog.pageUrl.split('/').pop() } }">
                                        <div class="head-title">{{ eachBlog.title }}</div>
                                        <div class="blog-summary">{{ eachBlog.content }}</div>
                                        <div class="view-more">__("view_more")</div>
                                    </router-link>
                                </li>
                            </ul>
                            <Spinner v-if="getBlogsLoadingState === 'LOADING'"></Spinner>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import constants from '@/constants'
import Spinner from '@/components/Spinner.vue';
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        MainLayout,
        Spinner
    },
    computed: {
        ...mapGetters('blogspage', [
            'getBlogsLoadingState',
            'getBlogsData'
        ])
    },
    methods: {
        ...mapActions('blogspage', [
            'fetchInitialListOfBlogs',
            'fetchMoreBlogs'
        ]),
    },
    created() {
        const currentLocale = process.env.LANGUAGE;
        constants.LANGUAGES.forEach((eachLanguage) => {
            if (eachLanguage.shortName === currentLocale) {
                this.fetchInitialListOfBlogs({ language: eachLanguage.fullName.toUpperCase(), resultCount: 20 })
            }
        });
    }
}
</script>

<style lang="scss" scoped>
.static-page {
    margin-top: 85px;
    text-align: left;
    background: #f8f8f8;
    @media screen and (max-width: 992px ) {
        margin-top: 140px;
    }
    .page-title {
        text-align: left;
        font-size: 24px;
        font-weight: bold;
    }
    .blog-section {
        ul {
            padding: 0;
        }
        .card {
            border-radius: 0;
            margin: 10px;
            a {
                color: #2c3e50;
                .head-title {
                    font-size: 18px;
                    font-weight: bold;
                    text-align: left;
                    border-left: 3px solid #d0021b;
                    padding-left: 10px;
                    margin: 10px 0 0;
                }
                .blog-summary {
                    font-size: 14px;
                    padding: 0 10px;
                    margin: 5px 0;
                    height: 90px;
                    overflow: hidden;
                }
                &:hover {
                    text-decoration: none;
                }
                .view-more {
                    color: #d0021b;
                    padding: 0 10px 10px;
                    font-size: 14px;
                    text-align: right;
                }
            }
        }
    }
}
</style>
