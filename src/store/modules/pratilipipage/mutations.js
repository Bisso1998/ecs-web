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

    setPratilipiDataLoadingTrue(state) {
        state.pratilipi.loading_state = 'LOADING';
    },

    setPratilipiDataLoadingSuccess(state, pratilipiData) {
        state.pratilipi.loading_state = 'LOADING_SUCCESS';
        state.pratilipi.data = pratilipiData;
    },

    setPratilipiDataLoadingError(state) {
        state.pratilipi.loading_state = 'LOADING_ERROR';
        state.pratilipi.data = {};
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

    setPratilipiUserDataLoadingTrue(state) {
        state.userPratilipi.loading_state = 'LOADING';
    },

    setPratilipiUserDataLoadingSuccess(state, pratilipiUserData) {
        state.userPratilipi.loading_state = 'LOADING_SUCCESS';
        state.userPratilipi.data = pratilipiUserData;
    },

    setPratilipiUserDataLoadingError(state) {
        state.userPratilipi.loading_state = 'LOADING_ERROR';
        state.userPratilipi.data = {};
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

    setPratilipiImageUploadingTrue(state) {
        state.pratilipi.pratilipi_image_upload_state = 'LOADING';
    },
    setPratilipiImageUploadingSuccess(state, data) {
        state.pratilipi.pratilipi_image_upload_state = 'LOADING_SUCCESS';
        state.pratilipi.data.coverImageUrl = data.coverImageUrl;
    },
    setPratilipiImageUploadingError(state) {
        state.pratilipi.pratilipi_image_upload_state = 'LOADING_ERROR';
    }
}
