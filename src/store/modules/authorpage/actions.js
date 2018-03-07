import DataAccessor from '@/utils/DataAccessor'

export default {

    fetchInitialPublishedContents({ commit, state }, { authorId, resultCount }) {
        commit('setPublishedContentsLoadingTrue');
        DataAccessor.getPratilipiListByAuthor(authorId, 'PUBLISHED', null, null, resultCount, (data) => {
            if (data.status === 200) {
                commit('setPublishedContentsLoadingSuccess', data.response);    
            } else {
                commit('setPublishedContentsLoadingError');    
            }
        })
    },

    fetchMorePublishedContents({ commit, state }, { authorId, resultCount }) {
        commit('setPublishedContentsDynamicLoadingTrue');
        DataAccessor.getPratilipiListByAuthor(authorId, 'PUBLISHED', state.drafts.cursor, null, resultCount, (data) => {
            if (data.status === 200) {
                commit('setPublishedContentsDynamicLoadingSuccess', data.response);
            } else {
                commit('setPublishedContentsDynamicLoadingError');
            }
        });  
    },

    fetchAuthorDetails({ commit, state }, authorSlug) {
        commit('setAuthorDataLoadingTrue');
        DataAccessor.getAuthorBySlug(authorSlug, (authorData) => {
            if (authorData) {
                commit('setAuthorDataLoadingSuccess', authorData);
            } else {
                commit('setAuthorDataLoadingError');
            }
        });    
    }
}
