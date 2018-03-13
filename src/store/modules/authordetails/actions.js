import DataAccessor from '@/utils/DataAccessor'

export default {
    fetchAuthorDetails({ commit, state }, authorId) {
        commit('setAuthorDetailsLoadingTrue');
        commit('setUserAuthorDataLoadingTrue');
        DataAccessor.getAuthorById(authorId, true, function(authorData, userAuthorData) {
            if (authorData) {
                commit('setAuthorDetailsLoadingSuccess', authorData);
            } else {
                commit('setAuthorDetailsLoadingError');    
            }
            if (userAuthorData) {
                commit('setUserAuthorDataLoadingSuccess', userAuthorData);
            } else {
                commit('setUserAuthorDataLoadingError');    
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
    }
}
