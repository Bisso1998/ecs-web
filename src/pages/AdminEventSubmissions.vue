<template>
    <MainLayout>
        <div class="static-page page-wrap">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="filters">
                            <p>Filter By:</p>
                            <div class="form-row">
                                <div class="form-group col-md-3">
                                    <select id="inputState" class="form-control">
                                        <option selected>Language...</option>
                                        <option>Hindi</option>
                                        <option>Malayalam</option>
                                    </select>
                                </div>
                                <div class="form-group col-md-3">
                                    <select id="inputState" class="form-control">
                                        <option selected>State...</option>
                                        <option>Drafted</option>
                                        <option>Submitted</option>
                                    </select>
                                </div>
                                <div class="form-group col-md-3">
                                    <select id="inputState" class="form-control">
                                        <option selected>Event Id...</option>
                                        <option>Id 1</option>
                                        <option>Id 2</option>
                                    </select>
                                </div>
                                <div class="form-group col-md-3">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
                                        <label class="form-check-label" for="inlineCheckbox1">Viewed</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2">
                                        <label class="form-check-label" for="inlineCheckbox2">Approved</label>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                        <td class="user-id">{{ eachEventPratilipi.pratilipiUserId }}</td>
                                        <td class="title">{{ eachEventPratilipi.title }}</td>
                                        <td class="title-en">{{ eachEventPratilipi.titleEn }}</td>
                                        <td>{{ eachEventPratilipi.type }}</td>
                                        <!-- <td>{{ eachEventPratilipi.language }}</td> -->
                                        <!-- <td>{{ eachEventPratilipi.titleEn }}</td> -->
                                        <td class="submission-id">{{ eachEventPratilipi._id }}</td>
                                        <td class="slug" v-if="eachEventPratilipi.pratilipiSlug"><router-link :to="eachEventPratilipi.pratilipiSlug">{{ eachEventPratilipi.pratilipiSlug.split('/').pop() }}</router-link></td>
                                        <td v-else>NA</td>
                                        <td class="state" :class="{
                                            'drafted': eachEventPratilipi.state === 'DRAFTED',
                                            'submitted': eachEventPratilipi.state === 'SUBMITTED',
                                            'pratilipi-created': eachEventPratilipi.state === 'PRATILIPI_CREATED',
                                            'content-created': eachEventPratilipi.state === 'CONTENT_CREATED',
                                            'published': eachEventPratilipi.state === 'PRATILIPI_PUBLISHED',
                                        }"><span>{{ eachEventPratilipi.state.split('_')[1] || eachEventPratilipi.state.split('_')[0] }}</span></td>
                                        <td>
                                            <button type="button" class="btn publish" :disabled="eachEventPratilipi.state !== 'SUBMITTED'" @click="publishContent(eachEventPratilipi._id)">Publish</button>
                                        </td>
                                        <td class="delete-option">
                                            <button type="button" name="button"><i class="material-icons">delete</i></button>
                                            <!-- <button type="button" name="button"><i class="material-icons">restore_from_trash</i></button> -->
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="pagination">
                            <nav aria-label="...">
                                <ul class="pagination">
                                    <li class="page-item disabled">
                                        <span class="page-link">Previous</span>
                                    </li>
                                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                                    <li class="page-item active">
                                        <span class="page-link">2</span>
                                    </li>
                                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                </ul>
                            </nav>
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
    .event-table {
        font-size: 12px;
        th {
            vertical-align: middle;
        }
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
            &.submission-id, &.user-id {
                font-size: 11px;
            }
            &.title, &.title-en, &.slug {
                text-overflow: ellipsis;
                white-space: nowrap;
                max-width: 100px;
                overflow: hidden;
            }
            &.slug {
                direction: rtl;
            }
            .publish {
                background: #d00b12;
                color: #fff;
                margin-right: 10px;
                font-size: 14px;
                &:disabled {
                    background: #9e9e9e;
                }
            }
            &.delete-option {
                button {
                    background: none;
                    border: 0;
                    cursor: pointer;
                    i {
                        color: #555;
                        vertical-align: middle;
                    }
                }
            }
        }
    }
    .filters {
        margin: 10px 0;
        font-size: 14px;
        background: #f8f9fa;
        padding: 5px 10px;
        p {
            margin: 0 0 5px;
            font-weight: bold;
        }
        .form-check {
            margin-top: 10px;
        }
    }
}
</style>
<style>
p {
    word-break: break-word !important;
}
</style>
