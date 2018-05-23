<template>
    <MainLayout>
        <div class="static-page page-wrap">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="table-responsive-md event-table">
                            <table class="table table-hover table-sm">
                                <thead class="thead-light">
                                    <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">User</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Title_En</th>
                                        <th scope="col">Type</th>
                                        <!-- <th scope="col">Language</th> -->
                                        <!-- <th scope="col">Word Count</th> -->
                                        <th scope="col">Submission ID</th>
                                        <th scope="col">Slug</th>
                                        <th scope="col">State</th>
                                        <th scope="col">Action</th>
                                        <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(eachEventPratilipi, index) in getEventPratilipis" :key="eachEventPratilipi._id">
                                        <th scope="row">{{ index + 1 }}</th>
                                        <td>{{ eachEventPratilipi.pratilipiUserId }}</td>
                                        <td>{{ eachEventPratilipi.title }}</td>
                                        <td>{{ eachEventPratilipi.titleEn }}</td>
                                        <td>{{ eachEventPratilipi.type }}</td>
                                        <!-- <td>{{ eachEventPratilipi.language }}</td> -->
                                        <!-- <td>{{ eachEventPratilipi.titleEn }}</td> -->
                                        <td>{{ eachEventPratilipi._id }}</td>
                                        <td v-if="eachEventPratilipi.pratilipiSlug"><router-link :to="eachEventPratilipi.pratilipiSlug">{{ eachEventPratilipi.pratilipiSlug.split('/').pop() }}</router-link></td>
                                        <td v-else>NA</td>
                                        <td class="state" :class="{
                                            'drafted': eachEventPratilipi.state === 'DRAFTED',
                                            'submitted': eachEventPratilipi.state === 'SUBMITTED',
                                            'pratilipi-created': eachEventPratilipi.state === 'PRATILIPI_CREATED',
                                            'content-created': eachEventPratilipi.state === 'CONTENT_CREATED',
                                            'published': eachEventPratilipi.state === 'PRATILIPI_PUBLISHED',
                                        }"><span>{{ eachEventPratilipi.state.split('_')[1] || eachEventPratilipi.state.split('_')[0] }}</span></td>
                                        <td>
                                            <button type="button" class="btn sign-in" :disabled="eachEventPratilipi.state !== 'SUBMITTED'" @click="publishContent(eachEventPratilipi._id)">Publish</button>
                                        </td>
                                        <td>
                                            <i class="material-icons">delete</i>
                                            <!-- <i class="material-icons">restore_from_trash</i> -->
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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
    .event-table {
        font-size: 14px;
        td {
            vertical-align: middle;
            &.state span {
                background: #e9e9e9;
                border-radius: 3px;
                padding: 5px;
                font-size: 12px;
            }
            &.state.published span {
                background: #4CAF50;
            }
            &.state.drafted span {
                background: #FF9800;
            }
            &.state.submitted span {
                background: #42bab0;
            }
            &.state.pratilipi-created span {
                background: #e9e9e9;
            }
            &.state.content-created span {
                background: #e9e9e9;
            }
        }
    }
}
</style>
<style>
p {
    word-break: break-word !important;
}
</style>
