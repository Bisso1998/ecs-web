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
    
    getEventPratilipiCreateOrUpdateStateSuccess: state => state.eventPratilipiCreateOrUpdateState,
    getEventPratilipiLoadingState: state => state.eventPratilipiLoadingState,
    getEventPratilipiData: state => state.eventPratilipi,
    getContentLoadingState: state => state.contentLoadingState,
    getEventPratilipDescUpdateState: state => state.eventPratilipDescUpdateState,
    getContents: state => state.contents,
    getEventData: state => state.event,
    getEventLoadingState: state => state.eventDataLoadingState

}
