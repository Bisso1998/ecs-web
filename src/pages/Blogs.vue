<template>
    <MainLayout>
        <div class="static-page">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2>__("seo_blog_page")</h2>
                        <div class="page-content event-list">
                            <ul>
                                <li v-for="eachBlog in getBlogsData" :key="eachBlog.eventId">
                                    <router-link :to="{ name: 'Blog_Page', params: { blog_id: eachBlog.pageUrl.split('/').pop() } }">
                                        <h1>{{ eachBlog.title }}</h1>
                                        <p>{{ eachBlog.content }}</p>
                                    </router-link>
                                </li>
                            </ul>
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
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        MainLayout
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
    .event-list {
        text-align: left;
        @media screen and (max-width: 992px ) {
            text-align: center;
        }
        .event-section {
            margin-left: 13px;
            display: none;
        }
        ul {
            @media screen and (max-width: 992px ) {
                padding: 0;
            }
        }
        li {
            width: 300px;
            background: #fff;
            border: 1px solid #e9e9e9;
            height: 252px;
            margin: 10px;
            color: #d0021b;
            display: inline-block;
            @media screen and (max-width: 768px ) {
                width: 100%;
                max-width: 340px;
                height: 150px;
            }
            a {
                color: #212121;
                &:hover {
                    text-decoration: none;
                }
            }
            .event-img {
                width: 100%;
                height: 210px;
                display: block;
                background-size: cover;
                background-position: right center;
                @media screen and (max-width: 768px ) {
                    height: 100px;
                }
            }
            .event-name {
                text-align: center;
                font-size: 14px;
                display: block;
                height: 40px;
                line-height: 40px;
                color: #d00b12;
                @media screen and (max-width: 768px ) {
                    height: 50px;
                    line-height: 50px;
                }
            }
        }
    }
}
</style>
