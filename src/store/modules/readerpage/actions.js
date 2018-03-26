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
        commit('setContentLoadingTrue');
        DataAccessor.getPratilipiContent(pratilipiId, chapterNo, false, (data) => {
            if (data.status === 200) {
                commit('setContentLoadingSuccess', data.response);
                dispatch('fetchPratilipiContentForHTMLNextChapter', { pratilipiId, chapterNo: chapterNo + 1 })
            } else {
                commit('setContentLoadingError');
            }
        });
    },

    fetchPratilipiContentForIMAGE({ commit, state, dispatch }, { pratilipiId, chapterNo }) {
        DataAccessor.getPratilipiContent(pratilipiId, null, true, (data) => {
            console.log(data);
            if (data.status === 200) {
                console.log(data);
                commit('setImageContentLoadingSuccess', data.response);
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
        commit('alert/triggerAlertView', '__("added_to_library")', { root: true });
        setTimeout(() => {
            commit('alert/triggerAlertHide', null, { root: true });
        }, 3000);
        DataAccessor.addOrRemoveFromLibrary(state.pratilipi.data.pratilipiId, true, (response) => {
            commit('addPratilipiToLibrarySuccess', response);
        }, (error) => {
            commit('addPratilipiToLibraryError');
        })
    },

    removeFromLibrary({ commit, state }) {
        commit('alert/triggerAlertView', '__("removed_from_library")', { root: true });
        setTimeout(() => {
            commit('alert/triggerAlertHide', null, { root: true });
        }, 3000);
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
        console.log(state);
        if (state.userPratilipi.data.rating === null || state.userPratilipi.data.rating === undefined) {
            commit('alert/triggerAlertView', 'need_rating', { root: true });
            setTimeout(() => {
                commit('alert/triggerAlertHide', null, { root: true });
            }, 3000);
            console.log('okay, i wont give review');
            return;
        }
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
            commit('setPratilipiRatingUpdateSuccess', null);
        }, (errorData) => {
            commit('setPratilipiReviewUpdateError');
        });
    },

    fetchAuthorDetails({ commit, state }) {
        commit('setAuthorDataLoadingTrue');
        DataAccessor.getAuthorBySlug(state.pratilipi.data.author.pageUrl, (authorData) => {
            if (authorData) {
                commit('setAuthorDataLoadingSuccess', authorData);
            } else {
                commit('setAuthorDataLoadingError');
            }
        });    
    },

    followOrUnfollowAuthor({ commit, state }) {
        commit('setFollowUnfollowLoadingDataLoadingTrue');
        console.log(state.author.data.authorId);
        console.log(state.author.data.following);
        DataAccessor.followOrUnfollowAuthor(state.author.data.authorId, !state.author.data.following, function(data) {
            commit('setFollowUnfollowLoadingDataLoadingSuccess', data);
        }, function (error) {
            commit('setFollowUnfollowLoadingDataLoadingError');
        });
    },
}
