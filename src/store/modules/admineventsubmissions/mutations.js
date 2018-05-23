export default {
    setEventPratilipiDataLoadingTrue(state) {
    	state.eventPratilipi.loading_state = 'LOADING';
        state.eventPratilipi.data = [];
    },

    setEventPratilipiDataLoadingSuccess(state, data) {
        state.eventPratilipi.data = data;
        state.eventPratilipi.loading_state = 'LOADING_SUCCESS';
    },

    setEventPratilipiDataLoadingError(state) {
    	state.eventPratilipi.loading_state = 'LOADING_ERROR';
    },

    setEventPratilipiPublishSuccess(state, data) {

        const eventPratilipi = state.eventPratilipi.data.find(eachEventPratilipi => eachEventPratilipi._id === data._id);
        eventPratilipi.pratilipiSlug = data.pratilipiSlug;
        eventPratilipi.state = data.state;
    },
    setEventPratilipiPublishError(state) {

    }
}
