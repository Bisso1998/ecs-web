<template>
    <MainLayout>
        <div class="author-page">
            <div class="container">
                <div class="page-content">
                    <div class="row">
                        <div class="col-md-12 profile-top">
                            <div class="profile-cover" :style="{ backgroundImage: 'url(' + getAuthorData.coverImageUrl + ')' }"></div>
                            <div class="profile-image"><img :src="getAuthorData.imageUrl + '?width=150'" alt="profile"></div>
                            <div class="profile-user-name">{{ getAuthorData.name }}</div>
                            <div class="profile-read-by">__("author_readby_count")</div>
                            <div class="profile-summary">
                                <p>{{ getAuthorData.summary }}</p>
                                <button type="button" class="view-more" name="button">View More</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
    name: 'Pratilipi',
    data() {
        return {
            user_id: null,
        }
    },
    computed: {
        ...mapGetters([
            'getUserDetails'
        ]),
        ...mapGetters('authorpage', [
            'getAuthorData',
            'getAuthorDataLoadingState'
        ]),
        ...mapState({
            publishedContents: state => state.authorpage.published_contents.data,
            publishedContentsLoadingState: state => state.authorpage.published_contents.loading_state,
            publishedContentsCursor: state => state.authorpage.published_contents.cursor
        })
    },
    methods: {
        ...mapActions('authorpage', [
            'fetchInitialPublishedContents',
            'fetchMorePublishedContents',
            'fetchAuthorDetails'
        ])
    },
    watch: {
        'getUserDetails.authorId'(newValue) {
            this.fetchInitialPublishedContents({ 
                authorId: newValue,
                resultCount: 10
            });
        }
    },
    created() {
        this.fetchInitialPublishedContents({ 
            authorId: this.getUserDetails.authorId, 
            resultCount: 20 
        });

        const { user_slug } = this.$route.params;
        this.fetchAuthorDetails(user_slug);
    },
    components: {
        MainLayout
    }
}
</script>

<style lang="scss" scoped>
.author-page {
    background: #fff;
    margin-top: 85px;
    @media screen and (max-width: 992px ) {
        margin-top: 140px;
    }
    .profile-top {
        padding: 0;
        .profile-cover {
            width: 100%;
            height: 200px;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }
        .profile-image {
            width: 160px;
            height: 160px;
            background: #fff;
            border: 1px solid #e9e9e9;
            padding: 4px;
            margin: -80px auto 0;
            border-radius: 2px;
            img {
                width: 150px;
                height: 150px;
            }
        }
        .profile-user-name {
            font-weight: bold;
            margin: 5px 0;
        }
        .profile-read-by {
            font-size: 14px;
            margin: 5px 0;
        }
        .profile-summary p {
            margin: 5px;
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    }
}
</style>
