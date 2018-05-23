import DataAccessor from '@/utils/DataAccessor'

export default {

    fetchEventPratilipis({ commit, state }, query) {
        commit('setEventPratilipiDataLoadingTrue');
        DataAccessor.getAdminEventPratilipi(query, (eventPratilipiData) => {
            if (eventPratilipiData.status === 200) {
                commit('setEventPratilipiDataLoadingSuccess', eventPratilipiData.response.pratilipis);
            } else {
                commit('setEventPratilipiDataLoadingError');
            }
        });
    },

    publishContent({ commit, state }, id) {
        DataAccessor.publishAdminEventPratilipi(id, (eventPratilipiData) => {
            if (eventPratilipiData.status === 200) {
                // commit('setEventPratilipiDataLoadingSuccess', eventPratilipiData.response.pratilipis);
            } else {
                // commit('setEventPratilipiDataLoadingError');
            }
        });
    }
}
