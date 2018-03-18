<template>
    <div class="recommendation">
        <PratilipiListComponent 
            :pratilipiList="getRecommendationList" 
            :title="getRecommendationTitle"
            v-bind="{ addToLibrary, removeFromLibrary }"
            v-if="getRecommendationLoadingState === 'LOADING_SUCCESS'"
        ></PratilipiListComponent>
    </div>
</template>

<script>
import PratilipiListComponent from '@/components/PratilipiList.vue';

import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Home',
    props: {
        contextId: {
            type: Number,
            required: true
        },
        context: {
            type: String,
            required: true
        },
        resultCount: {
            type: Number,
            default: 6
        }
    },
    data() {
        return {
            sectionList: []
        }
    },
    computed: {
        ...mapGetters('recommendation', [
            'getRecommendationList',
            'getRecommendationLoadingState',
            'getRecommendationTitle'
        ])
    },
    methods: {
        ...mapActions('recommendation', [
            'fetchRecommendation',
            'addToLibrary',
            'removeFromLibrary'
        ]),
    },
    components: {
        PratilipiListComponent,
    },
    created() {
        const { contextId, context, resultCount } = this;
        this.fetchRecommendation({ contextId, context, resultCount });
    }
}
</script>

<style  lang="scss" scoped>
    .recommendation {
        .section {
            border: 0;
            margin-left: 0;
            .section-title {
                font-size: 14px;
            }
        }
    }
</style>
