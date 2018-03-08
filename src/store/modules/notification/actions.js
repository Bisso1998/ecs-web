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
    fetchInitialNotifications({ commit, state }, { language, resultCount }) {
        commit('setInitialNotificationLoadingTrue');
        DataAccessor.getNotificationList(null, resultCount, language, (data) => {
            if (data.status === 200) {
                commit('setInitialNotificationLoadingSuccess', data.response);
            } else {
                commit('setInitialNotificationLoadingError');
            }
        })
    },

    fetchMoreNotifications({ commit, state }, { language, resultCount }) {
        commit('setMoreNotificationLoadingTrue');
        DataAccessor.getNotificationList(state.notifications.cursor, resultCount, language, (data) => {
            if (data.status === 200) {
                commit('setMoreNotificationLoadingSuccess', data.response);
            } else {
                commit('setMoreNotificationLoadingError');
            }
        })
    }
}
