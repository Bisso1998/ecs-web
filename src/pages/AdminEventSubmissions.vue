<template>
    <MainLayout>
        <div class="static-page page-wrap">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2>Event Submissions</h2>
                        <div class="filters">
                            <p>Filter By:</p>
                            <div class="form-row">
                                <div class="form-group col-md-3">
                                    <select id="inputState" class="form-control" v-model="selectedLanguage">
                                        <option disabled selected>__("language_choose_language")</option>
                                        <option 
                                            :value="eachLanguage.fullName.toUpperCase()" 
                                            v-for="eachLanguage in constants.LANGUAGES" 
                                            :key="eachLanguage.shortName">
                                            {{ eachLanguage.fullName.toUpperCase() }}
                                        </option>
                                    </select>
                                </div>
                                <div class="form-group col-md-3">
                                    <select id="inputState" class="form-control" v-model="selectedState">
                                        <option selected value="null">All States</option>
                                        <option value="DRAFTED">Drafted</option>
                                        <option value="SUBMITTED">Submitted</option>
                                        <option value="DELETED">Deleted</option>
                                        <option value="PRATILIPI_PUBLISHED">Published</option>
                                    </select>
                                </div>
                                <div class="form-group col-md-3">
                                    <select id="inputState" class="form-control" v-model="selectedEventId">
                                        <option selected value="null">All Events</option>
                                        <option v-for="eachEvent in getEventsData"
                                            :value="eachEvent.eventId"
                                            :key="eachEvent.eventId">{{ eachEvent.eventId + ' - ' + eachEvent.name }}</option>
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

                                        <th scope="row">{{ ((currentPage - 1) * limitPerPage ) + index + 1 }}</th>
                                        <td class="user-id">
                                            <div class="popover_wrapper">
                                                <span class="popover_title" @mouseover="getHoveredAuthorDetails(eachEventPratilipi.pratilipiUserId)">{{ eachEventPratilipi.pratilipiUserId }}</span>
                                                <div class="push popover_content">
                                                    <router-link :to="getAuthorData.pageUrl"  v-if="getAuthorDataLoadingState === 'LOADING_SUCCESS'">
                                                        <div class="author-img"><img :src="getLowResolutionImage(getAuthorData.coverImageUrl)" alt=""></div>
                                                        <div class="author-name">{{ getAuthorData.displayName }}</div>
                                                    </router-link>
                                                    <Spinner v-else></Spinner>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="title">{{ eachEventPratilipi.title }}</td>
                                        <td class="title-en">{{ eachEventPratilipi.titleEn }}</td>
                                        <td>{{ eachEventPratilipi.type }}</td>
                                        <!-- <td>{{ eachEventPratilipi.language }}</td> -->
                                        <!-- <td>{{ eachEventPratilipi.titleEn }}</td> -->
                                        <td class="submission-id"><router-link target="_blank" :to="'/submissions/' + eachEventPratilipi._id">{{ eachEventPratilipi._id }}</router-link></td>
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
                                            <!-- <button type="button" name="button"><i class="material-icons">restore_page</i></button> -->
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="pagination">
                            <nav aria-label="...">
                                <ul class="pagination">
                                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                                        <span class="page-link" @click="goToPage(currentPage - 1)">Previous</span>
                                    </li>
                                    <li class="page-item" :class="{ active: currentPage == index }" v-for="index in Math.ceil(getEventPratilipiCount/limitPerPage)" :key="index">
                                        <span class="page-link" @click="goToPage(index)">{{ index }}</span>
                                    </li>
                                    <!-- <li class="page-item active">
                                        <span class="page-link">2</span>
                                    </li>
                                    <li class="page-item"><a class="page-link" href="#">3</a></li> -->
                                    <li class="page-item" :class="{ disabled: currentPage ===  Math.ceil(getEventPratilipiCount/limitPerPage)}">
                                        <span class="page-link" @click="goToPage(currentPage + 1)">Next</span>
                                    </li>
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
import mixins from '@/mixins';
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            limitPerPage: 20,
            currentPage: 1,
            constants: constants,
            selectedLanguage: this.getCurrentLanguage().fullName.toUpperCase(),
            selectedState: null,
            selectedEventId: null
        }
    },
    components: {
        MainLayout,
        Spinner
    },
    mixins: [
        mixins
    ],
    computed: {
        ...mapGetters('admineventsubmissions', [
            'getEventPratilipis',
            'getEventPratilipisLoadingStatus',
            'getEventPratilipiCount',
            'getAuthorData',
            'getAuthorDataLoadingState',
            'getEventsLoadingState',
            'getEventsData'
        ])
    },
    methods: {
        ...mapActions('admineventsubmissions', [
            'fetchEventPratilipis',
            'fetchEventPratilipiCount',
            'fetchAuthorDetails',
            'fetchListOfEvents',
            'publishContent'
        ]),

        getHoveredAuthorDetails(userId) {
            this.fetchAuthorDetails(userId);
        },

        goToPage(page) {
            this.currentPage = page;
            this.fetchEventPratilipisWithFilter();
        },

        fetchEventPratilipisWithFilter(){
            const skip = (this.currentPage - 1) * this.limitPerPage;

            const queryObj = {
                limit: this.limitPerPage,
                skip,
                language: this.selectedLanguage
            }


            if (this.selectedState !== "null" && this.selectedState) {
                queryObj.state = this.selectedState;
            }

            if (this.selectedEventId !== "null" && this.selectedEventId) {
                queryObj.eventId = this.selectedEventId;
            }

            this.fetchEventPratilipis(queryObj);


            delete queryObj.skip;
            delete queryObj.limit;
            this.fetchEventPratilipiCount(queryObj);
        }
    },
    watch: {
        'selectedLanguage'(language) {
            this.currentPage = 1;
            this.selectedEventId = "null";
            this.fetchListOfEvents(language);
            this.fetchEventPratilipisWithFilter();
        },

        'selectedEventId'(eventId) {
            this.currentPage = 1;
            this.selectedState = "null";
            this.fetchEventPratilipisWithFilter();
        },

        'selectedState'(state) {
            this.currentPage = 1;
            this.fetchEventPratilipisWithFilter();
        }
    },
    created() {
        this.fetchListOfEvents(this.selectedLanguage);
        this.fetchEventPratilipisWithFilter({ limit: this.limitPerPage, language: this.selectedLanguage });
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
        font-size: 20px;
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
            
            .popover_wrapper {
                position: relative;
                margin-top: 0px;
                display: inline-block;
                .popover_title {
                    color: #17a2b8;
                }
                .popover_content {
                    opacity: 0;
                    visibility: hidden;
                    position: absolute;
                    left: 0;
                    top: 30px;
                    transform: translate(0,10px);
                    background-color: #fff;
                    padding: 10px;
                    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
                    width: auto;
                    min-width: 180px;
                    a {
                        text-decoration: none;
                        display: block;
                        position: relative;
                        color: #17a2b8;
                        .author-img {
                            width: 40px;
                            height: 40px;
                            overflow: hidden;
                            border-radius: 50%;
                            float: left;
                            margin-right: 10px;
                            vertical-align: middle;
                            img {
                                max-width: 100%;
                            }
                        }
                        .author-name {
                            vertical-align: middle;
                            font-size: 13px;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            max-width: 100px;
                            overflow: hidden;
                            line-height: 40px;
                        }
                    }
                }
                &:hover .popover_content {
                    z-index: 10;
                    opacity: 1;
                    visibility: visible;
                    transform: translate(0,-20px);
                    transition: all 0.5s cubic-bezier(0.75, -0.02, 0.2, 0.97);
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
