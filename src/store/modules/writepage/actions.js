import DataAccessor from '@/utils/DataAccessor'

export default {

    fetchInitialDraftedContents({ commit, state }, { authorId, resultCount }) {
        commit('setDraftedContentsLoadingTrue');
        DataAccessor.getPratilipiListByAuthor(authorId, 'DRAFTED', null, null, resultCount, (data) => {
            if (data.status === 200) {
                commit('setDraftedContentsLoadingSuccess', data.response);    
            } else {
                commit('setDraftedContentsLoadingError');    
            }
        })
    },

    fetchMoreDraftedContents({ commit, state }, { authorId, resultCount }) {
        commit('setDraftedContentsDynamicLoadingTrue');
        DataAccessor.getPratilipiListByAuthor(authorId, 'DRAFTED', state.drafts.cursor, null, resultCount, (data) => {
            if (data.status === 200) {
                commit('setDraftedContentsDynamicLoadingSuccess', data.response);
            } else {
                commit('setDraftedContentsDynamicLoadingError');
            }
        });  
    }
}
