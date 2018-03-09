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

    setAuthorDataLoadingTrue(state) {
        state.author.loading_state = 'LOADING';
    },
    
    setAuthorDataLoadingSuccess(state, authorData) {
        state.author.data = authorData;
        state.author.loading_state = 'LOADING_SUCCESS';
    },
    
    setAuthorDataLoadingError(state) {
        state.author.loading_state = 'LOADING_ERROR';
    }
}
