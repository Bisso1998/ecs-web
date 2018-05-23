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

    fetchEventPratilipiCount({ commit, state }, query) {
        commit('setEventPratilipiCountLoadingTrue');
        DataAccessor.getAdminEventPratilipi({ getCount: 'TRUE', ...query }, (eventPratilipiCount) => {
            if (eventPratilipiCount.status === 200) {
                commit('setEventPratilipiCountLoadingSuccess', 90);
                // commit('setEventPratilipiCountLoadingSuccess', eventPratilipiCount.response.count);
            } else {
                commit('setEventPratilipiCountLoadingError');
            }
        });
    },

    publishContent({ commit, state }, id) {
        DataAccessor.publishAdminEventPratilipi(id, (eventPratilipiData) => {
            if (eventPratilipiData) {
                commit('setEventPratilipiPublishSuccess', eventPratilipiData);
            } else {
                commit('setEventPratilipiPublishError');
            }
        });
    }
}
