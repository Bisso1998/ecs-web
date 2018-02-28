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
    },
    
    setUserDataLoadingSuccess(state, userData) {
        state.loading_state = 'LOADING_SUCCESS';
        state.data = userData;
    },
    
    setUserDataLoadingError(state) {
        state.loading_state = 'LOADING_ERROR';
    }
}
