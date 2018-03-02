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
    }
}
