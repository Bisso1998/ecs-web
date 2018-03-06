<template>
    <MainLayout>
        <div class="static-page">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2>__("write")</h2>
                        <div class="page-content">
                            <div class="col-lg-12 d-none d-lg-block d-xl-block"><!-- Desktop only -->
                                <div class="card">
                                    <button type="button" name="button">__("write_heading")</button>
                                </div>
                            </div>
                            <div class="col-md-12 d-block d-md-block d-lg-none"><!-- Android only -->
                                <div class="card">
                                    <p>Write your stories on Pratilipi App</p>
                                    <button type="button" name="button">Install the App</button>
                                </div>
                            </div>
                            <div class="col-md-12"><!-- LoggedIn only and has drafts -->
                                <div class="card">
                                    <div class="head-title">__("author_drafts")</div>
                                    <p>Finish writing your stories</p>
                                    <div class="draft">
                                        <div class="draft-img"><img src="" alt="image"></div>
                                        <div class="draft-name">Draft Name</div>
                                        <button type="button" name="button">__("pratilipi_edit_content")</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="card">
                                    <div class="head-title">__("event_events")</div>
                                    <p>Participate and win cash prizes</p>
                                    <img src="" alt="Events">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="card bg-image">
                                    <div class="head-title">Live Event</div>
                                    <p>Event Name</p>
                                </div>
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
import { mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        ...mapGetters([
            'writepage/getDraftedContents',
            'writepage/getDraftedContentsLoadingState',
            'writepage/getDraftedContentsTotalCount',
            'getUserDetails'
        ])
    },
    methods: {
        ...mapActions('writepage', [
            'fetchInitialDraftedContents',
            'fetchMoreDraftedContents'
        ]),
    },
    components: {
        MainLayout
    },
    created() {
        console.log('this');
        this.fetchInitialDraftedContents({ 
            authorId: this.getUserDetails.authorId,
            resultCount: 20
        })
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
}
</style>
