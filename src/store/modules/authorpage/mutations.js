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
    },


    setInitialAuthorFollowingDataLoadingTrue(state){
        state.following.loading_state = 'LOADING';
        state.following.data = [];
        state.following.cursor = null;
        state.following.numberFound = 0;
    },

    setInitialAuthorFollowingDataLoadingSuccess(state, data){
        state.following.loading_state = 'LOADING_SUCCESS';
        state.following.data = data.authorList;
        state.following.cursor = data.cursor;
        state.following.numberFound = data.numberFound;
    },

    setInitialAuthorFollowingDataLoadingError(state){
        state.following.loading_state = 'LOADING_ERROR';
    },

    setInitialAuthorFollowersDataTrue(state){
        state.followers.loading_state = 'LOADING';
        state.followers.data = [];
        state.followers.cursor = null;
        state.followers.numberFound = 0;
    },

    setInitialAuthorFollowersDataSuccess(state, data){
        state.followers.loading_state = 'LOADING_SUCCESS';
        state.followers.data = data.userList;
        state.followers.cursor = data.cursor;
        state.followers.numberFound = data.numberFound;
    },

    setInitialAuthorFollowersDataError(state){
        state.followers.loading_state = 'LOADING_ERROR';
    },


    setMoreAuthorFollowingDataLoadingTrue(state) {
        state.following.loading_state = 'LOADING';
    },
    setMoreAuthorFollowingDataLoadingSuccess(state, response) {
        state.following.loading_state = 'LOADING_SUCCESS';
        state.following.data = state.following.data.concat(response.authorList);
        state.following.cursor = response.cursor;
    },
    setMoreAuthorFollowingDataLoadingError(state) {
        state.following.loading_state = 'LOADING_ERROR';
    },
    setMoreAuthorFollowersDataTrue(state) {
        state.followers.loading_state = 'LOADING';
    },
    setMoreAuthorFollowersDataSuccess(state) {
        state.followers.loading_state = 'LOADING_SUCCESS';
        state.followers.data = state.followers.data.concat(response.userList);
        state.followers.cursor = response.cursor;
    },
    setMoreAuthorFollowersDataError(state) {
        state.followers.loading_state = 'LOADING_ERROR';
    },


    setLibraryListInitialDataLoadingTrue(state) {
        state.library.loading_state = 'LOADING';
        state.library.data = [];
        state.library.cursor = null;
        state.library.numberFound = 0;
    },

    setLibraryListInitialDataLoadingSuccess(state, data) {
        state.library.loading_state = 'LOADING_SUCCESS';
        state.library.data = data.pratilipiList;
        state.library.cursor = data.cursor;
        state.library.numberFound = data.numberFound;
    },

    setLibraryListInitialDataLoadingError(state) {
        state.library.loading_state = 'LOADING_ERROR';
        state.library.data = [];
        state.library.cursor = null;
        state.library.numberFound = 0;
    },

    removePratilipiFromLibrarySuccess(state, data) {
        state.data = state.library.data.filter(eachPratilipi => eachPratilipi.pratilipiId !== data.referenceId);
        state.cursor--;
    },

    removePratilipiFromLibraryError() {

    }
}
