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
    fetchUserDetails({ commit, state }) {
        commit('setUserDataLoadingTrue');
        DataAccessor.getUser((data) => {
            if (data.status === 200) {
                commit('setUserDataLoadingSuccess', data.response);
            } else {
                commit('setUserDataLoadingError');
            }
        })
    },

    loginUser({ commit, state }, { email, password }) {
        console.log(email);
        console.log(password);
        commit('setUserDataLoadingTrue');
        DataAccessor.loginUser(email, password, (data) => {
            console.log(data);
            commit('setUserDataLoadingSuccess', data);
        }, (error) => {
            console.log(error);
            commit('setUserDataLoadingError', error.message);
        })
    },

    logoutUser({ commit, state }) {
        commit('setUserLogoutInProgressTrue');
        DataAccessor.logoutUser((data) => {
            commit('setUserLogoutInProgressSuccess', data);
        }, () => {
            commit('setUserLogoutInProgressError');
        })
    },

    setNotificationCount({ commit, state }, notificationCount) {
        commit('setNotificationCount', notificationCount);
    }
}
