import DataAccessor from '@/utils/DataAccessor'

export default {

    fetchPratilipiDetails({ commit, state }, pratilipiId) {
        commit('setReaderPratilipiDataLoadingTrue');
        commit('setReaderPratilipiUserDataLoadingTrue');
        commit('setReaderPratilipiIndexDataLoadingTrue');
        DataAccessor.getPratilipiAndIndex(pratilipiId, true, function(pratilipiData, indexData, userPratilipiData) {
            if (pratilipiData) {
                commit('setReaderPratilipiDataLoadingSuccess', pratilipiData);
            } else {
                commit('setReaderPratilipiDataLoadingError');    
            }

            if (indexData) {
                commit('setReaderPratilipiIndexDataLoadingSuccess', indexData);
            } else {
                commit('setReaderPratilipiIndexDataLoadingError');    
            }

            if (userPratilipiData) {
                commit('setReaderPratilipiUserDataLoadingSuccess', userPratilipiData);
            } else {
                commit('setReaderPratilipiUserDataLoadingError');    
            }
            
        });
    },

    fetchPratilipiContentForHTML({ commit, state, dispatch }, { pratilipiId, chapterNo }) {
        const chapterToFind = state.content.data.find((eachChapter) => eachChapter.chapterNo === chapterNo);
        if (chapterToFind) {
            return;
        }
        DataAccessor.getPratilipiContent(pratilipiId, chapterNo, false, (data) => {
            if (data.status === 200) {
                commit('setContentLoadingSuccess', data.response);
                dispatch('fetchPratilipiContentForHTMLNextChapter', { pratilipiId, chapterNo: chapterNo + 1 })
            } else {
                commit('setContentLoadingError');
            }
        });
    },

    fetchPratilipiContentForHTMLNextChapter({ commit, state }, { pratilipiId, chapterNo }) {
        if (state.index.data.length < chapterNo) {
            return;
        }
        const chapterToFind = state.content.data.find((eachChapter) => eachChapter.chapterNo === chapterNo);
        if (chapterToFind) {
            return;
        }
        DataAccessor.getPratilipiContent(pratilipiId, chapterNo, false, (data) => {
            if (data.status === 200) {
                commit('setContentLoadingSuccess', data.response);
            } else {
                commit('setContentLoadingError');
            }
        });
    },

    clearCachedContents({ commit, state }) {
        commit('clearCachedContents');
    }
}
