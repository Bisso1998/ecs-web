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
    
    setInitialNotificationLoadingTrue(state) {
        state.loading_state = 'LOADING';
        state.data = [];
        state.cursor = null;
    },
    
    setInitialNotificationLoadingSuccess(state, data) {
        state.loading_state = 'LOADING_SUCCESS';
        state.data = data.notificationList;
        state.cursor = data.cursor;
    },
    
    setInitialNotificationLoadingError(state) {
        state.loading_state = 'LOADING_ERROR';
    },

    setMoreNotificationLoadingTrue(state) {
        state.loading_state = 'LOADING';
    },
    setMoreNotificationLoadingSuccess(state, data) {
        state.loading_state = 'LOADING_SUCCESS';
        if (!data.notificationList || data.notificationList.length === 0) {
            state.cursor = null;    
        } else {
            state.data = data.notificationList;
            state.cursor = data.cursor;    
        }
    },

    setMoreNotificationLoadingError(state) {
        state.loading_state = 'LOADING_ERROR';
    }
}
