<template>
    <MainLayout>
        <div class="static-page page-wrap">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">check</th>
                                    <th scope="col">User</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Title_En</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Language</th>
                                    <!-- <th scope="col">Word Count</th> -->
                                    <th scope="col">Submission ID</th>
                                    <th scope="col">Slug</th>
                                    <th scope="col">State</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="eachEventPratilipi in getEventPratilipis" :key="eachEventPratilipi._id">
                                    <th scope="row">1</th>
                                    <td>{{ eachEventPratilipi.pratilipiUserId }}</td>
                                    <td>{{ eachEventPratilipi.title }}</td>
                                    <td>{{ eachEventPratilipi.titleEn }}</td>
                                    <td>{{ eachEventPratilipi.type }}</td>
                                    <td>{{ eachEventPratilipi.language }}</td>
                                    <!-- <td>{{ eachEventPratilipi.titleEn }}</td> -->
                                    <td>{{ eachEventPratilipi._id }}</td>
                                    <td v-if="eachEventPratilipi.pratilipiSlug"><router-link :to="eachEventPratilipi.pratilipiSlug">{{ eachEventPratilipi.pratilipiSlug }}</router-link></td>
                                    <td v-else>NA</td>
                                    <td>{{ eachEventPratilipi.state }}</td>
                                    <td>
                                        <button type="button" class="btn sign-in" :disabled="eachEventPratilipi.state !== 'SUBMITTED'" @click="publishContent(eachEventPratilipi._id)">Publish</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import constants from '@/constants';
import Spinner from '@/components/Spinner.vue';
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        MainLayout,
        Spinner
    },
    computed: {
        ...mapGetters('admineventsubmissions', [
            'getEventPratilipis',
            'getEventPratilipisLoadingStatus'
        ])
    },
    methods: {
        ...mapActions('admineventsubmissions', [
            'fetchEventPratilipis',
            'publishContent'
        ]),
    },
    watch: {
        
    },
    created() {
        this.fetchEventPratilipis();
    }
}
</script>

<style lang="scss" scoped>
.static-page {
    margin-top: 85px;
    text-align: left;
    min-height: 600px;
    @media screen and (max-width: 992px ) {
        margin-top: 65px;
    }
    h2 {
        font-size: 22px;
        font-weight: bold;
        text-align: left;
        border-left: 3px solid #d0021b;
        padding-left: 10px;
        margin: 10px 0;
        @media screen and (max-width: 992px ) {
            font-size: 18px;
        }
    }
    .sign-in {
        background: #d00b12;
        color: #fff;
        margin-right: 10px;
        &:hover {
            opacity: 0.9;
        }
    }
}
</style>
<style>
p {
    word-break: break-word !important;
}
</style>
