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
    
    setUserDataLoadingTrue(state) {
        state.loading_state = 'LOADING';
        state.loading_error_message = null;
    },
    
    setUserDataLoadingSuccess(state, userData) {
        state.loading_state = 'LOADING_SUCCESS';
        state.data = userData;
        state.loading_error_message = null;
    },
    
    setUserDataLoadingError(state, errorMessage) {
        state.loading_state = 'LOADING_ERROR';
        state.loading_error_message =  errorMessage;
    }
}
