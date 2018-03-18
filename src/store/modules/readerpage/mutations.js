export default {
    // pushProductToCart(state, { id }) {
    //     state.added.push({
    //         id,
    //         quantity: 1
    //     })
    // },

    // incrementItemQuantity(state, { id }) {
    //     const cartItem = state.added.find(item => item.id === id)
    //     cartItem.quantity++
    // },

    // setCartItems(state, { items }) {
    //     state.added = items
    // },

    // setCheckoutStatus(state, status) {
    //     state.checkoutStatus = status
    // }

    setReaderPratilipiDataLoadingTrue(state) {
        state.pratilipi.loading_state = 'LOADING';
    },

    setReaderPratilipiDataLoadingSuccess(state, pratilipiData) {
        state.pratilipi.loading_state = 'LOADING_SUCCESS';
        state.pratilipi.data = pratilipiData;
    },

    setReaderPratilipiDataLoadingError(state) {
        state.pratilipi.loading_state = 'LOADING_ERROR';
        state.pratilipi.data = {};
    },

    setReaderPratilipiIndexDataLoadingTrue(state) {
        state.index.loading_state = 'LODING'
    },
    setReaderPratilipiIndexDataLoadingSuccess(state, data) {
        state.index.loading_state = 'LOADING_SUCCESS';
        state.index.data = data.index;
    },
    setReaderPratilipiIndexDataLoadingError(state) {
        state.index.loading_state = 'LOADING_ERROR';
        state.index.data = [];
    },

    
    setReaderPratilipiUserDataLoadingTrue(state) {
        state.userPratilipi.loading_state = 'LOADING';
    },

    setReaderPratilipiUserDataLoadingSuccess(state, pratilipiUserData) {
        state.userPratilipi.loading_state = 'LOADING_SUCCESS';
        state.userPratilipi.data = pratilipiUserData;
    },

    setReaderPratilipiUserDataLoadingError(state) {
        state.userPratilipi.loading_state = 'LOADING_ERROR';
        state.userPratilipi.data = {};
    },

    clearCachedContents(state) {
        state.content.data = [];
    },
    setContentLoadingSuccess(state, data) {
        const chapterToFind = state.content.data.find((eachChapter) => eachChapter.chapterNo === data.chapterNo);
        if (chapterToFind) {
            return;
        }
        state.content.data.push(data);
    },
    setContentLoadingError(state) {
        state.content.loading_state = 'LOADING_ERROR';
    },





    addPratilipiToLibrarySuccess(state) {
        state.userPratilipi.data.addedToLib = true;
    },
    
    addPratilipiToLibraryError(state) {

    },

    removePratilipiFromLibrarySuccess(state) {
        state.userPratilipi.data.addedToLib = false;
    },
    
    removePratilipiFromLibraryError(state) {

    },


    setRecommendationLoadingTrue(state) {
        state.recommendations.loading_state = 'LOADING';
    },

    setRecommendationLoadingSuccess(state, recommendations) {
        state.recommendations.loading_state = 'LOADING_SUCCESS';
        state.recommendations.data = recommendations;
    },

    setRecommendationLoadingError(state) {
        state.recommendations.loading_state = 'LOADING_ERROR';
        state.recommendations.data = [];
    },

    setPratilipiRatingUpdateLoading(state) {

    },
    setPratilipiRatingUpdateSuccess(state, value) {
        state.userPratilipi.data.rating = value;
        state.userPratilipi.data.reviewDateMillis = value ? Date.now() : null;
    },
    setPratilipiRatingUpdateError(state) {

    },


    setPratilipiReviewUpdateLoading(state){

    },
    setPratilipiReviewUpdateSuccess(state, value){
        state.userPratilipi.data.review = value;
        state.userPratilipi.data.reviewDateMillis = value ? Date.now() : null;
    },
    setPratilipiReviewUpdateError(state){

    },
}
