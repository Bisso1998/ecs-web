export default {
    // checkoutStatus: state => state.checkoutStatus,

    // cartProducts: (state, getters, rootState) => {
    //     return state.added.map(({ id, quantity }) => {
    //         const product = rootState.products.all.find(product => product.id === id)
    //         return {
    //             title: product.title,
    //             price: product.price,
    //             quantity
    //         }
    //     })
    // },

    // cartTotalPrice: (state, getters) => {
    //     return getters.cartProducts.reduce((total, product) => {
    //         return total + product.price * product.quantity
    //     }, 0)
    // }
    
    getUserDetails: state => state.data,
    getNotificationCount: state => state.notification_count,
    getLogoutStatus: state => state.logout_user,
    getLoginError: state => state.loading_error_message,
    getSignupSource: state => state.signup_source,
    getLoginSource: state => state.login_source,
}
