<template>
    <MainLayout>
        <div class="event-page">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2>Event Details</h2>
                        <div class="page-content event-list">
                            <PratilipiComponent
                                :pratilipiData="pratilipiData"
                                :key="pratilipiData.pratilipiId"
                                v-for="pratilipiData in getEventPratilipis"
                                v-if="getEventPratilipisLoadingState === 'LOADING_SUCCESS' || getEventPratilipis.length !== 0"
                                ></PratilipiComponent>
                            <Spinner v-if="getEventPratilipisLoadingState === 'LOADING'"></Spinner>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import PratilipiComponent from '@/components/Pratilipi.vue';
import Spinner from '@/components/Spinner.vue';
import constants from '@/constants'
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        MainLayout,
        PratilipiComponent,
        Spinner
    },
    data() {
        return {
            scrollPosition: null
        }
    },
    computed: {
        ...mapGetters('eventpage', [
            'getEventData',
            'getEventDataLoadingState',
            'getEventPratilipis',
            'getEventPratilipisLoadingState',
            'getEventPratilipisCursor'
        ])
    },
    methods: {
        ...mapActions('eventpage', [
            'cacheEventData',
            'fetchEventDetails',
            'fetchInitialEventPratilipis',
            'fetchMorePratilipisForEvent'
        ]),
        updateScroll() {
            this.scrollPosition = window.scrollY;
        }
    },
    watch: {
        'getEventData.eventId' (eventId) {
            if (eventId) {
                this.fetchInitialEventPratilipis({ eventId, resultCount: 20 });
            }
        },
        'scrollPosition'(newScrollPosition){
            const nintyPercentOfList = ( 90 / 100 ) * $('.event-page').innerHeight();
            const { eventId } = this.getEventData;

            if (newScrollPosition > nintyPercentOfList && 
                this.getEventPratilipisLoadingState !== 'LOADING' && 
                this.getEventPratilipisCursor !== null) {

                this.fetchMorePratilipisForEvent({ eventId, resultCount: 20 });
            }
        }
    },
    created() {
        const { event_data, event_slug } = this.$route.params;
        if (event_data) {
            this.cacheEventData(event_data);
        } else {
            this.fetchEventDetails(event_slug);
        }
        
    },
    mounted() {
        window.addEventListener('scroll', this.updateScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.updateScroll);
    },
}
</script>

<style lang="scss" scoped>
.event-page {
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
