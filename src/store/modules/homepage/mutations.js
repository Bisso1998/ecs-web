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

    setSectionDataLoadingTrue(state) {
        state.sections.loading_state = 'LOADING';
    },

    setSectionData(state, sectionData) {
        console.log(state);
        state.sections.loading_state = 'LOADING_SUCCESS';
        state.sections.data = sectionData.sections;
    },

    setSectionDataLoadingError(state) {
        state.sections.loading_state = 'LOADING_ERROR';
        state.sections.data = [];
    }
}
