import DataAccessor from '@/utils/DataAccessor'

export default {

    fetchInitialListPagePratilipis({ commit, state }, { listName, language, resultCount }) {
        commit('setListPageInitialDataLoadingTrue');
        console.log(language);
        DataAccessor.getPratilipiListByListName(listName, null, null, resultCount, language, function(data) {
            if (data.status === 200) {
                commit('setListPageInitialDataLoadingSuccess', data.response);
            } else {
                commit('setListPageInitialDataLoadingError');
            }
        });
    },

    fetchMorePratilipisForListPage({ commit, state }, { listName, language, resultCount }) {
        commit('setListPageDynamicLoadingTrue');
        console.log(language);
        DataAccessor.getPratilipiListByListName(listName, state.cursor, null, resultCount, language, function(data) {
            if (data.status === 200) {
                commit('setListPageDynamicLoadingSuccess', data.response);
            } else {
                commit('setListPageDynamicLoadingError');
            }
        });  
    }
}
