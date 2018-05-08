export default {

    setConversationListCached(state, conversationList) {
        state.conversationListCached = conversationList;
    },

    setChannelLastMessageCached(state, channelLastMessage) {
        state.channelLastMessageCached = channelLastMessage;
    },

    setChannelLastReadMessageCached(state, channelLastReadMessage) {
        state.channelLastReadMessageCached = channelLastReadMessage;
    },

    setFetchedChannelMetadataDataCached(state, fetchedChannelMetadataData) {
        state.fetchedChannelMetadataDataCached = fetchedChannelMetadataData;
    },

    clearConversationsDataCache(state) {
        state.conversationListCached = [],
        state.channelLastMessageCached = {},
        state.channelLastReadMessageCached = {},
        state.fetchedChannelMetadataDataCached = {}
    }

}
