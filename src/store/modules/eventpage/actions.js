import DataAccessor from '@/utils/DataAccessor'

export default {

    cacheEventData({ commit, state }, eventData) {
        commit('setEventDataFromCache', eventData);
    },
    
    fetchEventDetails({ commit, state }, eventSlug) {
        console.log(eventSlug);
        commit('setEventDataLoadingTrue');
        DataAccessor.getEventBySlug(eventSlug, (eventData) => {
            if (eventData) {
                commit('setEventDataLoadingSuccess', eventData);
            } else {
                commit('setEventDataLoadingError');
            }
        });
    },
    
    fetchInitialEventPratilipis({ commit, state }, { eventId, resultCount }) {
        commit('setInitialEventPratilipiLoadingTrue');
        DataAccessor.getPratilipiListByEventId(eventId, null, null, resultCount, (data) => {
            if (data.status === 200) {
                commit('setInitialEventPratilipiLoadingSuccess', data.response);
            } else {
                commit('setInitialEventPratilipiLoadingError');
            }
        });
    },

    fetchMorePratilipisForEvent({ commit, state }, {  eventId, resultCount }) {
        commit('setDynamicEventPratilipiLoadingTrue');
        DataAccessor.getPratilipiListByEventId(eventId, state.pratilipiList.cursor, null, resultCount, (data) => {
            if (data.status === 200) {
                commit('setDynamicEventPratilipiLoadingSuccess', data.response);
            } else {
                commit('setDynamicEventPratilipiLoadingError');
            }
        });  
    }
}
