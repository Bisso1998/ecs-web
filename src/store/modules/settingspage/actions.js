import DataAccessor from '@/utils/DataAccessor'

export default {
    fetchAuthorDetails({ commit, state }, authorId) {
        commit('setAuthorDataLoadingTrue');
        DataAccessor.getAuthorById(authorId, null, function(authorData) {
            if (authorData) {
                commit('setAuthorDataLoadingSuccess', authorData);
            } else {
                commit('setAuthorDataLoadingError');
            }
        });
    },

    updateUserDetails({ commit, state }) {
        commit('setUpdateUserLoadingTrue');
        const { email, phone } = state.author.data;
        const { userId } = state.author.data.user;
        DataAccessor.createOrUpdateUser(userId, email, phone, () => {
            commit('setUpdateUserLoadingSuccess');
        }, () => {
            commit('setUpdateUserLoadingError');
        });
    },

    updateAuthorDetails({ commit, state }) {
        commit('setUpdateAuthorLoadingTrue');
        const authorData = { ...state.author.data };
        console.log(authorData);
        DataAccessor.createOrUpdateAuthor(authorData, (response) => {
            commit('setUpdateAuthorLoadingSuccess', response);
        }, () => {
            commit('setUpdateAuthorLoadingError');
        });
    },

    updateUserPassword({ commit, state }, { oldPassword, newPassword }) {
        DataAccessor.updateUserPassword(oldPassword, newPassword, (response) => {
            commit('setUpdateAuthorLoadingSuccess', response);
        }, () => {
            commit('setUpdateAuthorLoadingError');
        });  
    }
}
