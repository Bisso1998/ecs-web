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
}
