export default {

    saveConversationsDataToCache({ commit }, { conversations, channelLastMessage, channelLastReadMessage, fetchedChannelMetadataData }) {
        commit('setConversationListCached', conversations);
        commit('setChannelLastMessageCached', channelLastMessage);
        commit('setChannelLastReadMessageCached', channelLastReadMessage);
        commit('setFetchedChannelMetadataDataCached', fetchedChannelMetadataData);
    },

    clearConversationsDataCache({ commit }) {
        commit('clearConversationsDataCache');
    }

}
