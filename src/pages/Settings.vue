<template>
    <MainLayout>
        <div class="settings-page">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="settings-menu">
                            <a href="#" v-on:click="tabchange" class="active" data-tab="profile-setting"><span>{{ getAuthorData.contentPublished }}</span>__("author_published_contents")</a>
                            <a href="#" v-on:click="tabchange" data-tab="notification-setting">__("library")</a>
                            <a href="#" v-on:click="tabchange" data-tab="password-setting"><span>{{ getAuthorData.followCount }}</span>__("author_followers")</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import constants from '@/constants';
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        MainLayout
    },
    computed: {
        ...mapGetters('settingspage', [
            'getAuthorData'
        ]),
        ...mapGetters([
            'getUserDetails'
        ]),
    },
    methods: {
        ...mapActions('settingspage', [
            'fetchAuthorDetails'
        ]),
    },
    watch: {
        'getUserDetails.authorId'(newValue) {
            if (newValue) {
                this.fetchAuthorDetails(newValue);
            }
        }
    },
    created() {
        if (this.getUserDetails.authorId) {
            this.fetchAuthorDetails(this.getUserDetails.authorId);    
        }
    }
}
</script>

<style lang="scss" scoped>
.settings-page {
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
