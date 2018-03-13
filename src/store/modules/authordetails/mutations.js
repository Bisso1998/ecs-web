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

    setAuthorDetailsLoadingTrue(state) {
        state.author.loading_state = 'LOADING';
    },
    
    setAuthorDetailsLoadingSuccess(state, authorData) {
        state.author.data = authorData;
        state.author.loading_state = 'LOADING_SUCCESS';
    },
    
    setAuthorDetailsLoadingError(state) {
        state.author.loading_state = 'LOADING_ERROR';
    },

    setUserAuthorDataLoadingTrue(state) {
        state.userAuthor.loading_state = 'LOADING';
    },
    
    setUserAuthorDataLoadingSuccess(state, authorData) {
        state.userAuthor.data = authorData;
        state.userAuthor.loading_state = 'LOADING_SUCCESS';
    },
    
    setUserAuthorDataLoadingError(state) {
        state.userAuthor.loading_state = 'LOADING_ERROR';
    },

    setFollowUnfollowLoadingDataLoadingTrue(state) {

    },

    setFollowUnfollowLoadingDataLoadingSuccess(state, data){
        state.author.data.following = data.following;
        if (data.following) {
            state.author.data.followCount++;    
        } else {
            state.author.data.followCount--;
        }
    },

    setFollowUnfollowLoadingDataLoadingError(state) {

    },
}
