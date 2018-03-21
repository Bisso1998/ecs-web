import DataAccessor from '@/utils/DataAccessor'

export default {
    // checkout({ commit, state }, products) {
    //     const savedCartItems = [...state.added]
    //     commit('setCheckoutStatus', null)
    //     // empty cart
    //     commit('setCartItems', { items: [] })
    //     shop.buyProducts(
    //         products,
    //         () => commit('setCheckoutStatus', 'successful'),
    //         () => {
    //             commit('setCheckoutStatus', 'failed')
    //             // rollback to the cart saved before sending the request
    //             commit('setCartItems', { items: savedCartItems })
    //         }
    //     )
    // },

    // addProductToCart({ state, commit }, product) {
    //     commit('setCheckoutStatus', null)
    //     if (product.inventory > 0) {
    //         const cartItem = state.added.find(item => item.id === product.id)
    //         if (!cartItem) {
    //             commit('pushProductToCart', { id: product.id })
    //         } else {
    //             commit('incrementItemQuantity', cartItem)
    //         }
    //         // remove 1 item from stock
    //         commit('decrementProductInventory', { id: product.id })
    //     }
    // }

    fetchPratilipiDetailsAndUserPratilipiData({ commit, state }, slugId) {
        commit('setPratilipiDataLoadingTrue');
        commit('setPratilipiUserDataLoadingTrue');
        DataAccessor.getPratilipiBySlug(slugId, true, function(pratilipiData, userPratilipiData) {
            if (pratilipiData) {
                commit('setPratilipiDataLoadingSuccess', pratilipiData);
            } else {
                commit('setPratilipiDataLoadingError');    
            }
            if (userPratilipiData) {
                commit('setPratilipiUserDataLoadingSuccess', userPratilipiData);
            } else {
                commit('setPratilipiUserDataLoadingError');    
            }
        });
    },

    addToLibrary({ commit, state }, pratilipiId) {
        console.log('hello');
        DataAccessor.addOrRemoveFromLibrary(pratilipiId, true, (response) => {
            commit('addPratilipiToLibrarySuccess', response);
        }, (error) => {
            commit('addPratilipiToLibraryError');
        })
    },

    removeFromLibrary({ commit, state }, pratilipiId) {
        DataAccessor.addOrRemoveFromLibrary(pratilipiId, false, (response) => {
            commit('removePratilipiFromLibrarySuccess', response);
        }, (error) => {
            commit('removePratilipiFromLibraryError');
        })
    },

    // This is an optimization currently not present in product stack
    fetchUserPratilipiData({ commit, state }, pratilipiId) {

    },

    setCachedPratilipiData({ commit, state }, pratilipiData) {
        console.log(pratilipiData);
    },

    uploadPratilipiImage({ commit, state }, formData ) {
        commit('setPratilipiImageUploadingTrue');
        DataAccessor.uploadPratilipiImage(formData, state.pratilipi.data.pratilipiId, (successData) => {
            console.log('Now I can die in peace');
            commit('setPratilipiImageUploadingSuccess', successData);
        }, (errorData) => {
            console.log('My life is wasted');
            commit('setPratilipiImageUploadingError');
        });
    },

    setPratilipiRating({ commit, state }, { rating, pratilipiId }) {
        commit('setPratilipiRatingUpdateLoading');
        DataAccessor.createOrUpdateReview(pratilipiId, rating, null, function(successData) {
            commit('setPratilipiRatingUpdateSuccess', rating);
        }, (errorData) => {
            commit('setPratilipiRatingUpdateError');
        });
    },

    saveOrUpdateReview({ commit, state }, { review, pratilipiId }) {
        commit('setPratilipiReviewUpdateLoading');
        DataAccessor.createOrUpdateReview(pratilipiId, null, review, function(successData) {
            commit('setPratilipiReviewUpdateSuccess', review);
        }, (errorData) => {
            commit('setPratilipiReviewUpdateError');
        });
    },

    deleteReview({ commit, state }, pratilipiId) {
        commit('setPratilipiReviewUpdateLoading');
        DataAccessor.deleteReview(pratilipiId, function(successData) {
            commit('setPratilipiReviewUpdateSuccess', '');
            commit('setPratilipiRatingUpdateLoading', null);
        }, (errorData) => {
            commit('setPratilipiReviewUpdateError');
        });
    },

    fetchAuthorDetails({ commit, state }, authorId) {
        commit('setAuthorDetailsLoadingTrue');
        commit('setUserAuthorDataLoadingTrue');
        DataAccessor.getAuthorById(authorId, true, function(authorData, userAuthorData) {
            if (authorData) {
                commit('setAuthorDetailsLoadingSuccess', authorData);
            } else {
                commit('setAuthorDetailsLoadingError');    
            }
            if (userAuthorData) {
                commit('setUserAuthorDataLoadingSuccess', userAuthorData);
            } else {
                commit('setUserAuthorDataLoadingError');    
            }
        });
    },

    followOrUnfollowAuthor({ commit, state }) {
        commit('setFollowUnfollowLoadingDataLoadingTrue');
        console.log(state.author.data.authorId);
        console.log(state.author.data.following);
        DataAccessor.followOrUnfollowAuthor(state.author.data.authorId, !state.author.data.following, function(data) {
            commit('setFollowUnfollowLoadingDataLoadingSuccess', data);
        }, function (error) {
            commit('setFollowUnfollowLoadingDataLoadingError');
        });
    },

    saveOrUpdateSummary({ commit, state }, data) {
        data.summary = data.value;
        delete data.value;
        DataAccessor.createOrUpdatePratilipi(data, (data) => {
            commit('setPratilipiSummaryUpdateSuccess', data);
        }, (error) => {
            commit('setPratilipiSummaryUpdateError');
        });
    },

    saveOrUpdateTitle({ commit, state }, data) {
        data.title = data.value;
        data.titleEn = data.value_two;
        delete data.value;
        delete data.value_two;
        DataAccessor.createOrUpdatePratilipi(data, (data) => {
            commit('setPratilipiTitleUpdateSuccess', data);
        }, (error) => {
            commit('setPratilipiTitleUpdateError');
        });
    },

    fetchSystemTags({ commit, state }, language) {
        commit('setSystemTagsLoadingTrue');
        DataAccessor.getTags(language, (data) => {
            if (data.status === 200) {
                commit('setSystemTagsLoadingSuccess', data.response);
            } else {
                commit('setSystemTagsLoadingError');
            }
        });
    }
}
