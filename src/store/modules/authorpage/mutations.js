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

    setPublishedContentsLoadingTrue(state) {
        state.published_contents.loading_state = 'LOADING';
        state.published_contents.data = [];
        state.published_contents.cursor = null;
        state.published_contents.numberFound = 0;
    },

    setPublishedContentsLoadingSuccess(state, response) {
        state.published_contents.loading_state = 'LOADING_SUCCESS';
        state.published_contents.data = response.pratilipiList;
        state.published_contents.cursor = response.cursor;
        state.published_contents.numberFound = response.numberFound;
    },

    setPublishedContentsLoadingError(state) {
        state.published_contents.loading_state = 'LOADING_ERROR';
        state.published_contents.data = [];
        state.published_contents.cursor = null;
        state.published_contents.numberFound = 0;
    },

    setPublishedContentsDynamicLoadingTrue(state) {
        state.published_contents.loading_state = 'LOADING';
    },

    setPublishedContentsDynamicLoadingSuccess(state, response) {
        state.published_contents.loading_state = 'LOADING_SUCCESS';
        state.published_contents.data = state.published_contents.data.concat(response.pratilipiList);
        state.published_contents.cursor = response.cursor;
    },

    setPublishedContentsDynamicLoadingError(state) {
        
    },

    setAuthorDataLoadingTrue(state) {
        state.author.loading_state = 'LOADING';
    },
    setAuthorDataLoadingSuccess(state, authorData) {
        state.author.loading_state = 'LOADING_SUCCESS';
        state.author.data = authorData;
    },
    setAuthorDataLoadingError(state) {
        state.author.loading_state = 'LOADING_ERROR';
    }


}
