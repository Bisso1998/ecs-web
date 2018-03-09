import DataAccessor from '@/utils/DataAccessor'

export default {
    setShareDetails({ commit }, { data, type }) {
        commit('setShareDetails', { data, type })
    }
}
