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

    setRecommendationLoadingTrue(state) {
        state.loading_state = 'LOADING';
    },

    setRecommendation(state, sectionData) {
        console.log(state);
        state.loading_state = 'LOADING_SUCCESS';
        state.data = sectionData.pratilipiList;
        state.title = sectionData.title;
    },

    setRecommendationLoadingError(state) {
        state.loading_state = 'LOADING_ERROR';
        state.data = [];
        state.title = '';
    },

    addPratilipiToLibrarySuccess(state, data) {
        console.log(data);
        for (var i = 0; i < state.sections.data.length; i++) {
            const eachSection = state.sections.data[i].pratilipiList;
            console.log(eachSection);
            const pratilipiAddedToLib = eachSection.find(eachPratilipi => eachPratilipi.pratilipiId === data.referenceId);
            if (pratilipiAddedToLib) {
                pratilipiAddedToLib.addedToLib = true
                break;
            }
        }
    },

    addPratilipiToLibraryError(state) {

    },

    removePratilipiFromLibrarySuccess(state, data) {
        console.log(data);
        for (var i = 0; i < state.sections.data.length; i++) {
            const eachSection = state.sections.data[i].pratilipiList;
            console.log(eachSection);
            const pratilipiAddedToLib = eachSection.find(eachPratilipi => eachPratilipi.pratilipiId === data.referenceId);
            if (pratilipiAddedToLib) {
                pratilipiAddedToLib.addedToLib = false
                break;
            }
        }
    },

    removePratilipiFromLibraryError(state) {

    }
}
