<template>
    <MainLayout>
        <div class="static-page page-wrap">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2>{{ getSingleEventPratilipi.title }}</h2>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-2">
                        <img :src="getSingleEventPratilipi.coverImage" height="100px">
                    </div>
                    <div class="col-md-10">
                        <h4>{{ getSingleEventPratilipi.titleEn }}</h4>
                        <p>{{ getSingleEventPratilipi.type }}</p>
                        <div>{{ getSingleEventPratilipi.description }}</div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-2">
                        <p v-for="eachChapter in getSingleEventPratilipi.contents" :key="eachChapter.chapterNo" :class="{ active: selectedChapter === eachChapter.chapterNo }" @click="selectChapter(eachChapter.chapterNo)">{{ eachChapter.title || eachChapter.chapterNo }}</p>
                    </div>

                    <div class="col-md-10">
                        <div v-html="contentToShow"></div>
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
    data() {
        return {
            contentToShow: "",
            selectedChapter: 1
        }
    },
    computed: {
        ...mapGetters('admineventsubmissions', [
            'getSingleEventPratilipiLoadingStatus',
            'getSingleEventPratilipi'
        ])
    },
    methods: {
        ...mapActions('admineventsubmissions', [
            'fetchSingleEventPratilipi'
        ]),
        selectChapter(chapterNo) {
            this.selectChapter = chapterNo;
            this.getSingleEventPratilipi.contents.forEach((eachChapter) => {
                if (eachChapter.chapterNo === chapterNo) {
                    that.contentToShow = eachChapter.content;
                }
            });
        }
    },
    watch: {
        'getSingleEventPratilipiLoadingStatus'(state) {
            const that = this;
            if (state === 'LOADING_SUCCESS') {
                that.selectedChapter = 1;
                this.getSingleEventPratilipi.contents.forEach((eachChapter) => {
                    if (eachChapter.chapterNo === 1) {
                        that.contentToShow = eachChapter.content;
                    }
                });
            }
        }
    },
    created() {
        this.fetchSingleEventPratilipi(this.$route.params.eventPratilipiId);
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
}
</style>
<style>
p {
    word-break: break-word !important;
}
</style>
