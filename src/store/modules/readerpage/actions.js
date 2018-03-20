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
        console.log(chapterNo);
        console.log(state.index);
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
    },

    addToLibrary({ commit, state }) {
        DataAccessor.addOrRemoveFromLibrary(state.pratilipi.data.pratilipiId, true, (response) => {
            commit('addPratilipiToLibrarySuccess', response);
        }, (error) => {
            commit('addPratilipiToLibraryError');
        })
    },

    removeFromLibrary({ commit, state }) {
        DataAccessor.addOrRemoveFromLibrary(state.pratilipi.data.pratilipiId, false, (response) => {
            commit('removePratilipiFromLibrarySuccess', response);
        }, (error) => {
            commit('removePratilipiFromLibraryError');
        })
    },

    setPratilipiRating({ commit, state }, { rating, pratilipiId }) {
        commit('setPratilipiRatingUpdateLoading');
        DataAccessor.createOrUpdateReview(pratilipiId, rating, null, function(successData) {
            commit('setPratilipiRatingUpdateSuccess', rating);
        }, (errorData) => {
            commit('setPratilipiRatingUpdateError');
        });
    },

    saveOrUpdateReview({ commit, state }, { review, pratilipiId }) {
        commit('setPratilipiReviewUpdateLoading');
        DataAccessor.createOrUpdateReview(pratilipiId, null, review, function(successData) {
            commit('setPratilipiReviewUpdateSuccess', review);
        }, (errorData) => {
            commit('setPratilipiReviewUpdateError');
        });
    },

    deleteReview({ commit, state }, pratilipiId) {
        commit('setPratilipiReviewUpdateLoading');
        DataAccessor.deleteReview(pratilipiId, function(successData) {
            commit('setPratilipiReviewUpdateSuccess', '');
            commit('setPratilipiRatingUpdateLoading', null);
        }, (errorData) => {
            commit('setPratilipiReviewUpdateError');
        });
    }
}
