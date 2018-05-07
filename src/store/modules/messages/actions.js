import DataAccessor from '@/utils/DataAccessor'
import $ from 'jquery'

export default {

    saveConversationsDataToCache({ commit }, { conversations, channelLastMessage, channelLastReadMessage, fetchedChannelMetadataData }) {
        debugger;
        commit('setConversationListCached', conversations);
        commit('setChannelLastMessageCached', channelLastMessage);
        commit('setChannelLastReadMessageCached', channelLastReadMessage);
        commit('setFetchedChannelMetadataDataCached', fetchedChannelMetadataData);
    }

}
