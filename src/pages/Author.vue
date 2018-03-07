<template>
    <MainLayout>
        <div class="author-page">
            <h1>Author Page</h1>
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

<style>
.author-page {
    margin-top: 150px;
}
</style>