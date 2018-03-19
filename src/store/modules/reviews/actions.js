import DataAccessor from '@/utils/DataAccessor'

export default {
    
    fetchPratilipiReviews({ commit, state }, { resultCount, pratilipiId }) {
        commit('setReviewLoadingTrue');
        DataAccessor.getReviewList(pratilipiId, state.cursor, null, resultCount, function(data) {
            if (data.status === 200) {
                commit('setReviewLoadingSuccess', data.response);
            } else {
                commit('setReviewLoadingError');
            }
        });
    },

    loadMoreReviews({ commit, state }, { resultCount, pratilipiId }) {
        commit('setMoreReviewLoadingTrue');
        DataAccessor.getReviewList(pratilipiId, state.cursor, null, resultCount, function(data) {
            if (data.status === 200) {
                commit('setMoreReviewLoadingSuccess', data.response);
            } else {
                commit('setMoreReviewLoadingError');
            }
        });   
    },

    loadCommentsOfReview({ commit, state }, { resultCount, parentId }) {
        commit('setCommentLoadingTrue', parentId);
        DataAccessor.getReviewCommentList(parentId, null, resultCount, function(data) {
            if (data.status === 200) {
                commit('setCommentLoadingSuccess', { data: data.response, parentId });
            } else {
                commit('setCommentLoadingError', parentId);
            }
        });
    },

    likeOrDislikeReview({ commit, state }, userPratilipiId) {

        const concernedReview = state.data.find((eachReview) => eachReview.userPratilipiId ===  userPratilipiId);
        DataAccessor.likeOrDislikeReview(userPratilipiId, !concernedReview.isLiked, function(data) {
            commit('setReviewLikeSuccess', { userPratilipiId, isLiked: !concernedReview.isLiked });
        });
    },

    setPratilipiRating({ commit, state, dispatch }, { rating, pratilipiId }) {
        dispatch('pratilipipage/setPratilipiRating', { rating, pratilipiId }, { root: true });
    },

    saveOrUpdateReview({ commit, state, dispatch }, { review, pratilipiId }) {
        dispatch('pratilipipage/saveOrUpdateReview', { review, pratilipiId }, { root: true });
    },

    createComment({ commit, state }, { userPratilipiId, content }){
        DataAccessor.createOrUpdateReviewComment(userPratilipiId, null, content, function(data) {
            commit('addNewCommentSuccess', { userPratilipiId, data });
        }, () => {
            commit('addNewCommentError');
        });
    },

    updateComment({ commit, state }, { commentId, content }){
        DataAccessor.createOrUpdateReviewComment(null, commentId, content, function(data) {
            commit('updateCommentSuccess', { commentId, data });
        }, () => {
            commit('updateCommentError');
        });
    },
}
